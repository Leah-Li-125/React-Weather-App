import React from 'react';

function SearchingBar(props) {
    const divFlex = {
        flex: 1
    }

    const searchOnEnter = event => {
        const isEnterPressed = event.key === 'Enter';
        if (isEnterPressed) props.search();
    }

    return (
        <nav>
        <div style={divFlex} >
            <input 
              onKeyPress={searchOnEnter}
              onChange={props.handleSearchValueChange} 
              value = {props.searchValue} 
              className="search-input" 
            />
            <button onClick={props.search} className="search-btn">
                <i className="fa fa-search"></i>
            </button>

            <button onClick={props.toggleUnit} className="temp-switch">
            <i
              className="fa fa-thermometer-empty temp-switch__icon"
              aria-hidden="true"
            ></i>
            <sup>&deg;</sup>{props.unit}
          </button>
        </div>
      </nav>
    );
}

export default SearchingBar;