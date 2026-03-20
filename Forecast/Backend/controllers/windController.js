import { fetchActualData, fetchForecastData } from '../services/bmrsService.js';
import { processDatasets } from '../services/processingService.js';
import { calculateMetrics } from '../services/metricsService.js';
import { cache } from '../utils/cache.js';

/**
 * Handles GET /api/wind
 */
export const getWindAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, horizon } = req.query;
    const minHorizon = Number(horizon) || 0;

    // Default dates if omitted: Jan 2025
    let fromDate = new Date("2025-01-01");
    let toDate = new Date("2025-01-07");

    if (startDate) fromDate = new Date(startDate);
    if (endDate) toDate = new Date(endDate);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Please use ISO 8601 strings." });
    }

    const fromISO = fromDate.toISOString();
    const toISO = toDate.toISOString();

    const cacheKey = `wind_${fromISO}_${toISO}_h${minHorizon}`;

    if (cache.has(cacheKey)) {
      console.log('Serving from cache:', cacheKey);
      return res.status(200).json(cache.get(cacheKey));
    }

    console.log(`Fetching BMRS datasets from ${fromISO} to ${toISO} (minHorizon: ${minHorizon})...`);

    // 1. Fetch Parallel Data
    const [actuals, forecasts] = await Promise.all([
      fetchActualData(fromISO, toISO),
      fetchForecastData(fromISO, toISO),
    ]);

    console.log(`BMRS Raw Output: actuals=${actuals.length}, forecasts=${forecasts.length}`);


    console.log(`BMRS Raw: actuals=${actuals.length}, forecasts=${forecasts.length}`);

    // 2. Process & Merge Data
    const timeseries = processDatasets(actuals, forecasts, minHorizon);
    console.log(`Merged Timeseries: ${timeseries.length} points`);

    // 3. Compute Metrics

    const metrics = calculateMetrics(timeseries);

    // 4. Send Response
    const responsePayload = {
      metrics,
      timeseries,
    };

    cache.set(cacheKey, responsePayload);

    return res.status(200).json(responsePayload);
  } catch (error) {
    next(error);
  }
};
