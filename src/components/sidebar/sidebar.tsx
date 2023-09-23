export default function Sidebar({
  className,
  children,
}: {
  className?: string;
  children?: any;
}) {
  return (
    <aside
      className={` blur-9.8 border-opacity-45 flex w-1/4 flex-col justify-start gap-10  border  bg-white/70 px-4 backdrop-blur-lg ${className}`}
    >
      {children}
    </aside>
  );
}
