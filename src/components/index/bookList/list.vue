<template>
  <!--主页下拉刷新的导读页面， 上滑后取消-->
  <div class="bookCase">
    <!--font-size:0 消除img的尾巴-->
    <div class="list" v-for="(item, index) in list"  v-if="">
      <div style="font-size: 0; flex-grow: 0;">
        <img class="book-img" :src='"https://qidian.qpic.cn/qdbimg/" + item.bookInfo.AuthorId + "/" + item.bookInfo.BookId + "/180"' alt="">
      </div>
      <div class="info" style="flex-grow: 1;">
        <p class="title">
          {{item.bookInfo.BookName}}
        </p>
        <p class="author">
          {{item.bookInfo.Author}} · {{getUserStatus(index)}}
        </p>
        <p class="status">
          {{getTime(index)}}前 · {{getNewChapter(index)}}
        </p>
      </div>
      <div class="more" style="flex-grow: 0;">
        <img src="../../../assets/image/more969ba3.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>

	export default {
		name: 'bookCase',
		data() {
			return {
			  jiying:'都市',
      }
		},

    created() {
      //获取书架列表数据
      this.$store.dispatch('getBookBigType');
      this.$store.dispatch('getBookSmallTypeAll');
      this.$store.dispatch('getBookCase');
    },

    computed: {
      list () {
        let bookCase = this.$store.state.book.bookCase.getMyBookCase();
        console.log(bookCase);
        return bookCase;
      },
      serverTime() {
        return this.$store.state.serverTime
      }
    },

    methods:{
      //处理时间
      getTime: function (index) {
        let item = this.list[index].bookInfo;
        if (item.IsVip == 1) {
          return this.judgeTime(item.LastVipChapterUpdateTime, this.serverTime);
        } else {
          return this.judgeTime(item.LastChapterUpdateTime, this.serverTime);
        }
      },

      //判断当前最新章节
      getNewChapter: function (index) {
        let item = this.list[index].bookInfo;
        if (item.IsVip == 1 || item.IsVip == '1') {
          return item.LastVipUpdateChapterName;
        } else {
          return item.LastUpdateChapterName;
        }
      },

      //判断用户多少章未读
      getUserStatus: function (index) {
        return "未读";
      }
    }


	}
</script>

<style>
  .bookCase .list {
    height: 93px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

   .bookCase .list .book-img {
     width: 55px;
     height: 73px;
     padding: 15px 10px 5px 15px;
   }

  .bookCase .info {
    padding: 15px 10px 5px 0px;
    height: 73px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #969ba3;
    font-size: 12px;
    display: -webkit-flex;
    display: flex;
    flex-direction:column;
    justify-content: center;
    border-bottom: 1px solid #eee;
  }

  .bookCase .info .title {
    font-weight: 600;
    color: #33373d;
    font-size: 16px;
    padding-bottom: 5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookCase .author {
    padding-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookCase .status {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bookCase .more {
    margin-right: 15px;
    padding: 15px 0px 5px 0px;;
    height: 73px;
    font-size: 0;
    align-self: flex-start;
    border-bottom: 1px solid #eee;
  }

  .bookCase .more img {
    width: 30px;
    height: 30px;
  }

</style>
