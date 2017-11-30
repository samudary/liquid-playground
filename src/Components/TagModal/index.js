import React from 'react';
import './index.css';
import liquidReferences from '../../data/liquidReferences';

const ReferenceItem = (props) => {
  return (
    <li
      className="has-text-left filter__item"
      data-insertion-name={props.reference.filter}
      onClick={props.clickHandler}
    >
      {props.reference.filter}: <code>{props.reference.info}</code>
    </li>
  );
}

const ReferenceList = (props) => {
  const references = liquidReferences.map((reference, i) =>
    <ReferenceItem
      key={reference.filter}
      reference={reference}
      clickHandler={props.handleFilterInsertion}
    />
  );

  return (
    <ul>
      {references}
    </ul>
  );
}

const TagModal = (props) => {
  return (
    <div>
      <div className={"modal " + (props.modalShown ? 'is-active' : '')}>
        <div
          className="modal-background"
          onClick={props.showModal}
        ></div>
        
        <div className="modal-content">
          <div className="modal__card">
            <h3 className="has-text-left is-size-5">Click the filter name to copy it to the clipboard</h3>
            <ReferenceList
              handleFilterInsertion={props.handleFilterInsertion}
            />
          </div>
        </div>

        <button
          className="modal-close is-large"
          onClick={props.showModal}
          aria-label="close"></button>
      </div>
    </div>
  )
}

export default TagModal;