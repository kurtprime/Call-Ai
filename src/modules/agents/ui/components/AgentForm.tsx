"use client";

import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AgentGetOne } from "../../types";
import { useForm } from "react-hook-form";
import { agentInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated/generatedAvatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export default function AgentForm({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentInsertSchema>>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
    if (isEdit) {
      console.log("update Agent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="h-30"
                  placeholder="You are a math teacher, demonstrate how to solve equations, guide students through word problems, and check their work to make sure they understand. They also create quizzes, exams, and homework assignments to measure how well the students are learning."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
