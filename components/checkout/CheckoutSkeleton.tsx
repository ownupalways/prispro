export default function CheckoutSkeleton() {
  return (
    <div
      className="grid gap-8 lg:grid-cols-[1fr_380px]"
      aria-busy="true"
      aria-label="Loading checkout">
      <div className="space-y-4 rounded-lg border border-border bg-surface p-6">
        <div className="shimmer h-6 w-40 rounded" />
        <div className="shimmer h-10 rounded-md" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="shimmer h-10 rounded-md" />
          <div className="shimmer h-10 rounded-md" />
        </div>
        <div className="shimmer h-20 rounded-md" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="shimmer h-10 rounded-md" />
          <div className="shimmer h-10 rounded-md" />
        </div>
        <div className="shimmer h-12 rounded-md" />
      </div>

      <aside className="h-fit rounded-lg border border-border bg-surface p-6">
        <div className="shimmer mb-4 h-6 w-36 rounded" />

        <ul className="divide-y divide-border">
          {Array.from({ length: 3 }, (_, index) => (
            <li key={index} className="flex gap-3 py-3">
              <div className="shimmer aspect-[3/4] w-16 shrink-0 rounded" />
              <div className="flex-1 space-y-2">
                <div className="shimmer h-4 w-3/4 rounded" />
                <div className="shimmer h-3 w-1/3 rounded" />
              </div>
              <div className="shimmer h-4 w-16 rounded" />
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <div className="shimmer h-5 w-20 rounded" />
          <div className="shimmer h-5 w-24 rounded" />
        </div>
      </aside>
    </div>
  );
}
