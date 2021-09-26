<template>
  <div v-if="isAuthenticated">
    <button @click="logout">Logout</button>
    <div class="profile">
      <h1>This is the profile page for {{ user.email }}.</h1>
      <table>
        <tr>
          <td>Username</td>
          <td>{{ user.username }}</td>
          <button @click="editEntry">Edit</button>
          <button @click="deleteEntry('username')">Delete</button>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ user.email }}</td>
          <button @click="editEntry">Edit</button>
          <button @click="deleteEntry('email')" disabled>Delete</button>
        </tr>
        <tr>
          <td>Address</td>
          <td>{{ user.address }}</td>
          <button @click="editEntry">Edit</button>
          <button @click="deleteEntry('address')">Delete</button>
        </tr>
      </table>
    </div>
  </div>
  <div v-else>
    <p><router-link to="/login">Log in</router-link> to view this page.</p>
  </div>
  <!-- template for the modal component -->
  <div v-if="showModal" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
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
            <label for="id_address">Address</label>
            <input
              type="text"
              v-model="address"
              id="id_address"
              placeholder="Enter your address"
            />
          </div>
          <button @click.prevent="hideModal">Cancel</button>
          <button type="submit" @click.prevent="update">Update</button>
        </form>
        <!-- <button class="modal-default-button" @click="hideModal">OK</button> -->
      </div>
    </div>
  </div>

  <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
</template>

<script>
import axios from "axios";
export default {
  name: "Profile",
  data() {
    return {
      showModal: false,
      username: this.$store.state.user.username,
      email: this.$store.state.user.email,
      address: this.$store.state.user.address,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    update() {
      const payload = {
        username: this.username,
        email: this.email,
        address: this.address,
      };
      const headers = {
        Authorization: "Bearer " + this.$store.state.access_token,
      };
      axios
        .patch(
          "https://immense-springs-21952.herokuapp.com/api/users/profile/edit/",
          payload,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.status);
          this.$store.commit("saveUser", response.data);
        });
      this.showModal = false;
    },
    logout() {
      this.$store.commit("logoutUser");
      this.$store.commit("removeToken");
      this.$router.push({ name: "Login" });
    },
    editEntry() {
      this.username = this.user.username;
      this.email = this.user.email;
      this.address = this.user.address;
      this.showModal = true;
    },
    deleteEntry(property) {
      const payload = {};
      if (property == "username") {
        payload.username = "";
      } else if (property == "address") {
        payload.address = "";
      }
      const headers = {
        Authorization: "Bearer " + this.$store.state.access_token,
      };
      axios
        .patch(
          "https://immense-springs-21952.herokuapp.com/api/users/profile/edit/",
          payload,
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.status);
          this.$store.commit("saveUser", response.data);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 401) {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>