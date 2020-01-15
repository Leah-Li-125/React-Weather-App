import React from 'react';
import ForecastRow from './ForecastRow';
import axios from 'axios'; //#2
import { format } from 'date-fns'; //#2

// function WeatherForecast() {
//     return (
//         <section className="weather-forecast">
//             <div className="forecast__switch">
//                 <button className="forecast__switch_0 switch-active">5 items</button>
//                 <button className="forecast__switch_1">10 items</button>
//             </div>
//             <ForecastRow day="Fri" time="10:00" highTemp="19 c" lowTemp="8 c"/>
//             <ForecastRow day="Fri" time="13:00" highTemp="19 c" lowTemp="8 c"/>
//             <ForecastRow day="Fri" time="16:00" highTemp="19 c" lowTemp="8 c"/>
//         </section>
//     );
// }

/*
Note #1: how to render repeatedly and declaritivly? 
	(codes as below with comment #1)
	- iterate an array or anything iterable
	- for each data record, create component (pass data via props)
	- put each component in another array
	- embed created array of components in JSX
*/
/*
Note #2: Synchoronous Request Flow vs Async Request: (pre-knowledge of Promise)
	Sync Request Flow:
	   Browser make http request to server
		-> Wait server to process (browser blocked)
		-> Server sends response back
		-> Browser does full page refresh

	Async Request (Ajax):
	   - Not wait, trigger callback when data comes back
	   - Partial update without full page refresh
	   - can do some interactive tasks in on webpage before the data back
	   - the data you get back is small and light, like a json object
	   - in browser, it is supported via XMLHttpRequest
	   - how to use Ajax:
			eg: weatherRequest = new XMLHttpRequest()
				weatherRequest.onload = function(){...} //callback: do sth when get data back
				weatherRequest.open('GET', url)
				weatherRequest.send()
			-> quite complicated, need an easy way to deal with request sending
			so there are some libraries provide Ajax facility like jQuery before frontend framework like React appears.
	   - use jQuery library:
			$.get(url, {
				success: (data) => onSuccess(data),
				error: (error) => onError(error)
			})
			-> we just provide url and success and error callback pairs,
			and the library wiil call proper callback in different conditions
			but, it might cause callback hell as below:
			$.get(url, {
				success: (data) => {
					const url2 = data.url;
					$.get(url2, {
						success: (data) => {
							const url3 = data.url;
							$.get(url3, {
								success: (data) => {
								const url4 = data.url;
								...
									...
										...
								}, error: (error) => onError(error)
							})
						}, error: (error) => onError(error)
					})
				},
				error: (error) => onError(error)
			})
			->quite troublesome and if the ajax library has some bug to call callback fn 
			and then would cause trust issue with customers. your code might have nothing wrong 
			but the library you rely on might not, eventually you would lose trust of your customers

	All of the issues shown above make Promise appear!!
	- Promise is a build-in JS machanism
	- it will promise only call and resolve ONCE!
	- propmise only have following three status:
	   - pending (when new create a promise, then will become one of the two status below)
	   - fullfil or reject (wiil be one of these two but cannot get back to pending status)
			const promise = new Promise(        				//pending
				(resolve, reject) => {							
					setTimeout(() => resolve('hello'), 2000);		//resolve	
				}); 
			const promise = new Promise(        				//pending
				(resolve, reject) => {							
					setTimeout(() => reject('bye'), 2000);			//reject
			}); 
			promise.then(data => {					
				console.log('resolve: ', data)          	//will log resolve: hello after 2s
			})
			promise.then(data => {						
				console.log('reject: ', data)          		//will log reject: hello after 2s
			})
			promise.catch(data => {           //just catch error, but can return things to let the following .then to do        
				//...})				                        

		eg1: promiseGet(url)
				.then(data => {
					const url1 = data.url;
					return promiseGet(url1);
				})
				.catch(error => { 					//you can catch error anywhere you like, it will catch all erros from all .then before it.
					//... 
				})
				.then(data => {
					const url2 = data.url;
					return promiseGet(url2);
				})
				.then(data => {
					const url3 = data.url;
					return promiseGet(url3);
				})
				.then(data => {
					const url4 = data.url;
					...
				})...
					...
			    }).catch(error => { 					//you can catch error anywhere you like, it will catch all erros from all .then before it.
					//... 
				});
			-> do the same thing like the jQuery hell but quite easy to control callback,
			.then will only be run once, .catch return
	Here, we will not to write a promise by self, instead, to use some Propmise-based Ajax Library like axios
		- npm i axios
		- import axios
	then, we will use axios to send request to api, using real data to replace all the static data props of ForcastRow comp in its state array
	here need to use componentDidMount() to send api after 1st rendering.
	(codes as below with comment #2)
*/
class WeatherForecast extends React.Component {
	constructor(props) {
		super(props);
		/*
		#1. here initial state is an array consisting of objects wih properties, 
		like [{a:'',b:'',c:''},{a:'',b:'',c:''},{a:'',b:'',c:''}]
		when we use the state, we will map the array and each item in the array will be a ForecastRow comp, 
		and each row comp has different types of data, so make the row comp be an object with 4 key-value pairs properties
		*/
		this.state = {
			forecasts: []  //#2
			/*
			forecasts: [
				{
					day: 'Fri',
					high: '19 c',
					low: '8 c',
					time: '10:00',
				},
				{
					day: 'Sat',
					high: '19 c',
					low: '8 c',
					time: '14:00',
				},
				{
					day: 'Sun',
					high: '19 c',
					low: '8 c',
					time: '16:00',
				},
			],
			*/
		};
	}

