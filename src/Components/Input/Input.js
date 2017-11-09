import React from 'react';
import './Input.css';

const Input = (props) => {
  return (
    <div>
      <div className="columns">
        <div className="column column-adjusted">
          <p className="has-text-left intro-text">By default, we're working with a <strong>subscriber</strong> object as the base Liquid object. Therefore, any custom field values, tags, etc. are accessed with: <code>{"{{ subscriber.some_identifier }}"}</code> or <code>{"{{ subscriber.tags }}"}</code>. You can change this object name below.</p>

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
            <label className="label has-text-left">Enter your Liquid statement here</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Enter your Liquid statements here and they'll get rendered on the right"
                onChange={props.handleLiquidInput}
                onPaste={props.handleLiquidInput}
                rows="18"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="column column-adjusted">
          <div className="variable-list has-text-left">
            <strong>Current Liquid object</strong>: <code>{props.defaultObject}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
