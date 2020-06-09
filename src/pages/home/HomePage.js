// renders the cards to the home as well as a simple welcome message
//made by Kurt Krafft
import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../../components/cards/HomeListCard";

const HomePage = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [reload, setReload] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAddToCard = (productId) => {
    //grab that product from database
    productManager.getOneProduct(productId).then((product) => {
      // console.log(prod)
      //check to see if product is in stock
      if (product.quantity > 0) {
        //check to see if there is a token in session storage (i.e user is logged in)
        token
          ? orderManager.getOrders(token).then((arr) => {
              //check to see if user has any previous orders if not we create a new order if so we continue to check
              if (arr.length > 0) {
                //sees if the most recent order has been paid for ot not
                //if not we addd to that order if so we create a  new one
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

                        props.history.push("/");
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

                      props.history.push("/");
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

                      props.history.push("/");
                    });
                });
              }
            })
          : //if user isn't logged in we will tell them to login
            setMessage(productId, "Login to add items to cart");
      } else {
        //if
        alert("This product is out of stock, Sorry!");
      }
    });
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
    toggleMenu();
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
