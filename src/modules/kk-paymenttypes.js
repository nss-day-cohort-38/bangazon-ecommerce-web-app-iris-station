import baseurl from "./baseurl";


export default{
    getAllPaymentTypesByUser(token){
        return fetch(`${baseurl}/payment_types`,{
            method: "GET",
            headers:{
                "content-type": "application/json",
                "accept":"application/json",
                "Authorization": `Token ${token}`
            }
        }).then(r=>r.json())
    }
}
