import request from './ApiRequestService';

export default {

    get() {
        return new Promise(function (resolve, reject) {
            request
                .get('/api_data/project.json')
                .then(response => {
                        resolve(response.data);
                    }
                ).catch(response => {
                reject(response);
            });
        });
    },
    getRoutes() {
        return new Promise(function (resolve, reject) {
            request
                .get('/api_data/categories.json')
                .then(response => {
                        resolve(response.data.children);
                    }
                ).catch(response => {
                reject(response);
            });
        });
    }
}
