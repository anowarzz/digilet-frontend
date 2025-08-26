import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  width?: string;
  height?: string;
  rounded?: string;
  lines?: number;
  lineWidth?: string;
  lineHeight?: string;
}

export function SkeletonCard({
  width = "250px",
  height = "125px",
  rounded = "xl",
  lines = 2,
  lineWidth = "250px",
  lineHeight = "16px",
}: SkeletonCardProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton
        style={{
          height,
          width,
          borderRadius:
            rounded === "xl"
              ? "0.75rem"
              : rounded === "md"
              ? "0.375rem"
              : rounded,
        }}
      />
      <div className="space-y-2">
        {[...Array(lines)].map((_, i) => (
          <Skeleton
            key={i}
            style={{
              height: lineHeight,
              width: lineWidth,
              borderRadius: "0.375rem",
            }}
          />
        ))}
      </div>
    </div>
  );
}
