<template>
    <div>
        <div class="http">
            <div class="indexTitle">
                <Title
                        :headLeft="{text:'返回', type:'word'}"
                        :headCenter="{text:title, type:'word'}"
                        :headRight="{text:'创建', type:'image', func:reload, opt:opt}">
                </Title>
            </div>
            <div class="indexReco">
                <iframe class="iframeBox" ref="iframe" :src="urlNow" @load="loaded"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
	/**
	 * h5 web
	 */
	import Title from './title.vue';
	import Vue from 'vue';

	export default {
		name: 'H5Http',
        components:{
	        Title
        },
		data() {
			return {
				url: '',
				title:'',
				opt: 1,
                urlNow:'',
				data: {
					'whatIsBookList': 'https://acts.qidian.com/2017/5799909/index.html', //关于书单
					'flowerForBookList': 'http://ih5.if.qidian.com/statics/help/ios/help_booklist.htm', //书单献花
				}
			}
		},
		mounted() {
			console.log(this.$route.params);
			this.url = this.$route.params.url;
			this.title = this.$route.params.title;

			this.urlNow = this.url;
		},
		methods: {
			loaded() {

			},

            reload() {
				console.log(this);
				this.urlNow = '';
	            this.$nextTick( () => {
		            this.urlNow = this.url;
	            })
//				setTimeout(()=>{this.urlNow = this.url;}, 0);
            }
		},

	}
</script>

<style scoped>
    .http {
        height: 100%;
        overflow: hidden;
    }

    .indexTitle {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }

    .indexReco {
        margin-top: 44px;
        height: 100%;
        background-color: #f5f5f5;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
    }
    .indexReco .iframeBox{
        height: calc(100vh - 44px);
        width: 100vw;
        border: 0;
        background-color: #fff;
    }


</style>