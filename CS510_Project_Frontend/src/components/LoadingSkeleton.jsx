export function ProductGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="glass-panel animate-pulse overflow-hidden rounded-lg">
          <div className="aspect-[4/3] bg-white/10" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="glass-panel h-[420px] animate-pulse rounded-lg" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-panel h-80 animate-pulse rounded-lg" />
        <div className="glass-panel h-80 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
