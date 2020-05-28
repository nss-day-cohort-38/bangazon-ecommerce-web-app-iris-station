// renders the cards to the my products page

import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import MyListCard from "../../components/cards/MyListCard";
import "../home/HomePage.css";

const MyProducts = (props) => {
  const [prods, setProds] = useState([]);
  const [reload, setReload] = useState(false);

  const deleteThisProduct = (id) => {
    productManager.deleteProduct(id).then(() => {
      setReload(!reload);
    });
  };

  useEffect(() => {
    productManager.getProductByUser().then((arr) => {
      setProds(arr);
    });
  }, [reload]);

  return (
    <>
      <div className="home-header">
        <h1>Your Products Listed For Sale</h1>
        <h4>Here's what you're selling...</h4>
      </div>
      <div className="list-container">
        {prods.map((product) => (
          <MyListCard
            key={product.id}
            product={product}
            {...props}
            deleteThisProduct={deleteThisProduct}
          />
        ))}
      </div>
    </>
  );
};
export default MyProducts;
