<template>
    <div>
        <div class="index-title">
            <indexTitle></indexTitle>
        </div>
        <div class="index-recommond">
            <recommendRead></recommendRead>
        </div>
        <div class="index-bookcase">
            <bookCase></bookCase>
        </div>
    </div>
</template>

<script>

	import {mapState} from 'vuex'
	import indexTitle from './index/index/title.vue';
	import recommendRead from './index/index/recommendRead.vue';
	import bookCase from './index/index/bookCase.vue';

	export default {
		name: 'index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		},
		components: {
			indexTitle: indexTitle,
			recommendRead: recommendRead,
			bookCase: bookCase
		},
		computed: {
			...mapState({
				count: state => state.bookcase.count,
				bookCase: state => state.bookcase.bookCase
			})
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .index-title {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }

    .index-recommond {
        margin-top: 40px;
        height: 87px;
    }

    .index-bookcase {
        width: 100vw;
        height: calc(100vh - 40px - 50px);
    }
</style>
