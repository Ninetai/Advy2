<template>
   <div class="d-flex flex-column justify-content-between flex-shrink-0 p-3 side-style">
      <CampaignCreate mode="create" />
      <div>
         <router-link to="/" class="d-flex w-100 justify-content-center">
            <img src="@/assets/logo.png" alt="" width="140px">
         </router-link>
         <!-- Modal -->

         <!-- ModalEND -->
         <div class="mt-5">
            <div class="d-flex justify-content-center">
               <button class="btn px-4 create-button" :class="theme == 'red' ? 'red-color' : 'blue-color'"
                  @click="$bvModal.show('create')">
                  <Icon icon="akar-icons:plus" class="me-3" />
                  <translate>Create a campaign</translate>
               </button>
            </div>
            <ul class="nav layout">
               <li v-for="item in items" :key="item.title">
                  <div class="nav-item" :class="item.done ? 'bg-white' : item.flag ? 'clicked' : ''">
                     <Icon :icon="item.icon" />
                     <router-link :to="{ name: item.route }" class="flex-grow-1">
                        <translate>{{ item.title }}</translate>
                     </router-link>
                     <a v-if="item.root" class="down-action" @click="extend(item)">
                        <Icon :icon="item.flag ? 'ant-design:caret-down-filled' : 'ant-design:caret-right-filled'"
                           width="13px" />
                     </a>
                  </div>
                  <ul v-if="item.title === title" class=" nav-item2" :class="item.flag ? 'slide' : 'reverse'">
                     <li class="nav-item3" v-for="inside in insideItem" :key="inside.title"
                        :class="inside.done ? 'bg-white' : ''">
                        <Icon :icon="inside.icon" />
                        <router-link :to="{ name: inside.route }" class="flex-grow-1">
                           <translate>{{ inside.title }}</translate>
                        </router-link>
                     </li>
                  </ul>
                  <ul v-else-if="item.flag" class=" nav-item2">
                     <li class="nav-item3" v-for="inside in insideItem" :key="inside.title"
                        :class="inside.done ? 'bg-white' : ''">
                        <Icon :icon="inside.icon" />
                        <router-link :to="{ name: inside.route }" class="flex-grow-1">
                           <translate>{{ inside.title }}</translate>
                        </router-link>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
      <div>
         <div v-if="$route.matched[0]?.name == 'campaigns'" class="foot-cardmenu"
            :class="theme == 'red' ? 'header-red' : 'header-blue'">
            <h3 class="pt-2 fw-bold">20% discount</h3>
            <p style="padding:0px 10px">
               <translate class="fs-17">On premium ADVY + some text tu</translate>
            </p>
            <button class="buy-button" :class="theme == 'red' ? 'buy-red' : 'buy-blue'">Buy</button>
         </div>
         <div v-else-if="$route.matched[0]?.name == 'bloggers'" class="blogger-side">
            <div class="d-flex justify-content-between">
               <h6 class="card-subtitle mb-3 text-muted fw-bold">
                  <translate>Top bloggers, ER %</translate>
               </h6>
               <DropMenu />
            </div>
            <div class="d-flex align-items-center gap-2 pb-2 mt-1" v-for="item in bloggeritems" :key="item.id">
               <h4 class="fw-bold mb-0">{{ item.id }}</h4>
               <img :src="item.imgsource" width="30px" alt="">
               <span class="fs-14">{{ item.value }} </span>
            </div>
         </div>

         <div class="mt-4">
            <div class="last-select">
               <button class="private-button" :class="private ? 'bg-active' : ''" @click="private = true">
                  <translate>Private</translate>
               </button>
               <button class="private-button" :class="private ? '' : 'bg-active'" @click="private = false">
                  <translate>Agency</translate>
               </button>
            </div>
         </div>
      </div>
   </div>

</template>

<script>
/* global bootstrap: false */
import { Icon } from '@iconify/vue2'
import CampaignCreate from '../campaigns/CampaignCreate.vue';
import DropMenu from "../global/DropMenu.vue"
import { mapState } from 'vuex';
import user1 from "@/assets/users/user1.png";
import user2 from "@/assets/users/user2.png";
import user3 from "@/assets/users/user3.png";

