import axios from 'axios'

let options = {
    baseURL: process.env.MIX_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    }
};
let request =  axios.create(options);


request.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    //Redirect if status 403
    if (error.response.status === 403) {

    }
    return Promise.reject(error);
});


export default request;
