import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    refreshToken: null,
    cardList: [],
    userAccountsList: [],
    accountsList: [],
    campaignList: [],
    campaignTotalCount: 0,
    campaign: null,
    campaignDescription: null,
    campaignInfluencers: [],
    campaignResults: [],
    campaignBarters: [],
    theme: "red",
    transactionList: [],
  },
  getters: {},
  mutations,
  actions,
  // modules: {},
});
