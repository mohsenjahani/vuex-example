<template>
  <transition>
    <div v-if="store.state.loading"
         style="background-color: rgba(62,62,62,0.54); backdrop-filter: blur(2px)"
         class="position-fixed d-flex justify-content-center align-items-center top-0 start-0 end-0 bottom-0">
      <div class="spinner-grow text-light" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import {useStore} from "vuex";

  const store = useStore()
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
