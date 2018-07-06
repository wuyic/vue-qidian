<template>
    <div class="ansBookRecomond">
        <div v-if="bookInfo.Recommend">
            <p class="recommond">
                {{bookInfo.Recommend}}
            </p>
        </div>

        <div class="recommondType">
            <div class="cellBox">
                <p class="recType">分类</p>
                <p class="recTypeName">{{bookInfo.Title}}</p>
            </div>

            <div class="cellBox">
                <p class="wordMore">查看更多</p>
                <img class="imageMore" src="../../assets/image/QDCellDetail_24x24.png" alt="">
            </div>
        </div>

        <div class="recommondInfo">
            <p>
                {{bookInfo.Desc}}
            </p>
        </div>

        <div class="recommondBookList">
            <div v-for="(item, index) in bookInfo.BookList" v-if="index < 4">
                <img class="bookImage" :src='"https://qidian.qpic.cn/qdbimg/" + item.AuthorId + "/" + item.BookId + "/180"' alt="">
                <p class="bookName">{{item.BookName}}</p>
                <p class="author">{{item.Author}}</p>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		props:["bookInfo"],
		name: 'bookInList',
		data() {
			return {}
		},
        computed:{

        },

		mounted() {

		},
		methods: {

        },
	}
</script>

<style scoped>
    .ansBookRecomond{
        background-color: #fff;
        /*height: 5rem;*/
        /*display: -webkit-flex;*/
        /*display: flex;*/
        /*justify-content: flex-start;*/
        /*align-items: center;*/
    }

     .recommond {
         padding:0 0.3rem;
        height: 0.7rem;
        line-height: 0.7rem;
        overflow:hidden;
        text-overflow:ellipsis;
        color: #9a9a9a;
        font-size:0.26rem;
        text-align: left;
        border-bottom: 0.01rem solid #e7e7e7;
    }

     .recommondType {
         padding:0 0.2rem 0 0.3rem;
         height: 0.7rem;
         display: -webkit-flex;
         display: flex;
         justify-content: space-between;
         align-items: center;
    }


     .recommondBookList {
         padding:0.2rem 0.3rem;
         display: -webkit-flex;
         display: flex;
         justify-content: space-between;
         align-items: center;
    }

    .recommondType .cellBox {
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }
    .recommondType .cellBox .recType{
        color:#c4483c;
        border: 1px solid #c4483c;
        font-size: 0.26rem;
        padding: 0 0.15rem;
    }

    .recommondType .cellBox .recTypeName{
        padding-left: 0.1rem;
        color:#333;
    }

    .recommondType .cellBox .imageMore{
        width: 0.45rem;
        height: 0.45rem;
    }
    .recommondType .cellBox .wordMore{
        font-size: 0.26rem;
        color:#9a9a9a;
    }

    .recommondInfo {
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;

        color: #9a9a9a;
        font-size:0.22rem;
        padding:0 0.3rem;
    }

     .bookImage{
        width: 1.25rem;
        height: 1.70rem;
    }

     .bookName {
         font-size: 0.24rem;
         color:#333;
         text-align: left;
         overflow:hidden;
         text-overflow:ellipsis;
         width: 1.25rem;
         white-space: nowrap;
         line-height: 0.4rem;
     }

     .author {
         color: #9a9a9a;
         font-size: 0.24rem;
         text-align: left;
         overflow:hidden;
         text-overflow:ellipsis;
         width: 1.25rem;
         white-space: nowrap;
         line-height: 0.4rem;
    }


</style>