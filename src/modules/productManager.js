import baseurl from "./baseurl"

const remoteUrl = 'http://localhost:8000'

export default {
    getHomeList (){
        return fetch(`${baseurl}/products?number`).then(r=> r.json())
    },
    getOneProduct(id){
        return fetch(`${baseurl}/products/${id}`).then(r=>r.json())
    }
}