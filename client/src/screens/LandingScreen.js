import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const LandingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let { userInfo } = user;
  useEffect(() => {
    if (userInfo) {
      history.push("/profile");
    }
  }, [userInfo, history]);
  return (
    <div>
      <h1>Landing Screen</h1>
    </div>
  );
};

export default LandingScreen;
