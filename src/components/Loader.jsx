const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-violet-400"></div>
      <p className="text-sm text-white/50">Loading...</p>
    </div>
  </div>
);

export default Loader;