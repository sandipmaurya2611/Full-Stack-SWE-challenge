function MetricCard({ title, value, percentage, isPositive, barColors }) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-border-light dark:border-border-dark shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">{title}</span>
        <span className={`text-[10px] font-bold ${isPositive ? 'text-secondary bg-secondary/10' : 'text-red-500 bg-red-500/10'} px-1.5 py-0.5 rounded`}>
          {percentage}
        </span>
      </div>
      <div className="text-2xl font-bold leading-tight">{value}</div>
      <div className="mt-4 h-8 w-full flex items-end gap-[2px]">
        {barColors.map((color, index) => (
          <div key={index} className={`flex-1 ${color} rounded-t-sm`} style={{ height: `${20 + (index * 10) % 80}%` }}></div>
        ))}
      </div>
    </div>
  );
}

export default function MetricsCards({ metrics }) {
  if (!metrics) return null;

  const primaryBars = [
    'bg-primary/20', 'bg-primary/20', 'bg-primary/40', 'bg-primary/20',
    'bg-primary/30', 'bg-primary/50', 'bg-primary/30', 'bg-primary/60', 'bg-primary'
  ];
  const dangerBars = [
    'bg-red-500/20', 'bg-red-500/20', 'bg-red-500/40', 'bg-red-500/20',
    'bg-red-500/30', 'bg-red-500/50', 'bg-red-500/30', 'bg-red-500/60', 'bg-red-500'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="MAE (MW)"
        value={metrics.mae}
        percentage={`${metrics.mae > 500 ? '+' : '-'}${Math.floor(Math.random() * 5)}%`} // dummy relative trend
        isPositive={metrics.mae < 1000}
        barColors={primaryBars}
      />
      <MetricCard
        title="Bias (MW)"
        value={metrics.bias}
        percentage={`${metrics.bias > 0 ? '+' : ''}${metrics.bias.toFixed(1)}`}
        isPositive={Math.abs(metrics.bias) < 200}
        barColors={dangerBars}
      />
      <MetricCard
        title="RMSE"
        value={metrics.rmse}
        percentage="-5.4%"
        isPositive={true}
        barColors={primaryBars}
      />
      <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-border-light dark:border-border-dark shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">Model Confidence</span>
          <span className={`text-[10px] font-bold ${metrics.confidence > 80 ? 'text-secondary bg-secondary/10' : 'text-amber-500 bg-amber-500/10'} px-1.5 py-0.5 rounded`}>
            {metrics.confidence > 80 ? 'High' : 'Normal'}
          </span>
        </div>
        <div className="text-2xl font-bold leading-tight">{metrics.confidence}%</div>
        <div className="mt-4 h-8 w-full flex items-end gap-[2px]">
          <div className="h-full flex-1 bg-secondary/20 rounded-t-sm"></div>
          <div className="h-full flex-1 bg-secondary/30 rounded-t-sm"></div>
          <div className="h-full flex-1 bg-secondary/40 rounded-t-sm"></div>
          <div className="h-full flex-1 bg-secondary/50 rounded-t-sm"></div>
          <div className="h-[95%] flex-1 bg-secondary/60 rounded-t-sm"></div>
          <div className="h-[96%] flex-1 bg-secondary/70 rounded-t-sm"></div>
          <div className="h-[94%] flex-1 bg-secondary/80 rounded-t-sm"></div>
          <div className="h-[95%] flex-1 bg-secondary/90 rounded-t-sm"></div>
          <div className="h-[94%] flex-1 bg-secondary rounded-t-sm"></div>
        </div>
      </div>
    </div>
  );
}

