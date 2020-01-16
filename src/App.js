import React from 'react';
import axios from 'axios'; 
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';

/*
Note #6: Promise: write async like sync:
	Advantage of Promise:
		Promise can assure that your callback will only be called once and the status after resolving will never be changed.
	Disadvantage of Promise:
		axios('url') returns a promise, and use .then(callback fn) to do the following tasks. It is async code, instead of a sync code(from top to bottom, execute code line by line). so the callback fn in .then() will be register first and then it has to wait to run until the axios() request is fullfiled. So it looks like an async code and it will be execute in an async way.

	Using async-await to write it sync!
		async componentDidMount() {
			try {
				const response = await axios('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au');
				const data = response.data.data;
				const cityName = data.city.name;
				const current = data.current;
				const forecasts = data.forecast.slice(0, 10);
				this.setState({ cityName, current, forecasts });
			} catch(err) {
				console.log(err);
			}
		}
	Notes:
		- give axios('url') a varible name and put it before all the other varibles and then the code looks like sync now.
		- write async before React function name AND write await before  axios('url'). async and await must appear as a pair
		- await here means it will wait the propmise a little while until it resolved and after it resolved the code will continue executing
		- class method: async componentDidMount() {}
		  normal function: async function test() {}
		  arrow function: const test = async () => {}
		- how to handle error? 
			try {//your promise} catch(err) {//handle error method}
		  But remember, if you only put your propmise code line in try{}, const response will be restricted in the try{} block and cannot be accessed by the code lines below. so put all code lines into try{//all your codes in this fn} and catch(err) afterwards
		- some drawbacks of async-await:
			- once you add async before a fn name, the fn will return a promise and the output wiil be the promise resolved value, then if the fn will be called, they can not get this fn's returned value straigt away, instead they have to use await before the place you want to get the value returned from this fn. thus, you have to asyn that fn who called your first async fn to get value. eventually, you have to write async-await for all fn until the toppest fn apprear.
			- so if that is a fn you create, it is better to use .then - the async way to write your promise code:
				axios('https://jr-weather-api.herokuapp.com/api/weather?cc=au&city=brisbane')
				.then(res => {
					const forecasts = res.data.data.forecast.slice(0, 10);
					this.setState({ forecasts });
					const data = res.data.data;
					const cityName = data.city.name;
					const current = data.current;
					const forecasts = data.forecast.slice(0, 10);
					this.setState({ cityName, current, forecasts });
				});
		  	- here componentDidMount() is a react fn, so just put async before it will make it an async fn with no concern about all async-await way up because React has already dealt with this case.As long as there is no erro thown by React, you can just use async-await here to write the async like sync. howerver, if it is a fn you create, you have to use .then to stop it.
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

	async componentDidMount() {
		try {
			const response = await axios('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au');
			const data = response.data.data;
			const cityName = data.city.name;
			const current = data.current;
			const forecasts = data.forecast.slice(0, 10);
			this.setState({ cityName, current, forecasts });
		} catch(err) {
			console.log(err);
		}
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
