//A component to render the users cart to the DOM 

import React, {useState,useEffect} from 'react';
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"
import {Card} from 'semantic-ui-react'
import CartCard from "../../components/cards/cartcard"
import "./mycart.css"

const MyCart = props => {
    const [products, setProducts] = useState([])
    const [order, setOrder] = useState({"order": null})
    const [reload, setReload] = useState(false)
    const token = sessionStorage.getItem('token')
    


    const deleteProductFromOrder= (id)=> {
        if(products.length===1){
            opm.deleteRelationship(id).then(()=> {
                setReload(!reload)
            }).then(()=> {
                deleteWholeOrder(order["order"].id)
            })

        }else{
        opm.deleteRelationship(id).then(()=> {
            setReload(!reload)
        })}
    }
    const deleteWholeOrder=(id)=>{
        OrderManager.deleteOrder(token, id).then(()=> props.history.push('/'))
    }

    useEffect(()=> {
//I start by grabbing all the orders and ten I see if there more than 0 orders and if so i check to see if there is an open order by seeing
// if the pt-id is null (meaning it hasn't been closed) after that I get all the relationships with the products to that order and set them in start
//and then I place those into cards
        OrderManager.getOrders(token).then(arr=> {
      
            if(arr.length>=1){
                if(arr[0].payment_type_id === null){
                    setOrder({"order": arr[0]})
                    opm.getProductsbyOrder(token, arr[0].id).then(products=> {
                        const realProducts = products.filter(prod=> prod.product.deleted === null)
                        const deletedProducts = products.filter(prod=> prod.product.deleted !== null)
                        deletedProducts.forEach(proddy=> deleteProductFromOrder(proddy.id))
                        setProducts(realProducts)
                    })
                }
            }
        })
    }, [reload])

    if (order.order == null){
        //this will render if there is no current open order
        return (
            <>
            <div className="sorry">
            <h1>Please start a new order to view your cart</h1>
            <h5>You can start a new order by adding a product to cart from the home or product details page</h5>
            </div>
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
                        <CartCard key={prod.id} product= {prod} {...props} deleteProductFromOrder={deleteProductFromOrder}/>
                    ))}
                    </Card.Group>
                </div>
                <div className="cart-button-container">
                    
                    <button  className="ui primary button" onClick={()=> props.history.push('/checkout')}>Checkout</button>
                    {order.order != null ? <button  className="ui primary button" onClick={()=> deleteWholeOrder(order["order"].id)}>Cancel Order</button> : (<></>)}
                </div>
            </div>
            </>
        )
    }

}
export default MyCart
