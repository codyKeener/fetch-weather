const endpoint = 'https://api.openweathermap.org/geo/1.0/direct';
const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// GET LONGITUDE AND LATTITUDE COORDINATES FROM A CITY/STATE
const getCoordinates = (geo) =>
  new Promise((resolve, reject) => {
    if (geo.state !== '') {
      fetch(`${endpoint}?q=${geo.city},${geo.state},${geo.country}&limit=1&appid=${key}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => resolve(Object.values(data)))
        .catch(reject);
    } else {
      fetch(`${endpoint}?q=${geo.city},${geo.country}&limit=1&appid=${key}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => resolve(Object.values(data)))
        .catch(reject);
    }
  });

export default getCoordinates;
