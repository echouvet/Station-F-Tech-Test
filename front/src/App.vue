
<template>
  <MainVue msg="Welcome to Eloi's Technical Test for Station F"/>
  <RoomCard/>
</template>

<script>
import MainVue from './components/MainVue.vue'
import RoomCard from './components/RoomCard.vue'


export default {
  name: 'App',
  components: {
    MainVue,
    RoomCard
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
}
</style>
