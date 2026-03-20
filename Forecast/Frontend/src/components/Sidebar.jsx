export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border-light dark:border-border-dark bg-white dark:bg-surface-dark flex-shrink-0 flex flex-col hidden lg:flex">
      <div className="h-16 flex items-center px-6 gap-3 border-b border-border-light dark:border-border-dark">
        <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center text-white">
          <span className="material-symbols-outlined !text-xl">air</span>
        </div>
        <span className="font-bold text-lg tracking-tight">WindPro</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium" href="#">
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span>Overview</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
          <span className="material-symbols-outlined text-xl">insights</span>
          <span>Analytics</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
          <span className="material-symbols-outlined text-xl">map</span>
          <span>Spatial Map</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
          <span className="material-symbols-outlined text-xl">history</span>
          <span>Historical Logs</span>
        </a>
        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">System</span>
        </div>
        <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors" href="#">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span>Configuration</span>
        </a>
      </nav>
      <div className="p-4 border-t border-border-light dark:border-border-dark">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Live System</span>
          </div>
          <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark leading-tight">
            Last updated: 10:15 AM<br />
            Status: Nominal
          </p>
        </div>
      </div>
    </aside>
  );
}
