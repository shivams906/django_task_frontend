import { createStore } from 'vuex'
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default createStore({
  state: {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    user: {},
    isAuthenticated: false,
  },
  mutations: {
    saveUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = {}
      state.isAuthenticated = false
    },
    getToken(state, data) {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      state.access_token = data.access_token;
      state.refresh_token = data.refresh_token;
    },
    refreshToken(state, newToken) {
      localStorage.setItem("access_token", newToken);
      state.access_token = newToken;
    },
    removeToken(state) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      state.access_token = null;
      state.refresh_token = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
