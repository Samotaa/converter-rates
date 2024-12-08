// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import ConverterPage from '../Views/ConverterPage.vue'
import RatesPage from '../Views/RatesPage.vue'

const routes = [
    { path: '/', component: ConverterPage },
    { path: '/rates', component: RatesPage },
];

const router = createRouter({
    history: createWebHistory('/converter-rates/'),
    routes,
});

export default router
