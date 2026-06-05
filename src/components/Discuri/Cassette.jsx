import React from 'react';
import "./Cassette.css";

const Cassette = ({ className = "", spin = false, style, img = "", color = '#3a3a3a', hideHole = false }) => (
  <div
    className={`cassette-tape ${className}`}
    style={style}
  >
    {/* Corpul de plastic al casetei */}
    <div className="cassette__body">
      <div className="cassette__top-design" />
      
      {/* Eticheta de hârtie/autocolant */}
      <div 
        className="cassette__label" 
        style={{
          backgroundColor: color, 
          backgroundImage: img ? `url("${img}")` : "none", 
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="cassette__label-lines" />
        
        {/* Geamul transparent prin care se vede banda */}
        <div className="cassette__window">
          <div className="cassette__tape-roll left" />
          <div className="cassette__tape-roll right" />
          
          {/* Cele două orificii zimțate pentru învârtire */}
          {!hideHole && (
            <div className="cassette__holes-container">
              <div className={`cassette__hole ${spin ? "spinning" : ""}`}>
                <div className="cassette__teeth" />
              </div>
              <div className={`cassette__hole ${spin ? "spinning" : ""}`}>
                <div className="cassette__teeth" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Partea de jos trapezoidală, specifică casetelor */}
      <div className="cassette__bottom-bar" />
    </div>
  </div>
);

export default Cassette;