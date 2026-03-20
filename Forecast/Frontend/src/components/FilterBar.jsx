export default function FilterBar({ filters, setFilters, onRefresh }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase">Date Start</label>
        <div className="flex items-center gap-2">
          <input 
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="flex-1 text-xs rounded-lg border-border-light dark:border-border-dark bg-slate-50 dark:bg-background-dark py-1.5 px-2" 
            type="date" 
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase">Date End</label>
        <div className="flex items-center gap-2">
          <input 
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="flex-1 text-xs rounded-lg border-border-light dark:border-border-dark bg-slate-50 dark:bg-background-dark py-1.5 px-2" 
            type="date" 
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase">Forecast Offset (Horizon: {filters.horizon}h)</label>
        </div>
        <input 
          name="horizon"
          min="0"
          max="48"
          value={filters.horizon}
          onChange={handleChange}
          className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary mt-2" 
          type="range" 
        />
      </div>
      <div className="flex items-end">
        <button 
          onClick={onRefresh}
          className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
        >
          Refresh Dataset
        </button>
      </div>
    </section>
  );
}

