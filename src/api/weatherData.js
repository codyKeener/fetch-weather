const endpoint = 'https://api.openweathermap.org/data/3.0/onecall';
// eslint-disable-next-line prefer-destructuring
const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// GET THE WEATHER FOR A SET OF COORDINATES
const getWeather = (geo) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}?lat=${geo.lat}&lon=${geo.lon}&appid=${key}&units=imperial`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export default getWeather;
