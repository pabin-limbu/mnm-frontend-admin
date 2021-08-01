import React from "react";
import PoductEditModal from "../../../components/ui/modal";
import createCtegorylist from "../../../helper/LinearCategories";
import Input from "../../../components/ui/input/input";
import { Form } from "react-bootstrap";

function EditProductModal(props) {
  const {
    show,
    handleClose,
    buttons,
    categories,
    productDetails,
    handleEditProductInput,
  } = props;

  const categoryList = createCtegorylist(categories.categories);
  console.log({ productDetails });

  return (
    <div>
      <PoductEditModal
        show={show}
        handleClose={handleClose}
        modalTitle={"product details"}
        size={"lg"}
        buttons={buttons}
      >
        <Form>
          <Input
            type="select"
            options={categoryList}
            currentProduct={productDetails}
            label="Category"
          ></Input>
          <Input
            label="Name"
            value={productDetails && productDetails.name}
            onChange={(e) => {
              handleEditProductInput("name", e.target.value);
            }}
          ></Input>
          <Input
            label="Price"
            value={productDetails && productDetails.price}
            onChange={(e) => {
              handleEditProductInput("price", e.target.value);
            }}
          ></Input>
          <Input
            label="Quantity"
            value={productDetails && productDetails.quantity}
            onChange={(e) => {
              handleEditProductInput("quantity", e.target.value);
            }}
          ></Input>
          <Input
            label="Description"
            value={productDetails && productDetails.description}
            onChange={(e) => {
              handleEditProductInput("description", e.target.value);
            }}
          ></Input>
          <Input
            type="check"
            label="feature product"
            value={productDetails && productDetails.isFeatured}
            onChange={(e) => {
              handleEditProductInput("isFeatured", e.target.checked);
            }}
          ></Input>
        </Form>
      </PoductEditModal>
    </div>
  );
}

export default EditProductModal;
