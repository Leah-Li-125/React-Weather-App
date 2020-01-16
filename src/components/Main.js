import React from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

function Main(props) {
    return(
        <main>
            <CurrentWeather />
            <WeatherForecast forecasts={props.forecasts}/>
        </main>
    );
}

export default Main;