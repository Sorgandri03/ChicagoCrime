const BASE_URL = 'http://localhost:5000';

async function getBarData() {
  const url = BASE_URL + '/data?graph=bargraph';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    for (const item of result) {
      if (item.crime.length > 15) {
        item.crime = item.crime.slice(0, 13) + '...';
      }
    }
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

export { getBarData, getStackedAreaData, getMapData };