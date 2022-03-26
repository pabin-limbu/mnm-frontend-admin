import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import MyModal from "../../../components/ui/modal/MyModal";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
function BannerDetailsModal(props) {
  const { show, handleClose, bannerDetails, handleSave } = props;

  return (
    <MyModal
      show={show}
      handleClose={handleClose}
      modalTitle={"banner details"}
      size={"lg"}
      btnName="Ok"
      handleSave={handleSave}
    >
      <Row>
        <Col xs={6}>
          <label>Name</label>
          <p>{bannerDetails && bannerDetails.name}</p>
        </Col>
        <Col xs={6}>
          <label htmlFor="">Type</label>
          <p>{bannerDetails && bannerDetails.linkType}</p>
        </Col>
        <Col xs={12}>
          <label htmlFor="">Link name</label>
          <p>{bannerDetails && bannerDetails.slug}</p>
        </Col>
        <Col>
          <div className="bannerImageContainer">
            <Image
              className="bannerImg"
              src={generatePublicUrl(
                bannerDetails && bannerDetails.bannerImage
              )}
              fluid
            ></Image>
          </div>
        </Col>
      </Row>
    </MyModal>
  );
}

export default BannerDetailsModal;
