<template>
  <div class="menu">
    <p>{{errorMessage}}</p>
    <form @submit.prevent>
      <input type="text" placeholder="User Name" v-model="userName" />
      <input type="password" placeholder="Password" v-model="password" />
      <button @click="submitUser()">Login</button>
      <button @click="logOut()" v-if="userAuthenticated">Logout</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: null,
      userName: null,
      userAuthenticated: false,
      errorMessage: null,
    };
  },
  methods: {
    submitUser() {
      axios
        .post("http://localhost:3000/login/auth", {
          userName: this.userName,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          const validTime = 60 * 15 * 1000;
          const expiryDate = new Date(new Date().getTime() + validTime);
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          this.userAuthenticated = true;
          this.authorizationTrigger();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      this.userAuthenticated = false;
      this.authorizationTrigger();
    },
    authorizationTrigger() {
      this.$emit("authentication", this.userAuthenticated);
    },
  },
  mounted: function () {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiryDate");
    if (!token || !expiration) {
      this.errorMessage = "Please login";
    } else if (new Date(expiration) <= new Date()) {
      this.errorMessage = "Session timed out, please login";
      this.logOut();
    } else {
      this.userAuthenticated = true;
      this.authorizationTrigger();
      this.errorMessage="Already logged in"
    }
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  border: rgb(153, 0, 255) 3px solid;
  border-radius: 6px;
  width: 90vw;
  margin: auto;
  align-items: center;
  margin-top: 20px;
  font-family: monospace;
  font-size: 20px;
}

.menu form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu form input {
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  font-family: monospace;
  font-size: 20px;
}

.menu form button {
  width: 300px;
  height: 50px;
  background: rgb(153, 0, 255);
  border-radius: 5px;
  color: white;
  margin-bottom: 20px;
  font-family: monospace;
  font-size: 20px;
}

.menu button:hover {
  background: rgb(61, 9, 95);
  transform: scale(1.05);
}
</style>