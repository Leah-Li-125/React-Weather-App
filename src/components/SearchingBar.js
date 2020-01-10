import React from 'react';

function SearchingBar() {
    const divFlex = {
        flex: 1
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
              className="fa fa-thermometer-empty temp-switch__icon"
              aria-hidden="true"
            ></i>
            <sup>&deg;</sup>C
          </button>
        </div>
      </nav>
    );
}

export default SearchingBar;