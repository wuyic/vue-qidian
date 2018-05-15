<template>
  <div class="foot" v-if="titleInfo.isShowFoot">
      <div class="flex-box">
        <div class="flex-squ" @click="goto('/')">
            <div style="font-size: 0">
              <img v-if="titleInfo.bottom != 1" src="../../assets/image/booklist.png" class="img"/>
              <img v-if="titleInfo.bottom == 1" src="../../assets/image/booklist_selected.png" class="img"/>
            </div>
            <div :class="{word:1, colorRed:titleInfo.bottom == 1}">书架</div>
        </div>
        <div class="flex-squ" @click="goto('/good')">
            <div style="font-size: 0">
              <img v-if="titleInfo.bottom != 2"  src="../../assets/image/good.png" class="img"/>
              <img v-if="titleInfo.bottom == 2"  src="../../assets/image/good_selected.png" class="img"/>
            </div>
            <div :class="{word:1, colorRed:titleInfo.bottom == 2}">精选</div>
        </div>
        <div class="flex-squ" @click="goto('/find')">
            <div style="font-size: 0">
              <img v-if="titleInfo.bottom != 3"  src="../../assets/image/find.png" class="img"/>
              <img v-if="titleInfo.bottom == 3"  src="../../assets/image/find_selected.png" class="img"/>
            </div>
            <div :class="{word:1, colorRed:titleInfo.bottom == 3}">发现</div>
        </div>
        <div class="flex-squ" @click="goto('/mine')">
            <div style="font-size: 0">
              <img v-if="titleInfo.bottom != 4" src="../../assets/image/my.png" class="img"/>
              <img v-if="titleInfo.bottom == 4" src="../../assets/image/my_selected.png" class="img"/>
            </div>
            <div :class="{word:1, colorRed:titleInfo.bottom == 4}">我</div>
        </div>
      </div>
  </div>
</template>

<script>

	export default {
		name: 'index',
		data() {
			return {
			  titleInfo:{}
      }
		},
    watch: {
      '$route' (to, from) {
        this.getData();
      }
    },
		mounted() {
      this.getData();
		},
		methods: {

      getData:function () {
        this.titleInfo = this.getTitle;
      },

		  goto:function (path) {
        this.$router.push({path});
      },
    },
	}
</script>

<style>
  /*@import "../assets/css/detailMaxdeal.css";*/
  .foot {
    z-index:1000;
    position: fixed;
    left: 0;
    bottom:0;
    border-top: 1px solid #eee;
  }

  .flex-box {
    width: 100vw;
    height: 50px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .flex-squ {
    align-items: center;
    height: 45px;
  }

  .img {
    width:35px;
    height: 35px;
  }

  .word {
    height: 13px;
    line-height: 13px;
    font-size: 12px;
    transform:scale(0.8);
  }

  .colorRed {
    color:#ee7160;
  }
</style>
