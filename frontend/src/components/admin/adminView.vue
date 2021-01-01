<template>
  <div>
    <login-form @authentication="authComplete"></login-form>
    <result-display v-if="authentication"></result-display>
    
  </div>
</template>

<script>
import loginForm from "./loginForm";
import resultDisplay from "./resultDisplay";

export default {
  components: {
    loginForm,
    resultDisplay,
  },
  data(){
    return{
      authentication:false
    }
  },
  methods: {
    authComplete(validation) {this.authentication=validation},
  },
};
</script>

<style>
</style>