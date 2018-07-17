<template>
    <div>
        <div class="toastTip" :style="{backgroundColor:calcBGC, justifyContent:calcJC}">
            <transition name="toast">
                <div class="toastTipWord" v-if="type=='toast' && isShowToast">
                    <p>{{textVal}}</p>
                </div>
            </transition>
            <div class="toastBox" v-if="type=='toastBox'" style="">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex';
	export default {
		props: {
			'type':{default:'toast', all:['toast', 'toastBox']},
            'position':{default:'center'},
            'timeout':{default:500},
            'zIndex':{default:100000}
		},
		name: 'loading',
		data() {
			return {
				isShowToast:false,
				textVal:'',
            }
		},

        computed:{
			calcBGC() {
				if (this.type == 'toast') {
					return 'rgba(ff,ff,ff,1)';
                } else if (this.type == 'toastBox') {
					return 'rgba(33,33,33,0.15)';
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

		mounted() {

		},

		methods: {
            toastText({text, timeout}) {
	            this.isShowToast = true;
            	this.textVal = text;
	            timeout && (this.timeout = timeout);
	            setTimeout(()=>{this.isShowToast = false}, this.timeout)
            }
        },
	}
</script>

<style scoped>
    .toastTip {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left:0;
        top: 0;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .toastTipWord {
        background-color: #3c3c3c;
        min-width: 3.2rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 0.1rem;
        color:#fff;
        font-size: 0.26rem;

        -webkit-transition: height 0.3s ease-out;
        -moz-transition: height 0.3s ease-out;
        -o-transition: height 0.3s ease-out;
        transition: height 0.3s ease-out;
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