import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth/auth.store'
import grid from './modules/grid/grid.store'

const plugins = [
    createLogger({}),
    createPersistedState({ storage: window.sessionStorage })
]

export const store = createStore({
    plugins,
    modules: {
        auth,
        grid,
    },
    state: {
        loading: false,
    },
    mutations: {
        setLoading(state: any, loading) {
            state.loading = loading;
        }
    },
    actions: {},
});

export default store
