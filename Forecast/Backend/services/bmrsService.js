import axios from 'axios';

const BMRS_API_BASE = 'https://data.elexon.co.uk/bmrs/api/v1/datasets';

/**
 * Fetches actual wind generation data.
 * Uses settlementDate filter for accurate historical retrieval.
 */
export const fetchActualData = async (from, to) => {
  try {
    const fromDateObj = new Date(from);
    const toDateObj = new Date(to);
    
    const results = [];
    let currentFrom = new Date(fromDateObj);

    while (currentFrom < toDateObj) {
      let currentTo = new Date(currentFrom);
      currentTo.setDate(currentTo.getDate() + 5);
      if (currentTo > toDateObj) currentTo = toDateObj;

      const fDate = currentFrom.toISOString().split('T')[0];
      const tDate = currentTo.toISOString().split('T')[0];

      console.log(`BMRS Request (FUELHH chunk): ${fDate} to ${tDate}`);
      const { data } = await axios.get(`${BMRS_API_BASE}/FUELHH`, {
        params: { 
          fuelType: 'WIND', 
          settlementDateFrom: fDate, 
          settlementDateTo: tDate 
        },
      });
      if (data?.data) results.push(...data.data);

      currentFrom = currentTo;
    }

    return results;
  } catch (error) {
    const errorMsg = error.response ? `BMRS API Status ${error.response.status}` : error.message;
    console.error(`FUELHH Chunk Error: ${errorMsg}`);
    throw error;
  }
};


/**
 * Fetches forecast wind generation data.
 * Expand publication window to ensure we get forecasts for the requested startTime range.
 */
export const fetchForecastData = async (from, to) => {
  try {
    const fromDateObj = new Date(from);
    fromDateObj.setHours(fromDateObj.getHours() - 48); // wide window
    const toDateObj = new Date(to);

    const results = [];
    let currentFrom = new Date(fromDateObj);

    // BMRS often limits range to 7 days. We fetch in 5-day chunks to be safe.
    while (currentFrom < toDateObj) {
      let currentTo = new Date(currentFrom);
      currentTo.setDate(currentTo.getDate() + 5);
      if (currentTo > toDateObj) currentTo = toDateObj;

      const params = { 
        publishDateTimeFrom: currentFrom.toISOString(), 
        publishDateTimeTo: currentTo.toISOString() 
      };
      
      console.log(`BMRS Request (WINDFOR chunk): ${currentFrom.toISOString().split('T')[0]} to ${currentTo.toISOString().split('T')[0]}`);
      const { data } = await axios.get(`${BMRS_API_BASE}/WINDFOR`, { params });
      if (data?.data) results.push(...data.data);

      currentFrom = currentTo;
    }
    
    return results;
  } catch (error) {
    const errorMsg = error.response ? `BMRS API Status ${error.response.status}` : error.message;
    console.error(`WINDFOR Chunk Error: ${errorMsg}`);
    throw error;
  }
};
