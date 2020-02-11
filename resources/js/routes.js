import VueRouter from 'vue-router';

import HeaderComponent from "./pages/includes/HeaderComponent";
import MainPage from "./pages/MainPage";

const routes = [
    {
        name: 'main', path: '/', components: {header: HeaderComponent, content: MainPage},
        meta: {
            name: 'Main page'
        }
    }
];


let router = new VueRouter({
    routes
});


export default router;
