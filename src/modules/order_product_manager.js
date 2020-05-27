import baseurl from "./baseurl"

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
    }
}