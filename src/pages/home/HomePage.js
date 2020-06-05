// renders the cards to the home as well as a simple welcome message

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../../components/cards/HomeListCard";
// import "./HomePage.css"
// import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

const HomePage = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const productCategories = async () => {
    try {
      const getAllProductTypes = await productManager.getProductTypes();
      const productTypeMap = getAllProductTypes.map((productType) => {
        const productTypeId = productType.id;
        return productTypeId;
      });
      let promises = [];
      let productTypeArray = [];
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
            newObj = {
              id: id,
              name: name,
              count: len,
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

  const handleAddToCard = (productId) => {
    token
      ? orderManager.getOrders(token).then((arr) => {
          if (arr.length > 0) {
            if (arr[0].payment_type_id != null) {
              orderManager.postOrder(token).then((obj) => {
                const productRelationship = {
                  order_id: obj.id,
                  product_id: productId,
                };
                order_product_manager
                  .postNewOrder(token, productRelationship)
                  .then(() => {
                    setMessage(productId);
                  });
              });
            } else {
              const productRelationship = {
                order_id: arr[0].id,
                product_id: productId,
              };
              order_product_manager
                .postNewOrder(token, productRelationship)
                .then(() => {
                  setMessage(productId);
                });
            }
          } else {
            orderManager.postOrder(token).then((obj) => {
              const productRelationship = {
                order_id: obj.id,
                product_id: productId,
              };
              order_product_manager
                .postNewOrder(token, productRelationship)
                .then(() => {
                  setMessage(productId);
                });
            });
          }
        })
      : setMessage(productId, "Login to add items to cart");
  };

  const setMessage = (productId, message = "Added to Cart") => {
    setAddMessage((prevState) => {
      let newObj = { ...prevState };
      newObj[productId] = message;
      return newObj;
    });

    window.setTimeout(
      () =>
        setAddMessage((prevState) => {
          let newObj = { ...prevState };
          newObj[productId] = "";
          return newObj;
        }),
      2000
    );
  };

  useEffect(() => {
    productCategories();
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

  console.log(prods);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div className="product-category-container">
        <div className="category-items">
          {productTypes.map((productType, id) => {
            return (
              <Dropdown isOpen={dropdownOpen} toggle={toggle} key={id}>
                <DropdownToggle caret>
                <Link
                  key={productType.id}
                  to={`/products/category/${productType.id}`}
                >
                  <span>{productType.name} ({productType.count})</span>
                </Link>
                  </DropdownToggle>
                  {prods.map((product) => {
                <DropdownMenu right>
                    if (product.product_type_id === productType.id) {
                      return (
                        <DropdownItem key={product.id}>
                          {product.title}
                        </DropdownItem>
                      );
                    }
                </DropdownMenu>
                  })}
              </Dropdown>
            );
          })}
        </div>
      </div>

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
            setAddMessage={setAddMessage}
          />
        ))}
      </div>
    </>
  );
};
export default HomePage;
