<template>
  <div class="index-title">
    <div class="flexbox">
      <div class="left">
        <img src="../../../assets/image/saixuan.png" alt="" class="left-img">
        <p class="left-word" @click="goTo('shaixuan')">筛选</p>
      </div>

      <div class="center">
        <div :class="" @click="goTo('index')">
          <p :class="{centerWord:true, isSelectedWord:isSelected=='shujia'}">书架</p>
          <div :class="{line:true,selectedLine:isSelected=='shujia'}">
          </div>
        </div>

        <div style="margin-left: 20px">
          <p :class="{centerWord:true, isSelectedWord:isSelected=='guanzhu'}">关注</p>
          <div :class="{line:true, selectedLine:isSelected=='guanzhu'}">
          </div>
        </div>
      </div>
      <div class="right">
        <img class="right-img" src="../../../assets/image/search.png"  alt="">
        <img style="margin-left: 10px" class="right-img" src="../../../assets/image/more.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'indexTitle',
		data() {
			return {
			  isSelected:'guanzhu',
      }
		},
		mounted() {

		},
		methods: {
      goTo: function (name) {
        this.$router.push({name:name})
      }
    },
	}
</script>

<style>
  .index-title {
    background: -webkit-linear-gradient(left, #db5051 , #ee7160); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #db5051, #ee7160); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #db5051, #ee7160); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #db5051, #ee7160); /* 标准的语法（必须放在最后） */
  }

  .index-title .flexbox {
    width: 100%;
    height: 44px;
    padding-left:15px;
    padding-right: 15px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .index-title .left {
    width: 60px;
    height: 25px;
    border: 1px solid #fff;
    border-radius: 15px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .index-title .left-img {
    width: 15px;
    height: 15px;
    font-size: 0;
    line-height: 25px;
  }

  .index-title .left-word {
    font-size: 12px;
    transform: scale(1);
    height: 20px;
    line-height: 20px;
    color:#fff
  }

  .index-title .center {
    width: 50vw;
    height: 30px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .index-title .centerWord{
    font-size: 16px;
    color:#eee;
  }

  .index-title .line {
    margin: 0 auto;
    width: 10px;
    border-bottom: 2px solid #fff;
    opacity: 0;
  }

  .index-title  .selectedLine {
    opacity: 1;
  }



  .index-title .isSelectedWord {
    font-size: 16px;
    font-weight: 600;
    color:#fff
  }

  .index-title  .right {
    width: 80px;
    height: 25px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .index-title .right-img {
    width: 20px;
    height: 20px;
  }

</style>
