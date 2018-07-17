<template>
    <div class="mybooklist">
        <div class="index-title">
            <indexTitle
                    :headLeft="{text:'返回', type:'word'}"
                    :headCenter="{text:'创建书单', type:'word'}"
                    :headRight="{text:'创建', type:'word',func:createBookList, opt:opt}">
            </indexTitle>
        </div>
        <div class="index-reco" @click="">
            <indexList></indexList>
        </div>
    </div>
</template>

<script>

	import {mapState} from 'vuex'
	import indexTitle from '../common/title.vue';
	import indexList from './list.vue';

	export default {
		name: 'index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
                opt:0.5,
			}
		},
		components: {
			indexTitle, indexList,
		},
		computed: {
			...mapState({

			})
		},
        methods: {
			createBookList () {
                console.log('create in')
			}
        }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .mybooklist {
        height: 100%;
        overflow: hidden;
    }
    .index-title {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }

    .index-reco {
        margin-top: 44px;
        height: 100%;
        background-color: #fff;
    }
</style>
