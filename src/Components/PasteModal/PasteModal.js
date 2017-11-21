import React from "react"

const PasteModal = (props) => {
  return (
    <div className={"modal " + (props.showModal ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p>Some test</p>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

export default PasteModal;
