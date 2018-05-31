<template>
  <div class="shaixuan">
    <div class="head-title">
      <div class="head-body">

        <div class="head-left" @click="goToBookCase(-10000)">
          <img class="head-left-img" src="../../../assets/image/close.png" alt="">
        </div>

        <div class="head-center">
          <p>{{getTitle.title}}</p>
        </div>
        <div class="head-right">

        </div>
      </div>
    </div>

    <div class="body">
      <div class="all">
        <div :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == -1}" @click="goToBookCase(-1)">
          <p class="name">全部</p>
          <p class="value">0</p>
        </div>
      </div>

      <div class="state">
        <div>
          <div class="state-title">
            <p>状态</p>
          </div>
          <div class="state-body">
            <div v-for="item in bookListState" :class="{'type-value':true, 'statebook':true,  colorPink:saixuanChoosed == item.Id, colorNone:item.value == 0}" @click="goToBookCase(item.Id)">
              <p class="name">{{item.name}}</p>
              <p class="value">{{item.value}}</p>
            </div>
          </div>
        </div>
        <div>
          <div class="state-title">
            <p>类型</p>
          </div>
          <div class="state-body" style="border-bottom: 1px solid #e3e3e3;">
            <div  v-for="item in bigType" :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.Id, colorNone:item.num == 0}" @click="goToBookCase(item.Id)">
              <p class="name">{{item.Name}}</p>
              <p class="value">{{item.num ? item.num:0}}</p>
            </div>
          </div>

          <div class="state-body" style=" margin-top: 10px;" >
            <div  v-for="item in boyBookTypeHave" :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.CategoryId, colorNone:item.num == 0}" v-if="item.num > 0"  @click="goToBookCase(item.CategoryId)">
              <p class="name">{{item.CategoryName}}</p>
              <p class="value">{{item.num}}</p>
            </div>
          </div>

          <div class="state-body" style= "border-top: 1px solid #e3e3e3; padding-top: 10px;" v-if="girlBookTypeHave.length > 0 && girlBookTypeHave[0].allNum > 0">
            <div v-for="item in girlBookTypeHave" v-if="item.num > 0" :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.CategoryId, colorNone:item.num == 0}" @click="goToBookCase(item.CategoryId)">
              <p class="name">{{item.CategoryName}}</p>
              <p class="value">{{item.num}}</p>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
	export default {
		name: 'shaixuan',
		data() {
			return {
      }
		},

    created() {

    },

    computed:{
		  bookList() {
        return this.$store.state.book.bookList;
      },

      bigType () {
		    let bookBigType = this.$store.state.book.bookBigType;
		    let bookSmallType = this.$store.state.book.bookSmallType;
		    console.log(bookSmallType);
		    let bookList =  this.$store.state.book.bookList;
		    bookBigType.forEach((value, index) => {
          bookBigType[index].num = 0;
          if (bookSmallType['type'+value.Id]) {
            bookSmallType['type'+value.Id].forEach((value1, index1)=>{
              if (bookList != {}) {
                bookList.forEach((value2, index2) => {
                  if (value2.CategoryId == value1.CategoryId) {
                    bookBigType[index].num += 1;
                  }
                })
              }
            });
          }
        });
        return bookBigType;
      },

      boyBookTypeHave() {
         let boyType = this.$store.state.book.bookSmallType['type11'];
         let bookList = this.$store.state.book.bookList;
         console.log(boyType);
         if (boyType != {} && bookList != {}) {
           boyType.forEach((value, index) => {
             boyType[index].num = 0;
             bookList.forEach((value1, index1)=> {
               if (value1.CategoryId == value.CategoryId) {
                 boyType[index].num += 1;
               }
             })
           });
         }
         return boyType;
      },

      girlBookTypeHave() {
        let girlType = this.$store.state.book.bookSmallType['type12'];
        let bookList = this.$store.state.book.bookList;
        if (girlType && bookList) {
          girlType.forEach((value, index) => {
            girlType[index].num = 0;

            index == 0 ?  girlType[index].allNum = 0 : '';

            bookList.forEach((value1, index1)=> {
              if (value1.CategoryId == value.CategoryId) {
                girlType[index].num += 1;
                girlType[0].allNum += 1;
              }
            })
          });
        }
        return girlType;
      },

      saixuanChoosed() {
		    return this.$store.state.book.saixuanChoosed;
      },

      bookListState() {
        let bookList = this.$store.state.book.bookList;
        let bookListState =  this.$store.state.book.bookListState;
        bookList.forEach((value, index) => {
          if (value.BookStatus == '完本') {
            bookListState[1].value += 1;
          }
          if (value.BookStatus == '连载') {
            bookListState[0].value += 1;
          }
        });

		    return bookListState;
      }


    },


		mounted() {

		},
		methods: {
      goToBookCase: function (type) {
        if (type > -100) {
          this.$store.commit('setSaixuanChoosed', type);
        }
        this.$router.push({name:'index'})
      }
    },

	}
</script>

<style>
  .shaixuan .head-title {
  }

  .shaixuan .head-body {
    height: 44px;
    padding:0 15px 0 15px;

    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .shaixuan .head-left-img {
    width: 20px;
    height: 20px;
  }

  .shaixuan .head-left {
    width: 44px;
    flex-grow: 0;
    font-size: 0;
  }

  .shaixuan .head-center {
    width: 50vw;
    flex-grow: 1;
  }

  .shaixuan .head-right {
    width: 44px;
    flex-grow: 0;
  }

  .shaixuan .body {
    margin-top: 44px;
    padding:15px;
  }

  .shaixuan .type-value {
    height: 37px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .shaixuan .type-value .name {
    padding-left: 12px;
    font-size: 14px;
    color: #33373d;
  }
  .shaixuan .type-value .value {
    padding-right: 12px;
    font-size: 12px;
    color: #969ba3;
  }

  .shaixuan .allbook {
    background-color: #fff5f4;
    width: 100%;
  }

  .shaixuan .allbook .name {
    color:#dc5051;
    font-weight: 700;
  }

  .shaixuan .allbook .value {
    color:#db5568;
  }

  .shaixuan .state-title {
    padding-bottom: 15px;
    padding-top: 15px;
    text-align: left;
  }

  .shaixuan .state-body {
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .shaixuan .state .statebook {
    margin-bottom: 10px;
    width: 48%;
    background-color: #f6f7fb;
    margin-right: 2%;
  }

  .shaixuan .state .bookType {
    margin-bottom: 10px;
    width: 30%;
    background-color: #f6f7fb;
    margin-right: 3.3%;
  }

  .shaixuan .colorNone {
    background-color: #f6f7fb;
  }

  .shaixuan .colorPink {
    background-color: #fff5f4;
  }

  .shaixuan .colorNone .name {
    color:#969ba3;
  }

  .shaixuan .colorNone .value {
    color:#969ba3;
  }

  .shaixuan .colorPink .name{
    color:#dc5051;
  }

  .shaixuan .colorPink .value{
    color:#db5568;
  }



</style>
