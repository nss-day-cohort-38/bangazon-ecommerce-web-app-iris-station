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
const Example = ({ navArray = defaultArray, color = "light", light = true, extraText="" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color={color} light={light} expand="md">
        <NavbarBrand href="/">Iris Station</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {navArray.map((item) => {
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
          <NavbarText>{extraText}</NavbarText>
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
