import baseurl from "./baseurl"

export default{
    getOrders(token){
        return fetch(`${baseurl}/orders`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'Accept': "application/json",
                'Authorization': `Token ${token}`
            } 
        }).then(r=>r.json())
    },
    postOrder(token){
        return fetch(`${baseurl}/orders`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(r=>r.json())
    },
    putOrder(token, obj){
        return fetch(`${baseurl}/orders/${obj.id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(obj)
        })
    }
}