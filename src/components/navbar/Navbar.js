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
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";
import { Input, Button } from "semantic-ui-react";
import Switch from "@material-ui/core/Switch";
import { TextField } from "@material-ui/core";
import { Drawer } from "../../components/menu/index";
import productManager from "../../modules/productManager";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const Example = ({
  navArray = defaultArray,
  color = "light",
  light = true,
  hasUser,
  clearUser,
  handleSearchChange,
  handleSubmit,
  handleHotdog,
  hotdog,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");



  const toggle = () => setIsOpen(!isOpen);
  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
    isOpen && toggle();
  };

  // Function that maps the producttype id's to the products table where the product_type_id is, and counts the number of products under the specific producttype.
  // Then creates a new custom object inside an array that is set to state so the data is easily iterable.
  // This function renders data for the Drawer.
  const productCategories = async () => {
    try {
      const getAllProductTypes = await productManager.getProductTypes();
      const productTypeMap = getAllProductTypes.map((productType) => {
        const productTypeId = productType.id;
        return productTypeId;
      });
      let promises = [];
      let productTypeArray = [];
      let productsArray = [];
      let newObj = {};
      productTypeMap.forEach((id) => {
        promises.push(productManager.getProductsByProductType(id));
      });
      Promise.all(promises)
        .then((data) => {
          data.forEach((productType) => {
            const len = productType.length;
            const mapName = productType.map(
              (product) => product.product_type.name
            );
            const name = mapName[0];
            const mapId = productType.map((product) => product.product_type.id);
            const id = mapId[0];
            productsArray.push(productType);
            newObj = {
              id: id,
              name: name,
              count: len,
              products: productsArray.filter(
                (prod) => productType.id === prod.product_type_id
              ),
            };
            productTypeArray.push(newObj);
          });
          setProductTypes(productTypeArray);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productCategories();
    productManager.getHomeList().then((arr) => {
      setProducts(arr);
    });
  }, [token]);

  return (
    <div className="site-navbar">
      <Navbar color={color} light={light} expand="lg" fixed="top">
        {/* <NavbarBrand> */}
        <Link to="/" onClick={() => isOpen && toggle()}>
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
                            onClick={() => isOpen && toggle()}
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
                      onClick={() => isOpen && toggle()}
                    >
                      {item.title}
                    </Link>
                  </NavItem>
                );
              }
            })}
          </Nav>

          {hasUser ? (
            <NavItem className="navbar-item-link">
              <div className="product-category-container">
                <div className="category-items">
                  <Link onClick={() => toggleMenu()}>
                    Search Products By Categories
                  </Link>
                  <Drawer
                    position="left"
                    isOpen={drawerOpen}
                    close={() => toggleMenu()}
                    drawerInfo={productTypes.map((productType) => {
                      const pArray = productType.products;
                      return (
                        <>
                          <div className="producttypes-items-container">
                            <Link
                              onClick={() => toggleMenu()}
                              key={productType.id}
                              to={`/products/category/${productType.id}`}
                            >
                              <span className="product-name-on-list">
                                <strong>{productType.name}</strong> - (
                                {productType.count}) Items
                              </span>
                              <ChevronRightIcon />
                            </Link>
                            <div className="top-sellers">Top Sellers:</div>
                            <ul className="top-products-container">
                              {pArray.map((products) => {
                                return products.slice(0, 3).map((product) => {
                                  if (
                                    product.product_type_id === productType.id
                                  ) {
                                    return (
                                      <li className="product-items-list">
                                        <Link
                                          onClick={() => toggleMenu()}
                                          to={`/products/${product.id}`}
                                          key={product.id}
                                        >
                                          {product.title}
                                        </Link>
                                      </li>
                                    );
                                  }
                                });
                              })}
                            </ul>
                          </div>
                        </>
                      );
                    })}
                  />
                </div>
              </div>
            </NavItem>
          ) : null}
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
                    <Link
                      to="/search"
                      onClick={(e) => {
                        isOpen && toggle();
                        handleSubmit(e);
                      }}
                    >
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
                    onClick={() => isOpen && toggle()}
                    checked={hotdog}
                    onChange={handleHotdog}
                    color="primary"
                    name="checkedB"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </NavItem>
                <NavItem className="navbar-item-link">
                  <Link
                    onClick={() => isOpen && toggle()}
                    to="/profile/view"
                    className="right-side-link"
                  >
                    Profile
                  </Link>
                </NavItem>
                {/* TODO: make this not inline styling */}
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
                  <Link
                    onClick={() => isOpen && toggle()}
                    className="right-side-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </NavItem>
                <NavItem className="navbar-item-link">
                  <Link
                    onClick={() => isOpen && toggle()}
                    className="right-side-link"
                    to="/register"
                  >
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

// {
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
// }
