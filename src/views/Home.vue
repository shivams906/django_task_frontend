<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Signup</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
