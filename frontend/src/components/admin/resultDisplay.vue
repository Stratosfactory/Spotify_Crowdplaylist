<template>
  <div class="menu">
    <div v-for="response in responses" :key="response._id" class="element">
      <ul>
        <li>User Name:{{ response.userName }}</li>
        <li>Artist: {{ response.spotifyElement.artist }}</li>
        <li>Song: {{ response.spotifyElement.song }}</li>
      </ul>
      <p>
        <i class="pi pi-times-circle" @click="deleteEntry(response._id)"></i>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      responses: null,
    };
  },

  mounted: function () {
   this.getPosts()
  },
  methods: {
    deleteEntry: function (id) {
      const token = localStorage.getItem("token")
      axios
        .post("https://crowdplaylist.herokuapp.com/feed/delete", {
          id: id,
        },{headers:{Authorization:"Bearer " + token}})
        .then(this.getPosts)
        .catch((err) => console.log(err));
    },
    getPosts: function () {
      axios
        .get("https://crowdplaylist.herokuapp.com/feed/posts")
        .then((res) => {
          this.responses = res.data.posts;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.menu {
  border: rgb(153, 0, 255) 3px solid;
  border-radius: 6px;
  width: 90vw;
  margin: auto;
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.element {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: rebeccapurple solid 2px;
  width: 350px;
  margin: 5px 5px 5px 5px;
  border-radius: 5px;
}

.element ul li {
  text-decoration: none;
  list-style: none;
  text-align: left;
}
.element i {
  font-size: 30px;
  color: rgb(218, 11, 11);
  margin-right: 20px;
}
.element i:hover {
  transform: scale(1.2);
}
</style>