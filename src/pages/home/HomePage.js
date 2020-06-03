// renders the cards to the home as well as a simple welcome message

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../../components/cards/HomeListCard";
// import "./HomePage.css"
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import { ProductType } from "../products/index";
import {addToCartHelperFunction, setMessageHelperFunction} from "../../components/buttons/AddButton"

const HomePage = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  // const [products, setProducts] = useState([]);

  const productCategorySideBar = async () => {
    try {
      const getAllProductTypes = await productManager.getProductTypes();
      setProductTypes(getAllProductTypes);
    } catch (err) {
      console.log(err);
    }
  };

  // const getAllProductsOfCertainType = async (productId) => {
  //   const getProductByProductType = await productManager.getProductsByProductType(
  //     productId
  //   );
  //   setProducts(getProductByProductType);
  // };

  const setMessage = setMessageHelperFunction(setAddMessage);
  const handleAddToCard = addToCartHelperFunction(token, setMessage, props);
 

  useEffect(() => {
    productCategorySideBar();
    productManager.getHomeList().then((arr) => {
      setProds(arr);
      setAddMessage((prevState) => {
        let newObj = {};

        arr.map((item, i) => {
          newObj[item.id] = "";
        });

        return newObj;
      });
    });
  }, []);

  return (
    <>
      <div className="product-category-container">
        <div className="category-header">
          Filter By Product Type
          <Dropdown scrolling={true}>
            <Dropdown.Menu className="ui four column relaxed equal height divided grid">
              {productTypes.map((productType) => (
                <Link
                  key={productType.id}
                  to={`/products/category/${productType.id}`}
                >
                  <Dropdown.Item text={productType.name} />
                </Link>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* 
      <div className="product-category-container">
        <div className="category-header">
          Filter By Product Type
          <Dropdown scrolling={true}>
            <Dropdown.Menu className="ui four column relaxed equal height divided grid">
              <select
                required
                id="productTypeId"
                value={product.productTypeId}
                type="text"
                onClick={getAllProductsOfCertainType}

              >
              {productTypes.map((productType) => (
                <option key={productType.id}>{productType.name}</option>
              ))}
              </select>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div> */}

      <div className="home-header">
        <h1>Welcome Back!</h1>
        <h4>Here's what's new...</h4>
      </div>
      <div className="list-container">
        {prods.map((product, i) => (
          <HomeListCard
            key={product.id}
            product={product}
            handleAddToCard={handleAddToCard}
            {...props}
            addMessage={addMessage[product.id]}
          />
        ))}
      </div>
    </>
  );
};
export default HomePage;