export default {
   name: 'Sidebar',
   components: {
      Icon,
      CampaignCreate,
      DropMenu,
   },
   data() {
      return {
         private: true,
         title: '',
         items: [
            { title: 'Campaigns', icon: "bx-trending-up", done: false, route: 'campaigns', root: true, flag: false },
            { title: 'Settings', icon: "ep:setting", done: false, route: 'settings', root: false, flag: false },
            { title: 'Information', icon: "bx-info-circle", done: false, route: 'information', root: false, flag: false },
         ],
         insideItem: [
            { title: 'Bloggers', icon: "bxs-user-detail", done: false, route: 'bloggers' },
            { title: 'Overview', icon: "radix-icons:bar-chart", done: false, route: 'description' },
            { title: 'Barter', icon: "bx-refresh", done: false, route: 'barterSettings' },
         ],
         bloggeritems: [
            { id: 1, imgsource: user1, value: 'Алекс - 19,1% ' },
            { id: 2, imgsource: user2, value: 'Марта - 17,8% ' },
            { id: 3, imgsource: user3, value: 'Ангелина - 17,4% ' },
         ],
      }
   },
   computed: {
      ...mapState({
         theme: 'theme'
      })
   },
   watch: {
      $route: {
         handler() {
            this.items.map(item => { item.done = false; });
            this.insideItem.map(item => { item.done = false; });
            if (this.$route.matched[0].name == "bloggers") {
               this.items[0].flag = true;
               this.insideItem[0].done = true;
               this.title = 'Campaigns';
            }
            else if (this.$route.matched[0].name == "campaigns") {
               this.items[0].flag = false;
               this.items[0].done = true;
            }
            else if (this.$route.matched[0].name == "description") {
               this.items[0].flag = true;
               this.insideItem[1].done = true;
               this.title = 'Campaigns';
            }
         }
      }
   },
   methods: {
      onPopupClose(value) {
         this.isNewCampaign = false;
      },
      extend(item) {
         item.flag = !item.flag;
         this.title = item.title;
      }

   }
}
</script>
<style scoped lang="scss">
.side-style {
   width: 280px;
   min-height: 890px;
   color: black;
   background-color: #f0f2fa;
   padding-top: 2rem !important;
}

.create-button {
   display: flex;
   align-items: center;
   font-weight: 600;

   color: white !important;
   height: 43px !important;
   border-radius: 17px;
}

.red-color {
   background-color: #FE5D6D !important;
}

.blue-color {
   background-color: #367BF2 !important;
}

.nav-item {
   display: flex;
   align-items: center;
   margin: 6px 16px;
   padding: 8px 20px;
   background-color: #f0f2fa;
   gap: 16px;
   border-radius: 16px;
   cursor: pointer;
   font-size: 17px;
   font-weight: 600;
}

@keyframes example {
   from {
      height: 0px;
      margin: 0px 16px;
   }

   to {
      height: 136px;
      margin: 6px 16px;
   }
}

@keyframes example2 {
   to {
      height: 0px;
      margin: 0px 16px;
   }

   from {
      height: 136px;
      margin: 6px 16px;
   }
}

.nav-item2 {
   overflow: hidden;
   display: flex;
   flex-direction: column;
   padding: 0px;
   align-items: center;
   background: #dddce2;
   gap: 0.5rem;
   border-radius: 16px;
   cursor: pointer;
}

.slide {
   animation-name: example;
   animation-duration: 0.8s;
   animation-fill-mode: forwards;
}

.reverse {
   // animation-direction: reverse;
   animation-name: example2;
   animation-duration: 0.8s;
   animation-fill-mode: forwards;
}

.clicked {
   background: #dddce2;
}

.layout {
   flex-direction: column;
   margin-top: 60px;
}

.nav-item3 {
   width: 100%;
   gap: 16px;
   display: flex;
   align-items: center;
   border-radius: 16px;
   padding: 8px 20px;

}

.foot-cardmenu {
   margin-top: 3rem;

   border-radius: 18px;
   color: white;
   text-align: center;
   padding: 20px;
}

.blogger-side {
   margin-top: 3rem;
   background-color: white;
   border-radius: 18px;
   padding: 30px 20px 10px 20px;
}

.buy-button {
   height: 43px;
   border-radius: 16px;
   border: 0px;
   color: white;

   width: 100%;
}

.buy-red {
   background-color: #B76262;
}

.buy-blue {
   background: #5A97FF;
}

.last-select {
   height: 43px;
   border-radius: 16px;
   background: lightgray;
   margin: 20px;
   display: flex;
}

.private-button {
   width: 100%;
   border: 0;
   border-radius: 16px;
   margin: 2px;
   background: lightgray;
}

.bg-active {
   animation-name: example-active;
   animation-duration: 0.5s;
   animation-fill-mode: forwards;
}

@keyframes example-active {
   from {
      background-color: lightgray;
   }

   to {
      background-color: white;
   }
}

.down-action {
   :hover {
      color: blue;
   }
}
</style>
