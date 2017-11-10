import React from 'react';
import './InputHeader.css';

const InputHeader = (props) => {
  return (
    <div className="InputHeader">
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

export default InputHeader;
