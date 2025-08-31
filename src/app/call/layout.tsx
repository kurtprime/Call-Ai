import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div className="h-screen bg-background">
      <Analytics />
      <SpeedInsights />
      {children}
    </div>
  );
}
