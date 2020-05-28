import baseurl from "./baseurl"

const remoteUrl = 'http://localhost:8000'

export default {
    getHomeList (){
        return fetch(`${baseurl}/products?number`).then(r=> r.json())
    },
    getOneProduct(id){
        return fetch(`${baseurl}/products/${id}`).then(r=>r.json())
    },
    updateQuantity(token, obj){
        return fetch(`${baseurl}/products/${obj.id}`, {
            method: 'PUT',
            headers: {
                'content-type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(obj)
        }).then(r=>r.json())
    }
}