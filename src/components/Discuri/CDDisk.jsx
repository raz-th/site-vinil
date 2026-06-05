import React from 'react';
import "./CDDisk.css";

const CDDisk = ({ className = "", spin = false, style, img = "", color = 'transparent', hideHole=false }) => (
  <div
    className={`cd-disk ${spin ? "spinning" : ""} ${className}`}
    style={style}
  >
    <div className="cd__reflection" />
    <div className="cd__label" style={{backgroundColor: color, backgroundImage: `url("${img}")`, backgroundSize: "cover"}}>
      {!hideHole && (<div className="cd__hole" />)}
    </div>
  </div>
);

export default CDDisk;