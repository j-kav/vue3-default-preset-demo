import { createStore } from 'vuex'
import pesel from './modules/pesel';
import peselFavourites from "./modules/peselFavourites";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        pesel,
        peselFavourites,
    },
})

export default store;