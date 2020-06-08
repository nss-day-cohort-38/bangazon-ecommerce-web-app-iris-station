import pm from "../../modules/productManager"

const checkQuantity=(id)=> {
    pm.getOneProduct(id).then(product=> {
        // console.log(prod)
        if (product.quantity>0){
            console.log(true)
            return true
        } else {
            console.log(false)
            return false
        }
    })
}
export default checkQuantity