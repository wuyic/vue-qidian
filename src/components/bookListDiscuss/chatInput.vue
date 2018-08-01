<template>
    <div class="chatBoxSmall" :style="{height:calcHeight}">
        <div class="textInputArea">
            <div class="divTextArea"
                 id="divTextArea"
                 type="search"
                 placeholder="写评论"
                 @keyup="setInputHeight($event)"
                 @keypress="onKeyPressEnter($event)"
                 v-html="inputWord"
                 @input="setInputWord"
                 :style="{height:autoTextAreaHeight}"
                 contenteditable="true"

            >
            </div>
        </div>
        <div class="imageSmail" @click="showOrSmail">
            <img class="imageSmailImg" src="../../assets/image/QDEmojiFace.png" alt="">
        </div>
    </div>
</template>
<script>


	import {mapActions, mapGetters, mapMutations} from 'vuex'

	export default {
		name: 'chatInput',
		data() {
			return {}
		},
		mounted() {

		},
        watch: {
	        inputWord : () => {
		        let editor = document.getElementById('divTextArea');
		        window.setTimeout(function () {
			        let sel,range;
			        if (window.getSelection && document.createRange) {
				        range = document.createRange();
				        range.selectNodeContents(editor);
				        range.collapse(true);
				        range.setEnd(editor, editor.childNodes.length);
				        range.setStart(editor, editor.childNodes.length);
				        sel = window.getSelection();
				        sel.removeAllRanges();
				        sel.addRange(range);
			        } else if (document.body.createTextRange) {
				        range = document.body.createTextRange();
				        range.moveToElementText(editor);
				        range.collapse(true);
				        range.select();
			        }
		        }, );
            }
        },
		computed: {
			...mapGetters('chat', {
				inputWord: 'getInputWord',
				autoTextAreaHeight: 'autoTextAreaHeight',
				calcHeight: 'calcSmallInputHeight',
			}),

		},
		methods: {
			...mapActions('chat', [
					'setInputWord', 'setAutoTextAreaHeight', 'onKeyPressEnter', 'showOrSmail'
				]
			),
            setInputHeight(obj) {
	            this.setAutoTextAreaHeight('auto');
	            obj = obj.currentTarget;
                this.$nextTick(()=>{
	                this.setAutoTextAreaHeight(obj.scrollHeight + "px");
                })
            },
		},
	}
</script>

<style lang="scss" scoped>


    .chatBoxSmall {
        width: 7.5rem;
        background-color: #f4f4f6;
        border-top: 1px solid #dcdcdc;
        display: -webkit-flex;
        display: flex;
        justify-content: left;
        align-items: center;
        .textInputArea {
            padding: 0.1rem 0 0.1rem;
            border: 1px solid #b7b7b7;
            border-radius: 0.07rem;
            background-color: #fff;
            margin-left: 0.11rem;
            margin-top: -0.03rem;

            .divTextArea {
                padding: 0 0.15rem;
                background-color: #fff;
                width: 6.1rem;
                line-height: 0.4rem;
                min-height: 0.4rem;
                justify-content: center;
                word-wrap: break-word;
                overflow: hidden;
                resize: none;
                font-size: 0.28rem;
                vertical-align: top;
                text-align: left;

                word-break: break-all;
                outline: none;
                user-select: text;
                white-space: pre-wrap;

                &[contenteditable=true]{
                    -webkit-user-modify: read-write-plaintext-only; // 只是编辑text文本，只能解决webkit内核里面问题，手机端适用
                    -webkit-user-select: text; // 解决IOS部分手机不支持contenteditable=true属性问题
                    &:empty:before {
                        content: attr(placeholder);
                        display: block;
                        color: #ccc;
                    }
                }
            }



            .divTextArea:focus {
                background-color: #fff;
                outline: none;
            }
        }

        .imageSmail {
            padding-left: 0.15rem;

            .imageSmailImg {
                width: 0.5rem;
                height: 0.5rem;
                vertical-align: bottom;
            }
        }

    }
</style>