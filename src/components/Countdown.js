import React, { useState, useEffect, useRef } from 'react'

let timeInterval

const format2digits = (number) => (
  number < 10 ? ('0' + number) : number
)

const convertDateForIos = (date) => {
  var arr = date.split(/[- :]/);
  date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
  return date;
}

const Countdown = ({ delta }) => {
  const [countTime, setCountTime] = useState('')
  let date = new Date()
  date.setHours(23,59,59,999)
  let countDownDate = date.getTime();
  let distance

  useInterval(() => {
    let now = new Date().getTime() + delta;

    distance = countDownDate - now;

    let hours = Math.floor(distance / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    setCountTime(format2digits(hours) + ":" + format2digits(minutes) + ":" + format2digits(seconds))

    if(distance <= 0) {
      setCountTime('00:00:00')
    }
  }, distance <= 0 ? null : 1000)

  return (
    <span className="countdown">
      <em>Làm mới sau</em>
      {countTime}
    </span>
  )
}

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Countdown