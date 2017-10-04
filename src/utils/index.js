export const getStorageTimes = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return JSON.parse(localStorage.getItem('counter_times'));
  }

  return null;
}

export const setStorageTimes = (startTime, endTime) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const newData = JSON.stringify({
      startTime,
      endTime
    });

    localStorage.setItem('counter_times', newData);
  }
}

export const getTimerData = (startTime, endTime, currentTime) => {
  const datesDiff =  parseInt((endTime - currentTime) / 1000, 10);
  const duration = endTime - startTime;
  let finished = false;

  if (endTime < currentTime) {
    finished = true;
  }

  const timerData = {
    minutes: finished ? 0 : Math.floor(datesDiff / 60),
    seconds: finished ? 0 : datesDiff % 60,
    progress: finished ? 100 : 1 - (endTime - currentTime) / duration,
    finished
  };

  return timerData;
}
