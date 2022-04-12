
import { Module } from 'vuex'
import {StoreUtils} from "../../StoreUtils";


export interface UserState {
    logged: boolean,
    user: string | null,
}

const store = <Module<UserState, any>>{
    namespaced: true,
    state: {
        logged: false,
        user: null,
    },
    mutations: {
        setLogged(state: any, user = false) {
            if(user){
                state.logged = true;
                state.user = user;
            }else {
                state.logged = false;
                state.user = null;
            }
        }
    },
    actions: {
        async login({ commit }, data) {
            StoreUtils.appLoading(true)
            // calling rest api
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                    StoreUtils.appLoading(false)
                }, 2000)
            })
        },
        async loginVerify({ commit }, data) {
            StoreUtils.appLoading(true)
            // calling rest api
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('setLogged', data.mobile)
                    resolve(true)
                    StoreUtils.appLoading(false)
                }, 2000)
            })
        },
    }
}

export default store
