<template>
  <!--主页下拉刷新的导读页面， 上滑后取消-->
  <div class="recommendRead-body">
    <!--font-size:0 消除img的尾巴-->
    <div style="flex-grow: 0">
      <div style="font-size: 0; position: relative">
        <img class="recommendRead-body-img" src="https://qidian.qpic.cn/qdbimg/349573/1005204004/180" alt="">
        <div class="recommendRead-body-img-over">
          <p class="recommendRead-body-img-word">
            每日<br/>导读
          </p>
        </div>
      </div>
    </div>
    <div class="recommendRead-body-word" style="flex-grow: 1">
      <p class="recommendRead-body-word-title">大完美主播</p>
      <p class="recommendRead-body-word-info">根据你的阅读基因"{{jiying}}"为你推荐</p>
    </div>

    <div class="recommendRead-body-infoMore" style="flex-grow: 0">
      <p class="recommendRead-body-infoMore-word1">已连签</p>
      <p class="recommendRead-body-infoMore-word2">0&nbsp;天</p>
      <div class="recommendRead-body-infoMore-button">签到</div>
    </div>
  </div>
</template>

<script>

	export default {
		name: 'indexDaodu',
		data() {
			return {
			  jiying:'都市',
			  titleInfo:{}
      }
		},
    mounted() {
		  this.getData();
    },
    methods:{
		  getData: function() {

      }
    }
	}
</script>

<style>
   .recommendRead-body {
     width:calc(100vw - 15px);
     height: 56px;
     padding:15px;
     padding-right:0px;
     display: -webkit-flex;
     display: flex;
     flex-direction: row;
     align-items: center;
   }

   .recommendRead-body-img {
     height: 56px;
     width: 56px;
     z-index:-1;
     padding-right: 10px;
   }

   .recommendRead-body-img-over {
     height: 56px;
     width: 56px;
     left: 0;
     top:0;
     background: rgba(0, 0, 0, .3);
     position: absolute;
   }

   .recommendRead-body-img-word{
     width: 56px;
     height: 56px;
     z-index:1001;
     font-size: 18px;
     font-weight: 600;

     opacity: 1;
     color:#fff;
   }

   .recommendRead-body-word {

     height: 36px;
     padding: 25px 10px 25px 0px;
     text-align: left;
     width: 50vw;
     border-bottom: 1px solid #eee;
   }

  .recommendRead-body-word-title {
    font-size: 16px;
    font-weight: 600;
    color:#33373d;
    padding-bottom: 5px;
  }

    .recommendRead-body-word-info {
      font-size: 12px;
      color:#969ba3;;
    }

   .recommendRead-body-infoMore {
     width: 25vw;
     min-width: 60px;
     height: 86px;
     border-left:1px solid #eee;
     border-bottom: 1px solid #eee;

     display: -webkit-flex;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content:center;
   }

   .recommendRead-body-infoMore-word1 {
     font-size: 14px;
     color:#969ba3;
   }
   .recommendRead-body-infoMore-word2 {
     padding-top: 3px;
     padding-bottom: 3px;
     font-size: 16px;
     color:#db5051;
     font-weight: 600;
   }
   .recommendRead-body-infoMore-button {
     font-size: 14px;
     width: 60px;
     border-radius: 5px;
     color:#fff;
     background: -webkit-linear-gradient(left, #db5051 , #ee7160); /* Safari 5.1 - 6.0 */
     background: -o-linear-gradient(right, #db5051, #ee7160); /* Opera 11.1 - 12.0 */
     background: -moz-linear-gradient(right, #db5051, #ee7160); /* Firefox 3.6 - 15 */
     background: linear-gradient(to right, #db5051, #ee7160); /* 标准的语法（必须放在最后） */
   }
</style>
