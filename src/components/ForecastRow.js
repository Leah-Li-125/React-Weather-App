import React from 'react';

function ForecastRow(props) {
    return (
        <div className="weather-forecast__row">
            <span className="weather-forecast__day">{ props.day }</span>
            <span className="weather-forecast__icon">
                <i className="fa fa-clock-o"></i> { props.time }
            </span>
    <span className="weather-forecast__high">{ props.highTemp }</span>
    <span className="weather-forecast__low">{ props.lowTemp }</span>
      </div>
    );
}

export default ForecastRow;