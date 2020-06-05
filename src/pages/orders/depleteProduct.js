//Worked on by Kurt Krafft
import PM from "../../modules/productManager"

//this function will take an array and a user token (for the api)
//it will then create an object where the key is the id of the product and the value is the
//amount of times a product will appear in an array
//it will then iterate of the keys and values of te products and reduce the quantity of said product by the amount of 
//times it is in the array
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const options = {
    title: 'Out of Stock',
    message: "I am sorry, but the doesn't have enough stock would you like to buy the remainder?",
    buttons: [
      {
        label: 'Yes',
        onClick: () => alert('Click Yes')
      },
      {
        label: 'No',
        onClick: () => alert('Click No')
      }
    ],
    childrenElement: () => <div />,
    customUI: ({ onClose }) => <div>Custom UI</div>,
    closeOnEscape: true,
    closeOnClickOutside: true,
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {}
  };


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
            if(newObj.quantity < value){
                alert(`I am sorry, but the vendor doesn't have enough stock for the ${newObj.title}`)
                value = false
            }
            })
      }
      
    if(value != false){
        for (let [productId, value] of Object.entries(obj)) {
        PM.getOneProduct(productId).then(newObj=> {
                newObj.quantity-= value
                PM.updateQuantity(token, newObj)
            })
      }
    }  
    
    
}
export default depleteProduct