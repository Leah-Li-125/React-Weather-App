import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import SearchingBar from './components/SearchingBar';

function App() {
  return (
		<div className="weather-channel__container">
			<Header />
			<SearchingBar />
			<Main />
			<Footer />
	  </div>
	);
}

export default App;
