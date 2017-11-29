import React from 'react';
import './index.css';

const TagModal = (props) => {
  return (
    <div>
      <div className={"modal " + (props.modalShown ? 'is-active' : '')}>
        <div className="modal-background"></div>
        <div className="modal-content">

        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>

    </div>
  )
}

export default TagModal;