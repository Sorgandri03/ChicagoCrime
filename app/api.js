const BASE_URL = 'http://localhost:5000';

async function getBarData(filters = {}) {
  let url = BASE_URL + '/data?graph=bargraph';
  if (filters.community) {
    const commVal = Array.isArray(filters.community) ? filters.community.join(',') : filters.community;
    url += `&community=${encodeURIComponent(commVal)}`;
  }
  if (filters.startYear != null) {
    url += `&start_year=${encodeURIComponent(filters.startYear)}`;
  }
  if (filters.endYear != null) {
    url += `&end_year=${encodeURIComponent(filters.endYear)}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getStackedAreaData(filters = {}) {
  let url = BASE_URL + '/data?graph=stackedarea';
  if (filters.community) {
    const commVal = Array.isArray(filters.community) ? filters.community.join(',') : filters.community;
    url += `&community=${encodeURIComponent(commVal)}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getMapData(filters = {}) {
  let url = BASE_URL + '/data?graph=map';
  if (filters.crime) {
    url += `&crime=${encodeURIComponent(filters.crime)}`;
  }
  if (filters.startYear != null) {
    url += `&start_year=${encodeURIComponent(filters.startYear)}`;
  }
  if (filters.endYear != null) {
    url += `&end_year=${encodeURIComponent(filters.endYear)}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getMdsData(filters = {}) {
  const metric = typeof filters === 'string' ? filters : (filters.metric || 'profile');
  let url = `${BASE_URL}/data?graph=scatteredplot&metric=${metric}`;
  if (typeof filters === 'object') {
    if (filters.startYear != null) {
      url += `&start_year=${encodeURIComponent(filters.startYear)}`;
    }
    if (filters.endYear != null) {
      url += `&end_year=${encodeURIComponent(filters.endYear)}`;
    }
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching MDS data:', error.message);
  }
}

export { getBarData, getStackedAreaData, getMapData, getMdsData };