export default function SidebarItemListSkeleton() {
  return (
    <div className="flex grow flex-col space-y-6 overflow-auto px-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse w-full h-8 w-full shrink-0 rounded-md bg-background"
        />
      ))}
    </div>
  );
}
