import React, {useState, useEffect} from 'react';
import PTM from "../../modules/kk-paymenttypes"
import OrderManager from "../../modules/orderManager"
import opm from "../../modules/order_product_manager"

const Checkout = props => {
    const [order, setOrder] = useState({})
    const [pTypes, setPTypes] = useState([])
    const [selectedPaymentId, setSelectedPaymentId] = useState()
    const [products, setProducts] = useState(0)
    const token = sessionStorage.getItem('token')

    const selectPaymentId= e => {
        setSelectedPaymentId(e.target.value)
    }

    const handleSubmit=e=> {
        e.preventDefault()
        
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
        <div className="center">
            <form>
                <select onChange={selectPaymentId}>
                    <option selected disabled>***Please choose one***</option>
                    {pTypes.map(pt=>(
                        <option value={pt.id} id="payment_id">{pt.merchant_name} ***{pt.account_number.substr(pt.account_number.length -4)}</option>
                    ))}
                </select>

            </form>
            <div className="checkout-btn-container">
                <button>Checkout</button>
            </div>
        </div>
        </>
    )
}
export default Checkout