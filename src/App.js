import React from 'react';
import axios from 'axios'; 
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';

/*
Note #5: make CurrentWeather component dynamic:
	In App comp, initial state for cityName(string) and current(object)
	-> fetch data from api and setState in DidMount in App comp
	-> add this two new state data in Main comp so that Main can pass props down to its child - CurrentWeather comp
	-> in CurrentWeather comp, receive props to get state data from Main comp
		-> render props.cityName and props.current (and three props in current object) on page 
*/


class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			forecasts: [],
			limit: 5,
			cityName: '',
			current: {},
		}
	}

	componentDidMount() {
		axios.get('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au')
			.then(response => {
				const data = response.data.data;
				const cityName = data.city.name;
				const current = data.current;
				const forecasts = data.forecast.slice(0, 10);
				this.setState({ cityName, current, forecasts });
			})
	}

	handleChangeLimit = limit => {
		this.setState({ limit });
	}

	render() {
		return (
			<div className="weather-channel__container">
				<Header />
				<SearchingBar />
				<Main
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
