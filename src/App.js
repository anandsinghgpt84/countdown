import React, { useState, useEffect } from 'react';
import './App.css';

function CountdownTimer() {
  const [time, setTime] = useState(120); // Initial time in seconds (2 minutes)
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdown;

    if (isRunning && time > 0) {
      countdown = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(countdown);
      setIsRunning(false);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime(300); // Reset the time to 2 minutes
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="timer-edit">
        <label>Set timer (seconds):</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value, 10))}
          disabled={isRunning}
        />
      </div>
    </div>
  );
}

export default CountdownTimer;
