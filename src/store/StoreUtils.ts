import store from "./index";

export class StoreUtils {

    public static appLoading(loading: boolean = false){
        store.commit("setLoading", loading, {root: true})
    }

}
