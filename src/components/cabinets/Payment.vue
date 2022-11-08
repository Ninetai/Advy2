<template>
    <main>
        <AddCard />
        <div class="d-flex justify-content-between mb-3">
            <translate class="fs-18 fw-bold">Payment info</translate>
            <div class="text-primary d-flex gap-2 align-items-center">
                <Icon icon="bx:time-five" />
                <router-link v-if="user" :to="{
                    name: 'story',
                    params: {
                        id: user.id
                    }
                }">
                    <translate class="text-primary"> Payment history</translate>
                </router-link>
            </div>
        </div>
        <template v-if="cardList && cardList.length > 0">
            <div v-for="(card, index) in cardList">
                <div>
                    {{ card.hidden_card_number }} <span v-if="index === 0">
                        <translate>(main)</translate>
                    </span>
                </div>
            </div>
        </template>
        <div v-else class="mb-3">
            <translate class="fs-18">No cards added</translate>
        </div>
        <button class="btn btn-outline-primary border-r16 p-2 px-4" @click="$bvModal.show('addCard')">
            <translate> Add card</translate>
        </button>
    </main>
</template>
<script>
import { Icon } from '@iconify/vue2'
import { mapActions, mapState } from "vuex";
import AddCard from './AddCard.vue'

export default {
    name: 'CabinetPay',
    components: {
        Icon,
        AddCard
    },
    data() {
        return {
            currentAccountId: '',
            cardList: [],
        }
    },
    created() {
        this.getCards();
    },
    methods: {
        ...mapActions([
            'getUsersAccount',
            'getCardList',
        ]),
        getCards() {
            this.getUsersAccount()
                .then((response) => {
                    let userAccountList = response.data[0];
                    this.currentAccountId = userAccountList[0].id;

                    this.getCardList(this.currentAccountId).then(res => this.cardList = res.data);
                });
        },
    },
    computed: {
        ...mapState(['user']),
    },
}
</script>
<style>

</style>