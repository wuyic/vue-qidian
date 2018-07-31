<template>
    <div class="mybooklist">
        <div class="indexTitle">
            <indexTitle
                :headLeft="{text:'返回', type:'word'}"
                :headCenter="{text:'书单评论('+1+')', type:'word'}"
                :headRight="{text:'只看单主', type:'word', func:null, opt:1}">
            </indexTitle>
        </div>
        <div class="indexReco" :style="{height:calcHeight}">
            <List></List>
        </div>
        <div style="height: 100%">
            <Chat></Chat>
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
	import List from './list.vue';
	import Chat from './chat.vue';

	export default {
		name: 'index',
		data() {
			return {

			}
		},

		created() {
			this.$store.dispatch('booklist/getBookListDiscuss');
        },

		components: {
			indexTitle,List,Chat
		},
		computed: {
			...mapGetters('chat', {
				calcHeight:'calcFatherHeight'
			})
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
        background-color: #f5f5f5;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
    }

</style>
