import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FilterBar from "./FilterBar";
import MetricsCards from "./MetricsCards";
import CentralChart from "./CentralChart";
import InsightsAlerts from "./InsightsAlerts";
import PerformanceLog from "./PerformanceLog";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default filters: Past 30 days from today
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    horizon: 4
  });


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result } = await axios.get("http://localhost:5000/api/wind", {
        params: {
          startDate: new Date(filters.startDate).toISOString(),
          endDate: new Date(filters.endDate).toISOString(),
          horizon: filters.horizon
        }
      });
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.startDate, filters.endDate, filters.horizon]); // Auto-refresh when filters change


  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark min-h-screen antialiased flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <Header />

        <main className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
          {/* Filter Bar */}
          <FilterBar 
            filters={filters} 
            setFilters={setFilters} 
            onRefresh={fetchData} 
          />

          {loading && (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              Error: {error}
            </div>
          )}

          {!loading && !error && data && (
            <>
              {/* Metrics with Sparklines */}
              <MetricsCards metrics={data.metrics} />

              {/* Central Chart */}
              <CentralChart timeseries={data.timeseries} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Insights & Alerts */}
                <InsightsAlerts />

                {/* Performance Discrepancy Log */}
                <PerformanceLog timeseries={data.timeseries} />
              </div>
            </>
          )}

          {!loading && !error && data && data.timeseries.length === 0 && (
            <div className="text-center py-10 text-text-muted-light">
              No matching data found for the selected range and horizon. Try increasing the date range or decreasing the horizon.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

