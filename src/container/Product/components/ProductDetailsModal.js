import React from "react";
import MyModal from "../../../components/ui/modal";
import { Row, Col } from "react-bootstrap";
import { generatePublicUrl } from "../../../urlConfig";

function ProductDetailsModal(props) {
  const { show, handleClose, productDetails } = props;
  return (
    <MyModal
      show={show}
      handleClose={handleClose}
      modalTitle={"product details"}
      size={"lg"}
      btnName="Ok"
    >
      {/* <p>{productDetails && productDetails.name}</p> */}
      <Row>
        <Col md="6">
          <label className={"lblProductSpecName"}>Name</label>
          <p className={"txtProductSpecDetail"}>
            {productDetails && productDetails.name}
          </p>
        </Col>
        <Col md="6">
          <label className={"lblProductSpecName"}>Price</label>
          <p className={"txtProductSpecDetail"}>
            {productDetails && productDetails.price}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <label className={"lblProductSpecName"}>Quantity</label>
          <p className={"txtProductSpecDetail"}>
            {productDetails && productDetails.quantity}
          </p>
        </Col>
        <Col md="6">
          <label className={"lblProductSpecName"}>Category</label>
          <p className={"txtProductSpecDetail"}>
            {productDetails && productDetails.category.name}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <label className={"lblProductSpecName"}>Description</label>
          <p className={"txtProductSpecDetail"}>
            {productDetails && productDetails.description}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <label className={"lblProductSpecName"}>product picture</label>
          <div style={{ display: "flex" }}>
            {" "}
            {productDetails &&
              productDetails.productPictures.map((picture, index) => (
                <div className="productImgContainer" key={index}>
                  <img src={generatePublicUrl(picture.img)} alt="img" />
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </MyModal>
  );
}

export default ProductDetailsModal;
