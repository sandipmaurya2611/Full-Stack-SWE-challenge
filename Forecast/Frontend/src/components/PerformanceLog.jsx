export default function PerformanceLog({ timeseries }) {
  if (!timeseries || timeseries.length === 0) return null;

  // Show latest 10 logs
  const logs = [...timeseries].reverse().slice(0, 10).map(d => {
    const variance = d.forecast - d.actual;
    const variancePct = (variance / d.actual) * 100;
    return {
      timestamp: new Date(d.time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      station: "UK Grid",
      actual: `${d.actual} MW`,
      forecast: `${d.forecast} MW`,
      variance: `${variance > 0 ? '+' : ''}${variance.toFixed(1)} (${variancePct.toFixed(1)}%)`,
      isNegative: variancePct > 5, // Higher forecast than actual (negative performance)
      isPositive: variancePct < -5, // Lower forecast than actual
    }
  });

  return (
    <section className="lg:col-span-2">
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark h-full">
        <div className="p-5 border-b border-border-light dark:border-border-dark flex justify-between items-center">
          <h3 className="font-bold text-sm">Performance Logs (Latest 10)</h3>
          <button className="text-[11px] font-bold text-primary hover:underline cursor-pointer">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest font-bold border-b border-border-light dark:border-border-dark">
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Actual</th>
                <th className="px-5 py-3">Forecast</th>
                <th className="px-5 py-3 text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light dark:divide-border-dark">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3 text-[11px] font-medium">{log.timestamp}</td>
                  <td className="px-5 py-3 text-[11px] text-text-muted-light dark:text-text-muted-dark">{log.station}</td>
                  <td className="px-5 py-3 text-[11px] font-bold">{log.actual}</td>
                  <td className="px-5 py-3 text-[11px]">{log.forecast}</td>
                  <td className={`px-5 py-3 text-[11px] text-right font-bold ${
                    log.isNegative ? 'text-red-500' : 
                    log.isPositive ? 'text-secondary' : 
                    'text-text-muted-light dark:text-text-muted-dark'
                  }`}>
                    {log.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

