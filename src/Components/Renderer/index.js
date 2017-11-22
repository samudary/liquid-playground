import React from 'react';
import './Renderer.css';

const Renderer = (props) => {
  return (
    <div className="">
      <p className="has-text-left output-title"><strong>Your rendered output appears here</strong>:</p>
      <div className="parsed-output has-text-left">
        {props.parsedLiquid}
      </div>
    </div>
  );
}

export default Renderer;
