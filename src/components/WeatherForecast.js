import React from 'react';
import ForecastRow from './ForecastRow';
import { format } from 'date-fns';
class WeatherForecast extends React.Component {

	render() {
		const { limit, unit } = this.props;
		const forecasts = this.props.forecasts.slice(0, limit);

		return (
			<section className="weather-forecast">
				<div className="forecast__switch">
					<button
						className={`forecast__switch_0${limit === 5 ? ' switch-active' : ''}`}
						onClick={() => this.props.handleChangeLimit(5)}
					>
						5 items
					</button>
					<button 
						className={`forecast__switch_1${limit === 10 ? ' switch-active' : ''}`}
						onClick={() => this.props.handleChangeLimit(10)}
					>
						10 items
					</button>
				</div>
				
				{forecasts.map(forecast => {
					const date = new Date(forecast.time * 1000);
					const day = format(date, 'EEE'); 
					const time = format(date, 'HH:mm');   
					const high = unit ==='C' ? forecast.maxCelsius : forecast.maxFahrenheit;
					const low = unit ==='C' ? forecast.minCelsius : forecast.minFahrenheit;

					return (
						<ForecastRow
							unit={unit}							
							key={forecast.time} 
							day={day}
							high={high}  
							low={low} 
							time={time}
						/>
					);
				})}
			</section>
		);
	}
}
export default WeatherForecast;
