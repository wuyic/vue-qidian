<template>
    <div style="height: 100%;">
       <Loading :isLoadMore="true" :onLoadMore="getBookListDiscuss"
                :isRefresh="true" :onRefresh="refreshDataBookListDiscuss">
           <div class="flexBox cellBox" v-for="(item, index) in discuss.list">
               <img class="userImg" :src="item.HeadImageUrl"/>
               <div class="discussInfo">
                   <!--DeviceType2 CreateTime 1530058005000-->
                   <p class="userName">{{item.NickName}}</p>
                   <p class="timeSource">{{item.CreateTime}}</p>
                   <p class="disContent">{{item.Content}}</p>
               </div>
           </div>
       </Loading>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import Loading from '../common/plug/loading.vue'
	export default {
		name: 'bookListDiscussList',
		data() {
			return {}
		},
        components:{
	        Loading
        },
		mounted() {

		},
        computed:{
            ...mapGetters('booklist', {
            	discuss:'getBookListDiscussGetter'
            })
        },

		methods: {
            ...mapActions('booklist', [
	            'refreshDataBookListDiscuss', 'getBookListDiscuss'
            ])
        },
	}
</script>

<style lang="scss" scoped>

    .flexBox {
        display: -webkit-flex;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .cellBox {
        padding:0.3rem 0 0 0.28rem ;
        background-color: #fff;
        justify-content: space-between;
        align-items: flex-start;

        .userImg {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 0.3rem;
        }

        .discussInfo {
            padding:0 0.25rem 0.3rem 0;
            width: 6.2rem;
            border-bottom: 1px solid #ededed;

            .userName {
                text-align: left;
                font-size: 0.26rem;
                color:#5aaadb;
            }

            .timeSource {
                line-height: 0.6rem;
                text-align: left;
                font-size: 0.22rem;
                color:#9b9b9b;
            }

            .disContent {
                line-height: 0.4rem;
                text-align: left;
                font-size: 0.27rem;
                color:#444;
            }
        }
    }
</style>
