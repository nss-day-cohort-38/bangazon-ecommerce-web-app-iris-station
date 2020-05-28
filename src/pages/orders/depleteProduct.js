import PM from "../../modules/productManager"


const depleteProduct=(arr, token)=> {

    for(let i=0; i<arr.length; i++){
        let updatedProduct = {...arr[i]}
        if(updatedProduct.quantity===0){
            return {'error': `product is out of stock`, 'id': updatedProduct.id}
        }else {
            PM.getOneProduct(arr[i].product.id).then(obj=> {
                const newObj = obj
                newObj.quantity = obj.quantity - 1
                console.log(newObj)
                PM.updateQuantity(token, newObj)
            })
            // updatedProduct.quantity = updatedProduct.quantity -1
            // console.log(updatedProduct)
            // PM.updateQuantity(token, updatedProduct)
        }
    }
}
export default depleteProduct