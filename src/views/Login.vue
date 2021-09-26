<template>
  <div class="login">
    <h1>This is a login page</h1>
    <form action="" method="post">
      <div class="field">
        <label for="id_email">Email:</label>
        <input
          type="text"
          v-model="email"
          id="id_email"
          placeholder="Enter your email"
        />
      </div>
      <div class="field">
        <label for="id_password">Password</label>
        <input
          type="password"
          v-model="password"
          id="id_password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" @click.prevent="login">Login</button>
      <p>
        If you are not registered, then
        <router-link to="/signup">sign up</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("https://immense-springs-21952.herokuapp.com/api/token/", payload)
        .then((response) => {
          console.log(response);
          this.$store.commit("getToken", {
            access_token: response.data.access,
            refresh_token: response.data.refresh,
          });
          const headers = {
            Authorization: "Bearer " + this.$store.state.access_token,
          };
          axios
            .get(
              "https://immense-springs-21952.herokuapp.com/api/users/profile/",
              { headers }
            )
            .then((response) => {
              // const base = {
              //   baseURL: "http://127.0.0.1:8000/api/users/",
              //   headers: {
              //     Authorization: "Bearer " + this.$store.state.access_token,
              //     "Content-Type": "application/json",
              //   },
              //   xhrFields: {
              //     withCredentials: true,
              //   },
              // };
              // const axiosInstance = axios.create(base);
              // axiosInstance({
              //   url: "/profile/",
              //   method: "get",
              //   params: {},
              // }).then((response) => {
              console.log(response);
              this.$store.commit("saveUser", response.data);
              this.$router.push({ name: "Profile" });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
