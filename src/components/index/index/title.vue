<template>
  <div class="index-title">
    <div class="flexbox">
      <div class="left">
        <img src="../../../assets/image/saixuan.png" alt="" class="left-img">
        <p class="left-word" @click="goTo('shaixuan')">筛选</p>
      </div>

      <div class="center">
        <div :class="">
          <p :class="{centerWord:true, isSelectedWord:isSelected=='shujia'}">书架</p>
          <div :class="{line:true,selectedLine:isSelected=='shujia'}">
          </div>
        </div>

        <div style="margin-left: 20px" @click="goTo('booklist')">
          <p :class="{centerWord:true, isSelectedWord:isSelected=='guanzhu'}">关注</p>
          <div :class="{line:true, selectedLine:isSelected=='guanzhu'}">
          </div>
        </div>
      </div>
      <div class="right">
        <img class="right-img" src="../../../assets/image/search.png"  alt="">
        <img style="margin-left: 0.2rem;" class="right-img" src="../../../assets/image/more.png" alt="">
      </div>
    </div>

      <div class="floatBox">
          <div class="top">

          </div>
          <div class="mid">

          </div>
      </div>
  </div>
</template>

<script>
	export default {
		name: 'indexTitle',
		data() {
			return {
			  isSelected:'shujia',
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

<style scoped="">
  .index-title {

  }

  .index-title .flexbox {
      background: -webkit-linear-gradient(left, #db5051 , #ee7160); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #db5051, #ee7160); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #db5051, #ee7160); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #db5051, #ee7160); /* 标准的语法（必须放在最后） */

    width: 100%;
    height: 0.8rem;
    padding-left: 0.27rem;
    padding-right: 0.27rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .index-title .left {
    width: 1.09rem;
    height: 0.45rem;
    border: 1px solid #fff;
    border-radius: 0.27rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .index-title .left-img {
    width: 0.27rem;
    height: 0.27rem;
    font-size: 0;
    line-height: 0.45rem;
  }

  .index-title .left-word {
    font-size: 0.21rem;
    transform: scale(1);
    height: 0.36rem;
    line-height: 0.36rem;
    color:#fff
  }

  .index-title .center {
    width: 50vw;
    height: 0.54rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .index-title .centerWord{
    font-size: 0.29rem;
    color:#eee;
  }

  .index-title .line {
    margin: 0 auto;
    width: 0.181rem;
    border-bottom: 2px solid #fff;
    opacity: 0;
  }

  .index-title  .selectedLine {
    opacity: 1;
  }



  .index-title .isSelectedWord {
    font-size: 0.29rem;
    font-weight: 600;
    color:#fff
  }

  .index-title  .right {
    width: 1.45rem;
    height: 0.45rem;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .index-title .right-img {
    width: 0.36rem;
    height: 0.36rem;
  }


  .floatBox {
      width: 3.04rem;
      float:right;
      margin-right: 0.15rem;
  }

    .floatBox .top {
        width: 0;
        height: 0;
        border-width: 0 0.15rem 0.2rem;
        border-color:     transparent transparent #4a4a4a;
        border-style: solid;
        margin-left: 2.6rem;
        position:relative;
    }

    .floatBox .mid {
        background-color: #4a4a4a;
        width: 100%;
        height: 5.73rem;
        margin-top: -0.02rem;
    }

</style>
