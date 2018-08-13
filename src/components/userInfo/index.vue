<template>
    <div class="userInfo">
        <div class="title" :style="calcBgColor">
            <div class="headLeft" @click="$router.go(-1)">
                <img class="headLeftImg" src="../../assets/image/QDNavBackButton_36x36_fff.png" alt="">
                <p style="margin-left: -0.1rem;">返回</p>
            </div>
            <div class="headCenter">
                <p :style="{fontSize: '0.30rem', marginTop:marginTop+'rem'}">张三李四</p>
            </div>

            <div class="headRight">

            </div>
        </div>

        <div class="body" @scroll="scoller($event)">
            <div class="index"
                 :style="calcbgImage"
            >
            </div>
            <UserInfo v-if="type=='user'"></UserInfo>
            <UserInfo v-if="type=='author'"></UserInfo>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex'
	import indexTitle from '../common/title.vue';
	import loading from '../common/plug/loading.vue';
	import Toast from '../common/plug/Toast.vue';
	import AuthorInfo from './AuthorInfo.vue';
	import UserInfo from './UserInfo.vue';

	export default {
		name: 'index',
		data() {
			return {
				type: 'user', //['user', 'author']
				id: -1,
				isShowTitle: false,
                marginTop:'-2.6'
			}
		},

		created() {
			this.type = this.$route.params.type;
			this.id = this.$route.params.id;
//			console.log('type', this.type, 'id', this.id);

		},

		mounted() {

		},

		computed: {
			calcbgImage() {
				let bgUser = {
					backgroundColor: '#d43c33',
					backgroundImage: 'url(' + require('../../assets/image/mine_red.png') + ')'
				};
				let bgAuthor = {
					backgroundColor: '#24282e',
					backgroundImage: 'url(' + require('../../assets/image/author_black.png') + ')'
				};

				if (this.isShowTitle) {
					bgUser.backgroundImage = 'none';
					bgAuthor.backgroundImage = 'none';
				}

				if (this.type == 'user') {
					return bgUser;
				} else {
					return bgAuthor
				}
			},

			calcBgColor() {
				let bgUser = {backgroundColor: '#d43c33'};
				let bgAuthor = {backgroundColor: '#24282e'};

				if (!this.isShowTitle) {
					return {backgroundColor: 'transparent'};
				}

				if (this.type == 'user') {
					return bgUser;
				} else {
					return bgAuthor
				}

			}
		},

		components: {
			UserInfo, AuthorInfo
		},
		methods: {
			scoller(obj) {
				obj = obj.currentTarget;
				let offset = obj.scrollTop;
				let viewHeight = obj.clientHeight;
				let allHeight = obj.scrollHeight;
				this.scrollTop = offset;
				console.log(obj.scrollTop, obj.clientHeight, obj.scrollHeight);
				if (obj.scrollTop >= this.remToPx(1.6) - 46) {
					this.isShowTitle = true;
				} else if (obj.scrollTop < this.remToPx(1.6) - 46) {
					this.isShowTitle = false;
				}
				let tempMT = this.remToPx(2.6) - obj.scrollTop;
				tempMT = Math.min(tempMT, this.remToPx(2.6));
				tempMT = Math.max(tempMT, 0);

				this.marginTop = this.pxToRem(tempMT);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .userInfo {
        background-color: #f2f2f2;
        height: 100%;

        .title {
            width: 6.96rem;
            height: 44px;
            padding-left: 0.27rem;
            padding-right: 0.27rem;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            font-size: 0.28rem;
            color: #fff;

            top: 0;
            left: 0;
            position: fixed;
            z-index: 1000;

            .headLeft {
                width: 2rem;
                height: 100%;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                background-color: #d43c33;

                .headLeftImg {
                    width: 30px;
                    height: 30px;
                    margin-left: -0.2rem;
                }
            }

            .headCenter {
                width: 50vw;
                flex-grow: 1;
                display: -webkit-flex;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            }

            .headRight {
                width: 2rem;
                flex-grow: 0;
                font-size: 0;
                text-align: right
            }
        }

        .body {
            height: 100%;
            overflow-x: hidden;
            overflow-y: scroll;

            .index {
                height: 1.55rem;
                width: 7.5rem;
                background-repeat: no-repeat;
                background-position: right bottom;
                background-size: 3.8rem auto;
            }
        }

    }
</style>
