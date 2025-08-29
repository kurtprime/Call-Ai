import { inngest } from "@/app/inngest/client";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");
  const apiKey = request.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON " + e }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "Missing MeetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    if (!existingMeeting) {
      return NextResponse.json(
        { error: "Meeting does not exist" },
        { status: 400 }
      );
    }

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json(
        { error: "Agent does not exist" },
        { status: 400 }
      );
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey)
      return NextResponse.json({ error: "no API KEY" }, { status: 404 });

    const call = streamVideo.video.call("default", meetingId);
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: openaiKey,
      agentUserId: existingAgent.id,
      model: "gpt-4o-realtime-preview",
    });
    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
      voice: "alloy",
    });
    realtimeClient.on("connected", () =>
      console.log("Connected to Stream OpenAI service")
    );
    realtimeClient.on("conversation.item.completed", (ev: string) =>
      console.log("item completed", ev)
    );
    realtimeClient.on("conversation.updated", (ev: string) =>
      console.log("conversation updated", ev)
    );
    realtimeClient.on("error", (err: string) =>
      console.error("realtime error", err)
    );
    await realtimeClient.sendUserMessageContent([
      {
        type: "input_text",
        text: "Hello — please greet the participants briefly.",
      },
    ]);
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing Meeting Id" },
        { status: 400 }
      );
    }

    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId)
      return NextResponse.json({ error: "Missing meetingId" }, { status: 400 });

    await db
      .update(meetings)
      .set({ status: "processing", endedAt: new Date() })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json({ error: "meeting not found" }, { status: 404 });
    }

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  }

  return NextResponse.json({ status: "ok" });
}
