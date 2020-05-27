import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
const Example = (props, {color = "light", light = true, extraText=""}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color={color} light={light} expand="md">
        <NavbarBrand href="/">Iris Station</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {props.navArray.map((item) => {
              if (item.dropdown && item.options) {
                return (
                  <UncontrolledDropdown nav inNavbar>
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
                  <NavItem>
                    <NavLink>
                      <Link
                        to={
                          item.route
                            ? item.route
                            : `${item.title
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`
                        }
                      >
                        {item.title}
                      </Link>
                    </NavLink>
                  </NavItem>
                );
              }
            })}
          </Nav>
          <NavbarText>
            {/* TODO: make this not inline styling */}
            {props.hasUser
            ? <span
                style={{cursor: 'pointer', color: 'blue'}}
                className="nav-link"
                onClick={props.clearUser}
              >
                Logout
              </span>
            : <>
                <NavLink>
                  <Link
                    to="/login"
                  >
                    Login
                  </Link>
                </NavLink>
                <NavLink>
                  <Link
                    to="/register"
                  >
                    Register
                  </Link>
                </NavLink>
              </>
            }

          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
