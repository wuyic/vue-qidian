<template>
    <div>
        <div class="createBookList">
            <div class="bookListName">
                <p class="tips">书单名称</p>
                <div class="inputBox">
                    <input  type="text" placeholder="为书单起个好名字吧"/>
                </div>
            </div>
            <div class="bookListIntr">
                <p class="tips">书单简介</p>
                <div class="inputBox">
                    <textarea  placeholder="介绍一下书单" rows="1"
                              :style="{height:textInputHeight}"
                              @keyup="onkeyupFun($event)"
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	/**
     * 创建我的书单
	 */
    import Loading from '../common/plug/loading.vue';
	import {mapGetters, mapActions, mapMutations} from 'vuex'

	export default {
		name: 'bookCase',
		data() {
			return {
				textInputHeight:'auto',
			}
		},
        components: {
        },

		created() {

		},

		computed: {
            ...mapGetters('booklist', [
            	'getMyBookList', 'getMyCollectBookList', 'getColor'
            ]),

		},

		methods: {
            ...mapActions('booklist', [
	            'getMyCollectBookListA', 'refreshData'
            ]),
			onkeyupFun(obj) {
            	console.log(obj, obj.currentTarget, obj.currentTarget.scrollHeight);
				obj = obj.currentTarget;
				this.textInputHeight = 'auto';
				this.textInputHeight = obj.scrollHeight + "px";
			}
		}


	}
</script>

<style scoped>
    .createBookList {
        width: 6.8rem;
        padding: 0 0.35rem;
        background-color: #fff;
    }

    .inputBox {
        /*height: 0.9rem;*/
        width: 100%;
        background-color: #f6f7f9;
    }

    .createBookList input{
        background-color: #f6f7f9;
        width: 6.4rem;
        min-height: 0.4rem;
        line-height: 0.4rem;
        border: 0;
        margin: 0.25rem 0.2rem;

    }

    .createBookList textarea{
        background-color: #f6f7f9;
        width: 6.4rem;
        line-height: 0.4rem;
        height: 0.4rem;
        border: 0;
        margin: 0.25rem 0.2rem;
        justify-content: center;
        word-wrap : break-word;
        overflow: hidden;
        resize: none;
    }

    .createBookList input:focus, textarea:focus{
        background-color: #f6f7f9;
        outline: none;
    }



    .tips {
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: left;
        font-size: 0.26rem;
        color:#444;
        padding-top: 0.3rem;
    }

    .bookListName {

    }

    .bookListIntr{

    }




</style>
