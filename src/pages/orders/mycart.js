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
        console.log('we got to my cart')
        OrderManager.getOrders(token).then(arr=> {
            console.log("orders array", arr)
            if(arr.length>1){
                if(arr[0].payment_type_id === null){
                    setOrder({"order": arr[0]})
                    opm.getProductsbyOrder(token, arr[0].id).then(products=> {
                        console.log('products', products)
                        setProducts(products)
                    })
                }
            }
        })
    }, [])

    if (order.order == null){
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