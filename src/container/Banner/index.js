import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../../components/layout/layout";
import MyModal from "../../components/ui/modal/MyModal";
import Input from "../../components/ui/input/input";
import { Col, Container, Form, FormGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBanner,
  getBanner,
  deleteBanner,
} from "../../store/actions/banner.actions";

import BannerDetailsModal from "./components/BannerDetailsModal";

function Banner() {
  const [showmodal, setShowmodal] = useState(false);
  const [name, setName] = useState("");
  const [linkType, setlinkType] = useState("");
  const [bannerImage, setBannerImage] = useState([]);
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [bannerDetails, setbannerDetails] = useState(null);
  const [bannerDetailsModalShow, setBannerDetailsModalShow] = useState(false);
  const dispatch = useDispatch();
  //redux store.
  const categoryList = useSelector((state) => state.category);
  const productList = useSelector((state) => state.product);
  const bannerList = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanner());
  }, []);

  useEffect(() => {
    setSlug("");
  }, [linkType]);

  /**Banner model function  */
  const handleModalClose = () => {
    setShowmodal(false);
    setName("");
    setlinkType("");
    setBannerImage("");
    setSlug("");
  };

  const handleBannerSave = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("bannerImage", bannerImage);
    form.append("linkType", linkType);
    form.append("slug", slug);
    form.append("category", category);
    dispatch(addBanner(form));
  };

  const handleBannerPicture = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleLinkSelect = (e) => {
    setSlug(e.target.value);
    const catid =
      e.target.options[e.target.options.selectedIndex].getAttribute("category");
    setCategory(catid);
  };

  const bannerDetailModalHandleClose = () => {
    setBannerDetailsModalShow(false);
  };

  const handleBannerOkButton = () => {
    setBannerDetailsModalShow(false);
  };
  /**Banner model function  END*/

  /**CATEGORY and PRODUCT Linear LIST FUCNTION */
  const createCtegorylist = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        slug: category.slug,
      });
      if (category.children.length > 0) {
        createCtegorylist(category.children, options);
      }
    }
    return options;
  };

  const createProductList = (products, options = []) => {
    for (let product of products) {
      options.push({
        value: product._id,
        name: product.name,
        slug: product.slug,
      });
    }
    return options;
  };
  /**CATEGORY and PRODUCT Linear LIST FUCNTION END */

  /*  RENDER BANNER LIST  */
  const renderBanner = (bannerList) => {
    return (
      <div>
        <Table
          responsive="sm"
          style={{ fontSize: "12px" }}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Type</th>
              <th>Link</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {bannerList.banner.length > 0
              ? bannerList.banner.map((banner, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setBannerDetailsModalShow(true);
                        setbannerDetails(banner);
                      }}
                      key={banner._id}
                    >
                      <td>{index}</td>
                      <td>{banner.name}</td>
                      <td>{banner.linkType}</td>
                      <td>{banner.slug}</td>

                      <td>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleBannerDelete(banner);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  };
  const handleBannerDelete = (bannerdata) => {
    dispatch(deleteBanner(bannerdata));
  };
  /*  RENDER BANNER LIST END  */

  const renderAddBannerModal = () => {
    return (
      <MyModal
        show={showmodal}
        handleClose={handleModalClose}
        modalTitle={"Banner"}
        size="lg"
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            onClick: (e) => {
              handleModalClose();
            },
          },
          {
            label: "Save Changes",
            color: "danger",
            onClick: () => {
              handleBannerSave();
            },
          },
        ]}
      >
        <Form>
          <Input
            label={"Banner Name"}
            placeholder={"Banner Name"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <FormGroup>
            <input
              type="file"
              name="bannerPicture"
              onChange={(e) => {
                handleBannerPicture(e);
              }}
            ></input>
          </FormGroup>
          <FormGroup>
            <Form.Label>Select Link Type</Form.Label>
            <Form.Check
              type={"radio"}
              id={`rdo-product`}
              label={`Product`}
              name="bannerLinkType"
              onClick={() => setlinkType("product")}
            />
            <Form.Check
              type={"radio"}
              id={`rdo-category`}
              label={`category`}
              name="bannerLinkType"
              onClick={() => setlinkType("category")}
            />
          </FormGroup>
          <fieldset disabled={linkType == "" ? true : false}>
            <FormGroup>
              <Form.Select
                size="lg"
                onChange={(e) => {
                  handleLinkSelect(e);
                }}
                value={slug}
              >
                <option>Select Banner Link</option>
                {linkType === "category"
                  ? createCtegorylist(categoryList.categories).map((item) => {
                      return (
                        <option
                          key={item.value}
                          // value={item.slug}
                          category={item.value}
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : linkType === "product"
                  ? createProductList(productList.products).map((item) => {
                      return (
                        <option
                          key={item.value}
                          //value={item.slug}
                          category={item.value}
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </Form.Select>
            </FormGroup>
          </fieldset>
        </Form>
      </MyModal>
    );
  };

  //logs
  // console.log(bannerDetails);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col className="d-flex">
            <h3>Add banner</h3>
            <button
              onClick={() => {
                setShowmodal(true);
              }}
            >
              add banner
            </button>
          </Col>
        </Row>
        <Row>
          <Col>{renderBanner(bannerList)}</Col>
        </Row>
      </Container>
      {renderAddBannerModal()}
      <BannerDetailsModal
        show={bannerDetailsModalShow}
        handleClose={bannerDetailModalHandleClose}
        bannerDetails={bannerDetails}
        handleSave={handleBannerOkButton}
      ></BannerDetailsModal>
    </Layout>
  );
}

export default Banner;
