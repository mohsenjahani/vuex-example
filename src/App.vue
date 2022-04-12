<script setup lang="ts">
  import { useStore } from 'vuex'
  import Loading from "./components/Loading.vue";

  const store = useStore()
  console.log(store.state.auth.logged)

  store.commit('setLoading', false)
  store.commit('grid/setList', [])

</script>

<template>
  <div class="container h-100 py-5">
    <router-view></router-view>
  </div>
  <Loading />
</template>

<style>
#app {
  height: 100vh;
  overflow-y: auto;
  background-color: #f5f5f5;
  font-family: 'SahelF',Tahoma, serif;
}
</style>
