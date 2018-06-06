<template>
  <div>
    <indexTitle></indexTitle>
  </div>
</template>

<script>
import indexTitle from './index/index/title.vue';
export default {
  name: 'good',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    indexTitle:indexTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
