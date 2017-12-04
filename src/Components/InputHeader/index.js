import React from 'react';
import './InputHeader.css';
import defaultLiquidObject from '../../data/subscriberObject';

const tabData = [
  { name: "Default Fields", isActive: true },
  { name: "Your Custom Fields", isActive: false }
];

const Tabs = (props) => {
  return (
    <div className="tabs is-centered is-boxed">
      <ul>
        {tabData.map((tab) => {
          return (
            <Tab
              key={tab.name}
              data={tab}
              isActive={props.activeTab === tab.name}
              handleClick={props.changeTab.bind(this, tab)}
            />
          );
        })}
      </ul>
    </div>
  );
}

const Tab = (props) => {
  return (
    <li
      onClick={props.handleClick}
      className={props.isActive ? "is-active" : null}
    >
      <a>{props.data.name}</a>
    </li>
  );
}

const TabContent = (props) => {
  const tabName = props.activeTab;
  return (
    <div>
      {tabName === 'Default Fields' &&
        <div>
          <p className="has-text-left">Need some field data to start working with? Here are a few:</p>
          
          <table className="table is-hoverable is-fullwidth is-bordered">
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Value</th>
              </tr>
            </thead>

            <TagList />
          </table>
        </div>
      }

      {tabName === 'Your Custom Fields' &&
        <p>Enter your custom fields here</p>
      }
    </div>
  );
}

const TagItem = (props) => {
  return (
    <tr>
      <td>{props.identifier}</td>
      <td><code>{props.value}</code></td>
    </tr>
  );
}

const TagList = (props) => {
  const list = Object.entries(defaultLiquidObject().subscriber).map((list) =>
    <TagItem
      key={list[0]}
      identifier={list[0]}
      value={list[1]}
    />
  );

  return (
    <tbody>
      {list}
    </tbody>
  );
}

const InputHeader = (props) => {
  return (
    <div className="InputHeader">
      <div className="columns">
        <div className="column column-adjusted">
          <p className="has-text-left intro-text">By default, we're working with a <strong>subscriber</strong> object as the base Liquid object. Therefore, any custom field values, tags, etc. are accessed with: <code>{"{{ subscriber.some_identifier }}"}</code> or <code>{"{{ subscriber.tags }}"}</code>.</p>

          <div className="field is-grouped">
            <p className="control">
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
            </p>

            <div className="control">
              <a
                className="button is-info"
                onClick={props.testVar}>Add Variable
              </a>
            </div>
          </div>

          <div className="field is-grouped">
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
          </div>
          <div className="variable-list has-text-left">
            <strong>Current Liquid object</strong>: <code>{props.defaultObject}</code>
          </div>
        </div>

        <div className="column column-adjusted">
          <Tabs
            activeTab={props.activeTab}
            changeTab={props.handleTabSelection}
          />
          <TabContent activeTab={props.activeTab} />
        </div>
      </div>
    </div>
  );
}

export default InputHeader;
