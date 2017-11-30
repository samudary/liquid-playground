import React from 'react';
import './index.css';
import liquidReferences from '../../data/liquidReferences';

const references = liquidReferences.map((reference) =>
  <li key={reference.filter}>
    {reference.filter}: <code>{reference.info}</code>
  </li>
);

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
            <ul>{references}</ul>
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