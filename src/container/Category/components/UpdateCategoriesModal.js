import React from "react";
import CategroyModal from "../../../components/ui/modal";
import Input from "../../../components/ui/input/input";
import { Col, Row, Modal } from "react-bootstrap";

const UpdateCategoryModal = (props) => {
  const {
    show,
    size,
    handleClose,
    modalTitle,
    btnName,
    handleSave,
    checkedArray,
    expandedArray,
    categoryList,
    handleEditCategoryInput,
  } = props;

  console.log({ expandedArray, checkedArray });

  return (
    <CategroyModal
      show={props.show}
      handleClose={props.handleClose}
      modalTitle={props.modalTitle}
      btnName={props.btnName}
      size={props.size}
      handleSave={props.handleSave}
    >
      <Modal.Body>
        {/* Expanded */}
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    placeholder={"category"}
                    value={item.name}
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "expanded"
                      );
                    }}
                  ></Input>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "expanded"
                      );
                    }}
                  >
                    <option>Select Category</option>
                    {categoryList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "type",
                        e.target.value,
                        index,
                        "expanded"
                      );
                    }}
                  >
                    <option value="">select Type</option>
                    <option value="Store">Store</option>
                    <option value="Product">Product</option>
                    <option value="Page">Page </option>
                  </select>
                </Col>

                <Col>
                  <Input
                    type="check"
                    label="feature Category"
                    value={
                      item.isfeatured ? JSON.parse(item.isfeatured) : false
                    }
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "isfeatured",
                        e.target.checked,
                        index,
                        "expanded"
                      );
                      // handleEditProductInput("isFeatured", e.target.checked);
                    }}
                  ></Input>
                </Col>
              </Row>
            );
          })}
        {/* checked array */}{" "}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => {
            return (
              <Row key={index}>
                <Col>
                  <Input
                    placeholder={"category"}
                    value={item.name}
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "checked"
                      );
                    }}
                  ></Input>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "checked"
                      );
                    }}
                  >
                    <option>Select Category</option>
                    {categoryList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.type}
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "type",
                        e.target.value,
                        index,
                        "checked"
                      );
                    }}
                  >
                    <option value="">select Type</option>
                    <option value="Store">Store</option>
                    <option value="Product">Product</option>
                    <option value="Page">Page </option>
                  </select>
                </Col>
                <Col>
                  <Input
                    type="check"
                    label={"feature Category"}
                    value={
                      item.isfeatured ? JSON.parse(item.isfeatured) : false
                    }
                    onChange={(e) => {
                      handleEditCategoryInput(
                        "isfeatured",
                        e.target.checked,
                        index,
                        "checked"
                      );
                    }}
                  ></Input>
                </Col>
              </Row>
            );
          })}
      </Modal.Body>
    </CategroyModal>
  );
};
export default UpdateCategoryModal;
