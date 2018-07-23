<template>
    <div style="height: 100%">

        <!--上拉加载或者刷新-->
        <div class="loadOrRefresh" v-if="isLoadMore || isRefresh"  @scroll="getMoreData($event)">
            <div class="refreshData" v-if="isRefresh" :style="{marginTop: marginTopDis + 'px'}">
                <img class="img" src="../../../assets/image/loading.gif" alt="">
            </div>
            <div style="background-color: #f5f5f5;margin-bottom: 50px;">
                <slot></slot>
            </div>
            <div class="loadingMore"  v-if="isLoadMore && getStatus" >
                <img class="img" src="../../../assets/image/loading.gif" alt="">
            </div>
        </div>

        <!--左右滑动后数据 展示-->
        <div class="slideLeftOrRight" v-if="isSlideRow">
            <div>
                <slot></slot>
            </div>
            <div style="border: 1px solid #111; width: 100px;">
                删除
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	export default {
		props: {
            isLoadMore:{
				type:Boolean,
                default:false
            },
            isRefresh:{
	            type:Boolean,
	            default:false
            },
            isSlideRow:{
	            type:Boolean,
	            default:false
            },
            onLoadMore:{}, //上拉加载更多的函数
            onRefresh:{},  //下拉刷新的函数
            onSlide:{},    //侧边栏
		},
		name: 'loading',
		data() {
			return {
				touchPos:{startx:0, starty:0, endx:0, endy:0},
                scrollTop:0,
            }
		},

        computed:{
	        ...mapGetters({
		        getStatus:'loading/getShowBottomStatus',
		        marginTopDis:'loading/getMarginTopDis',
	        })
        },

		mounted() {
			let elem = null;
			if (this.isSlideRow) {
				elem = document.getElementsByClassName('slideLeftOrRight')[0];
            } else {
				elem = document.getElementsByClassName('loadOrRefresh')[0];
			}
			elem.addEventListener('touchstart', this.touchStart);
			elem.addEventListener('touchmove', this.touchMove);
			elem.addEventListener('touchend', this.touchEnd);
		},

		methods: {
            ...mapActions('loading', [
            	'setMarginTopDis'
            ]),

            /**
             * 加载更多
             */
			getMoreData(obj) {
				obj = obj.currentTarget;
				let offset = obj.scrollTop;
				let viewHeight = obj.clientHeight;
				let allHeight = obj.scrollHeight;
				this.scrollTop = offset;
				console.log(obj.scrollTop,obj.clientHeight,obj.scrollHeight);
				if (offset + viewHeight >= allHeight) {
					console.log('yeyeye! come on!')
					this.onLoadMore();
				}
			},

            /**
             * 触摸开始
             */
            touchStart(event) {
				this.touchPos.startx = event.changedTouches[0].clientX;
				this.touchPos.starty = event.changedTouches[0].clientY;
            },

            /**
             * 触摸结束
             * */
            touchEnd(event) {
	            this.touchPos.endx = event.changedTouches[0].clientX;
	            this.touchPos.endy = event.changedTouches[0].clientY;
	            console.log('yyyy ',this.calcDistenceY());
	            console.log('scroll' , this.scrollTop);
	            if (this.calcDistenceY() >= 50 && this.isRefresh && this.scrollTop==0) {
	            	let disTmp = this.calcDistenceY()-50;
	            	disTmp = Math.max(this.calcDistenceY(), 50);
	            	disTmp = Math.min(this.calcDistenceY(), 0);
		            this.setMarginTopDis({value:disTmp});
		            this.onRefresh();
	            } else if (this.isRefresh){
		            this.setMarginTopDis({value: -50});
                }
            },

            /**
             * 移动中
             */
            touchMove(event) {
	            let disY = ( event.changedTouches[0].clientY - this.touchPos.starty) / 3;
	            if ( 0 < disY  && disY < 100 && this.isRefresh && this.scrollTop==0) {
		            let temDis =  (disY - 50 > -50) ? disY - 50 : 0;
		            console.log('margin ', temDis)
		            this.setMarginTopDis({value:temDis});
	            }
            },

            calcDistenceY() {
				console.log(this.touchPos);
	            return (this.touchPos.endy - this.touchPos.starty)/3;
            }
        },
	}
</script>

<style scoped>
    .loadOrRefresh {
        position: relative;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: #eee;
    }

    .loadingMore, .refreshData {
        width: 100vw;
        height: 50px;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
    }

    .img {
        width: 25px;
        height: 25px;
    }

    .slideLeftOrRight {
        display: flex;
        flex:1;
        justify-content: space-between;
        margin-right: -100px
    }


</style>