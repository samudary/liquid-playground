import React from 'react';
import './InputHeader.css';
import TabsWithContent from './TabsWithContent';

const InputHeader = (props) => {
  return (
    <div className="InputHeader">
      <div className="columns">
        <div className="column column-adjusted">
          <p className="has-text-left intro-text">By default, we're working with a <strong>subscriber</strong> object as the base Liquid object. Therefore, any custom field values, tags, etc. are accessed with: <code>{"{{ subscriber.some_identifier }}"}</code> or <code>{"{{ subscriber.tags }}"}</code></p>

          <p><strong>Create custom fields data below:</strong></p>

          <div className="custom-fields__create">
            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Enter an identifier" />
              </div>
              <p class="help">For example, <code>my_date_of_birth</code></p>
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Enter the value" />
              </div>
              <p class="help">For example, <code>December 28, 1985</code></p>
            </div>

            {/* <p className="control">
              <input
                id="identifier"
                className="input"
                type="text"
                placeholder="The identifier"
                onChange={props.tagIdentifierHandler}
              />

              <input
                id="value"
                className="input"
                type="text"
                placeholder="The value"
                onChange={props.tagValueHandler}
              />
            </p> */}
            <div className="field">
              <div className="control">
                <a
                  className="button is-info"
                  onClick={props.testVar}>Create Custom Field
                </a>
              </div>
            </div>
          </div>

          {/* <div className="field is-grouped">
            <p className="control">
              <input className="input"
                type="text"
                placeholder="Change base variable"
                onChange={props.inputChange}
              />
            </p>
            <div className="control">
              <a
                className="button is-info"
                onClick={props.storeVariable}>Change Variable</a>
            </div>
          </div> */}
        </div>

        <div className="column column-adjusted">
          <TabsWithContent
            activeTab={props.activeTab}
            changeTab={props.handleTabSelection}
          />
        </div>
      </div>
    </div>
  );
}

export default InputHeader;
