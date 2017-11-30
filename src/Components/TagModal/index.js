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
      {props.reference.filter}: {props.reference.info}
    </li>
  );
}

const ReferenceList = (props) => {
  const references = liquidReferences.map((reference) =>
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
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-left">Click the filter name to copy it to the clipboard <span className="has-text-primary">{props.filterCopied ? "Copied!" : ""}</span></p>
              
              <button
                className="delete"
                onClick={props.showModal}
                aria-label="close"></button>
            </header>

            <section className="modal-card-body">
              <ReferenceList
                handleFilterInsertion={props.handleFilterInsertion}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagModal;