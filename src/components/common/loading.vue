<template>
    <div>
        <div class="loading" v-if="getStatus">
            <img class="img" src="../../assets/image/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {

		name: 'loading',
		data() {
			return {
            }
		},

        computed:{
	        ...mapGetters({
		        getStatus:'loading/getShowBottomStatus'
	        })
        },

		mounted() {

		},
		methods: {},
	}
</script>

<style scoped>
    .loading {
        width: 7.5rem;
        height: 1rem;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
    }

    .img {
        width: 0.45rem;
        height: 0.45rem;
    }
</style>