import React, { useState, useEffect } from "react";

const ProgressBar = ({ percentage, size }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;

    if (progress < percentage) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= percentage) {
            clearInterval(timer);
            return prevProgress;
          } else {
            return prevProgress + 1;
          }
        });
      }, 10);
    } else if (progress > percentage) {
        setProgress(parseFloat(percentage));
    }

    return () => {
      clearInterval(timer);
    };
  }, [percentage]);

  const circleSize = size * 2 + 20;
  const circleRadius = size - 5;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  

  return (
    <div className="progress-circle" style={{ width: circleSize, height: circleSize }}>
      <span className="progress-text">
        {/* <p>Progress:</p> */}
      {`${progress}%`}</span>
      <svg className="progress-ring" style={{ width: circleSize, height: circleSize }}>
        <circle
          className="progress-ring__circle-background"
          r={circleRadius}
          cx={size + 10}
          cy={size + 10}
          style={{ strokeDasharray }}
        ></circle>
        <circle
          className="progress-ring__circle"
          r={circleRadius}
          cx={size + 10}
          cy={size + 10}
          style={{ strokeDasharray, strokeDashoffset }}
        ></circle>
      </svg>
    </div>
  );
};

export default ProgressBar;
