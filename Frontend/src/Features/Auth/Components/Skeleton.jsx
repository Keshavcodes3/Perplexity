export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-6 max-w-3xl mx-auto p-6">
      
      {/* Search Bar */}
      <div className="h-12 border border-black rounded-lg"></div>

      {/* Result Block */}
      <div className="space-y-3">
        <div className="h-4 bg-black/10 rounded w-3/4"></div>
        <div className="h-4 bg-black/10 rounded w-full"></div>
        <div className="h-4 bg-black/10 rounded w-5/6"></div>
      </div>

      {/* Result Block */}
      <div className="space-y-3">
        <div className="h-4 bg-black/10 rounded w-2/3"></div>
        <div className="h-4 bg-black/10 rounded w-full"></div>
        <div className="h-4 bg-black/10 rounded w-4/5"></div>
      </div>

      {/* Result Block */}
      <div className="space-y-3">
        <div className="h-4 bg-black/10 rounded w-1/2"></div>
        <div className="h-4 bg-black/10 rounded w-full"></div>
        <div className="h-4 bg-black/10 rounded w-3/4"></div>
      </div>
    </div>
  );
}