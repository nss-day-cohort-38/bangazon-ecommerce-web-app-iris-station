import React, { useState, useEffect, useRef } from "react";
import productManager from "../../modules/productManager";
import HomeListCard from "../../components/cards/HomeListCard";
import {
  handleAddToCartHelper,
  setMessageHelper,
} from "../../components/buttons/AddButton";

const ProductType = (props) => {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [prods, setProds] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const isMountedRef = useRef(false);
  const { productTypeId } = props;

  const getAllProductsOfCertainType = async (productTypeId) => {
    try {
      const getProductByProductType = await productManager.getProductsByProductType(
        productTypeId
      );
      const getAllProductTypes = await productManager.getProductTypes();
      const getAllProducts = await productManager.getAllProducts();
      const getCurrentProduct = await productManager.getProductTypeById(
        productTypeId
      );
      setProducts(getProductByProductType);
      setProductTypes(getAllProductTypes);
      setProds(getAllProducts);
      setCurrentProduct(getCurrentProduct);

      const len = getProductByProductType.length;
      setProductCount(len);
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
      <div className="home-header">
        <h1>{currentProduct.name}</h1>
      </div>
      <div className="list-container">
        {products.map((product, i) => (
          <HomeListCard
            key={product.id}
            product={product}
            handleAddToCard={handleAddToCard}
            addMessage={addMessage[product.id]}
            productCount={productCount}
            prods={prods}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default ProductType;
