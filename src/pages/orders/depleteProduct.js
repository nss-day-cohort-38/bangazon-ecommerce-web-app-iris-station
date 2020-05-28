import PM from "../../modules/productManager"

const depleteProduct=(arr, token)=> {

    for(let i=0; i<arr.length; i++){
        let updatedProduct = {...arr[i]}
        if(updatedProduct.quantity===0){
            return {'error': `product is out of stock`, 'id': updatedProduct.id}
        }else {
            updatedProduct.quantity = updatedProduct.quantity -1
            PM.updateQuantity(token, updatedProduct)
        }
    }
}