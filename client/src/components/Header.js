import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { logout } from "../store/actions/user";
const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let { userInfo } = user;
  let loggedIn;
  if (!userInfo) {
    console.log("loggedOut");
    loggedIn = false;
  } else {
    console.log("LoggedIn");
    loggedIn = true;
  }
  const logoutHandler = () => {
    console.log("Logout");
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={!loggedIn ? "/" : "/profile"}>
            <Navbar.Brand>DevGallery</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {!loggedIn ? (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link to="/login">
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                // </LinkContainer>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
