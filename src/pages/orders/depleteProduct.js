//Worked on by Kurt Krafft
import PM from "../../modules/productManager"

//this function will take an array and a user token (for the api)
//it will then create an object where the key is the id of the product and the value is the
//amount of times a product will appear in an array
//it will then iterate of the keys and values of te products and reduce the quantity of said product by the amount of 
//times it is in the array


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