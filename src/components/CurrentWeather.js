import React from 'react';
import compass from '../assets/icons/icon-compass.png';
import umberella from '../assets/icons/icon-umberella.png';
import wind from '../assets/icons/icon-wind.png';

function CurrentWeather() {
    return (
        <section className="weather-condition">
            <div className="weather-condition__location">Brisbane</div>
            <div className="weather-condition__rating">Clear</div>
            <div className="weather-condition__temp">19 c</div>
            <div className="weather-condition__desc">
                <div>
                    <img src={ umberella } alt="i"/>
                    <span className="citem">20%</span>
                </div>
                <div>
                    <img src={ wind } alt="i"/>
                    <span className="citem">3 km/h</span>
                </div>
                <div>
                    <img src={ compass } alt="i"/>
                    <span className="citem">NE</span>
                </div>
            </div>
        </section>
    );
}

export default CurrentWeather;