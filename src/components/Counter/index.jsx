import React, { Component } from 'react';

import Controls from './Controls';
import CounterTimer from './CounterTimer';

import { getStorageTimes, setStorageTimes, getTimerData } from '../../utils';

import background from '../../images/background.png';
import zilean from '../../images/zilean.png';

import './index.scss';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: null,
      startTime: null,
      endTime: null,
      timerData: {
        minutes: 0,
        seconds: 0,
        finished: false,
        progress: 0
      }
    };
    this.counterTimeout = null;

    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.setupTimes = this.setupTimes.bind(this);
  }
  componentWillMount() {
    let storageTimes = getStorageTimes();

    if (storageTimes) {
      const { startTime, endTime } = storageTimes;
      this.setState({ startTime, endTime });
      this.counterTimeout = setTimeout(() => this.updateCurrentTime(), 500);
    } else {
      this.setupTimes();
    }
  }
  updateCurrentTime(minutes = 0) {
    if (minutes !== 0) {
      clearTimeout(this.counterTimeout);
    }

    const currentTime = new Date().getTime();
    const { startTime, endTime } = this.state;
    let newEndTime = endTime + minutes * 60 * 1000;

    const timerData = getTimerData(startTime, newEndTime, currentTime);

    if (!timerData.finished) {
      this.setState({ endTime: newEndTime, currentTime, timerData });
      this.counterTimeout = setTimeout(() => this.updateCurrentTime(), 500);
      setStorageTimes(startTime, newEndTime);
    } else {
      this.setState({ startTime: currentTime, endTime: currentTime, currentTime, timerData });
      setStorageTimes(currentTime, currentTime);
    }
  }
  setupTimes() {
    clearTimeout(this.counterTimeout);
    const currentTime = new Date().getTime();
    const startTime = currentTime;
    const endTime = currentTime + 30 * 60 * 1000;
    this.setState({ startTime, endTime, currentTime });
    setStorageTimes(startTime, endTime);
    this.counterTimeout = setTimeout(() => this.updateCurrentTime(), 500);
  }
  render() {
    const { startTime, endTime, currentTime, timerData } = this.state;

    return (
      <div className="Counter__wrapper">
        <div className="Counter">
          <div className="Counter__background">
            <img src={background} alt="" />
          </div>
          <div className="Counter__content">
            <img src={zilean} className="Counter__character" alt="" />
            <div className="Counter__text">
              Wszystkie miejsca zostały zajęte. Rozstrzygnięcie konkursu za:
            </div>
          </div>
          <CounterTimer {...timerData} />
          <img src={zilean} className="Counter__character--mobile" alt="" />
        </div>
        <Controls
          updateCurrentTime={this.updateCurrentTime}
          currentProgress={(currentTime - startTime) / 1000}
          duration={(endTime - startTime) / 60000}
          setupTimes={this.setupTimes}
        />
      </div>
    );
  }
}

export default Counter;
