export default function SidebarItemListSkeleton() {
  return (
    <div className="flex flex-1 flex-col space-y-4 overflow-auto px-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse h-6 w-full shrink-0 rounded-md bg-background"
        />
      ))}
    </div>
  );
}
