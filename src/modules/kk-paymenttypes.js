// import baseurl from "./baseurl";
const baseurl = "http://localhost:8000"


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
