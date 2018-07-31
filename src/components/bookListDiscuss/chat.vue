<template>
    <div>
        <!--只有输入的聊天框-->
        <div class="onlyInputBox">
            <chatInput></chatInput>
        </div>

        <!--展示表情-->
        <div class="showChatInputBox">
            <Toast
                :type="'toastBox'"
                :position="'bottom'"
                :toastName="'chatInputEmoji'"
                ref="chatInputEmoji"
            >
                <chatInput></chatInput>
                <div class="emojiBox">
                    <Slide :pageAllNum="emoji.allPage">
                       <template slot="slide" slot-scope="props">
                           <div class="emojiList">
                               <img class="emoji" v-for="(item, index) in emoji.list()"
                                    v-if="(props.indexPos - 1) * emoji.pageCount < index && index < props.indexPos * emoji.pageCount"
                                    :src="require('../../assets/image/expression/'+item.name)" alt=""
                                    @click="addEmoji('['+item.word+']')"
                               />
                           </div>
                       </template>
                    </Slide>
                </div>
            </Toast>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import chatInput from './chatInput';
    import Toast from '../common/plug/Toast.vue';
    import Slide from '../common/plug/slide.vue';
	export default {
		name: 'chat',
		data() {
			return {

            }
		},

        components:{
	        chatInput,Toast,Slide
        },

		mounted() {

		},
        computed:{
            ...mapGetters('chat', {
	            inputWord:'getInputWord',
	            autoTextAreaHeight:'autoTextAreaHeight',
	            calcHeight:'calcSmallInputHeight',
	            emoji:'GetEmoji',
            })
        },
		methods: {
            ...mapActions('chat', [
	            'setInputWord', 'setAutoTextAreaHeight', 'addEmoji'
                ]
            ),
        },
	}
</script>

<style lang="scss" scoped>
    .emojiBox {
        height: 3.94rem;
        width: 7.5rem;
        background-color: #eee;

        .emojiList {
            padding: 0.18rem;
            display: -webkit-flex;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
        }

        .emoji {
            width: 0.45rem;
            height: 0.45rem;
            padding: 0.17rem;
        }

    }
</style>