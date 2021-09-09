import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '',
        redirect: {
            name: 'home'
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '../views/home/index.vue'),
    },
    {
        path: '/breed/:breedId',
        name: 'breed',
        component: () => import(/* webpackChunkName: 'breed' */ '../views/breed/index.vue'),
    },
    {
        path: '/favourites',
        name: 'favourites',
        component: () => import(/* webpackChunkName: 'favourites' */ '../views/favourites/index.vue'),
    },
/*    {
        path:'/:catchAll(.*)',
        component: () => import(/!* webpackChunkName: 'notFound' *!/ '../views/notFound/index.vue'),
    },*/
];

const router = createRouter({
    history: createWebHistory('vue3-default-preset-demo'),
    routes
});

export default router;