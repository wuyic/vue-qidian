<template>
    <div>
        <div class="index-title">
            <Title></Title>
        </div>
        <div class="index-reco">
            <List></List>
        </div>
    </div>
</template>

<script>

	import {mapState} from 'vuex'
	import Title from './title.vue';
	import List from './list.vue';

	export default {
		name: 'searchIndex',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
			}
		},
		components: {
			Title, List,
		},
		computed: {
			...mapState({})
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

    .index-reco {
        background-color: #eee;
        width: 100vw;
        height: calc(100vh - 44px - 50px);
    }
</style>