	/*
	#2. 
	- after mounting, run axios.get(url), and it will return a promise. 
	(the url should be your server end deployment on heroku)
		axios.get('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au')
	- how to use the promise returned? .then(response => console.log(response))
	(now go to localhost3000 and inspect network XHR and wiil see there is a request and a response;
	and in inpect console, there is a data response object and you can just get 10 data items out of 40 as below:)
		.then(response => {
				const forecasts = response.data.data.forecast.slice(0, 10);
			})
	- then we need to use the data I got to form a new array and then use the array as a state array
	(before that, use console.log(forecasts) to check whether has already get the array,
	and find in console, there is an array with 10 items)
	- Firstly clear those static intial states in forecasts array and make the forecasts is an empty array;
	- Secondly, we go to rendering <ForecaseRow />: 
	  	replace .high / .low to .maxCelsius / minCelsius to match the key name with the data we got from api
	- Thirdly, we can do this.setState({forecasts}) in DidMount, 
	  	that is put the rawForecast items array we got into the initial state empry array - forecasts
	  (to see what happened on page now. degree data show as expected 
	  but the time show there are unique time stamp (ms counting from 1970/1/1,but here is in sec,so need times 1000)
	  so we need to use some way to transform the time format.
	  we also need to use the time stamp to calculate the forcast.day we need. )
	- Deal with day and time:
	 use a library called date-fns to transform time stamps to a normal format.
	 - install it and import it
	 - to use it:
	 	in DidMount, create a new varible const forecates = rawForecasts.map(rawForecast => { return {...rawForecast, day, time}} );
	 	then in the arrow fn in map(), add three consts: 
			const date = new Date(rawForecast.time * 1000)
			const day = format(date, 'EEE'); //date-fns
			const time = format(date, 'HH:mm'); //date-fns
	*/
	componentDidMount() {
		axios.get('https://jr-weather-api.herokuapp.com/api/weather?city=brisbane&cc=au')
			.then(response => {
				// console.log(response);
				const rawForecasts = response.data.data.forecast.slice(0, 10);
				// console.log(forecasts);
				const forecasts = rawForecasts.map(rawForecast => { 
					const date = new Date(rawForecast.time * 1000)
					const day = format(date, 'EEE');      //date-fns
					const time = format(date, 'HH:mm');   //date-fns
					return {
						...rawForecast, 
						day, 
						time
					}
				})
				this.setState({ forecasts });
			})
	}

	render() {
		return (
			<section className="weather-forecast">
				<div className="forecast__switch">
					<button className="forecast__switch_0 switch-active">5 items</button>
					<button className="forecast__switch_1">10 items</button>
				</div>

				
				{this.state.forecasts.map(forecast => (
				/*
				#1. 
				In render(), remember to put all JS into {}. outside of {} are all jxs.
				Here the arrow fn must return a react comp <ForecastRow />: 
				it is AN expression (will do function call job later) so can use the shorthand with no need of return()
				The output of the map() is an array, and each array element is a react comp - ForcastRow 
				which is an object including four types of props and a key prop

				Here is a best practice : 
				Give a key when use map to render more than one comps.
				Thus, will let react know the order of row comps to compare the old state and the new state of each row.
				If have id, use it as a key, here we create a unique key by combining day and time.
				And the key need to put each rendered comp.
					*/
					<ForecastRow							
                        key={forecast.day + forecast.time} 
						day={forecast.day}
						high={forecast.maxCelsius}  //#2 replace .high to .maxCelsius -> to match the key name with the data we got from api
						low={forecast.minCelsius}   //#2 replace .low to .minCelsius -> as above
						time={forecast.time}
					/>
				))}
			</section>
		);
	}
}
export default WeatherForecast;
