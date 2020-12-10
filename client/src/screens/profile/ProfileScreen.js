import React, { useState, useEffect } from "react";
import { getUserDetails } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Card, Col, Row, Image } from "react-bootstrap";
import ProfileSocialPanel from "../../components/ProfileSocialPanel";
const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let { loading, error, userInfo } = user;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      //get the full user details
      if (!loading) {
        dispatch(getUserDetails(userInfo._id));
        // dispatch(getUserDetails(user.userInfo._id));
      }
      // console.log(userInfo._id);
    }
  }, [history, dispatch]);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  return (
    <div className="row">
      {loading ? (
        <Loader />
      ) : userInfo !== undefined ? (
        <Col className="col-12">
          <Row className="row">
            <ProfileSocialPanel user={userInfo} history={history} />
          </Row>
        </Col>
      ) : null}
    </div>
  );
};

export default ProfileScreen;
