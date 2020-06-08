//this page gets only one specific product and sends it to the dom

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import { Message } from "semantic-ui-react";
import { CartSnackbar } from "../../components";
import order_product_manager from "../../modules/order_product_manager";
import "./productDetails.css";

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const token = sessionStorage.getItem("token");
  const [submitMessage, setSubmitMessage] = useState("");
  const str = "Not Available for Local Delivery"
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
                  .then(() => setMessage("Added to Cart"));
              });
            } else {
              const productRelationship = {
                order_id: arr[0].id,
                product_id: productId,
              };
              order_product_manager
                .postNewOrder(token, productRelationship)
                .then(() => setMessage("Added to Cart"));
            }
          } else {
            orderManager.postOrder(token).then((obj) => {
              const productRelationship = {
                order_id: obj.id,
                product_id: productId,
              };
              order_product_manager
                .postNewOrder(token, productRelationship)
                .then(() => setMessage("Added to Cart"));
            });
          }
        })
      : setMessage();
  };

  const setMessage = (message = "Login to add items to cart") => {
    setSubmitMessage(message);

    window.setTimeout(() => setSubmitMessage(""), 2000);
  };

  useEffect(() => {
    //fetch the product here
    productManager
      .getOneProduct(props.productId)
      .then((prod) => {setProduct(prod)});
      
  }, [props.productId]);

  if(product["error"]==="Does Not Exist"){
    return (
    <>
    <div className="details-container">
        <div className="product-container">
          <div className="error-container">
            <img src="https://cdn.pixabay.com/photo/2013/07/12/13/58/warning-147699_1280.png" alt="error image" className="error-image" width="100px"/>
         <h2>We are sorry, this product has been deleted or does not exist!</h2>
         </div>
        </div>
      </div>
    </>
    )

  }else {
  return (
    //return jsx here
    <>
      <div className="details-container">
        <div className="product-container">
          <div className="product-header">
            <h1>{product.title}</h1>
          </div>
          <div className="product-img-n-price">
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${
                  product.image_path === null
                    ? `${process.env.PUBLIC_URL}/noimage.png` 
                    : product.image_path
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div className="product-specs">
              <p className="price spec">Price: ${product.price}</p>
              <p className="create_date spec">
                Posted:{" "}
                {product.created_at == undefined
                  ? ""
                  : product.created_at.split("T")[0]}
              </p>
              <p className="remaining spec">Stock: {product.quantity}</p>
            <p className="location spec">Location: {product.location=== "" ? str : product.location}</p>
            </div>
          </div>
          <div className="product-description">
            <p className="prod-description">{product.description}</p>
          </div>
          {submitMessage && (
            <CartSnackbar
              message={submitMessage}
              negative={submitMessage !== "Added to Cart"}
              positive={submitMessage === "Added to Cart"}
            />
          )}
          <div className="icon-container-details">
            <button
              className="ui button"
              onClick={() => handleAddToCard(product.id)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );}
};
export default ProductDetails;
