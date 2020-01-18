import React from 'react';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

function Main(props) {
    return(
        <main>
            <CurrentWeather
                unit={props.unit}
				cityName={props.cityName}
				current={props.current}
			/>
            <WeatherForecast 
                unit={props.unit}
                forecasts={props.forecasts}
				handleChangeLimit={props.handleChangeLimit}
				limit={props.limit}
            />
        </main>
    );
}

export default Main;