import React from 'react';

import refresh from '../../images/refresh.svg';

const Controls = ({ changeCounterTime, duration, restartTime }) => (
  <div className="Counter__controls">
    <div className="Counter__duration">
      {duration / 60} minutes
    </div>
    <button
      onClick={() => changeCounterTime(-5)}
    >
      -5 min
    </button>
    <button
      onClick={() => changeCounterTime(-2)}
    >
      -2 min
    </button>
    <button
      onClick={() => restartTime()}
    >
      <img src={refresh} alt="refresh" />
    </button>
    <button
      onClick={() => changeCounterTime(2)}
    >
      +2 min
    </button>
    <button
      onClick={() => changeCounterTime(5)}
    >
      +5 min
    </button>
  </div>
);

export default Controls;
