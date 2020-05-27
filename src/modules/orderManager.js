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
        })
    }
}