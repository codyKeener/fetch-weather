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
      console.warn('geo', geo);

      const payload = {
        lat: geo[0].lat,
        lon: geo[0].lon,
      };
      getWeather(payload).then((weather) => {
        console.warn('weather', weather);
        setWeatherText(
          <>
            <div style={{ marginBottom: '20px', border: '1px solid white', padding: '10px' }}>
              <h4>What&apos;s the Weather in {formInput.city}?</h4>
              <p>Current Temp: {weather[4].temp}&deg;F</p>
              <p>Current Weather: {weather[4].weather[0].description}</p>
            </div>
            <h5>Check the weather somewhere else</h5>
          </>,
        );
        setFormInput(initialState);
      });
    });
  };

  return (
    <>
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>{weatherText}</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FormLabel>
            <Form.Control as="textarea" placeholder="Country (two-letter country code)" style={{ minWidth: '600px' }} name="country" value={formInput.country} onChange={handleChange} required />
          </FormLabel>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FormLabel>
            <Form.Control as="textarea" placeholder="City" style={{ minWidth: '600px' }} name="city" value={formInput.city} onChange={handleChange} required />
          </FormLabel>
        </Form.Group>

        {formInput.country === 'US' ? (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FormLabel>
              <Form.Control as="textarea" placeholder="State (two-letter abbreviation)" style={{ minWidth: '600px' }} name="state" value={formInput.state} onChange={handleChange} />
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
