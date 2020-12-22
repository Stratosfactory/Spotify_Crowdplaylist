<template>

  <div class="menu">
    <h2>Spotify results</h2>
    <p>Select a result from below</p>
    <div class="results">
      <div v-for="item in spotifyResponse" :key="item.id" :class="{selected:item.selected}" @click="selectElement(item.id, )">
        <img :src="item.image" />

        <p>Artist: {{ item.artist }}</p>
        <p>Songname: {{ item.song }}</p>
        <p>Album: {{ item.album }}</p>
        
        
      </div> 
     </div>
  </div>
  
</template>

<script>
export default {
  data: function () {
    return {
     selectedElement:null,
     spotifyResponse:null,
     
    };
  },
watch:{
  response:{
      immediate:true,
      handler: function(){
      const resNumbers = this.response.data.tracks.items.length;
      const arrItems = this.response.data.tracks.items;
      var resArray = [];
      for (let i = 0; i < resNumbers; i++) {
        
          var data = {
            id: i,
            artist: arrItems[i].artists[0].name,
            song: arrItems[i].name,
            album: arrItems[i].album.name,
            image: arrItems[i].album.images[1].url,
            preview:arrItems[i].preview_url,
            song_url:arrItems[i].href,
            selected:false,
            };
          resArray.push(data);
        
      }
    this.spotifyResponse= resArray;
  }}
},
  
  props: {
    response: { type:Object,required: true,},
  },
  methods:{
    selectElement(id){
      const arrLen = this.spotifyResponse.length
      for(let i=0;i<arrLen;i++){
        this.spotifyResponse[i].selected = false;
      }
      this.spotifyResponse[id].selected =!this.spotifyResponse[id].selected;
      this.$emit("select-element", this.spotifyResponse[id])
      },
},
}
</script>

<style scoped>
.menu {
  border: limegreen 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
  border-radius: 5px;
  margin-right: 10px;
  margin-left: 5px;
}

.menu h2 {
  border-bottom: limegreen 1px solid;
  padding: 5px 20px 5px 20px;
}

.menu p
{
   color: grey;
  font-size: 14px;
}

.menu div p {
  color: black;
  font-family: monospace;
  font-size: 15px;
  margin-top:1px;
}

.results {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  flex-direction: row;
}

.results div {
  margin: 0px 5px 5px 5px;
  width: 200px;
  height: 280px;
  align-self: flex-start;
  border: 4px double limegreen;
  display: flex;
  justify-content:space-around;
  flex-direction: column;
  background:rgba(91, 182, 132, 0.3);
  border-radius: 7px;
 }

 .results div:hover {
  
  border-color: rgb(72, 28, 155);
  transform: scale(1.03);
 }

 .selected{
   background:rgba(91, 182, 132, 1) !important;
  border-color: rgb(72, 28, 155) !important;
  transform: scale(1.02) !important;

 }




.results div img {
  width: 90px;
  height: 90px;
  border: rgb(91, 182, 132) 2px double;
  border-radius: 70%;
  align-self: center;
}
</style>