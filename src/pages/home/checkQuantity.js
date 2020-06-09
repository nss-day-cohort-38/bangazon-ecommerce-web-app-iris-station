import pm from "../../modules/productManager"

const checkQuantity=(id)=> {
    pm.getOneProduct(id).then(product=> {
        // console.log(prod)
        if (product.quantity>0){
            return true
        } else {
            return false
        }
    })
}
export default checkQuantity