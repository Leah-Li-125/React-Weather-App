import React from 'react';
import axios from 'axios'; 
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';

/*
Note #4: make item limit button work
	initial limit state in App comp
	-> create a handleChangeLimit fn to setState in App comp
	-> pass a fn handleChangeLimit as well as a varible limit to update state in WeatherForecast comp in Main
		->add onClick() for item buttons in WeatherForecast compa and put callbank fn handleChangeLimit(limit) in onClick()
*/


class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			forecasts: [],
			limit: 5,
		}
	}

	componentDidMount() {
		axios.get('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au')
			.then(response => {
				const forecasts = response.data.data.forecast.slice(0, 10);
				
				this.setState({ forecasts });
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
				/>
				<Footer />
			</div>
		)
	}
}


export default App;
