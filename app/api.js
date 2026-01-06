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
      if (item.crime === "DOMESTIC VIOLENCE") {
        const filtered = result.filter(r => r.crime !== "DOMESTIC VIOLENCE");
        result.splice(0, result.length, ...filtered);
        break;
      }
      if (item.crime.length > 15) {
        item.crime = item.crime.slice(0, 13) + '...';
      }
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export { getBarData };