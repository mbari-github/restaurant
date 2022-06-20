const URL_BASE ='http//localhost:8800/api',
    HEADERS={'Content-Type':'application/json'};



export default {
    getAllProducts: () => {
        return fetch(URL_BASE + '/products/',{
            headers:HEADERS
        })
            .then(res => res.json())
    }
}