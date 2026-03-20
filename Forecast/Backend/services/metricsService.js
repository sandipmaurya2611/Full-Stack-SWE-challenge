/**
 * Computes MAE, RMSE, Bias, and Confidence metrics from a timeseries.
 * @param {Array} timeseries [{ actual, forecast }]
 * @returns {Object} { mae, rmse, bias, confidence }
 */
export const calculateMetrics = (timeseries) => {
  if (!timeseries || timeseries.length === 0) {
    return {
      mae: 0,
      rmse: 0,
      bias: 0,
      confidence: 0,
    };
  }

  let totalAbsoluteError = 0;
  let totalSquareError = 0;
  let totalError = 0; // for bias
  let totalActual = 0;

  timeseries.forEach(({ actual, forecast }) => {
    const error = forecast - actual;
    
    totalAbsoluteError += Math.abs(error);
    totalSquareError += Math.pow(error, 2);
    totalError += error;
    totalActual += actual;
  });

  const n = timeseries.length;
  
  const mae = totalAbsoluteError / n;
  const rmse = Math.sqrt(totalSquareError / n);
  const bias = totalError / n;

  // Confidence Formula: Derived via Mean Absolute Percentage Error (MAPE)
  // Confidence = max(0, 100 - (MAE / MeanActual) * 100)
  // If actuals are zero, handling divide-by-zero safely
  const meanActual = totalActual / n;
  let confidence = 100;

  if (meanActual > 0) {
    const errorPercentage = (mae / meanActual) * 100;
    confidence = Math.max(0, 100 - errorPercentage);
  }

  return {
    mae: Number(mae.toFixed(2)),
    rmse: Number(rmse.toFixed(2)),
    bias: Number(bias.toFixed(2)),
    confidence: Number(confidence.toFixed(2)),
  };
};
