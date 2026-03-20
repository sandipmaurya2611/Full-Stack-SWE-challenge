export default function CentralChart({ timeseries }) {
  if (!timeseries || timeseries.length === 0) {
    return (
      <section className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark flex flex-col gap-6">
        <h3 className="text-lg font-bold">Actual vs Forecast Wind Generation</h3>
        <div className="flex-1 flex items-center justify-center p-10 text-text-muted-light">
          No timeseries data available for this range.
        </div>
      </section>
    );
  }

  // Find max value to scale Y axis
  const maxVal = Math.max(...timeseries.map(d => Math.max(d.actual, d.forecast))) * 1.1;
  const n = timeseries.length;

  // Helper to get normalized coordinates
  const getX = (i) => n > 1 ? (i / (n - 1)) * 1000 : 500;
  const getY = (val) => 250 - (val / maxVal) * 250;

  // Generate paths
  const actualPath = timeseries.reduce((acc, d, i) => 
    acc + `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.actual)} `, "");
  
  const forecastPath = timeseries.reduce((acc, d, i) => 
    acc + `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.forecast)} `, "");


  return (
    <section className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border-light dark:border-border-dark flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold">Actual vs Forecast Wind Generation</h3>
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mt-1">Timeseries Analysis — UK National Level (MW)</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-border-light dark:border-border-dark">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
            <span className="text-[11px] font-bold text-text-muted-light dark:text-text-muted-dark">Actual (MW)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
            <span className="text-[11px] font-bold text-text-muted-light dark:text-text-muted-dark">Forecast (MW)</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[360px] relative mt-4">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
          <defs>
            <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#2463eb" stopOpacity="0.1"></stop>
              <stop offset="95%" stopColor="#2463eb" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <path d={actualPath} fill="none" stroke="#2463eb" strokeLinecap="round" strokeWidth="2.5"></path>
          <path d={forecastPath} fill="none" stroke="#16a34a" strokeDasharray="4,4" strokeLinecap="round" strokeWidth="2.5"></path>
          
          <g className="stroke-border-light dark:stroke-border-dark opacity-30" stroke="currentColor" strokeWidth="1">
            {[0, 0.25, 0.5, 0.75, 1].map(p => (
              <line key={p} x1="0" x2="1000" y1={250 * p} y2={250 * p}></line>
            ))}
          </g>
          
          <g className="text-[10px] fill-text-muted-light dark:fill-fill-text-muted-dark font-medium">
            <text x="0" y="285">{new Date(timeseries[0].time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</text>
            <text x="500" y="285">{new Date(timeseries[Math.floor(n/2)].time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</text>
            <text x="940" y="285">{new Date(timeseries[n-1].time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</text>
          </g>
        </svg>
      </div>
    </section>
  );
}

