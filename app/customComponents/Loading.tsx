import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: String }) {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <span className="loading loading-spinner loading-lg"></span>;
    </div>
  );
}
