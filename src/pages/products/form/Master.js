import React, { useState, useEffect } from "react";
import isValid from "./testCharacters";
import {ProductForm} from "../../../components/form"
import {productManager} from "../../../modules/";

// By Keith, Andrew, and Kurt
// The Master Form page handles state and submissions 
// for the ProductForm component
// This is where users create new products

const Master = (props) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    quantity: "",
    location: "",
    image_path: "",
    product_type_id: "",
  });
  const [producttypes, setProducttypes] = useState([]);
  // TODO: Return to this
  // const [submitMessage, setSubmitMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false)

  const handleImageUpload = (event) => {
    const inputFile = event.target.files[0];
    
    // A hackey way of kicking the file out of the input
    // when validations fail
    const clearInput = () => document.getElementById("image_path").value = "";

    // First check if the user actually ended up uploading a file
    if (inputFile) {
      // Then, check if it's an image      
      if (!inputFile.type.startsWith("image/")) {
        alert("Only image files are supported");
        clearInput();
        // Then check if it's smaller than 5MB
      } else if (inputFile.size > 5000000) {
        alert("File size cannot exceed 5MB");
        clearInput();
      } else {
        // The image is only set in state
        // if the above validations pass
        const stateToChange = { ...product };
        stateToChange[event.target.id] = inputFile;
        setProduct(stateToChange);
      }
    }
  }

  const handleFieldChange = (event) => {
    // If the field is not the image, then business as usual
    if (event.target.id !== "image_path") {
      const stateToChange = { ...product };
      stateToChange[event.target.id] = event.target.value;
      setProduct(stateToChange);
    } 
    // Otherwise, send it to the image handler
    else {
      handleImageUpload(event)
    }
  };

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  // Because an image is not a string type, 
  // json/stringify and content-type cannot be used in a fetch call
  // so instead, we create the fetch's body like this
  const gatherFormData = () => {
    const formdata = new FormData();
    formdata.append("title", product.title);
    formdata.append("price", product.price);
    formdata.append("description", product.description);
    formdata.append("quantity", product.quantity);
    formdata.append("product_type_id", product.product_type_id);
    // If the "available for local delivery" box is unchecked
    // no location is saved
    if (isChecked===false) {
      formdata.append("location", "")
    } else {
      formdata.append("location", product.location);
    }
    if (product.image_path === "") {
      formdata.append("image_path", null);
    } else {
      formdata.append("image_path", product.image_path);
    }
    return formdata
  }

  const validProduct = () => {
    if (product.price > 10000) {
      alert("The listing price may not exceed $10,000.00");
      return false;
      // Validating the characters on the title
    } else if (!isValid(product.title)) {
      alert("The title can't contain the following characters: '!', '@', '#', '$', '%', '^', '&', '*', or '()'")
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validProduct() === true) {
      const formdata = gatherFormData()
      const token = sessionStorage.getItem("token")
      productManager.postProduct(token, formdata)
        .then((parsedResponse) => {
          props.history.push({
            pathname: `/products/${parsedResponse.id}`,
          });
        });
    }
  };

  useEffect(() => {
    productManager.getProductTypes()
      .then((producttypes) => 
        producttypes.sort((a, b) => a.name.localeCompare(b.name))
      ).then(setProducttypes);
  }, []);

  return (
    <>
      <ProductForm 
        handleProductChange={handleFieldChange}
        producttypes={producttypes}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isChecked={isChecked}
        image_filename={product.image_path.name}
      />
    </>
  );
};

export default Master;
