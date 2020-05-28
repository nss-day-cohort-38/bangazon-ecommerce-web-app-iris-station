//A component to render the users cart to the DOM 

import React, {useState,useEffect} from 'react';
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"
import {Card} from 'semantic-ui-react'
import CartCard from "../../components/cards/cartcard"

const MyCart = props => {
    const [products, setProducts] = useState([])
    const [order, setOrder] = useState({"order": null})
    const token = sessionStorage.getItem('token')

    useEffect(()=> {
//I start by grabbing all the orders and ten I see if there more than 0 orders and if so i check to see if there is an open order by seeing
// if the pt-id is null (meaning it hasn't been closed) after that I get all the relationships with the products to that order and set them in start
//and then I place those into cards
        OrderManager.getOrders(token).then(arr=> {
      console.log(arr)
            if(arr.length>=1){
                if(arr[0].payment_type_id === null){
                    setOrder({"order": arr[0]})
                    opm.getProductsbyOrder(token, arr[0].id).then(products=> {
            
                        setProducts(products)
                    })
                }
            }
        })
    }, [])

    if (order.order == null){
        //this will render if there is no current open order
        return (
            <>
            <h1>Please start a new order to view your cart</h1>
            <h5>You can start a new order by adding a product to cart from the home or product details page</h5>
            </>
        )
    }else {
        return (
            <>
            <div className="cart-holder">
                <div className="cart-header"><h1>My Cart...</h1></div>
                <div className="cart-contents">
                    <Card.Group>
                    {products.map(prod=> (
                        <CartCard key={prod.id} product= {prod} {...props} />
                    ))}
                    </Card.Group>
                </div>
                <div className="cart-button-container"><h1>checkout</h1></div>
            </div>
            </>
        )
    }

}
export default MyCart