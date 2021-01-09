<template>
  <div class="adminView">
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
.adminView{
  background:rgba(243, 243, 243, 0.918);
  padding: 2% 2%;
}
</style>