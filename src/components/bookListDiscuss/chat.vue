<template>
    <div>
        <div class="chatBoxSmall">
            <div class="textInputArea">
                <textarea
                        placeholder="写评论" rows="1"
                        @keyup="setAutoTextAreaHeight($event)"
                        :value="inputWord"
                        @input="setInputWord"
                        :style="{height:autoTextAreaHeight}"
                >
                </textarea>
            </div>

            <div class="imageSmail">

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
	export default {
		name: 'chat',
		data() {
			return {

            }
		},
		mounted() {

		},
        computed:{
            ...mapGetters('chat', {
	            inputWord:'getInputWord',
	            autoTextAreaHeight:'autoTextAreaHeight'
            })
        },
		methods: {
            ...mapActions('chat', [
	            'setInputWord', 'setAutoTextAreaHeight'
                ]
            ),
        },
	}
</script>

<style lang="scss" scoped>
    .chatBoxSmall {
        height: 100%;
        width: 7.5rem;
        background-color: #f4f4f6;
        border-top:1px solid #dcdcdc;
        display: -webkit-flex;
        display: flex;
        justify-content: left;
        align-items: center;
        .textInputArea {
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
            border: 1px solid #b7b7b7;
            border-radius: 0.07rem;
            background-color: #fff;
            font-size: 0.28rem;

            textarea {
                background-color: #fff;
                width: 6.4rem;
                /*line-height: 0.4rem;*/
                /*min-height: 0.4rem;*/
                justify-content: center;
                word-wrap: break-word;
                overflow: hidden;
                resize: none;
            }

            textarea:focus {
                background-color: #fff;
                outline: none;
            }
        }

        .imageSmail {

        }

    }
</style>