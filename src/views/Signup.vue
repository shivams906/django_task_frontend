<template>
  <div class="signup">
    <h1>This is a signup page.</h1>
    <form action="" method="post">
      <div class="field">
        <label for="id_username">Username</label>
        <input
          type="text"
          v-model="username"
          id="id_username"
          placeholder="Enter your username"
        />
      </div>
      <div class="field">
        <label for="id_email">Email</label>
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
      <div class="field">
        <label for="id_password2">Confirm Password</label>
        <input
          type="password"
          v-model="password2"
          id="id_password2"
          placeholder="Enter your password again"
        />
      </div>
      <div class="field">
        <label for="id_address">Address</label>
        <input
          type="text"
          v-model="address"
          id="id_address"
          placeholder="Enter your address"
        />
      </div>
      <button type="submit" @click.prevent="signup">Sign Up</button>
      <p>
        If you are already registered, then
        <router-link to="/login">Log in</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      address: "",
    };
  },
  methods: {
    signup() {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        address: this.address,
      };
      axios
        .post("https://immense-springs-21952.herokuapp.com/api/users/", payload)
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    },
  },
};
</script>