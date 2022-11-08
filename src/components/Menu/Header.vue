<template>
    <div :class="closeButton ? 'close' : ''">
        <div class="top-header" :class="theme == 'red' ? 'header-red' : 'header-blue'">
            <div class="text-center col">
                <translate>Limited Offer: ADVY Premium Account 30% Off</translate>
            </div>
            <a href="#" @click="close">
                <Icon icon="carbon:close" />
            </a>
        </div>
        <!-- <div class="d-flex py-2 gap-5">
            <Notification />
            <User />
        </div> -->
    </div>
</template>

<script>
import User from './User';
import Notification from './Notification';
import { Icon } from '@iconify/vue2';
import { mapState } from 'vuex';

export default {
    name: 'CampaignFilters',
    data() {
        return {
            parentName: "",
            closeButton: false,
        }
    },
    components: {
        User,
        Notification,
        Icon,
    },
    computed: {
        ...mapState({
            theme: 'theme'
        })
    },
    created() {
        // if (this.$route.matched[0])
        //     this.parentName = this.$route.matched[0].name;
    },
    methods: {
        close() {
            this.closeButton = true;
            this.$emit('loadMinheight');
        }
    },
}
</script>
  
<style scoped lang="scss">
.top-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}


.close {
    display: none;
}
</style>
  