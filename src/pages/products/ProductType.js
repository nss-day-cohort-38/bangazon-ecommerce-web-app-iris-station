import React, { useState, useEffect, useRef } from "react";
import productManager from "../../modules/productManager";
import HomeListCard from "../../components/cards/HomeListCard";
// import HomePage from "../../pages/home/HomePage";
import {
  addToCartHelperFunction,
  setMessageHelperFunction,
} from "../../components/buttons/AddButton";

const ProductType = (props) => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const isMountedRef = useRef(null);

  const productId = props.productTypeId;

  const getAllProductsOfCertainType = async (productId) => {
    const getProductByProductType = await productManager.getProductsByProductType(productId);
    setProducts(getProductByProductType);
    setAddMessage((prevState) => {
      let newObj = {};
      getProductByProductType.map((item, i) => {
        newObj[item.id] = "";
      });
      return newObj;
    });
  };

  const setMessage = setMessageHelperFunction(setAddMessage);
  const handleAddToCard = addToCartHelperFunction(token, setMessage, props);

  useEffect(() => {
    if (productId) {
      getAllProductsOfCertainType(productId);
    }
    return () => productId;
  }, [productId]);

  return (
    <>
      <div className="list-container">
        {products.map((product, i) => (
          <HomeListCard
            key={product.id}
            product={product}
            handleAddToCard={handleAddToCard}
            addMessage={addMessage[product.id]}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default ProductType;
