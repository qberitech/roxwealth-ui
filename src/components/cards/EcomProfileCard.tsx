// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarUpload from 'components/common/AvatarUpload';
// import React from 'react';
// import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
// import team15 from 'assets/img/team/15.webp';
// import {
//   faFacebook,
//   faLinkedin,
//   faTwitter
// } from '@fortawesome/free-brands-svg-icons';

const EcomProfileCard = ({ details }: any) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="border-bottom border-dashed border-300 pb-4">
          <Row className="align-items-center g-3 g-sm-5 text-center text-sm-start">
            <Col xs={12} sm="auto">
              <AvatarUpload size="5xl" src={details.pictureUrl} />
            </Col>
            <Col xs={12} sm="auto" className="flex-1">
              <h4 className="mb-0">
                {details.firstName}
                <span className="text-900"> </span>
                {details.lastName}
              </h4>
              <br />
              <p className="text-800">Email: {details.email}</p>
              <p className="text-800">Mobile: {details.mobile}</p>
              {/* <p className="text-800">Joined 3 months ago</p> */}
              {/* <div>
                <a href="#!" className="me-2">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-400 hover-primary"
                  />
                </a>
                <a href="#!" className="me-2">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-400 hover-primary"
                  />
                </a>
                <a href="#!">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="text-400 hover-primary"
                  />
                </a>
              </div> */}
            </Col>
          </Row>
        </div>
        {/* <div className="d-flex flex-between-center pt-4"> */}
        {/* <div>
            <h6 className="mb-2 text-800">Share Percentage</h6>
            {details.sharePercentage ? (
              <h4 className="fs-7 text-1000 mb-0">{details.sharePercentage} %</h4>
            ) : (
              <h4 className="fs-7 text-1000 mb-0">0</h4>
            )}
          </div> */}
        {/* <div className="text-end">
            <h6 className="mb-2 text-800">Last Order</h6>
            <h4 className="fs-7 text-1000 mb-0">1 week ago</h4>
          </div>
          <div className="text-end">
            <h6 className="mb-2 text-800">Total Orders</h6>
            <h4 className="fs-7 text-1000 mb-0">97</h4>
          </div> */}
        {/* </div> */}
      </Card.Body>
    </Card>
  );
};

export default EcomProfileCard;
