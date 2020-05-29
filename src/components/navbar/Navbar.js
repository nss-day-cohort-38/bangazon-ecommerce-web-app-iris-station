import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import "../../styles/Navbar.css";

const Example = ({
  navArray = [],
  color = "light",
  light = true,
  extraText = "",
  userInfo,
  hasUser,
  clearUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

 

  return (
    <div>
      <Navbar color={color} light={light} expand="md" fixed="top">
        <NavbarBrand href="/">Iris Station</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {navArray.map((item, id) => {
              if (item.dropdown && item.options) {
                return (
                  <UncontrolledDropdown key={id} nav inNavbar>
                    <DropdownToggle nav caret>
                      {item.title}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {item.options.map((dropitem) => {
                        return (
                          <Link
                            to={
                              dropitem.route
                                ? dropitem.route
                                : `/${dropitem.title
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`
                            }
                          >
                            <DropdownItem>{dropitem.title}</DropdownItem>
                          </Link>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              } else {
                return (
                  <NavItem key={id} className="navbar-item-link">
                    <Link
                      to={
                        item.route
                          ? item.route
                          : `/${item.title.split(" ").join("-").toLowerCase()}`
                      }
                    >
                      {item.title}
                    </Link>
                  </NavItem>
                );
              }
            })}
          </Nav>
          <Nav navbar>
            {hasUser ? (
              <>
                <NavItem className="navbar-item-link">
                  <Link to="/profile/view">Profile</Link>
                </NavItem>
                {/* TODO: make this not inline styling */}
                {userInfo.is_staff && (
                  <NavItem className="navbar-item-link">
                    <Link to="/dl/home">Design Library</Link>
                  </NavItem>
                )}
                <NavItem className="navbar-item-link">
                  <span
                    style={{ cursor: "pointer", color: "#4183c4" }}
                    onClick={clearUser}
                  >
                    Logout
                  </span>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="navbar-item-link">
                  <Link to="/login">Login</Link>
                </NavItem>
                <NavItem className="navbar-item-link">
                  <Link to="/register">Register</Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const defaultArray = [
  {
    title: "Customers",
    route: "/customers",
  },
  {
    title: "Payments of this",
    dropdown: true,
    options: [
      {
        title: "Here",
        route: "/here",
      },
      {
        title: "There is another example",
      },
    ],
  },
];

export default Example;
