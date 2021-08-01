import React from "react";
import { Modal } from "react-bootstrap";
import CategroyModal from "../../../components/ui/modal";

const DeleteCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    btnName,
    handleSave,
    buttons,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <CategroyModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      btnName={btnName}
      handleSave={handleSave}
      buttons={buttons}
    >
      <Modal.Body>
        <h5 className="mt-0">Expanded</h5>
        {expandedArray.map((item, index) => {
          return (
            <span className="expanded-items" key={index}>
              {item.name}
            </span>
          );
        })}
        <h5 className="mt-2 checked-label ">Checked</h5>
        {checkedArray.map((item, index) => {
          return (
            <span className="checked-items" key={index}>
              {item.name}
            </span>
          );
        })}
      </Modal.Body>
    </CategroyModal>
  );
};
export default DeleteCategoryModal;
