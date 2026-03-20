import NodeCache from 'node-cache';
// StdTTL is 1800 seconds (30 mins), checkperiod is 300 seconds
export const cache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });
