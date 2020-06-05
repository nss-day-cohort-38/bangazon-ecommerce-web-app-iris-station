//Made by Kurt Krafft

import React, {useState, useEffect} from 'react';
import PTM from "../../modules/kk-paymenttypes"
import PM from "../../modules/productManager"
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"
// import depleteProduct from "./depleteProduct"
import "./checkout.css"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UIfx from 'uifx'
import fun_bell from '../../sound_fx/fun_bell.mp3'

const chime = new UIfx(
    fun_bell,
    {
      volume: 0.1, // number between 0.0 ~ 1.0
      throttleMs: 100
    }
  )



const depleteProduct= (arr, token)=> {

    const obj = {}
    for(let i=0; i<arr.length; i++){
        if(!obj[arr[i].product.id]){
            obj[arr[i].product.id] = 1
        } else{
            obj[arr[i].product.id] +=1
        }
    }


    for (let [productId, value] of Object.entries(obj)) {
        PM.getOneProduct(productId).then(newObj=> {
            if(newObj.quantity < value){
                confirmAlert({
                    title: `Not Enough ${newObj.title}`,
                    message: `Would you like to buy the remaining ${newObj.quantity}`,
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () => {PM.getOneProduct(productId).then(newObj=> {
                            newObj.quantity= 0
                            PM.updateQuantity(token, newObj)
                        })}
                      },
                      {
                        label: 'No',
                        onClick: () => {}
                      }
                    ]
                  });
            } else {
                PM.getOneProduct(productId).then(newObj=> {
                    newObj.quantity-= value
                    PM.updateQuantity(token, newObj)
                })
            }
            })
      }
      return new Promise((resolve, reject) => {
        resolve("some string");
    });
     
    
    
}


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
    

    const  handleSubmit=async ()=> {
        
        if(selectedPaymentId===""){
            alert('Please Select a Payment Method')
        }else{
        //deplete products
        
        const myPromise = await depleteProduct(products, token)
        const newOrder = order
        newOrder.payment_type_id = Number(selectedPaymentId)
        OrderManager.putOrder(token, newOrder).then(()=> {chime.play();props.history.push("/")})
     
        
        
        
        
       
    }
        
        
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