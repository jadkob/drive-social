import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: String }) {
  return (
    <h1
      className={cn(
        "text-center text-[2rem] mt-[20vh] animate-bounce",
        className
      )}
    >
      Loading...
    </h1>
  );
}
