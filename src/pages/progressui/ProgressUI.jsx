import React,{useState} from "react";

const ProgressUI = () => {
    let progress,setProgress
  return (
    <div class="progress">
      <div class="bar" style={{ width: `${progress}%` }}>
        <p class="percent">{Math.round(progress)}</p>
      </div>
    </div>
  );
};

export default ProgressUI;
