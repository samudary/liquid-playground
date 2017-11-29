import React from 'react';
import './index.css';

const TagModal = (props) => {
  return (
    <div>
      <div className={"modal " + (props.modalShown ? 'is-active' : '')}>
        <div
          className="modal-background"
          onClick={props.showModal}
        ></div>
        
        <div className="modal-content">
          <div className="modal__card">Some content to get started</div>
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