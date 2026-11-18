export const TableSkeleton = () => {

   return (
    <div>
        <div className="h-9 w-full max-w-2xl animate-pulse rounded-md bg-muted"/>
            {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-md bg-muted/60"/>
          ))}
    </div>
   )

}