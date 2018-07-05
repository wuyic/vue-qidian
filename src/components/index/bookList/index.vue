<template>
    <div>
        <div class="index-title">
            <indexTitle></indexTitle>
        </div>
        <div class="index-reco">
            <indexList></indexList>
        </div>
    </div>
</template>

<script>

	import {mapState} from 'vuex'
	import indexTitle from './title.vue';
	import indexList from './list.vue';

	export default {
		name: 'index',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		},
		components: {
			indexTitle, indexList,
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

    .index-reco {
        margin-top: 44px;
        height: 87px;
    }

    .index-bookcase {
        width: 100vw;
        height: calc(100vh - 44px - 50px);
    }
</style>
