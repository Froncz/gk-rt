const getTimeLeft = (timerDate, currentDate) => {
  const datesDiff =  timerDate.endTime - currentDate;

  const timeLeft = {
    minutes: Math.floor(datesDiff / 60),
    seconds: datesDiff % 60,
    progress: 1 - (timerDate.endTime - currentDate) / timerDate.duration,
    duration: timerDate.duration
  };

  return timeLeft;
}

export const updateTime = () => {
  let currentDate = new Date();
  currentDate = Math.floor(currentDate.getTime() / 1000);

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    let timerDate = JSON.parse(localStorage.getItem('timer_date'));

    if (!timerDate) {
      const newDate = {
        endTime: currentDate + 30 * 60,
        duration: 30 * 60
      };
      localStorage.setItem('timer_date', JSON.stringify(newDate));
      timerDate = newDate;
    }

    return getTimeLeft(timerDate, currentDate);
  }

  return getTimeLeft({ endTime: currentDate, duration: 0 }, currentDate);
}

export const restartTime = () => {
  let currentDate = new Date();
  currentDate = Math.floor(currentDate.getTime() / 1000, 10);

  const newDate = {
    endTime: currentDate + 30 * 60,
    duration: 30 * 60
  };

  localStorage.setItem('timer_date', JSON.stringify(newDate));

  return getTimeLeft(newDate, currentDate);
}

export const changeCounterTime = (minutes) => {
  let timerDate = JSON.parse(localStorage.getItem('timer_date'));
  let currentDate = new Date();
  currentDate = Math.floor(currentDate.getTime() / 1000, 10);

  const newTime = timerDate.endTime + minutes * 60;
  const newDuration = timerDate.duration + minutes * 60;

  const newDate = currentDate <= newTime ? {
    endTime: newTime,
    duration: newDuration > 0 ? newDuration : 0
  } : {
    endTime: currentDate,
    duration: 0
  };

  localStorage.setItem('timer_date', JSON.stringify(newDate));
  return getTimeLeft(newDate, currentDate);
}
