export default {
  updateAccountsList(state, accountsList) {
    state.accountsList = accountsList;
  },
  updateUser(state, data) {
    state.user = data[0];
    state.cardList = data[1];
    state.userAccountsList = data[3];
  },
  updateRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  updateCampaignList(state, campaigns) {
    state.campaignList = campaigns?.results ?? [];
    state.campaignTotalCount = campaigns?.count ?? 0;
  },
  updateCampaign(state, campaign) {
    state.campaign = campaign;
  },
  updateCampaignDescription(state, campaignDescription) {
    state.campaignDescription = campaignDescription;
  },
  updateCampaignInfluencers(state, campaignInfluencers) {
    state.campaignInfluencers = campaignInfluencers.results;
  },
  updateCampaignResults(state, campaignResults) {
    state.campaignResults = campaignResults.results;
  },
  updateCampaignBarters(state, campaignBarters) {
    state.campaignBarters = campaignBarters.results;
  },
  updateTheme(state, theme) {
    state.theme = theme;
  },
  updateTransactionsList(state, transactions) {
    state.transactionList = transactions ?? [];
  },
};
