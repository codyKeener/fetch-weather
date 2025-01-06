// import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, FormLabel, Form } from 'react-bootstrap';
import getCoordinates from '../../api/geoData';
import getWeather from '../../api/weatherData';

const initialState = {
  city: '',
  state: '',
  country: '',
};

export default function WeatherForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [weatherText, setWeatherText] = useState(<h4>What&apos;s the Weather?</h4>);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getCoordinates(formInput).then((geo) => {
      if (geo.length === 0) {
        window.confirm('Location not found. Check your country/state code and city spelling.');
        throw new Error('Location not found. Check your country/state code and city spelling.');
      }
      const payload = {
        lat: geo[0].lat,
        lon: geo[0].lon,
      };
      getWeather(payload).then((weather) => {
        setWeatherText(
          <>
            <div style={{ marginBottom: '20px', border: '1px solid white', borderRadius: '10px', padding: '10px' }}>
              <h4 style={{ marginBottom: '15px' }}>What&apos;s the Weather in {formInput.city}?</h4>
              <p style={{ marginBottom: '0px' }}>
                <strong>Current temp: </strong>
                {weather[4].temp}&deg;F
              </p>
              <p style={{ marginTop: '10px', marginBottom: '0px' }}>
                <strong>Current conditions: </strong>
                {weather[4].weather[0].description}
              </p>
            </div>
            <h5>Check the weather somewhere else</h5>
          </>,
        );
        setFormInput(initialState);

        const mainDiv = document.getElementById('main-app');

        if (weather[4].weather[0].main === 'Thunderstorm') {
          mainDiv.className = '';
          mainDiv.classList.add('thunderstorm');
        } else if (weather[4].weather[0].main === 'Drizzle') {
          mainDiv.className = '';
          mainDiv.classList.add('drizzle');
        } else if (weather[4].weather[0].main === 'Rain') {
          mainDiv.className = '';
          mainDiv.classList.add('rain');
        } else if (weather[4].weather[0].main === 'Snow') {
          mainDiv.className = '';
          mainDiv.classList.add('snow');
        } else if (weather[4].weather[0].main === 'Atmosphere') {
          mainDiv.className = '';
          mainDiv.classList.add('hazy');
        } else if (weather[4].weather[0].main === 'Clear') {
          mainDiv.className = '';
          mainDiv.classList.add('clear');
        } else if (weather[4].weather[0].description === 'overcast clouds') {
          mainDiv.className = '';
          mainDiv.classList.add('overcast');
        } else if (weather[4].weather[0].main === 'Clouds') {
          mainDiv.className = '';
          mainDiv.classList.add('scattered-clouds');
        }
      });
    });
  };

  return (
    <>
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>{weatherText}</div>
      <Form onSubmit={handleSubmit}>
        {/* THIS LINE MAKES THE FORM SUBMITTABLE BY PRESSING THE ENTER/RETURN KEY */}
        <input type="submit" hidden />

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FormLabel>
            <Form.Control type="text" placeholder="Country (two- or three-letter country code)" style={{ height: '50px', minWidth: '600px' }} name="country" value={formInput.country} onChange={handleChange} maxLength={3} required />
          </FormLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FormLabel>
            <Form.Control type="text" placeholder="City" style={{ height: '50px', minWidth: '600px' }} name="city" value={formInput.city} onChange={handleChange} required />
          </FormLabel>
        </Form.Group>

        {formInput.country === 'US' ? (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FormLabel>
              <Form.Control type="text" placeholder="State (two-letter abbreviation)" style={{ height: '50px', minWidth: '600px' }} name="state" value={formInput.state} onChange={handleChange} maxLength={2} />
            </FormLabel>
          </Form.Group>
        ) : (
          ''
        )}

        {/* SUBMIT BUTTON  */}
        <Button type="submit">Get the Weather</Button>
      </Form>
    </>
  );
}

// WeatherForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
