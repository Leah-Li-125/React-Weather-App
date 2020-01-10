import React from 'react';
import ForecastRow from './ForecastRow';


function WeatherForecast() {
    return (
        <section className="weather-forecast">
            <div className="forecast__switch">
                <button className="forecast__switch_0 switch-active">5 items</button>
                <button className="forecast__switch_1">10 items</button>
            </div>
            <ForecastRow day="Fri" time="10:00" highTemp="19 c" lowTemp="8 c"/>
            <ForecastRow day="Fri" time="13:00" highTemp="19 c" lowTemp="8 c"/>
            <ForecastRow day="Fri" time="16:00" highTemp="19 c" lowTemp="8 c"/>
        </section>
    );
}

export default WeatherForecast;
