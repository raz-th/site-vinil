import React from 'react';
import "./NewspaperBook.css";

const NewspaperBook = ({ className = "", spin = false, style, img = "", color = '#f2edd9', hideHole = false }) => (
  <div
    className={`newspaper-book ${spin ? "rustling" : ""} ${className}`}
    style={{ ...style, '--paper-color': color }}
  >
    <div className="newspaper__page page-left">
      <div className="newspaper__header">
        <div className="newspaper__meta">VOL. XCIV No. 42</div>
        <h1 className="newspaper__title">THE DAILY CHRONICLE</h1>
        <div className="newspaper__meta-bar">LONDON, 1926 &bull; PRICE TWO CENTS</div>
      </div>
      
      <div className="newspaper__content-grid">
        <div className="newspaper__column">
          <h3 className="newspaper__subheading">BREAKING NEWS</h3>
          <p className="newspaper__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
          <p className="newspaper__text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
        <div className="newspaper__column">
          {img && (
            <div className="newspaper__image-wrapper">
              <div className="newspaper__image" style={{ backgroundImage: `url("${img}")` }} />
              <div className="newspaper__caption">Figure 1. Operational schematic.</div>
            </div>
          )}
          <p className="newspaper__text main-story">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>


    {/* <div className="newspaper__spine" />
    <div className="newspaper__page page-right">
      {!hideHole && <div className="newspaper__stain" />} 
      
      <div className="newspaper__content-grid full-page">
        <div className="newspaper__column">
          <h2 className="newspaper__headline-large">THE FUTURE IS NOW</h2>
          <p className="newspaper__text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <div className="newspaper__ad-box">
            <h4>BUY LUCKIES</h4>
            <p>THEY ARE TOASTED</p>
          </div>
        </div>
        <div className="newspaper__column">
          <p className="newspaper__text">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <p className="newspaper__text">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </div>
    </div> */}
  </div>
);

export default NewspaperBook;