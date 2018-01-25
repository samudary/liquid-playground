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
                <input
                  className="input"
                  name="customFieldIdentifier"
                  type="text"
                  placeholder="Enter an identifier"
                  onChange={props.handleFieldInputChange}
                  value={props.customFieldIdentifier}
                />
              </div>
              <p className="help">For example, <code>my_date_of_birth</code></p>
            </div>

            <div className="field">
              <div className="control">
                <input
                  className="input"
                  name="customFieldValue"
                  type="text"
                  placeholder="Enter the value"
                  onChange={props.handleFieldInputChange}
                  value={props.customFieldValue}
                />
              </div>
              <p className="help">For example, <code>December 28, 1985</code></p>
            </div>

            <div className="field">
              <div className="control">
                <a
                  className="button is-info"
                  onClick={props.handleCustomFieldCreation}>Create Custom Field
                </a>
              </div>
              {props.submissionErrorsPresent ? <p className="help error">Identifier or value can't be blank</p> : null}
            </div>
          </div>
        </div>

        <div className="column column-adjusted">
          <TabsWithContent
            activeTab={props.activeTab}
            changeTab={props.handleTabSelection}
            customFields={props.customFields}
            deleteCustomField={props.deleteCustomField}
          />
        </div>
      </div>
    </div>
  );
}

export default InputHeader;
