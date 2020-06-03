import PM from "../../modules/productManager"


const depleteProduct=(arr, token)=> {

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
                newObj.quantity-= value
                PM.updateQuantity(token, newObj)
            })
      }
    
}
export default depleteProduct