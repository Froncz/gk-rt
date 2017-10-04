import React from 'react';
import { Circle } from 'rc-progress';

const CounterTimer = ({ finished, minutes, progress, seconds }) => {
  const fullCounter = finished || (minutes === 0 && seconds === 0)
  return (
    <div className="Counter__timer">
      <Circle
        percent={fullCounter ? 100 : progress * 100}
        strokeColor="#00759E"
        strokeLinecap="butt"
        strokeWidth="10"
        trailColor="#27303C"
        trailWidth="10"
      />
      <strong>
        {!fullCounter && [
          <span key="minutes">{minutes} min</span>,
          <span key="seconds">{seconds} sek</span>
        ]}
      </strong>
    </div>
  )
};

export default CounterTimer;
