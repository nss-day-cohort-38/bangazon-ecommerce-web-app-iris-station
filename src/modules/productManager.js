const remoteUrl = 'http://localhost:8000/'

export default {
    getHomeList (){
        return fetch(`${remoteUrl}products?number`).then(r=> r.json())
    }
}