// initial state
const state = {
  isLoading: false
};

// mutations
const mutations = {
  updateLoadingStatus(state, payload) {
    state.isLoading = payload.isLoading;
  }
};

const getters = {
  isLoading: state => state.isLoading
}

export default {
  state,
  mutations,
  getters
};
