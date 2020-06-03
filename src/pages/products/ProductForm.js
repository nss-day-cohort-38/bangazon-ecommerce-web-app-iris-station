import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Button, Paper } from "../../components";
import { Message } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";
import isValid from "./testCharacters";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ProductForm = (props) => {
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
  const [submitMessage, setSubmitMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false)
  const handleProductChange = (event) => {
    const stateToChange = { ...product };
    // Keith update:
    // If the field is not the image, then business as usual
    if (event.target.id !== "image_path") {
      stateToChange[event.target.id] = event.target.value;
    } 
    // If the field being changed is the image path,
    // rather than placing the event.target.value in state,
    // you need to place the (only) file
    else {
      const inputFile = event.target.files[0]
      // Do not set in state if the file is larger than 5MB
      if (inputFile.size > 5000000) {
        alert("File size cannot exceed 5MB")
      } else {
        stateToChange[event.target.id] = inputFile;
      }
    }
    setProduct(stateToChange);
  };
  const handleChange = () => {
    setIsChecked(!isChecked);
    
  };

  // From Keith:
  // Because an image is not a string type, 
  // json/stringify and content-type cannot be used in a fetch call
  // so instead, we create the fetch's body like this
  const gatherFormData = () => {
    const formdata = new FormData();
    formdata.append("title", product.title);
    formdata.append("price", product.price);
    formdata.append("description", product.description);
    formdata.append("quantity", product.quantity);
    formdata.append("location", product.location);
    formdata.append("product_type_id", product.product_type_id);
    formdata.append("image_path", product.image_path)
    return formdata
  }

  // Keith:
  // I broke this function out from handleSubmit,
  // and updated its checks to look at the product in state, 
  // rather than a constructed product to post
  const validProduct = () => {
    if (product.price > 10000) {
      /*
      else if(!isValid(newProduct.title)){
      alert("The title can't contain the following characters: '!', '@', '#', '$', '%', '^', '&', '*', or '()'")

  const getRightProduct = ()=> {
    if(isChecked===false){
      const newProduct = {
      title: product.title,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      location: "",
      image_path: product.image_path,
      product_type_id: product.product_type_id,
    }
    return newProduct
  }
    else{
      const newProduct = {
        title: product.title,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        location: product.location,
        image_path: product.image_path,
        product_type_id: product.product_type_id,
      }
      return newProduct
    }
  }

    }
      */

      alert("The listing price may not exceed $10,000.00");
      return false;
    } else if (product.image_path === "") {
      alert("Image uplaod required")
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validProduct() === true) {
      const newProduct = gatherFormData()
      
      fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          // Note: Content-type cannot be set when uploading a file
          // "content-type": "application/json",
          // Accept: "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        body: newProduct
      })
        .then((response) => response.json())
        .then((parsedResponse) => {
          props.history.push({
            pathname: `/products/${parsedResponse.id}`,
          });
        });
    }
  };
  // End of Keith Potempa Addition

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
    <div className="product-form-page">
      <Paper classProps="product-form-container">
        <h1 className="product_header">New Product Form</h1>
        <form className="product_form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="title"
                label="Title"
                fullWidth
                onChange={handleProductChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                type="number"
                id="price"
                label="Price"
                fullWidth
                inputProps={{ step: 0.01 }}
                onChange={handleProductChange}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                type="number"
                id="quantity"
                label="Quantity"
                fullWidth
                onChange={handleProductChange}
              />
            </Grid>
            {/* Keith Potempa Addition: Upload File */}
            {/* Reference: https://kiranvj.com/blog/blog/file-upload-in-material-ui/ */}
            <Grid item xs={12} md={6}>
              <TextField
                style={{display: 'none'}}
                fullWidth
                accept="image/*"
                id="image_path"
                name="image_path"
                label="Image"
                type="file"
                onChange={handleProductChange}
              />
              {/* https://material-ui.com/components/buttons/#upload-button */}
              <label htmlFor="image_path">
                <IconButton
                  variant="contained"
                  aria-label="upload picture"
                  color="default"
                  component="span"
                >
                  <PhotoCamera /> Upload Photo
                </IconButton>
              </label>
            </Grid>
            {/* End of Keith Potempa Addition: Upload File */}
            <Grid item xs={12} md={3}>
            <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleChange} name="checkedA" />}
        label="Available For Local Delivery"
      />
            </Grid>
            {

              isChecked===true ? (<Grid item xs={12} md={3}>
                <TextField
                  
                  id="location"
                  label="Location (optional)"
                  fullWidth
                  onChange={handleProductChange}
                /> </Grid>) : <></>
            }
            
           
            <Grid item xs={12} md={3}>
              <InputLabel htmlFor="age-native-simple">Product Type</InputLabel>
              <Select
                id="product_type_id"
                native
                // value={product.product_type_id}
                onChange={handleProductChange}
                fullWidth
                required
                label="Image URL"
              >
                <option aria-label="None" value="">
                  Choose Item
                </option>
                {producttypes.map((producttype) => (
                  <option key={producttype.id} value={producttype.id}>
                    {producttype.name}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                multiline
                required
                fullWidth
                rowsMax={12}
                onChange={handleProductChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" content="Add New Product for Sale" />
            </Grid>
            
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default ProductForm;
