let cachedResult = {};

// Temp hack to get around WP Engine / Netlify build issues with 504 timeouts

export async function requestCachedData(request, cacheKey) {
  // Check if the result is cached and the specified interval has not passed

  if (!cachedResult[cacheKey]) {
    cachedResult[cacheKey] = {
      data: undefined,
      time: 0,
    };
  }

  if (cachedResult[cacheKey].data && Date.now() - cachedResult[cacheKey].time < 60000) {
    return cachedResult[cacheKey].data;
  }

  // Perform the asynchronous operation (replace with your own async logic)
  const result = await request;

  // Cache the result and update the last fetch time
  cachedResult[cacheKey].data = result;
  cachedResult[cacheKey].time = Date.now();

  return result;
}
