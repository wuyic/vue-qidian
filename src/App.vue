<template>
  <div id="app">
    <div style="overflow: scroll; height:calc(100vh - 50px)">
      <router-view/>
    </div>
    <footCommon></footCommon>
  </div>
</template>

<script>
  import titleCommon from './components/common/title.vue'
  import footCommon from './components/common/foot.vue';

  export default {
    name: 'App',
    components:{
      titleCommon:titleCommon,
      footCommon:footCommon
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding:0;
    font-family: sans-serif;
  }

  .head-title {
    top:0;
    left:0;
    width: 100vw;
    position:fixed;
    z-index:1000;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
  }
</style>
