import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { Container, Row, Col, Modal, Table } from "react-bootstrap";
import MyModal from "../../components/ui/modal";
import Input from "../../components/ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../store/actions/product.actions";
import { generatePublicUrl } from "../../urlConfig";
import EditProductModal from "./components/EditProductModal";
import ProductDetailsModal from "./components/ProductDetailsModal";
import "./style.css";

function Product() {
  /**state variables */
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetailModalShow, setProductDetailModalShow] = useState(false);
  const [productDetails, setProductDetails] = useState(null); //this product is used while updating product.
  const [editProductModal, setEditProductModal] = useState(false);

  //other variables
  const categoryList = useSelector((state) => state.category);
  const productList = useSelector((state) => state.product);
  const dispatch = useDispatch();
  /**state variables END */

  /**MODAL FUNCTIOn */
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };
  /**MODAL FUNCTION END */

  const handleSave = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
  };

  /**CATEGORY LIST FUCNTION */
  const createCtegorylist = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCtegorylist(category.children, options);
      }
    }
    return options;
  };
  /**CATEGORY LIST FUCNTION END */

  /**handle product picture */
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  /**handle product picture END */

  const productDetailModalHandleClick = (product) => {
    console.log(product);
    setProductDetails(product);
    setProductDetailModalShow(true);
  };

  // render editProductDetails modal.
  const showEditProductModal = (product) => {
    setProductDetails(product);
    setEditProductModal(true);
  };

  const handleEditProductInput = (propertyname, value) => {
    console.log("click");
    setProductDetails({ ...productDetails, [propertyname]: value });
  };
  const handleEditProductSubmitForm = () => {
    // console.log("from submited");
    //  console.log(productDetails._id);

    const form = new FormData();
    form.append("_id", productDetails._id);
    form.append("name", productDetails.name);
    form.append("quantity", productDetails.quantity);
    form.append("price", productDetails.price);
    form.append("description", productDetails.description);
    form.append("category", productDetails.category._id);
    form.append("isfeatured", productDetails.isFeatured ? true : false);
    // for (var pair of form) {
    //   console.log(pair[1]);
    // }
    dispatch(updateProduct(form));
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product));
  };

  const editProductModalHandleClose = () => {
    setEditProductModal(false);
  };

  /**RENDER PRODUCT FUNCTION */
  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>CONTROLS</th>
          </tr>
        </thead>
        <tbody>
          {productList.products.length > 0 ? (
            productList.products.map((product, index) => (
              <tr
                onClick={() => {
                  productDetailModalHandleClick(product);
                }}
                key={product._id}
              >
                <td>{index}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showEditProductModal(product);
                    }}
                  >
                    edit
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleDeleteProduct(product);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{"no data"}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };
  /**RENDER PRODUCT FUNCTION END */

  /**Add product modal */
  const renderAddProductModal = () => {
    return (
      <MyModal
        show={show}
        handleClose={handleClose}
        modalTitle="Add new product"
        btnName="Add product"
        handleSave={handleSave}
      >
        <Modal.Body>
          <Input
            label={"prduct Name"}
            placeholder={"Product Name"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Input
            label={"quantity"}
            placeholder={"quantity"}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></Input>
          <Input
            label={"price"}
            placeholder={"price"}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></Input>
          <Input
            label={"description"}
            placeholder={"description"}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></Input>

          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCtegorylist(categoryList.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}

          <input
            type="file"
            name="productPicture"
            onChange={handleProductPictures}
          ></input>
        </Modal.Body>
      </MyModal>
    );
  };
  /**Add product modal END */

  /**Render product detail modal */

  const productDetailModalHandleClose = () => {
    setProductDetailModalShow(false);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Add Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>

      {/* categoryUpdateModal */}
      <EditProductModal
        show={editProductModal}
        handleClose={editProductModalHandleClose}
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            onClick: () => {
              editProductModalHandleClose();
            },
          },
          {
            label: "Save Changes",
            color: "danger",
            onClick: () => {
              handleEditProductSubmitForm();
            },
          },
        ]}
        categories={categoryList}
        productDetails={productDetails}
        handleEditProductInput={handleEditProductInput}
      ></EditProductModal>

      <ProductDetailsModal
        show={productDetailModalShow}
        handleClose={productDetailModalHandleClose}
        productDetails={productDetails}
      ></ProductDetailsModal>

      {renderAddProductModal()}
      {/* {renderProductDetailsModal()} */}
    </Layout>
  );
}

export default Product;
