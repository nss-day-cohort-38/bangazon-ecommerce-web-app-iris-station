// renders the cards to the home as well as a simple welcome message

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../../components/cards/HomeListCard";
// import "./HomePage.css"
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";


const HomePage = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [productTypes, setProductTypes] = useState([]);

  const productCategorySideBar = async () => {
    try {
      const getAllProductTypes = await productManager.getProductTypes();
      setProductTypes(getAllProductTypes);
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

                    // props.history.push("/");
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

                  // props.history.push("/");
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

                  // props.history.push("/");
                });
            });
          }
        })
      : setMessage(productId, "You Have to Login");
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
        {/* <div className="category-header">
          Filter By Product Type
          </div> */}
      <div className="product-category-container">
          {/* <Dropdown scrolling={true}>
            <Dropdown.Menu className="ui four column relaxed equal height divided grid"> */}
            <div className="category-items">
              {productTypes.map((productType) => (
                <Link
                  key={productType.id}
                  to={`/products/category/${productType.id}`}
                >
                  <Dropdown.Item text={productType.name} />
                </Link>
              ))}
              </div>

            {/* </Dropdown.Menu>
          </Dropdown> */}
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
