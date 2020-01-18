import React from 'react';
import compass from '../assets/icons/icon-compass.png';
import umberella from '../assets/icons/icon-umberella.png';
import wind from '../assets/icons/icon-wind.png';

function CurrentWeather(props) {
    const { cityName, current, unit } = props;
    const tempHigh = unit === 'C' ? current.maxCelsius : current.maxFahrenheit;
    const rating = current.humidity > 60 ? 'Humid' : 'Clear';
    return (
        <section className="weather-condition">
            <div className="weather-condition__location">{cityName}</div>
        <div className="weather-condition__rating">{rating}</div>
            <div className="weather-condition__temp">{tempHigh} {unit}</div>
            <div className="weather-condition__desc">
                <div>
                    <img src={umberella} alt="i"/>
                    <span className="citem">{current.humidity}%</span>
                </div>
                <div>
                    <img src={wind} alt="i"/>
                    <span className="citem">{current.windSpeed} km/h</span>
                </div>
                <div>
                    <img src={compass} alt="i"/>
                    <span className="citem">{current.windDirection}</span>
                </div>
            </div>
        </section>
    );
}

export default CurrentWeather;