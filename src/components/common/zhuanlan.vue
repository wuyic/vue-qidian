<template>
    <div>
        <!--个人中心中的专栏列表 columnId -->
        <div :class="{ZLinUserInfo:true,isBottom:isBottom}" v-if="type=='userInfoZhuanLan'">
            <div class="left">
                <div class="title">
                    <p v-html="whiteSpace(zlInfo.title)"></p>
                </div>
                <div class="desc">
                    <p v-html="whiteSpace(zlInfo.description)"></p>
                </div>
                <div class="count">
                    <p>{{zlInfo.likeCount + '赞 · ' + zlInfo.commentCount}}</p>
                </div>
            </div>
            <div class="right">
                <img :src="calcImage(zlInfo.bookIds, 0)" alt="">
                <img :src="calcImage(zlInfo.bookIds, 1)" alt="">
            </div>
        </div>
    </div>
</template>

<script>
	//书单列表 单项
	import {mapGetters} from 'vuex';

	export default {
		props: ["zlInfo", 'isBottom', 'type',],
		name: 'zhuanlan',

		computed: {
			...mapGetters({

			}),
		},

		mounted() {

		},
		methods: {
			calcImage(array, num, type) {
				let baseUrl = "https://qidian.qpic.cn/qdbimg/349573/bookId/180";

				if (array.length > num) {
					if (type) {
						return baseUrl.replace('bookId', array[num][type]);
					} else {
						return baseUrl.replace('bookId', array[num]);
					}
				} else {
					return require('../../assets/image/QDDefaultNoBookImage_white_48x64.png')
				}
			}
		},
	}
</script>

<style scoped lang="scss">

    .isBottom {
        border-bottom: 1px solid #e7e7e7;
    }

    .ZLinUserInfo {

        display: -webkit-flex;
        display: flex;
        width: 7.2rem;
        height: 2.60rem;
        margin-left: 0.3rem;
        text-align: left;
        align-items: center;
        justify-content: space-between;


        .left {
            flex-grow: 1;
            display: -webkit-flex;
            display: flex;
            height: 2.60rem;
            flex-direction: column;
            justify-content: center;

            .title {
                p {
                    color:#5c5c5c;
                    font-size: 0.28rem;
                }
            }
            .desc {
                padding: 0.2rem 0;
                p {
                    color:#ababab;
                    font-size: 0.24rem;
                    line-height: 0.3rem;
                    height: 0.6rem;

                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-moz-box;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp: 2;


                }
            }
            .count {
                p {
                    color:#ababab;
                    font-size: 0.24rem;
                }
            }
        }
        .right {
            flex-shrink: 0;
            margin:0 0.3rem;
            width: 1.4rem;
            height: 1.75rem;
            position: relative;

            :nth-child(1) {
                height: 1.65rem;
                width: 1.30rem;
                position: absolute;
                left:0;
                top:0;
                z-index:100;
            }

            :nth-child(2) {
                height: 1.65rem;
                width: 1.30rem;
                position: absolute;
                right: 0;
                bottom:0;
                z-index:99;
            }
        }
    }



</style>