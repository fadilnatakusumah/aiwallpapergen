import { AlertCircle, Terminal } from "lucide-react";

import { Alert as AlertUI, AlertDescription, AlertTitle } from "./ui/alert";

export function Alert({
  variant,
  message,
  title,
}: {
  variant: "default" | "destructive";
  message: string;
  title?: string;
}) {
  if (variant === "destructive") {
    return (
      <AlertUI variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </AlertUI>
    );
  }

  return (
    <AlertUI>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </AlertUI>
  );
}
