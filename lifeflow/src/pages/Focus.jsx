import { useEffect, useState } from "react";
import "./Focus.css";

const focusTimes = [
  { label: "15 min", seconds: 15 * 60 },
  { label: "25 min", seconds: 25 * 60 },
  { label: "50 min", seconds: 50 * 60 },
];

function Focus() {
  const [selectedTime, setSelectedTime] = useState(25 * 60);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setSessionCompleted(true);
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (value) =>
    String(value).padStart(2, "0");

  const selectTime = (time) => {
      setIsRunning(false);
      setSessionCompleted(false);
      setSelectedTime(time);
      setSeconds(time);
  };

  const resetTimer = () => {
    setIsRunning(false);
      setSessionCompleted(false);
    setSeconds(selectedTime);
  };

  return (
    <section className="focus-section">
      <div className="focus-card">
        <span className="focus-icon">🧠</span>

        <h2>Focus Mode</h2>

        <p>
          Stay focused and make progress.
        </p>

        <div className="focus-times">
          {focusTimes.map((time) => (
            <button
              key={time.seconds}
              className={
                selectedTime === time.seconds
                  ? "time-button active-time"
                  : "time-button"
              }
              onClick={() => selectTime(time.seconds)}
              disabled={isRunning}
            >
              {time.label}
            </button>
          ))}
        </div>

        <div className="timer">
          {formatTime(minutes)}:
          {formatTime(remainingSeconds)}
        </div>
        {sessionCompleted && (
  <div className="session-message">
    🎉 Great job! Focus session completed.
  </div>
)}

        <div className="focus-actions">
          <button
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start Focus"}
          </button>

          <button
            className="reset-button"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export default Focus;