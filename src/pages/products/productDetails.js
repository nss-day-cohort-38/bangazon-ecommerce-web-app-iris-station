//this page gets only one specific product and sends it to the dom

import React, {useState, useEffect} from 'react';
import productManager from "../../modules/productManager"
import "./productDetails.css"
import IconButton from '@material-ui/core/IconButton';

const ProductDetails = props => {
    const [product, setProduct] = useState({})

    useEffect(()=> {
        //fetch the product here
        productManager.getOneProduct(props.productId).then(prod=> setProduct(prod))
    }, [props.productId])

    return (
        //return jsx here
        <>
        <div className="details-container">
        <div className="product-container">
            <div className='product-header'><h1>{product.title}</h1></div>
            <div className="product-img-n-price">
                <div className="product-image">
                    <img src={product.image_path} alt={product.title} />
                </div>
                <div className="product-specs">
                    <p className="price spec">Price: ${product.price}</p>
                    <p className="create_date spec">Posted: {product.created_at}</p>
                    <p className="remaining spec">Stock: {product.quantity}</p>
                </div>
            </div>
            <div className="product-description">
                <p className="prod-description">{product.description}</p>
            </div>
            
            <div className="icon-container-details">
            <button className="ui button" onClick={()=> console.log("add to card")}>Add To Cart</button>
            </div>
        </div>
        </div>
        </>
    )
}
export default ProductDetails