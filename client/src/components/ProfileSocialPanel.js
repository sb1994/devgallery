import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./ProfileSocialPanel.css";
const ProfileSocialPanel = ({ user, history }) => {
  const dispatch = useDispatch();
  console.log(history);

  return (
    <Col sm={12} md={12}>
      <Card className="text-center">
        <Row>
          <Col sm={12} lg={4}>
            <h1 className="username">{user.name}</h1>
            <Image
              src={user.profile_pic}
              className="profile_pic img-fluid"
              rounded
              style={{ height: "300px" }}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProfileSocialPanel;
