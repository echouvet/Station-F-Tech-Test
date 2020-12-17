<template>
    <img alt="Vue logo" src="../assets/logo.jpg" class="photo">
    <h1>{{msg}}</h1>
</template>

<script>
export default {
  name: 'MainVue',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width:20vw;
}
</style>
