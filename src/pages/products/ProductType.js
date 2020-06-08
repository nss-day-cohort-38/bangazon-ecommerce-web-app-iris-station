import React, { useState, useEffect, useRef } from "react";
import productManager from "../../modules/productManager";
import HomeListCard from "../../components/cards/HomeListCard";
import {
  handleAddToCartHelper,
  setMessageHelper,
} from "../../components/buttons/AddButton";
import { Drawer } from "../../components/menu/index";
import Divider from "@material-ui/core/Divider";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProductType = (props) => {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prods, setProds] = useState([]);
  const isMountedRef = useRef(false);
  const { productTypeId } = props;

  const getAllProductsOfCertainType = async (productTypeId) => {
    try {
      const getProductByProductType = await productManager.getProductsByProductType(
        productTypeId
      );
      const getAllProductTypes = await productManager.getProductTypes();
      const getAllProducts = await productManager.getAllProducts();
      setProducts(getProductByProductType);
      setProductTypes(getAllProductTypes);
      setProds(getAllProducts);

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

  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    isMountedRef.current = true;
    getAllProductsOfCertainType(productTypeId);

    return () => (isMountedRef.current = false);
  }, [productTypeId, setAddMessage]);

  return (
    <>
      <div className="product-category-container">
        <div className="category-items">
          <Link onClick={() => toggleMenu()}>Search by Product Categories</Link>
          <Drawer
            position="left"
            isOpen={drawerOpen}
            close={() => toggleMenu()}
            drawerInfo={productTypes.map((productType) => {
              return (
                <>
                  <div>
                    <Divider />
                    <Link
                      key={productType.id}
                      to={`/products/category/${productType.id}`}
                    >
                      <span>
                        {productType.name} {productType.count}
                      </span>
                    </Link>
                    {prods.map((product) => {
                      if (product.product_type_id === productType.id) {
                        return (
                          <ul className="top-products-container">
                            <Link to={`/products/${product.id}`}key={product.id}>
                              <li>{product.title}</li>
                            </Link>
                          </ul>
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          />
        </div>
      </div>
      <div className="list-container">
        {products.map((product, i) => (
          <HomeListCard
            key={product.id}
            product={product}
            handleAddToCard={handleAddToCard}
            addMessage={addMessage[product.id]}
            productCount={productCount}
            {...props}
          />
        ))}
      </div>
    </>
  );
};

export default ProductType;
