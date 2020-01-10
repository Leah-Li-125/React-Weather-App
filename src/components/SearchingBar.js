import React from 'react';

function SearchingBar() {
    const divFlex = {
        flex: 1
    }
    const buttonStyle = {
        paddingRight: '5px'
    }
    return (
        <nav>
        <div style={ divFlex } >
            <input className="search-input" />
            <button className="search-btn">
                <i className="fa fa-search"></i>
            </button>

            <button className="temp-switch">
            <i
              className="fa fa-thermometer-empty"
              aria-hidden="true"
              style={ buttonStyle } 
            ></i>
            <sup>&deg;</sup>C
          </button>
        </div>
      </nav>
    );
}

export default SearchingBar;