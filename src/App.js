import React from 'react';
import axios from 'axios'; 
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';

/*
Note #3: lift state up
	Since the WeatherForecasts comp and CurrentWeatehr are sibling children of Main comp, 
	and Main comp is sibling of SearchingBar comp.
	Children of Main comp and SearchingBar comp need the state data in forecasts array.
	so lift the state up and up again from WeatherForecasts to the App 
	so that he WeatherForecasts comp,CurrentWeatehr comp and SearchingBar all can get access to state.

*/
// function App() {
//   return (
// 		<div className="weather-channel__container">
// 			<Header />
// 			<SearchingBar />
// 			<Main />
// 			<Footer />
// 	  </div>
// 	);
// }

class App extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			forecasts: [] 
		}
	}

	componentDidMount() {
		axios.get('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au')
			.then(response => {
				const forecasts = response.data.data.forecast.slice(0, 10);
				
				this.setState({ forecasts });
			})
	}

	render() {
		return (
			<div className="weather-channel__container">
				<Header />
				<SearchingBar />
				<Main forecasts={this.state.forecasts}/>
				<Footer />
			</div>
		)
	}
}


export default App;
