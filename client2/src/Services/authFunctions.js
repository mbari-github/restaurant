const URL_BASE='http://localhost:8800/api/auth',
    URL_BASE1='http://localhost:8800/api/users',
    HEADERS={'Content-Type':'application/json'};

export default {
    registerUser: (user) => {
        return fetch(URL_BASE + '/register', {
            method: 'post',
            body: JSON.stringify(user),
            headers: HEADERS
        })
    },
    requestLogin: (user, status) => {
        return fetch(URL_BASE + '/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: HEADERS
        })
    },
    checkAuth: () => {
        return fetch(URL_BASE1 + '/checkauthentication', {
            headers: HEADERS,
            credentials:"include"
        })

    }
}