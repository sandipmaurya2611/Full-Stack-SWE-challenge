export default function Header() {
  return (
    <header className="h-16 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md sticky top-0 z-10 border-b border-border-light dark:border-border-dark flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold text-text-main-light dark:text-text-main-dark">Dashboard / Forecast Analysis</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark">
          <span className="text-xs font-medium text-text-muted-light dark:text-text-muted-dark">Model:</span>
          <span className="text-xs font-bold text-primary">ECMWF v4.2</span>
        </div>
        <button className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
          JD
        </div>
      </div>
    </header>
  );
}
