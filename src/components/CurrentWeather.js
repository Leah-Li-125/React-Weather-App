import React from 'react';
import compass from '../assets/icons/icon-compass.png';
import umberella from '../assets/icons/icon-umberella.png';
import wind from '../assets/icons/icon-wind.png';

function CurrentWeather(props) {
    return (
        <section className="weather-condition">
            <div className="weather-condition__location">{props.cityName}</div>
            <div className="weather-condition__rating">Clear</div>
			<div className="weather-condition__temp">{props.current.maxCelsius} c</div>
            <div className="weather-condition__desc">
                <div>
                    <img src={umberella} alt="i"/>
                    <span className="citem">{props.current.humidity}%</span>
                </div>
                <div>
                    <img src={wind} alt="i"/>
                    <span className="citem">{props.current.windSpeed} km/h</span>
                </div>
                <div>
                    <img src={compass} alt="i"/>
                    <span className="citem">{props.current.windDirection}</span>
                </div>
            </div>
        </section>
    );
}

export default CurrentWeather;