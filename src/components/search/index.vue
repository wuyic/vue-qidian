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
			...mapState({

            })
		},
        created() {
			this.$store.dispatch('ad/getAdGol');
			this.$store.dispatch('search/setSearchTop');
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
        background-color: #eee;
        width: 100vw;
        height: calc(100vh - 0.8rem);
        margin-top: 0.8rem;
    }
</style>
