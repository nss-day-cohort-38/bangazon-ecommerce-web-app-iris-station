import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Paper } from "..";

const ProductForm = props => {
  const handleProductChange = props.handleProductChange;
  const producttypes = props.producttypes; 
  const handleSubmit = props.handleSubmit;
  const handleChange = props.handleChange;
  const isChecked = props.isChecked;
  const image_filename = props.image_filename;

  return (
    <>
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
            {/* Upload File */}
            {/* Reference: https://kiranvj.com/blog/blog/file-upload-in-material-ui/ */}
            <Grid item xs={12} md={6}>
              <p>
                <label htmlFor="image_path">
                  <IconButton
                    variant="contained"
                    aria-label="upload picture"
                    color="default"
                    component="span"
                    >
                    <PhotoCamera />   
                  </IconButton>
                  {/* 
                    The following displays the filename of an uploaded file.
                    If it is greater than x characters, 
                    it truncates down to the last x characters 
                  */}
                  {image_filename
                      ? image_filename.length > 30 
                        ? "..." + image_filename.substring(image_filename.length -30, image_filename.length)
                        : image_filename
                      : "Upload file"
                  }
                </label>
              </p>
              {/* https://material-ui.com/components/buttons/#upload-button */}
              {/* This field is hidden, but contains any image uploaded to it */}
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
            </Grid>
            {/* End of Upload File */}
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
                {producttypes
                  ? producttypes.map((producttype) => (
                      <option key={producttype.id} value={producttype.id}>
                        {producttype.name}
                      </option>
                    ))
                  : <></>
                }
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
  </>
  )
}

export default ProductForm;