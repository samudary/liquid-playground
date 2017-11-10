import React from 'react';
import './Input.css';

const Input = (props) => {
  return (
    <div>
      <div className="field">
        <label className="label has-text-left">Enter your Liquid statement here</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Enter your Liquid statements here and they'll get rendered on the right"
            onChange={props.handleLiquidInput}
            onPaste={props.handleLiquidInput}
            rows="15"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Input;
