// renders the cards to the my products page

import React, {useState, useEffect} from 'react';
import productManager from "../../modules/productManager"
import HomeListCard from "../../components/cards/HomeListCard"
import "../home/HomePage.css"

const MyProducts = props => {
    const [prods, setProds] = useState([])


    useEffect(()=> {
        productManager.getHomeList().then(arr=> {
            setProds(arr)
        })
    }, [])
    return (
        <>
        <div className="home-header"><h1>Your Products Listed For Sale</h1><h4>Here's what's new...</h4></div>
        <div className = "list-container">
            {prods.map(product=> (
                <HomeListCard key={product.id} product={product} {...props} />
                
            ))}
        </div>

        </>
    )
}
export default MyProducts