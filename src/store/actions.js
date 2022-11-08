import { ApiService } from "@/api/ApiService";
import store from ".";
export const api = new ApiService();

export default {
  //////////////////user/////////////
  getUsersAccount(context) {
    return api.get("/api/users/account").then((response) => {
      context.commit("updateAccountsList", response.data[0]);
      return response;
    });
  },
  getTransactionsList(context, params) {
    return api
      .get(`/api/billing/transaction/${params.id}?${params.query}`)
      .then((response) => {
        context.commit("updateTransactionsList", response.data.transections);

        return response.data;
      });
  },
  getTransactionStatuses(context) {
    return api.get("/api/billing/transaction_statuses/");
  },
  getUsersProfilePage(context, accountId) {
    return api.get("/api/users/profilepage/" + accountId).then((response) => {
      context.commit("updateUser", response.data);
      return response;
    });
  },
  getCardList(context, id) {
    return api.get(`/api/billing/card/${id}`);
  },
  postClientLogin(context, data) {
    return api.post("/api/users/login_client/", data).then((response) => {
      const { token, user } = response.data;
      localStorage.setItem("accessToken", token.access);
      localStorage.setItem("refreshToken", token.refresh);
      localStorage.setItem("userId", user);
      context.commit("updateRefreshToken", token.refresh);
      return response;
    });
  },
  postClientRegister(context, data) {
    return api.post("/api/users/register_client/", data).then((response) => {
      return response;
    });
  },
  postClientRefresh(context) {
    let data = { refresh: store.state.refreshToken };
    console.log(data);
    return api.post("/api/users/login_refresh/", data).then((response) => {
      const token = response.data;
      localStorage.setItem("accessToken", token.access);
    });
  },
  logoutClient(context, data) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
  },
  putPasswordReset(context, params) {
    return api
      .put("/api/users/password_reset/link/", params)
      .then((response) => {
        return response;
      });
  },

  /////////////////campaign////////////////
  getCampaignList(context, params) {
    return api
      .get(`/api/adv/campaigns_list/${params.id}?${params.query}`)
      .then((response) => {
        context.commit("updateCampaignList", response.data);

        return response.data;
      });
  },
  getCampaignStatuses(context) {
    return api.get("/api/adv/campaign_statuses/");
  },

  getCampaignDescription(context, campaignId) {
    return api
      .get("/api/adv/campaign_description/" + campaignId)
      .then((response) => {
        context.commit("updateCampaignDescription", response.data);

        return response.data;
      });
  },
  getCampaignInfluencers(context, params) {
    return api
      .get(`/api/adv/campaign_influencers/${params.id}?${params.query}`)
      .then((response) => {
        context.commit("updateCampaignInfluencers", response.data);

        return response.data;
      });
  },
  getCampaign(context, campaignId) {
    return api.get("/api/adv/get_campaign/" + campaignId).then((response) => {
      context.commit("updateCampaign", response.data);

      return response.data;
    });
  },
  getOfferStatuses(context) {
    return api.get("/api/adv/offer_statuses/");
  },
  getInfluencerData(context, id) {
    return api.get("/api/adv/get_influencer_data/" + id);
  },
  getCampaignResults(context, params) {
    return api
      .get(`/api/adv/campaign_results/${params.id}?${params.query}`)
      .then((response) => {
        context.commit("updateCampaignResults", response.data);

        return response.data;
      });
  },
  getCampaignBarters(context, params) {
    return api
      .get(`/api/adv/campaign_barter/${params.id}?${params.query}`)
      .then((response) => {
        context.commit("updateCampaignBarters", response.data);

        return response.data;
      });
  },
  getGeoList(context, geo) {
    return api.get(`/api/common/geo/${geo}`);
  },
  getTopicsList(context, topic) {
    return api.get(`/api/adv/topics/${topic}`);
  },
  postCampaignCreate(context, params) {
    return api.post("/api/adv/create_campaign/", params);
  },
  postCampaignFiles(context, params) {
    return api.postFormData("/api/adv/campaign_files/", params);
  },
  putCampaignData(context, params) {
    const campaignId = params.campaignId;
    delete params.campaignId;

    return api.put("/api/adv/campaign/" + campaignId, params);
  },
  ///////////bloggers////////////
  getBlogCategories(context, params) {
    return api.get("/api/adv/blog_categories/");
  },
};
