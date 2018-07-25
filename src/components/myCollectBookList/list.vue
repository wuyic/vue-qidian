<template>
    <!--主页下拉刷新的导读页面， 上滑后取消-->
    <div class="bookCase">
        <div  v-if="!calcIsEmpty" style="height: calc(100vh - 44px);">
            <Loading :isLoadMore="true" :onLoadMore="getMyCollectBookListA"
                     :isRefresh="true" :onRefresh="refreshData"
            >
                <div style="background-color: #eee">
                    <div class="myBookList" v-if="getMyBookList.myCreate.length > 0">
                        <div v-for="(item, index) in getMyBookList.myCreate"
                             @click="gotoBookListDetail({router:GetRouter, id:item.id})"
                        >
                            <bookListInfo :bookListInfo="item"  :isBottom="false" :type="'myBookList'"></bookListInfo>
                        </div>
                    </div>

                    <div class="myCollectBookList">
                        <div v-for="(item, index) in getMyCollectBookList.list"
                             @click="gotoBookListDetail({router:GetRouter, id:item.id})"
                        >
                            <bookListInfo :bookListInfo="item"  :isBottom="true" :type="'myCollected'"></bookListInfo>
                        </div>
                    </div>
                </div>
                <div class="buttomBottom">
                    <div class="createBookListButton"
                         :style="{borderColor: getColor,marginRight: '0.6rem', paddingRight: '0.1rem'}"
                         @click="myBookListAddClick({router:GetRouter, refs:getRefs, type:'createBookListBindMobile'})"
                    >
                        <img v-if="getColor=='#d43c33'" src="../../assets/image/icon_mybooklist_add_16x16.png" alt="">
                        <img v-if="getColor!='#d43c33'" src="../../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                        <p :style="{color:getColor}">创建书单</p>
                    </div>
                    <div class="createBookListButton" style="padding-left: 0.1rem;">
                        <p>关注书单</p>
                        <img src="../../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
                    </div>
                </div>
            </Loading>
        </div>

        <!--为空-->
        <div class="bookListNone" v-if="calcIsEmpty">
            <img class="noneImg" src="../../assets/image/pic_collection_170x150.png" alt="" >
            <p class="tipWord">可在"发现／书单"中关注书单</p>
            <div class="buttomBottom">
                <div class="createBookListButton"
                     :style="{borderColor: getColor,marginRight: '0.6rem', paddingRight: '0.1rem'}"
                     @click="myBookListAddClick({router:GetRouter, refs:getRefs, type:'createBookListBindMobile'})">
                    <img v-if="getColor=='#d43c33'" src="../../assets/image/icon_mybooklist_add_16x16.png" alt="">
                    <img v-if="getColor!='#d43c33'" src="../../assets/image/icon_shelf_addBooklist_16x16.png" alt="">
                    <p :style="{color:getColor}">创建书单</p>
                </div>
                <div class="createBookListButton" style="padding-left: 0.1rem;">
                    <p>关注书单</p>
                    <img src="../../assets/image/icon_mybooklist_seemore_17x16.png" alt="">
                </div>
            </div>
        </div>

        <Toast :type="'toastBox'" :position="'center'" :toastName="'createBookListBindMobile'" ref="createBookListBindMobile">
            <div class="bindMobileTipBox">
                <div class="title"  @click="getRefs.toastBox({type:'createBookListBindMobile', status:false})">
                    <img class="close" src="../../assets/image/icon_close_16x16.png" alt="">
                </div>
                <div class="body">
                    <p>根据《网络安全法》</p>
                    <p>该操作需绑定安全手机</p>
                </div>
                <div class="bottom">
                    <p class="temNo" @click="getRefs.toastBox({type:'createBookListBindMobile', status:false})">暂时不</p>
                    <p class="bindMobile">绑定手机</p>
                </div>
            </div>
        </Toast>
    </div>
</template>
<script>
	/**
     * 我的书单
	 */
	import bookListInfo from '../common/bookListInfo.vue'
    import Loading from '../common/plug/loading.vue';
    import Toast from '../common/plug/Toast.vue';
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'bookCase',
		data() {
			return {

			}
		},
        components: {
	        bookListInfo,Loading,Toast
        },

		created() {
			console.log(this.$store)
			//获取书单列表数据
			this.$store.dispatch('booklist/getMyBookList');
			this.$store.dispatch('booklist/getMyCollectBookListA');
		},

		computed: {
            ...mapGetters('booklist', [
            	'getMyBookList',
                'getMyCollectBookList',
                'getColor',
                'getOpenPhoneTips',
            ]),
            calcIsEmpty() {
	            if (this.getMyBookList.myCreate.length == 0 && this.getMyCollectBookList.list.length == 0) {
	            	return true;
                }
                return false;
            },

            GetRouter() {
            	return this.$router
            },

			getRefs() {
            	return this.$refs.createBookListBindMobile
            }
		},

		methods: {
            ...mapActions('booklist', [
	            'getMyCollectBookListA', 'refreshData', 'myBookListAddClick', 'gotoBookListDetail'
            ]),

		}


	}
</script>

<style scoped>
    .bookCase {
        background-color: #eee;
        height: 100%;
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

    .bookListNone {
        height: 100%;
        background-color: #fff;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .bookListNone .noneImg {
        width: 3rem;
        height: 3rem;
        margin-top: -3rem;
    }

    .bookListNone .tipWord {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;

        color: #e7e7e7;
    }

    .bindMobileTipBox {
        height: 2.85rem;
        width: 4.9rem;
        background-color: #fff;
        border-radius: 0.2rem;
    }
    .bindMobileTipBox .title {
        height: 0.55rem;
    }
    .bindMobileTipBox .title :after{
        clear:both;
        content:'.';
        display:block;
        width: 0;height: 0;visibility:hidden;
    }
    .bindMobileTipBox .title .close{
        width: 0.35rem;
        height: 0.35rem;
        float: right;
        padding: 0.2rem 0.2rem 0 0;
    }
    .bindMobileTipBox .body{

    }
    .bindMobileTipBox .body p{
        line-height: 0.4rem;
        text-align: center;
        color:#4c4c4c;
        padding-bottom: 0.05rem;
    }
    .bindMobileTipBox .bottom{
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem 0;
    }

    .bindMobileTipBox .bottom .temNo{
        border:2px solid #d43c33;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 1.9rem;
        border-radius: 0.3rem;
        background-color: #fff;
        color:#d43c33;

    }
    .bindMobileTipBox .bottom .bindMobile{
        margin-left: 0.2rem;
        border:2px solid #d43c33;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 1.9rem;
        border-radius: 0.3rem;
        background-color: #d43c33;
        color:#fff;
    }

</style>
