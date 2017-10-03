import React from 'react';
import { Circle } from 'rc-progress';

const CounterTimer = ({ finished, minutes, progress, seconds }) => (
  <div className="Counter__timer">
    <Circle
      percent={finished ? 100 : progress}
      strokeColor="#00759E"
      strokeLinecap="butt"
      strokeWidth="10"
      trailColor="#27303C"
      trailWidth="10"
    />
    <strong>
      {!finished && [
        <span key="minutes">{minutes} min</span>,
        <span key="seconds">{seconds} sek</span>
      ]}
    </strong>
  </div>
);

export default CounterTimer;
