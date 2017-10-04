import React from 'react';

import refresh from '../../images/refresh.svg';

const Controls = ({ updateCurrentTime, currentProgress, duration, setupTimes }) => {
  const progressMinutes = Math.floor(currentProgress / 60);
  const progressSeconds = Math.floor(currentProgress % 60);
  return (
    <div className="Counter__controls">
      {currentProgress >= 0 && (
        <div className="Counter__duration">
          {progressMinutes}:{`${progressSeconds < 10 ? '0' : ''}${progressSeconds}`} / {duration}:00
        </div>
      )}
      <button
        onClick={() => updateCurrentTime(-5)}
      >
        -5 min
      </button>
      <button
        onClick={() => updateCurrentTime(-2)}
      >
        -2 min
      </button>
      <button
        onClick={() => setupTimes()}
      >
        <img src={refresh} alt="refresh" />
      </button>
      <button
        onClick={() => updateCurrentTime(2)}
      >
        +2 min
      </button>
      <button
        onClick={() => updateCurrentTime(5)}
      >
        +5 min
      </button>
    </div>
  )
};

export default Controls;
