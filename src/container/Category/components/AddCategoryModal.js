import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import CategroyModal from "../../../components/ui/modal";
import Input from "../../../components/ui/input/input";

function AddCategoryModal(props) {
  const {
    show,
    handleClose,
    modalTitle,
    btnName,
    handleSave,
    categoryList,
    setCategoryName,
    categoryName,
    parentCategoryId,
    setParentCategoryId,
  } = props;
  return (
    <>
      <CategroyModal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        btnName={btnName}
        handleSave={handleSave}
      >
        <Modal.Body>
          <Row>
            <Col>
              <Input
                placeholder={"category Name"}
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
                className="form-control-sm"
              ></Input>
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Modal.Body>
      </CategroyModal>
    </>
  );
}

export default AddCategoryModal;
