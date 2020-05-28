import React, {useState, useEffect} from 'react';
import PTM from "../../modules/kk-paymenttypes"
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"
import depleteProduct from "./depleteProduct"

const Checkout = props => {
    const [order, setOrder] = useState({"id": "", "created_at": "", "payment_type_id": "","customer":{"address":"","id": ""}})
    const [pTypes, setPTypes] = useState([])
    const [selectedPaymentId, setSelectedPaymentId] = useState("")
    const [products, setProducts] = useState([])
    const token = sessionStorage.getItem('token')

    const selectPaymentId= e => {
        setSelectedPaymentId(e.target.value)
    }

    const handleSubmit=()=> {
        if(selectedPaymentId===""){
            alert('Please Select a Payment Method')
        }else{
        //deplete products
        depleteProduct(products, token)
        //changeorder
        const newOrder = order
        newOrder.payment_type_id = Number(selectedPaymentId)
        OrderManager.putOrder(token, newOrder).then(()=> props.history.push("/"))}
    }

    useEffect(()=> {
        PTM.getAllPaymentTypesByUser(token).then(array=>setPTypes(array))
        OrderManager.getOrders(token).then(arr=> {
                    if(arr.length>=1){
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
        <div className="checkout-container">
            <div className="shipping-container">
                <h1>Shipping Address...</h1>
                <h4>{order=== ""? ('no address supplied'): order.customer.address}</h4>
            </div>
            <div className="select-container">
            <form>
                <select onChange={selectPaymentId} value={selectedPaymentId}>
                    <option value="" disabled>***Please choose one***</option>
                    {pTypes.map(pt=>(
                        <option value={pt.id} key={pt.id} id="payment_id">{pt.merchant_name} ***{pt.account_number.substr(pt.account_number.length -4)}</option>
                    ))}
                </select>

            </form>
            </div>
            <div className="checkout-btn-container">
                <button class="ui primary button" onClick={()=> handleSubmit()}>Checkout</button>
            </div>
        </div>
        </>
    )
}
export default Checkout