import React, { useState } from "react";
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
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { Input, Button } from "semantic-ui-react";
import Switch from "@material-ui/core/Switch";

const Example = ({
  navArray = defaultArray,
  color = "light",
  light = true,
  userInfo,
  hasUser,
  clearUser,
  handleSearchChange,
  handleSubmit,
  handleHotdog,
  hotdog
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color={color} light={light} expand="md" fixed="top">
        {/* <NavbarBrand> */}
        <Link to="/">
          <img src={`${process.env.PUBLIC_URL}/navlogo.png`} />
        </Link>
        {/* </NavbarBrand> */}
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
            <form>
              <NavItem className="navbar-item-link">
                <Input
                  required
                  type="text"
                  id="keyword"
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  action={
                    <Link to="/search" onClick={handleSubmit}>
                      <Button
                        color="blue"
                        className="navbar-search-button"
                        icon="search"
                      />
                    </Link>
                  }
                />
              </NavItem>
            </form>
            {hasUser ? (
              <>
                <NavItem className="navbar-item-link">
                  <Switch
                    checked={hotdog}
                    onChange={handleHotdog}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </NavItem>
                <NavItem className="navbar-item-link">
                  <Link to="/profile/view" className="right-side-link">
                    Profile
                  </Link>
                </NavItem>
                {/* TODO: make this not inline styling */}
                {userInfo.is_staff && (
                  <NavItem className="navbar-item-link">
                    <Link to="/dl/home">Design Library</Link>
                  </NavItem>
                )}
                <NavItem
                  className="navbar-item-link logout-link"
                  onClick={clearUser}
                >
                  Logout
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className="navbar-item-link">
                  <Link className="right-side-link" to="/login">
                    Login
                  </Link>
                </NavItem>
                <NavItem className="navbar-item-link">
                  <Link className="right-side-link" to="/register">
                    Register
                  </Link>
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

{
  /* <NavItem>
              <Input
                placeholder="Search..."
                action={
                  <Link to="search">
                    <Button inverted color="blue" icon="search" />
                  </Link>
                }
              />
            </NavItem> */
}
