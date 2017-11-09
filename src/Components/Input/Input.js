import React from 'react';
import './Input.css';

const Input = (props) => {
  return (
    <div>
      <h3>What type of object?</h3>

      <div className="columns">
        <div className="column">
          <div className="field is-grouped">
            <form onSubmit={props.storeVariable}>
              <p className="control">
                <input className="input"
                  type="text"
                  placeholder="Add a variable"
                  onChange={props.inputChange}
                />
              </p>
              <p className="control">
                <input
                  type="submit"
                  className="button is-info"
                  value="Create Variable"
                />
              </p>
            </form>
          </div>
        </div>

        <div className="column">
          Second column
        </div>

        <div className="column">
          Third column
        </div>
      </div>
    </div>
  );
}

export default Input;
