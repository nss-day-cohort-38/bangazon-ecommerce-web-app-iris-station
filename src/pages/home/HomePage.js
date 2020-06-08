// renders the cards to the home as well as a simple welcome message
//made by Kurt Krafft
import React, { useState, useEffect } from "react";
import productManager from "../../modules/productManager";
import orderManager from "../../modules/orderManager";
import order_product_manager from "../../modules/order_product_manager";
import HomeListCard from "../../components/cards/HomeListCard";
import { Link } from "react-router-dom";
import { Drawer } from "../../components/menu/index";
import Divider from "@material-ui/core/Divider";


const HomePage = (props) => {
  const [prods, setProds] = useState([]);
  const token = sessionStorage.getItem("token");
  const [addMessage, setAddMessage] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function that maps the producttype id's to the products table where the product_type_id is, and counts the number of products under the specific producttype.
  // Then creates a new custom object inside an array that is set to state so the data is easily iterable.
  // This function renders data for the Drawer.
  const productCategories = async () => {
    try {
      const getAllProductTypes = await productManager.getProductTypes();
      const productTypeMap = getAllProductTypes.map((productType) => {
        const productTypeId = productType.id;
        return productTypeId;
      });
      let promises = [];
      let productTypeArray = [];
      let productsArray = [];
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
            productsArray.push(productType);
            newObj = {
              id: id,
              name: name,
              count: len,
              products: productsArray.filter(
                (prod) => productType.id === prod.product_type_id
              ),
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


  return (
    <>
      <>
        <div className="product-category-container">
          <div className="category-items">
            <Link onClick={() => toggleMenu()}>
              Search by Product Categories
            </Link>
            <Drawer
              position="left"
              isOpen={drawerOpen}
              close={() => toggleMenu()}
              drawerInfo={productTypes.map((productType) => {
                const pArray = productType.products;
                return (
                  <>
                    <div>
                      <Divider />
                      <Link
                        key={productType.id}
                        to={`/products/category/${productType.id}`}
                      >
                        <span>
                          {productType.name} ({productType.count})
                        </span>
                      </Link>
                      <Divider />
                      <ul className="top-products-container">
                        {pArray.map((products) => {
                          return (
                          products.slice(0, 3).map(product => {
                            if (product.product_type_id === productType.id) {
                            return (
                                <li>
                                  <Link to={`/products/${product.id}`} key={product.id}>{product.title}</Link>
                                </li>
                              );
                            }
                          })
                          )
                        })}
                      </ul>
                    </div>
                  </>
                );
              })}
            />
          </div>
        </div>
      </>

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
