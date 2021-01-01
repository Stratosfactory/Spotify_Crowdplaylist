<template>
  <div class="menu">
    <h2>Playlist Menu</h2>
    <div v-if="authorizationComplete === false">
      <p>Click Button to obtain get valid permission from Spotify</p>
      <Button @click="authentication">Request Token</Button>
      <br />
    </div>
    <div v-else>
      <p>
        Search Spotify for Artist, Song or Album and click the search button
      </p>

      <div class="p-inputgroup">
        <InputText
          placeholder="Search Song, Artist or Album"
          v-model="query"
          @keyup.enter="searchSpotify"
        />
        <Button icon="pi pi-search" class="p-button" @click="searchSpotify" />
      </div>
      <p>Type in your user name</p>
      <InputText placeholder="Your Name" v-model="userName" />
      <p>Add a comment and let us know more about the song you have choosen</p>
      <Textarea
        v-model="comment"
        :autoResize="true"
        rows="3"
        cols="30"
        placeholder="Your Comment"
        maxlength="200"
      />
      <p>Click to submit your post</p>
      <Button
        label="Submit Post"
        icon="pi pi-check-circle"
        iconPos="right"
        :disabled="enableButton"
        @click.once="submitPost"
      />
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import axios from "axios";
import Textarea from "primevue/textarea";

export default {
  data: function () {
    return {
      authorizationComplete: false,
      searchCompleted: false,
      token: null,
      query: null,
      spotifyResponse: null,
      searchError: null,
      comment: null,
      userName: "",
    };
  },
  props: {
    selectedElement: { type: Object },
  },
  computed: {
    enableButton() {
      if (this.userName == "" || this.selectedElement === null) {
        return true;
      } else {
        return false;
      }
    },
  },

  components: {
    Button,
    InputText,
    Textarea,
  },
  methods: {
    searchSpotify: function () {
      this.searchCompleted = true;
      const params = {
        q: this.query,
        type: "track",
        market: "DE",
        limit: 6,
      };

      axios
        .get("https://api.spotify.com/v1/search", {
          params: params,
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => this.$emit("search-complete", this.searchCompleted, res))
        .catch((err) => (this.searchError = err));
    },
    authentication: function () {
      axios
        .get("https://crowdplaylist.herokuapp.com/connect/authorization")

        .then((res) => {
          this.token = res.data.access_token;
        })
        .catch((err) => {
          console.log(err);
        });
      this.authorizationComplete = true;
    },
    submitPost() {
      axios
        .post("https://crowdplaylist.herokuapp.com/feed/post", {
          id:
            new Date().toDateString() + "_" + Math.floor(Math.random() * 9999),
          userName: this.userName,
          comment: this.comment,
          spotifyElement: this.selectedElement,
          likes:0,
        })
        .then((res) => {console.log(res)
         this.$emit("refresh-feed")})
        
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.menu {
  border: limegreen 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 5px;
  padding: 1% 1% 1% 1%;
}

.menu h2 {
  border-bottom: limegreen 1px solid;
  padding: 5px 20px 5px 20px;
}

.menu div p {
  color: grey;
  font-size: 14px;
}
</style>