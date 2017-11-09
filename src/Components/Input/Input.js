import React from 'react';
import './Input.css';

const Input = (props) => {
  return (
    <div>
      <h3>What type of object?</h3>

      <div className="columns">
        <div className="column">
          <div className="field is-grouped">
            <p className="control">
              <input className="input"
                type="text"
                placeholder="Add a variable"
                onChange={props.inputChange}
              />
            </p>
            <div className="control">
              <a
                className="button is-info"
                onClick={props.storeVariable}>Create Variable</a>
            </div>
          </div>

          <div className="field">
            <label className="label">Enter your Liquid statement here</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                onBlur={props.handleLiquidInput}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="column">
          Chosen Object Name: {props.chosenObject}
        </div>
      </div>
    </div>
  );
}

export default Input;
