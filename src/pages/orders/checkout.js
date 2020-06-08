//Made by Kurt Krafft

import React, {useState, useEffect} from 'react';
import PTM from "../../modules/kk-paymenttypes"
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"
import depleteProduct from "./depleteProduct"
import "./checkout.css"
import UIfx from 'uifx'
import wooshAudio from "../../sound_fx/fun_bell.mp3"


const Checkout = props => {
    const [order, setOrder] = useState({"id": "", "created_at": "", "payment_type_id": "","customer":{"address":"","id": ""}})
    //below is rhe payment types
    const [pTypes, setPTypes] = useState([])
    const [selectedPaymentId, setSelectedPaymentId] = useState("")
    const [products, setProducts] = useState([])
    const token = sessionStorage.getItem('token')

    const selectPaymentId= e => {
        setSelectedPaymentId(e.target.value)
    }
    const woosh = new UIfx(
        wooshAudio,
        {
            volume: 0.05,
            throttleMs: 100
        }
    )

    const handleSubmit=()=> {
        if(selectedPaymentId===""){
            alert('Please Select a Payment Method')
        }else{
        //deplete products
        depleteProduct(products, token)
        //changeorder
        const newOrder = order
        newOrder.payment_type_id = Number(selectedPaymentId)
        OrderManager.putOrder(token, newOrder).then(()=> woosh.play())}

        // #Cheat codes (I am sure there is a better way, but some times you gotta do whatcha gotta do!)
        setTimeout(() => {props.history.push("/")}, 100)
    }

    useEffect(()=> {
        //get all the payment types associated with the user
        PTM.getAllPaymentTypesByUser(token).then(array=>setPTypes(array))
        OrderManager.getOrders(token).then(arr=> {
            // get the must recent order by the user
                    if(arr.length>=1){
                        //see if they havent paid yet (orders are ordered by created at so the most recent will always be the first one)
                        if(arr[0].payment_type_id === null){
                          
                            setOrder(arr[0])
                            opm.getProductsbyOrder(token, arr[0].id).then(products=> {
                    
                                setProducts(products)
                            })
                        }
                    }
                })
    }, [])

    return(
        <>
        <div className="c-container">
            <div className="checkout-container">
            <div className="header"><h1>Review...</h1></div>
            <div className="shipping-container">
                <h2>Shipping Address:   {order=== ""? ('no address supplied'): order.customer.address}</h2>
            </div>
            <div className="select-container">
            <form>
                <select onChange={selectPaymentId} value={selectedPaymentId}>
                    <option value="" disabled>---Please choose one---</option>
                    {pTypes.map(pt=>(
                        <option value={pt.id} key={pt.id} id="payment_id">{pt.merchant_name} ***{pt.account_number.substr(pt.account_number.length -4)}</option>
                    ))}
                </select>

            </form>
            </div>
            <div className="checkout-btn-container">
                <button className="ui primary button" onClick={()=> handleSubmit()}>Checkout</button>
            </div>
            </div>
        </div>
        </>
    )
}
export default Checkout