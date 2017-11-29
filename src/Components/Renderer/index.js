import React from 'react';
import './Renderer.css';

const Renderer = (props) => {
  return (
    <div className="Renderer">
      <p className="has-text-left output-title"><strong>Your rendered output appears here</strong>:</p>

      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            value={props.parsedLiquid}
            disabled
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Renderer;
