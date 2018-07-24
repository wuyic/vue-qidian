<template>
    <div @click="toastBox({type:toastName, status:false})">
        <div class="toastTip" :style="{backgroundColor:calcBGC, justifyContent:calcJC}" v-if="isShowToast || isShowBox['type'+toastName]">
            <transition name="toast">
                <div class="toastTipWord" v-if="type=='toast' && isShowToast">
                    <p>{{textVal}}</p>
                </div>
            </transition>
            <div class="toastBox" v-if="type=='toastBox'" style=""  @click.stop>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	import Vue from 'vue'

	export default {
		props: {
			'toastName':{default:'where'}, //不可重复
			'type': {default: 'toast', all: ['toast', 'toastBox']},
			'position': {default: 'center'},
			'timeout': {default: 500},
			'zIndex': {default: 100000}
		},
		name: 'loading',
		data() {
			return {

			}
		},
        created() {
	        if (this.toastName != 'where') {
		       Vue.set(this.$store.state.toast.isShowBox, 'type' + this.toastName, false)
	        }
        },

		computed: {
            ...mapGetters('toast', [
            		'isShowToast', 'isShowBox', 'textVal'
                ]
            ),
			calcBGC() {
				if (this.type == 'toast') {
					return 'rgba(ff,ff,ff,1)';
				} else if (this.type == 'toastBox') {
					return 'rgba(33,33,33,0.5)';
				}
			},

			calcJC() {
				if (this.position == 'bottom') {
					return 'flex-end'
				} else if (this.position == 'top') {
					return 'flex-start'
				} else {
					return 'center'
				}
			}
		},

		methods: {
            ...mapActions('toast', [
            	'toastText', 'toastBox', 'initToast'
            ]),
		},
	}
</script>

<style scoped>
    .toastTip {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index:10000;
    }

    .toastTipWord {
        background-color: #3c3c3c;
        width: 3.2rem;
        line-height: 1rem;
        border-radius: 0.1rem;
        color: #fff;
        font-size: 0.26rem;
        -webkit-transition: height 0.3s ease-out;
        -moz-transition: height 0.3s ease-out;
        -o-transition: height 0.3s ease-out;
        transition: height 0.3s ease-out;
    }

    .toastTipWord p {
        padding: 0.25rem;
        line-height: 0.4rem;
        margin: 0 auto;
        white-space: pre-wrap;
    }

    .toast-enter-active, .toast-leave-active {
        transition: opacity .5s;
    }

    .toast-enter, .toast-leave-to {
        opacity: 0;
    }

    .toastBox {

    }

</style>