<template>
  <div class="d-flex flex-column h-100">

    <nav class="navbar navbar-light box d-flex mb-3 bg-light px-4 py-3">
      <div>
        <router-link class="navbar-brand" to="/">داشبورد</router-link>
        <span class="nav-item">کاربر: <strong>{{store.state.auth.user}}</strong></span>
      </div>
      <button @click="logOut" class="nav-item btn btn-danger">خروج</button>
    </nav>
    <div class="box table flex-grow-1 px-4 py-3">
      <table class="table align-middle">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">عنوان</th>
          <th class="d-none d-md-table-cell" scope="col">آدرس</th>
          <th scope="col">تلفن</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in store.state.grid.list">
          <th scope="row">{{item.id}}</th>
          <td>{{item.title}}</td>
          <td class="d-none d-md-table-cell">{{item.address}}</td>
          <td>{{item.tel}}</td>
          <td><router-link :to="'/item/'+item.id"
                           class="btn btn-info">نمایش جزئیات</router-link></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal fade"
       :class="{ 'show': showModal }"
       style="background-color: rgba(62,62,62,0.54); backdrop-filter: blur(2px); display:block;"
       :style="{ pointerEvents: showModal?'auto':'none' }"
       data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLiveLabel" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div v-if="item!==null" class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLiveLabel">{{ item.title }} - {{ item.id }}</h5>
          <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>آدرس: {{ item.address }}</p>
          <p>تلفن: {{ item.tel }}</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">بستن</button>
          <button @click="closeModal" type="button" class="btn btn-primary">تایید</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const store = useStore()
const router = useRouter()
const route = useRoute()


// load list data
store.dispatch('grid/getList')

/**
 * Logout
 */
const logOut = () => {
  store.commit('auth/setLogged', false)
  router.push('/login')
}


const showModal = ref(false)
const item = ref(null)
const showItem = (id: any) => {
  store.dispatch('grid/getListItem', id).then(res => {
    showModal.value = true
    item.value = res
  })
}
const closeModal = () => {
  showModal.value = false
  setTimeout(() => item.value = null, 500)
  router.push('/')
}

watch(() => route.params.id, () => {
  const itemId = route.params.id
  if(itemId){
    showItem(itemId)
  }
}, {immediate: true})
</script>

<style lang="scss" scoped>
  .box {
    background-color: white !important;
    border-radius: 5px;
  }
  .table {
    overflow-y: auto;
  }
</style>
