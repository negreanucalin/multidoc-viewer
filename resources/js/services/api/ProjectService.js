import request from '../../axiosBase';

export default {
    async get() {
        let response = await request.get('/vendor/multidoc/api_data/project.json');
        return response.data;
    },
    async getRoutes() {
        let response = await request.get('/vendor/multidoc/api_data/categories.json');
        return response.data.children;
    }
}
