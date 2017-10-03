import React, { Component } from 'react';

import Controls from './Controls';
import CounterTimer from './CounterTimer';

import { changeCounterTime, restartTime, updateTime } from '../../utils';

import background from '../../images/background.png';
import zilean from '../../images/zilean.png';

import './index.scss';

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = { finished: false, timeLeft: null };
    this.counterInterval = null;

    this.updateTimeLeft = this.updateTimeLeft.bind(this);
    this.changeCounterTime = this.changeCounterTime.bind(this);
    this.restartTime = this.restartTime.bind(this);
  }
  componentWillMount() {
      this.updateTimeLeft(updateTime());
      this.counterInterval = setInterval(() => this.updateTimeLeft(updateTime()), 500);
  }
  componentWillUnmount() {
    clearInterval(this.counterInterval);
  }
  updateTimeLeft(timeLeft) {
    if (timeLeft.progress >= 1 || (timeLeft.minutes <= 0 && timeLeft.seconds <= 0)) {
      clearInterval(this.counterInterval);
      this.setState({ finished: true, timeLeft: null });
    } else {
      if (this.state.finished) {
        this.counterInterval = setInterval(() => this.updateTimeLeft(updateTime()), 500);
      }
      this.setState({ finished: false, timeLeft });
    }
  }
  changeCounterTime(minutes) {
    this.updateTimeLeft(changeCounterTime(minutes));
  }
  restartTime() {
    this.updateTimeLeft(restartTime());
  }
  render() {
    const { finished, timeLeft } = this.state;

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
          <CounterTimer
            finished={finished}
            minutes={timeLeft && timeLeft.minutes}
            progress={timeLeft && timeLeft.progress * 100}
            seconds={timeLeft && timeLeft.seconds}
          />
          <img src={zilean} className="Counter__character--mobile" alt="" />
        </div>
        <Controls
          changeCounterTime={this.changeCounterTime}
          duration={timeLeft && timeLeft.duration}
          restartTime={this.restartTime}
        />
      </div>
    );
  }
}

export default Counter;
