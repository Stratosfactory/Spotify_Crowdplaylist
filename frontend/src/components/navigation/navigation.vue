<template>
 <div class="navbar">
    
   
    
    <router-link to="/">Home</router-link>
    <router-link to="/admin">Admin Portal</router-link>
 </div>
</template>

<script>

export default {

}
</script>

<style scoped>

.navbar{
    display:flex;
    background: rgb(91, 182, 132);
    align-items:center;
    align-content: space-evenly;
    justify-content:space-evenly;
}

.navbar a{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color:white;
    border: gold 1px solid;
    border-radius: 4px;
    padding: 2px 10px 2px 10px; 
    margin: 1% 1% 1% 1%;
    font-size: 20px;
    text-decoration: none;

}

.navbar a:hover{
    background-color:rgb(135, 201, 163);
    color:rgb(153, 0, 255);
    border: rgb(153, 0, 255) 1px solid;
}
a.router-link-active{
     background-color:rgb(135, 201, 163);
    color:rgb(153, 0, 255);
    border: rgb(153, 0, 255) 1px solid;
    box-shadow: 0px 7px 12px 2px #492280;
}

</style>