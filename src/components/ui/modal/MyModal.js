// later change the name and make a single component -- use index wala modal.

import React from "react";
import { Modal, Button } from "react-bootstrap";

function MyModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {/* check if multiple btn exist- if yes loop if no default btn */}
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button
              className="btn btn-sm w-25"
              key={index}
              variant={btn.color}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))
        ) : (
          <Button variant="dark" className="btn-sm" onClick={props.handleSave}>
            {props.btnName}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
