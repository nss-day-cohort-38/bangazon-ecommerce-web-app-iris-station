// renders the appropriate cards to the home based on the users search as well as a simple welcome message

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../cards/HomeListCard";
import TextField from "@material-ui/core/TextField";
// import "./HomePage.css"

const SearchForm = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const searchField = props.searchField;

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

  const handleSearch = () => {
    const filteredArr = [];
    productManager.getAllProducts().then((arr) => {
      arr.forEach((product) => {
        if (
          product.title.toLowerCase().includes(searchField.keyword) ||
          product.description.toLowerCase().includes(searchField.keyword) ||
          product.location.toLowerCase().includes(searchField.keyword)
        ) {
          if (filteredArr.includes(product)) {
          } else {
            filteredArr.push(product);
          }
        }
      });
      setProds(filteredArr);
      setAddMessage((prevState) => {
        let newObj = {};

        arr.map((item, i) => {
          newObj[item.id] = "";
        });

        return newObj;
      });
    });
  };

  useEffect(() => {
    handleSearch();
  }, [searchField]);

  return (
    <>
      <div className="home-header">
        <h1>Search Results</h1>
        <h4>We hope you find what you're looking for...</h4>
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
export default SearchForm;
