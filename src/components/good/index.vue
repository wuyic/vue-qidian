<template>
    <div>
        <div>
            <indexTitle></indexTitle>
        </div>
        <div class="body">
            <bookStore></bookStore>
        </div>
    </div>
</template>

<script>
	import indexTitle from './title.vue';
	import bookStore from './title.vue';

	export default {
		name: 'good',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		components: {
			indexTitle: indexTitle,
			bookStore:bookStore
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .body {
        height: 100%;
        width: 7.5rem;
        background-color: #eee;
    }
</style>
