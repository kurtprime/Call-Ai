import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function layout({ children }: Props) {
  return <div className="h-screen bg-background">{children}</div>;
}
