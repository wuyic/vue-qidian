<template>
    <div class="mybooklist">
        <div class="indexTitle">

        </div>
        <div class="indexReco">

        </div>
    </div>
</template>

<script>
	/**
     * 书单讨论
	 */
	import {mapGetters, mapActions} from 'vuex'
	import indexTitle from '../common/title.vue';
	import loading from '../common/plug/loading.vue';

	export default {
		name: 'index',
		data() {
			return {

			}
		},

		created() {

        },

		components: {

		},
		computed: {

		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .mybooklist {
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

</style>
