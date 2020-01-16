import React from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

function Main(props) {
    return(
        <main>
            <CurrentWeather />
            <WeatherForecast 
                forecasts={props.forecasts}
				handleChangeLimit={props.handleChangeLimit}
				limit={props.limit}
            />
        </main>
    );
}

export default Main;