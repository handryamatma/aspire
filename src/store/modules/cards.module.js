const state = {
  cards: [
    {
      name: "Mark Henry",
      number: "3232131231232301",
      expiry: "12/23",
      cvv: "323",
      frozen: false,
    },
    {
      name: "John Cena",
      number: "6343643535222302",
      expiry: "03/12",
      cvv: "333",
      frozen: false,
    },
    {
      name: "Rey Mysterio",
      number: "3232345312323024",
      expiry: "06/19",
      cvv: "423",
      frozen: false,
    },
  ],
  activeCardIndex: 0,
};

const getters = {};

const actions = {
  addCard({ commit }, payload) {
    try {
      commit("setNewCard", payload);
    } catch (error) {
      return error;
    }
  },
  deleteCard({ commit }, index) {
    try {
      commit("setDeleteCard", index);
    } catch (error) {
      return error;
    }
  },
  freezeCard({ commit }, payload) {
    try {
      commit("setFreezeCard", payload);
    } catch (error) {
      return error;
    }
  },
};

const mutations = {
  setNewCard(state, payload) {
    state.activeCardIndex = state.cards.length;
    state.cards.push(payload);
  },
  setDeleteCard(state, index) {
    state.cards.splice(index, 1);
    if (index === state.cards.length) {
      state.activeCardIndex = state.cards.length - 1;
    }
  },
  setFreezeCard(state, payload) {
    state.cards[payload.index].frozen = payload.action;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
