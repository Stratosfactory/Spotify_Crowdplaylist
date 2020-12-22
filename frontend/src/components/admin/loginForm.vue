<template>
  <div class="menu">
      <p>Login required</p>
      <form @submit.prevent>
          <input type="text" placeholder="User Name" v-model="userName">
          <input type="password" placeholder="Password" v-model="password">
        <button @click="submitUser()">Login</button>
      </form>

  </div>
</template>

<script>
import axios from "axios"
export default {
data(){
    return{
        password:null,
        userName: null,
        
    }
},
methods:{
    submitUser(){
        axios
        .post("http://localhost:3000/login/auth",{
            userName:this.userName,
            password:this.password
            // userName:"app_superuser",
            // password:"#i4mth3sup3rus3r#",
            
        })
        .then((res)=>{
            if(res.data.message==="authentication successful"){
                this.$emit("authentication");
            }
        })
        .catch((err)=>{console.log(err)});
    }
}

}
</script>

<style scoped>
.menu{
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

.menu form{
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.menu form input{
    width: 300px;
    height: 50px;
    margin-bottom: 20px;
    font-family: monospace;
    font-size: 20px;
}

.menu form button{
    width: 300px;
    height: 50px;
    background: rgb(153, 0, 255) ;
    border-radius: 5px;
    color:white;
    margin-bottom: 20px;
    font-family: monospace;
    font-size: 20px;
}

.menu button:hover{
 background: rgb(61, 9, 95);
 transform: scale(1.05);
}
</style>