<template>
   <div id="app">
      <div v-if="$route && $route.name !== 'start'" class="w-100">
         <Header @loadMinheight="flag = true" />
         <div class="main" :class="flag ? 'min-vh-100' : 'height'">
            <Sidebar />
            <div class="main-app">
               <router-view />
            </div>
         </div>
      </div>
      <div v-else class="main">
         <router-view />
      </div>
   </div>
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar'
import Header from '@/components/Menu/Header'

export default {
   name: 'App',
   components: {
      Sidebar,
      Header,
   },
   data() {
      return {
         flag: false,
      }
   },
   mounted() {
   }
}
</script>

<style lang="scss">
.bd-placeholder-img {
   font-size: 1.125rem;
   text-anchor: middle;
   -webkit-user-select: none;
   -moz-user-select: none;
   user-select: none;
}

@media (min-width: 768px) {
   .bd-placeholder-img-lg {
      font-size: 3.5rem;
   }
}

.main {
   display: flex;
   width: 100%;
   min-height: 100vh;
}

.height {
   min-height: calc(100vh - 44px);
}

.main-app {
   width: calc(100vw - 300px);
}
</style>
