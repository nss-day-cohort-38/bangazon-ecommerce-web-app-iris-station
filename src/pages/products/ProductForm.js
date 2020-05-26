import React, { useState } from "react"

const ProductForm = (props) => {
  sessionStorage.setItem("user-token", "123456789")
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        quantity: "",
        location: "",
        image_path: "",
        created_at: ""
    });

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
        created_at: product.created_at
      }

      fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newProduct)
      })
      .then(response => response.json())
      .then(parsedResponse => {
        if("user-token" in parsedResponse) {
          sessionStorage.setItem("user-token", parsedResponse.token)
        }
      })
      .then(() => {
          props.history.push({
              pathname: "/"
          })
      })
    }

    return(
      <form className="product_form" onSubmit={handleSubmit}>
        <h1 className="product_header">New Product Form</h1>
        <fieldset>
          <label htmlFor="title"> Title </label>
          <input onChange={handleProductChange} type="text"
            id="title"
            placeholder="Title"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="price"> Price </label>
          <input onChange={handleProductChange} type="text"
            id="price"
            placeholder="Price"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="description"> Description </label>
          <input onChange={handleProductChange} type="text"
            id="description"
            placeholder="Description"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="quantity"> Quantity </label>
          <input onChange={handleProductChange} type="number"
            id="quantity"
            placeholder="Quantity"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="location"> Location </label>
          <input onChange={handleProductChange} type="text"
            id="location"
            placeholder="Location"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="image_path"> Image URL </label>
          <input onChange={handleProductChange} type="text"
            id="image_path"
            placeholder="Image URL"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <label htmlFor="created_at"> Date Created </label>
          <input onChange={handleProductChange} type="text"
            id="created_at"
            placeholder="Date Created"
            required="" autoFocus="" />
        </fieldset>
        <fieldset>
          <button type="submit">
            Add New Product for Sale
          </button>
        </fieldset>
      </form>
    )
  }

export default ProductForm