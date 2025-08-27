import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  rows?: number;
  columns: Array<{
    header: string;
    width?: string;
  }>;
}

export function TableSkeleton({ rows = 5, columns }: TableSkeletonProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-2 sm:p-4 border border-gray-100 dark:border-gray-800 overflow-x-auto">
      <Table className="min-w-[500px]">
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={column.width ? column.width : ""}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card Skeleton */}
        <div className="relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
          <div className="relative p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Skeleton */}
              <div className="flex-shrink-0">
                <Skeleton className="w-24 h-24 rounded-full" />
              </div>
              <div className="flex-1 text-center md:text-left">
                {/* Name Skeleton */}
                <Skeleton className="h-8 w-48 mx-auto md:mx-0 mb-2" />
                {/* Wallet ID Skeleton */}
                <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
              </div>
              <div className="text-center md:text-right">
                {/* Balance Label Skeleton */}
                <Skeleton className="h-3 w-16 mb-1" />
                {/* Balance Amount Skeleton */}
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Card Skeleton */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border-0">
          <div className="p-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-16" />
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* Phone Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* NID Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>

              {/* Address Field */}
              <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
