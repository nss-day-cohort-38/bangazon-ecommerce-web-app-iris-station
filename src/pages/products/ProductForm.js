import React, { useState, useEffect } from "react";

const ProductForm = (props) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    location: "",
    image_path: "",
    created_at: Date.now(),
    product_type_id: 1
  });
  const [producttypes, setProducttypes] = useState([]);

  const handleProductChange = (event) => {
    const stateToChange = { ...product };
    stateToChange[event.target.id] = event.target.value;
    setProduct(stateToChange);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title: product.title,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      location: product.location,
      image_path: product.image_path,
      created_at: product.created_at,
      product_type_id: product.product_type_id,
    };
    if (typeof(newProduct.title) != "string" || newProduct.title.length === 0) { alert ("The title field must contain text.")}
    else if (typeof(newProduct.description) != "string" || newProduct.description.length === 0) { alert ("The description field must contain text.")}
    else if (typeof(newProduct.location) != "string" || newProduct.location.length === 0) { alert ("The location field must contain text.")}
    else if (typeof(newProduct.image_path) != "string" || newProduct.image_path.length === 0) { alert ("The image_path field must contain text.")}
    else if (newProduct.price.length === 0) { alert ("The price field must contain a number.")}
    else if (newProduct.quantity.length === 0) { alert ("The quantity field must contain a number.")}
    else{

    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("token")}`

      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        props.history.push({
          pathname: `/products/${parsedResponse.id}`,
        });
      });
  }};

  const getProductTypes = () => {
    fetch("http://localhost:8000/producttypes")
      .then((result) => result.json())
      .then((producttypes) => {
        producttypes.sort((a, b) => a.name.localeCompare(b.name));
        setProducttypes(producttypes);
      });
  };

  useEffect(() => {
    getProductTypes();
  }, []);

  return (
    <form className="product_form" onSubmit={handleSubmit}>
      <h1 className="product_header">New Product Form</h1>
      <fieldset>
        <label htmlFor="title"> Title: </label>
        <input
          onChange={handleProductChange}
          type="text"
          id="title"
          placeholder="Title"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label htmlFor="price"> Price: </label>
        <input
          onChange={handleProductChange}
          type="number"
          id="price"
          placeholder="Price"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label htmlFor="description"> Description: </label>
        <input
          onChange={handleProductChange}
          type="text"
          id="description"
          placeholder="Description"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label htmlFor="quantity"> Quantity: </label>
        <input
          onChange={handleProductChange}
          type="number"
          id="quantity"
          placeholder="Quantity"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label htmlFor="location"> Location: </label>
        <input
          onChange={handleProductChange}
          type="text"
          id="location"
          placeholder="Location"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label htmlFor="image_path"> Image URL: </label>
        <input
          onChange={handleProductChange}
          type="text"
          id="image_path"
          placeholder="Image URL"
          required=""
          autoFocus=""
        />
      </fieldset>
      <fieldset>
        <label>Product Type: </label>
        <select
          id="product_type_id"
          onChange={handleProductChange}
          value={product.product_type_id}
        >
          {producttypes.map((producttype) => (
            <option key={producttype.id} value={producttype.id}>
              {producttype.name}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <button type="submit">Add New Product for Sale</button>
      </fieldset>
    </form>
  );
};

export default ProductForm;
