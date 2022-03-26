import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import Layout from "../../components/layout/layout";
import {
  addCategory,
  getAllCategory,
  updateCategories,
  deleteCategories as deleteCategoryAction,
} from "../../store/actions";
import {
  IoIosAdd,
  IoIosCheckboxOutline,
  IoIosCreate,
  IoIosSquareOutline,
  IoIosTrash,
} from "react-icons/io";
import { IoChevronForwardOutline, IoChevronDownOutline } from "react-icons/io5";
// check box tree Import
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
// check box tree Import END
import "./style.css";
import UpdateCategoryModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

function Category() {
  /**State variables */
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  // checkbox tree state variable.
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  /**State variables END */

  // update cat MODAL
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  // update cat MODAL END
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  useEffect(() => {
    if (!category.loading) {
      setCategoryName("");
      setParentCategoryId("");
      setCategoryImage("");
      setShow(false);
    }
  }, [category.loading]);

  /**category drop down list */
  const createCtegorylist = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
        isfeatured: category.isfeatured ? category.isfeatured : false,
      });
      if (category.children.length > 0) {
        createCtegorylist(category.children, options);
      }
    }
    return options;
  };
  /**category drop down list END */

  /**Category modal */
  const handleClose = (e) => {
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
    setShow(false);
  };

  const submitAddCategoryForm = () => {
    if (categoryName === "") {
      console.log("Cateory name Cannot be empty");

      return;
    }
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    //console.log(form.get("name"));
    dispatch(addCategory(form));
  };

  const handleShow = () => setShow(true);
  /**category modal End */

  // UPDATE CATEGORY MODAL > BTN
  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };
  //  UPDATE CATEGORY MODAL > BTN END

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCtegorylist(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    //get whole object info for checked and expanded array
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    //update corresponding state variable.
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    //console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  //submit update-category form
  const submitUpdateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : null);
      form.append("type", item.type);
      form.append("isfeatured", item.isfeatured ? item.isfeatured : false);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : null);
      form.append("type", item.type);
      form.append("isfeatured", item.isfeatured ? item.isfeatured : false);
    });

    // for (var pair of form) {
    //   //  console.log(pair[0] + ", " + pair[1]);
    //   console.log(pair);
    // }

    dispatch(updateCategories(form));
    // .then((result) => {
    //   if (result) {
    //     //directly dispatching if success , less expensive call and less recusion.
    //     // in other case we would carry below dispatch from the category action inside updatecategories api.
    //     dispatch(getAllCategory());
    //   }
    //   if (!result) {
    //     console.log("Error at category-- updatecategories -- dispatch");
    //   }
    // });
    setUpdateCategoryModal(false);
  };
  //submit update-category form End

  // handleEditCategoryInput / bind input on change with react state.
  const handleEditCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) => {
        if (index == _index) {
          return { ...item, [key]: value };
        }
        return item;
      });

      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  // handleEditCategoryInput / bind input on change with react state. END

  /**CREATE CATEGORY AND ITS SUB CATEGORY -- to render in checkbox tree  */
  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return categoryList;
  };
  /**CREATE CATEGORY AND ITS SUB CATEGORY -- to render in checkbox tree END */

  //DELETE CATEGORY MODAL--open
  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setShowDeleteModal(true);
    console.log(checkedArray, expandedArray);
  };

  //function to fialize category delete.
  const deleteCategories = () => {
    setShowDeleteModal(false);
    const checkedIdsArray = checkedArray.map((item, index) => {
      return { _id: item.value };
    });
    if (checkedArray.length > 0) {
      dispatch(deleteCategoryAction(checkedIdsArray));
    }
  };

  const handleCloseCategoryModal = () => {
    setUpdateCategoryModal(false);
  };

  // const renderTest = () => {
  //   return (
  //     <Modal show={test}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Modal heading</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
  //       <Modal.Footer>
  //         <Button variant="secondary" onClick={handleClose}>
  //           Close
  //         </Button>
  //         <Button variant="primary" onClick={handleClose}>
  //           Save Changes
  //         </Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  const categoryList = createCtegorylist(category.categories);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="d-flex flex-column flex-md-row justify-content-md-between">
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <span className="d-none d-md-block">Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd /> <span> Add </span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCreate /> <span>Edit</span>
                </button>
                <button onClick={deleteCategory}>
                  <IoIosTrash /> <span>Delete</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            {/* {renderCategories(category.categories)} */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckboxOutline />,
                uncheck: <IoIosSquareOutline />,
                // halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoChevronForwardOutline />,
                expandOpen: <IoChevronDownOutline />,
                // expandAll: <IoIosCheckboxOutline />,
                // collapseAll: <IoIosCheckboxOutline />,
                // parentClose: <IoIosCheckboxOutline />,
                // parentOpen: <IoIosCheckboxOutline />,
                // leaf: <IoIosCheckboxOutline />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/*REDNER ADD CATEGORY MODAL */}
      <AddCategoryModal
        show={show}
        handleClose={handleClose}
        modalTitle="Add new category"
        btnName="save"
        handleSave={submitAddCategoryForm}
        categoryList={categoryList}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        categoryName={categoryName}
        setParentCategoryId={setParentCategoryId}
      />
      {/* RENDER UPDATE CATEGORY MODAL */}
      <UpdateCategoryModal
        show={updateCategoryModal}
        handleClose={handleCloseCategoryModal}
        modaltitle="EDIT category"
        btnName="save Category"
        size="lg"
        handleSave={submitUpdateCategoriesForm}
        handleEditCategoryInput={handleEditCategoryInput}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        categoryList={categoryList}
      />

      {/*DELETE CATEGORY MODAL */}
      <DeleteCategoryModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle="Delete Confirmation"
        btnName="Delete category"
        //handleSave={sumbitDeleteCategoryForm}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              setShowDeleteModal(false);
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
}
export default Category;
