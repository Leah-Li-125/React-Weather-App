import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';
import { getWeather } from './utils/axios';

/*
Note #1-#8 refer to step by step branch commits 	
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
