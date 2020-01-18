import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';
import { getWeather } from './utils/axios';

/*
Note #8 make unit toggle work
	Firstly, initialize a state of unit to C, 
	and then pass this state down to Main and SearchingBar comps, then pass props.unit to WeatherForecast and CurrentWeather.
	Go to CurrentWeather comp, and destruct props object to get the key - unit: const { cityName, current, unit } = props,
	and then set a const tempHigh to get either maxCelsius or maxFahrenheit by using a condition to judge. 

	Secondly, add an event handler toggleUnit() to toggle unit when click the toggle C/F button.
	the logic here is just to setState from C to F or F to C 
	so just get the previous state by useing an arrow fn in setState and if the previous state is C, toggle to F, otherwise, toggle to C
	then pass this toggleUnit fn to the comp where the button will be clicked, that is SearchingBar.
	Go to SearchingBar comp, add an onClick() to temp-switch button and let the onClick to trigger props.toggleUnit straight away.
	now the temparature in currentWeather comp can toggle C to F and then F to C.
	
	Thirdly, we need to let the unit on the button to toggle as well.
	just pass props.unit to the button element's sup element: <sup>&deg;</sup>{props.unit}

	Finally, just let the toggle unit work in WeatherForecast just exactly same as the work done in CurrentWeather.
	detruct the props to get the unit key -> when do the map, set a const high and const low 
	and do the condition logic if it is C, get forecast.maxCelsius or minC, otherwise, forecast.maxFahrenheit or minF
	->pass the unit from WeatherForecast to ForecastRow and go to ForecastRow to add {props.unit} to display C or F.	
*/


class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			forecasts: [],
			limit: 5,
			cityName: '',
			current: {},
			searchValue: '',
			unit: 'C',
		}
	}

	async componentDidMount() {
		try {
			const response = await getWeather('Brisbane');
			this.updateWeather(response);
		} catch(err) {
			console.log(err);
		}
	}

	updateWeather = (response) => {
		const data = response.data.data;
		const cityName = data.city.name;
		const current = data.current;
		const forecasts = data.forecast.slice(0, 10);
		this.setState({ cityName, current, forecasts });
	}
	handleChangeLimit = limit => {
		this.setState({ limit });
	}

	handleSearchValueChange = event => {
		const value = event.target.value;
		this.setState({ searchValue: value });
	}

	search = async () => {
		const response = await getWeather(this.state.searchValue);
		this.updateWeather(response);
	}

	toggleUnit = () => {
		this.setState(state => ({unit: state.unit === 'C' ? 'F' : 'C'}));
	}
	render() {
		return (
			<div className="weather-channel__container">
				<Header />
				<SearchingBar 
					toggleUnit={this.toggleUnit}
					unit={this.state.unit}
					search={this.search}
					searchValue={this.state.searchValue}
					handleSearchValueChange={this.handleSearchValueChange}
				/>
				<Main
					unit={this.state.unit}
					forecasts={this.state.forecasts}
					handleChangeLimit={this.handleChangeLimit}
					limit={this.state.limit}
					cityName={this.state.cityName}
					current={this.state.current}
				/>
				<Footer />
			</div>
		)
	}
}


export default App;
