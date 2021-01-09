<template>
  <div class="menu">
    <h2>Was andere Gäste hinzugefügt haben</h2>
    
    <section class="container">
      <div v-for="post in posts" :key="post._id" class="element">
        <img :src="post.spotifyElement.image">
        <div class="datablock">
        <i class="pi pi-user"></i>
        <p>{{ post.userName }}</p>
        </div>
        <div class="song">
          <i class="pi pi-volume-up"></i>
          <p>Artist:{{ post.spotifyElement.artist }}</p>
          <p>Song:{{ post.spotifyElement.song }}</p>
        </div>
        <div class="datablock">
        <i class="pi pi-comment"></i>
        <p>{{ post.comment }}</p>
        </div>
      <p class="likeButton" @click.once="likeElement(post)"><i class="pi pi-heart"></i>{{post.likes}}</p>
      </div>
      
    </section>
    <Button @click.once="getPosts()">ALLE ANZEIGEN</Button>
  </div>
</template>


<script>
import axios from "axios";
import Button from "primevue/button"

export default {
  components:{Button},
  data: function () {
    return {
      posts: null,
      test:null
    };
  },
  props:{refreshTrigger:{type:Boolean}},
  methods: {
    getPosts(number) {
      axios
        .get("https://crowdplaylist.herokuapp.com/feed/posts")
        .then((res) => {
          let numberElements = 0
          if(number >= res.data.posts.length || number ===0){
           numberElements = res.data.posts.length
          }else{
           numberElements = number
          }
          this.test=numberElements
          this.posts = res.data.posts.reverse().slice(0,numberElements);
        })
        .catch((err) => {
          this.posts = "Failed to fetch data form Database";
          console.log(err);
        });
    },
    likeElement(post){
      axios.post("https://crowdplaylist.herokuapp.com/feed/like",
      {
        _id:post._id,
        likes:post.likes+1
      }
      )
      .then(post.likes+=1)
      .catch((err)=>console.log(err))
    }
  },
  mounted: function(){
    this.getPosts(5);
  },
  watch:{
    refreshTrigger:function(){
      if(this.refreshTrigger){
        this.getPosts(5);
      }
    }
  }
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
  margin-right: 10px;
  margin-left: 5px;
  padding: 10px;
}

.menu h2 {
  border-bottom: limegreen 1px solid;
  padding: 5px 20px 5px 20px;
}

.menu div p {
  color: grey;
  font-size: 14px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;
  justify-content: space-evenly;
  align-items: flex-end;
  
}
.song{
  border-radius: 10px;
  background:  rgba(172, 240, 203, 0.432);
  padding: 2px;
}
.song p{
  color:black !important;
  font-family: monospace;
}

.datablock{
  background:  rgba(91, 182, 132, 0.137);
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom:5px;
  padding: 2px;
}

.datablock p{
  color:black !important;
  font-family: monospace;
}

.element {
  border: rgb(91, 182, 132) double 4px;
  border-radius: 7px;
  margin: 5px 5px 5px 5px;
  width: 270px;
  height: 430px;
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  padding: 1px 1px 1px 1px;
  animation: fadeIn 0.7s forwards ease-out;
  
}

.element p{
  color:black 
}



.element img{
  width: 60px;
  height: 60px;
  border: rgb(91, 182, 132) 2px double;
  border-radius: 70%;
  align-self: center;

}

.likeButton{
  background: rgb(112, 36, 184);
  border-radius: 20px;
  width:40%;
  margin: auto;
  margin-bottom: 10px;
 color: rgb(91, 182, 132) !important;
 font-size: 20px !important;
 
  
}
.likeButton i{
  color:white;
  font-size: 24px;
  margin-right: 10px;
  margin-top: 2px;
  
}
.likeButton:hover{
  background: crimson;
  transform:scale(1.05);
  
}

@keyframes fadeIn{
  0%{
    transform: rotateY(90deg) translateX(-50%);
    
  }
  50%{
    
    transform: rotateY(10deg) translateX(-20%);
    
  }
  100%{
    
   transform: rotateY(0deg) translateX(0%);
  }
}
</style>