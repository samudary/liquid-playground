import React from 'react';
import '../assets/trix.css';
import './Input.css';
import { TrixEditor } from "react-trix";

const Input = (props) => {
  return (
    <div>
      <div className="field">
        <label className="label has-text-left"></label>
        <div className="control">
          <TrixEditor
            className="textarea"
            placeholder="Enter your Liquid statements here and they'll get rendered on the right"
            // onKeyUp={props.handleLiquidInput}
            // onPaste={props.handleLiquidInput}
            onChange={props.handleLiquidInput}
            rows="15"
          />
        </div>
      </div>
    </div>
  );
}

export default Input;
