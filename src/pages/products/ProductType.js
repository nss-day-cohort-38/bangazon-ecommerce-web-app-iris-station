import React, { useState, useEffect, useRef } from "react";
import productManager from "../../modules/productManager";
import HomeListCard from "../../components/cards/HomeListCard";
import {
  handleAddToCartHelper,
  setMessageHelper,
} from "../../components/buttons/AddButton";
import { withRouter } from "react-router-dom";

const ProductType = (props) => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState([]);
  const isMountedRef = useRef(false);

  const { productTypeId } = props;

  const getAllProductsOfCertainType = async (productTypeId) => {
    try {
      const getProductByProductType = await productManager.getProductsByProductType(
        productTypeId
      );
      setProducts(getProductByProductType);
      setAddMessage((prevState) => {
        let newObj = {};
        getProductByProductType.map((item, i) => {
          newObj[item.id] = "";
        });
        return newObj;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setMessage = setMessageHelper(setAddMessage);
  const handleAddToCard = handleAddToCartHelper(token, setMessage, props);

  useEffect(() => {
    isMountedRef.current = true;
      getAllProductsOfCertainType(productTypeId);

    return () => (isMountedRef.current = false);
  }, [productTypeId, setAddMessage]);

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

export default withRouter(ProductType);
