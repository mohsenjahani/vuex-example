
import { Module } from 'vuex'
import {StoreUtils} from "../../StoreUtils";


export interface GridItem {
    id: number,
    title: string,
    address: string,
    tel: string,
}

export interface GridState {
    list: GridItem[],
}

const store = <Module<GridState, any>>{
    namespaced: true,
    state: {
        list: [],
    },
    mutations: {
        setList(state: any, data: GridItem[] = []) {
            state.list = data;
        }
    },
    actions: {
        async getList({ commit, state }) {
            StoreUtils.appLoading(true)
            // calling rest api
            return new Promise((resolve, reject) => {
                if(state.list.length>0){
                    StoreUtils.appLoading(false)
                    return resolve(state.list)
                }
                setTimeout(() => {
                    const list: GridItem[] = []
                    for (let i = 0; i < 20; i++){
                        list.push({
                            id: i+1,
                            title: 'لورم ایپسوم',
                            address: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است',
                            tel: String(Math.round(Math.random()*100000000)),
                        })
                    }
                    commit('setList', list)
                    resolve(list)
                    StoreUtils.appLoading(false)
                }, 1000)
            })
        },
        async getListItem({ commit, state, dispatch }, id) {
            // calling rest api
            return new Promise((resolve, reject) => {
                dispatch('getList').then((list: GridItem[]) => {
                    const findItem = list.find(item => item.id === Number(id))
                    if(findItem!==undefined){
                        resolve(findItem)
                    }else{
                        reject()
                    }
                })
            })
        },
    }
}

export default store
