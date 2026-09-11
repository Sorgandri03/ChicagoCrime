const BASE_URL = 'http://localhost:5000';

async function getBarData() {
  const url = BASE_URL + '/data?graph=bargraph';
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

async function getStackedAreaData() {
  const url = BASE_URL + '/data?graph=stackedarea';
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

async function getMapData() {
  const url = BASE_URL + '/data?graph=map';
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

async function getMdsData(metric = 'profile') {
  const url = `${BASE_URL}/data?graph=scatteredplot&metric=${metric}`;
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