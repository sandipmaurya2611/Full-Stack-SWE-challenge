/**
 * Filters and merges actual and forecast datasets by startTime.
 * @param {Array} actuals - Raw actual generation data
 * @param {Array} forecasts - Raw forecast generation data
 * @param {number} minHorizon - Minimum horizon in hours (offset from target time)
 * @returns {Array} List of matching { time (startTime), actual, forecast }
 */
export const processDatasets = (actuals, forecasts, minHorizon = 4) => {
  const JAN_01_2025 = new Date('2025-01-01T00:00:00Z').getTime();

  // 1. Filter out null/undefined generation & older than Jan 2025
  const validActuals = actuals.filter((item) => {
    const time = new Date(item.startTime).getTime();
    return item.generation != null && time >= JAN_01_2025;
  });

  const validForecasts = forecasts.filter((item) => {
    const sTime = new Date(item.startTime).getTime();
    if (item.generation == null || sTime < JAN_01_2025) return false;

    // Check forecast horizon (between minHorizon and 48 hours)
    const pTime = new Date(item.publishTime).getTime();
    if (isNaN(pTime)) return false; // Must have publish time to verify horizon
    
    const horizonMs = sTime - pTime;
    const horizonHrs = horizonMs / (1000 * 60 * 60);

    return horizonHrs >= minHorizon && horizonHrs <= 48;
  });


  // 2. Map actuals by startTime for O(1) merge
  const actualsMap = new Map();
  validActuals.forEach((item) => {
    actualsMap.set(item.startTime, item.generation);
  });

  // 3. Map forecasts, grouping them or keeping the latest published up to 48 hrs?
  // Since we could have multiple forecasts for the same startTime but different horizons (e.g. H+24, H+36),
  // we'll keep the closest forecast (horizon > 0) or simply the one nearest to publishing.
  // The prompt says "Merge datasets by startTime". If multiple forecasts exist for a startTime, let's take the latest (smallest horizon).
  const forecastMap = new Map();
  validForecasts.forEach((item) => {
    const existing = forecastMap.get(item.startTime);
    const horizon = new Date(item.startTime).getTime() - new Date(item.publishTime).getTime();
    
    if (!existing || horizon < existing.horizon) {
      forecastMap.set(item.startTime, { generation: item.generation, horizon });
    }
  });

  // 4. Merge datasets where BOTH exist
  const merged = [];
  actualsMap.forEach((actualGen, startTime) => {
    if (forecastMap.has(startTime)) {
      merged.push({
        time: startTime,
        actual: Number(actualGen),
        forecast: Number(forecastMap.get(startTime).generation),
      });
    }
  });

  // 5. Sort chronologically
  return merged.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};
