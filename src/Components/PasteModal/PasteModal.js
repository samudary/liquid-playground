import React from "react";
import "./PasteModal.css";

const PasteModal = (props) => {
  return (
    <div className={"modal " + (props.showModal ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <div className="field">
            <label className="label has-text-left">Paste your Liquid statements here</label>
            <div className="control">
              <textarea
                onPaste={props.handlePastedLiquid}
                className="textarea"
                placeholder="Hit render after pasting your liquid here"
                rows="15"
              ></textarea>

              <a
                className="button is-primary"
                onClick={props.handleModalLiquid}
              >Render</a>
            </div>
          </div>
        </div>
      </div>

      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

export default PasteModal;
