export const DetailSkeleton = () => {
  return (
    <div className="space-y-4">
        <div className="h-10 w-80 animate-pulse rounded-md bg-muted" />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="h-64 animate-pulse rounded-xl bg-muted/60 lg:col-span-2" />
            <div className="h-64 animate-pulse rounded-xl bg-muted/60" />
          </div>
    </div>
  );
};