import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';
import { getWeather } from './utils/axios';

/*
Note #7 make input controlled: 
	in React, all input field can be classified to two input type:
	controlled input and uncontrolled input

	uncontrolled input means that the updated state will not related to the input change. though the state is changed when onChange() in input trigger the change of state, will not change the state of inputfield. so the changed input value will store in the html input element, not stored in state. so if you want to get the value you have to use dom reference. React recommand to use controlled input. the reason shows below.
	
	In react, the app's state is a reflection of state！
	so we need to put input field of the searchig bar into state,
	that is, no matter what is inputed in the field, the state should reflect the updated input state. -> thus, it will be a controlled input field.

	first go to SearchingBar comp to let it receive props 
	-> then give input element a new prop: value = {props.searchValue}
	-> when we use this SearchingBar comp, pass the new prop: searchValue in the comp
	-> then we can get the value of searchValue from state: this.state.searchValue
	-> after that, we need to initalize this state in constructor
	(now the searchValue is '' and cannot change the inputfield now, so go to next step to change input value)

	secondly, we need to update state to make the searchingbar able to change input 
	-> go to SearchingBar comp to add an onChange() in input element.
	-> then we need to get back to App to pass a handleSearch fn into the onChange() to enable update state from child to parent
		-> define an event handler in App: handleSearchValueChange()
		-> do all logic in this event handler (will show how to do that later)
		-> add a fn prop in SearchingBar comp rendering to pass this fn from App to the child SearchingBar comp
		-> then just let onClick() to call this fn
	do the logic here. when you write the logic for onChange(), the event it recieves is a synthetic event - a wrapper of native html events. so how to get a inputfield value? Not use this.value, using event.target.value to get value. here event.target = this, means the inputfield you changed or the button you clicked. then this.setState to assign the changed value to searchValue.
	(now it works to change the value in inputfield, the work flow is as below:
	input 'cityName' in App inputfield -> handleSearchValueChange() will setState -> display 'cityName' on App
	so, next we need to fetch data from api to get date under this cityName)

	Thirdly, here the code logic is quite similar with the async-awaite fn - axios to get a propmise but not just data from brisbane, but from any cities in Australia. so the best practice is to new create a utils folder and then new file named axios.js under utils folder. This axios.js will be used to send api request and deal with the response. 
	->import axios in axios.js and write a getWeather(city) to use axios('url') return a promise and export this fn
	-> in App import {getWeather} and let async fn to call getWeather('Brisbane') to get response
	-> and the use the response to upadteWeather()

	Finally, when input a cityname and click the search-btn, it will trigger 
	-> add onClick() in search-btn in SearchingBar comp
	-> add a prop search in SearchingBar comp in App.js to pass a fn named search
	-> the search fn will get response by using getWeather(city) and updateWeather(response) to update weather data in CurrentWeather comp
	-> now need pass the state.searchValue into search() to get certain city's current weather data
	-> to make this fn async-await
	(to page check and inpect network to see whether send a request properly and see whether CurrenWeather comp display update properly)
	
	One more thing to do, go to SearchingBar comp, to add onKeyPress={searchOnEnter} and write a logic for searchOnEnter() to let you use key 'Enter' to trigger search().
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

	render() {
		return (
			<div className="weather-channel__container">
				<Header />
				<SearchingBar 
					search={this.search}
					searchValue={this.state.searchValue}
					handleSearchValueChange={this.handleSearchValueChange}
				/>
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
