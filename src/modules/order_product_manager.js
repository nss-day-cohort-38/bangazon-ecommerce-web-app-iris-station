//Made by Kurt Krafft to handle dealing with the order_product Viewset in the API
import baseurl from "./baseurl";



export default{
    postNewOrder(token, obj){
        return fetch(`${baseurl}/order_products`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Accept': "application/json",
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=> r.json())
    },
    getProductsbyOrder(token, order_id){
        return fetch(`${baseurl}/order_products?order_id=${order_id}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Accept': "application/json",
                'Authorization': `Token ${token}`
            }
        }).then(r=>r.json())
    },
    deleteRelationship(id){
        return fetch(`${baseurl}/order_products/${id}`, {
            method: "DELETE"  
    })
    }
}
