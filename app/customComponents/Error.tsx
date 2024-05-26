import { cn } from "@/lib/utils";

export default function Error({
  error,
  className,
}: {
  error: String;
  className?: String;
}) {
  return (
    <h1 className={cn("text-[2rem] text-center text-red-600", className)}>
      {error}
    </h1>
  );
}
