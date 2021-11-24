import axios from 'axios'

let options = {
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    }
};
export default axios.create(options);
