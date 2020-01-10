import React from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

function Main() {
    return(
        <main>
            <CurrentWeather />
            <WeatherForecast/>
        </main>
    );
}

export default Main;