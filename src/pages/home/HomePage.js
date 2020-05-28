// renders the cards to the home as well as a simple welcome message

import React, {useState, useEffect} from 'react';
import productManager from "../../modules/productManager"
import orderManager from "../../modules/orderManager"
import order_product_manager from "../../modules/order_product_manager"
import HomeListCard from "../../components/cards/HomeListCard"
import "./HomePage.css"

const HomePage = props => {
    const [prods, setProds] = useState([])
    const token = sessionStorage.getItem('token')

    const handleAddToCard= productId=> {
        console.log('we made it')   
        orderManager.getOrders(token).then(arr=> {
            if (arr.length>0){
            if(arr[0].payment_type_id != null){
                orderManager.postOrder(token).then(obj=> {
                    const productRelationship = {
                        "order_id": obj.id,
                        "product_id": productId
                    }
                    order_product_manager.postNewOrder(token, productRelationship).then(()=>props.history.push('/'))
                })
            } else{
                const productRelationship = {
                    "order_id": arr[0].id,
                    "product_id": productId
                }
                order_product_manager.postNewOrder(token, productRelationship).then(()=>props.history.push('/'))
            }}
            else{
                orderManager.postOrder(token).then(obj=> {
                    const productRelationship = {
                        "order_id": obj.id,
                        "product_id": productId
                    }
                    order_product_manager.postNewOrder(token, productRelationship).then(()=>props.history.push('/'))
                })
            }
        })
    }


    useEffect(()=> {
        productManager.getHomeList().then(arr=> {
            setProds(arr)
        })
    }, [])
    return (
        <>
        <div className="home-header"><h1>Welcome Back!</h1><h4>Here's what's new...</h4></div>
        <div className = "list-container">
            {prods.map(product=> (
                <HomeListCard key={product.id} product={product} handleAddToCard={handleAddToCard} {...props} />
                
            ))}
        </div>

        </>
    )
}
export default HomePage