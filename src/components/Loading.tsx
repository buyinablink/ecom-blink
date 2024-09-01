export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg shadow-primary/50 h-16 w-16" />
    </div>
  );
}
