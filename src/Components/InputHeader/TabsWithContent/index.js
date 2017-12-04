import React from 'react';
import defaultLiquidObject from '../../../data/subscriberObject';

const tabData = [
  { name: "Default Fields", isActive: true },
  { name: "Your Custom Fields", isActive: false }
];

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

const TabsWithContent = (props) => {
  return (
    <div>
      <Tabs
        activeTab={props.activeTab}
        changeTab={props.changeTab}
      />
      <TabContent activeTab={props.activeTab} />
    </div>
  );
}

export default TabsWithContent;