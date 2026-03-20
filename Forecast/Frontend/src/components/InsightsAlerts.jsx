export default function InsightsAlerts() {
  return (
    <section className="lg:col-span-1 flex flex-col gap-4">
      <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-border-light dark:border-border-dark flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">bolt</span>
            <h3 className="font-bold text-sm">Insights & Alerts</h3>
          </div>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">2 NEW</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-red-500 !text-sm">error</span>
              <span className="text-[11px] font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">Critical Bias</span>
            </div>
            <p className="text-[11px] text-red-800/80 dark:text-red-400/80 leading-snug">
              North Sea clusters showing &gt;15% negative bias over last 3 hours. Model drift suspected.
            </p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-amber-500 !text-sm">warning</span>
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Model Divergence</span>
            </div>
            <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 leading-snug">
              ECMWF and GFS outputs diverging significantly (+4.2 MW) for Horizon H+48.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-blue-500 !text-sm">info</span>
              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-400 uppercase tracking-wider">Optimization</span>
            </div>
            <p className="text-[11px] text-blue-800/80 dark:text-blue-400/80 leading-snug">
              Performance improved by 2.1% after atmospheric pressure parameter adjustment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
