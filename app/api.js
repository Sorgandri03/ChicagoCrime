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

export { getBarData };