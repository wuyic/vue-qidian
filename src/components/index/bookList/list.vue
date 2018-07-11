<template>
    <!--主页下拉刷新的导读页面， 上滑后取消-->
    <div class="bookCase">
        <!--font-size:0 消除img的尾巴-->
        <div class="myBookList">
            <div v-for="(item, index) in getMyBookList.myCreate">
                <bookListInfo :bookListInfo="item"  :isBottom="false" :type="'myBookList'"></bookListInfo>
            </div>
        </div>

        <div class="myCollectBookList">
            <div v-for="(item, index) in getMyCollectBookList.list">
                <bookListInfo :bookListInfo="item"  :isBottom="true" :type="'myCollected'"></bookListInfo>
            </div>
        </div>


        <div class="buttomBottom">

            <div class="createBookListButton" :style="{borderColor: color,marginRight: '0.6rem', paddingRight: '0.1rem'}">
                <img v-if="color=='#d43c33'" src="../../../assets/image/icon_mybooklist_add_16x16.png" alt="">
                <img v-if="color!='#d43c33'" src="../../../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                <p :style="{color:color}">创建书单</p>
            </div>

            <div class="createBookListButton" style="padding-left: 0.1rem;">
                <p>关注书单</p>
                <img src="../../../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>

	import bookListInfo from '../../common/bookListInfo.vue'
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'bookCase',
		data() {
			return {
				jiying: '都市',
				disableClick:false,
//                color:'#d43c33',
                color:'#9b9b9b',

			}
		},
        components: {
	        bookListInfo
        },

		created() {
			console.log(this.$store)
			//获取书单列表数据
			this.$store.dispatch('booklist/getMyBookList');
			this.$store.dispatch('booklist/getBookList');
		},

		computed: {
            ...mapGetters('booklist', [
            	'getMyBookList', 'getMyCollectBookList'
            ])
		},

		methods: {

		}


	}
</script>

<style>
    .bookCase {
        background-color: #eee;
    }

    .myCollectBookList {
        background-color: #fff;
    }

    .myBookList{
        background-color: #fff;
        margin-bottom: 0.2rem;
    }

    .buttomBottom {
        background-color: #fff;
        height: 1.2rem;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .createBookListButton {
        width: 1.7rem;
        height: 0.5rem;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d43c33;
        border-radius: 0.25rem;
    }

    .createBookListButton p{
        font-size: 0.26rem;
        color:#d43c33;

    }
    .createBookListButton img{
        width: 0.32rem;
        height: 0.32rem;
    }


</style>
