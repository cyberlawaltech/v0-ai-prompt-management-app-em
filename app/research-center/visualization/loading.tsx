import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-10 w-[350px]" />
        <Skeleton className="h-4 w-[450px]" />
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Skeleton className="h-10 w-[400px]" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
          ))}
      </div>

      <Skeleton className="h-[450px] w-full rounded-lg" />
    </div>
  )
}
