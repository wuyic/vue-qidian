<template>
  <div>
    <div class="index-title">
      <indexTitle></indexTitle>
    </div>
    <div class="index-reco">
      <recommendRead></recommendRead>
    </div>
    <div class="index-booklist">
      <bookList></bookList>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex'
import indexTitle from './index/title.vue';
import recommendRead from './index/recommendRead.vue';
import bookList from './index/bookList.vue';
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
    indexTitle:indexTitle,
    recommendRead:recommendRead,
    bookList:bookList
  },
  computed: {
    ...mapState({
      count:state => state.booklist.count,
      bookList:state => state.booklist.bookList
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  .index-title {
    top:0;
    left:0;
    width: 100vw;
    position:fixed;
    z-index:1000;
  }

  .index-reco {
    margin-top: 44px;
    height: 87px;
  }

  .index-booklist {
    width:100vw;
    height: calc(100vh - 44px - 50px);
  }
</style>
