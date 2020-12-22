<template>
  <div
    :class="[
      searchCompleted ? 'applayout' : 'applayout-init',
      searchCompleted ? 'gridSize' : '',
    ]"
  >
  
    <user-input
      style="grid-area: menu"
      @search-complete="setgridLayout"
      :selectedElement="selectedElement"
      @refresh-feed="refreshFeed"
    ></user-input>
    <data-lake
      style="grid-area: datalake"
      v-if="searchCompleted"
      :response="spotifyResponse"
      @select-element="passElement"
    ></data-lake>
    <user-feed
      style="grid-area: feed"
      :refreshTrigger="refreshTrigger"
    ></user-feed>
  </div>
</template>

<script>
import userFeed from "./userfeed";
import userInput from "./userinput";
import dataLake from "./datalake";

export default {
  
  data() {
    return {
      searchCompleted: false,
      spotifyResponse: null,
      selectedElement: null,
      refreshTrigger: false,
    };
  },
  components: {
  
    userFeed,
    dataLake,
    userInput,
  },
  methods: {
    setgridLayout(completion, res) {
      this.searchCompleted = true;

      this.spotifyResponse = res;
    },
    passElement(el) {
      this.selectedElement = el;
    },
    refreshFeed() {
      this.refreshTrigger = true;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.applayout-init {
  display: grid;
  grid-template-areas:
    
    "menu menu"
    "feed feed";
  gap: 10px;
}

.applayout {
  display: grid;
  grid-template-areas:
    "nav nav"
    "menu  datalake"
    "feed feed";
  gap: 10px;
}

@keyframes changeGrid {
  0% {
    grid-template-columns: 100% 0%;
  }

  16% {
    grid-template-columns: 90% 10%;
  }

  33% {
    grid-template-columns: 80% 20%;
  }

  50% {
    grid-template-columns: 73% 27%;
  }

  66% {
    grid-template-columns: 65% 35%;
  }

  82% {
    grid-template-columns: 57% 42%;
  }

  100% {
    grid-template-columns: 50% 50%;
  }
}

.gridSize {
  animation: changeGrid 0.25s ease-in-out forwards;
}

@media(max-width: 1000px){
  .applayout{
    grid-template-areas:
    "nav nav"
    "menu  menu"
    "datalake datalake"
    "feed feed";
}}
</style>
