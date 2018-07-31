<template>
    <div class="slideBox">
        <div v-for="indexPos in pageAllNum"
             :class="{slide:true, transitionStyle:isTransition}"
             :style="{left:'calc(' + moveLeft.sure + ' + ' +  (indexPos - theSlidePos)*7.5 + 'rem)'}"
        >
            <slot name="slide" :indexPos="indexPos">

            </slot>
        </div>
    </div>
</template>

<script>
    export default {
    	props:['pageAllNum'],
    	name:'slide',
        data() {
    		return {
			    moveLeft:{
			    	sure:'0px',
                    temp:'0px'
                },
                startPos:{x:0},
                moveModulus:3,
                theSlidePos:1,
			    isTransition:false,
            }
        },
        computed: {

        },
        mounted() {
    		let slideBoxEM = document.getElementsByClassName('slideBox')[0];
    		slideBoxEM.addEventListener('touchstart', this.touchStart);
    		slideBoxEM.addEventListener('touchmove', this.touchMove);
    		slideBoxEM.addEventListener('touchend', this.touchEnd);
        },

        methods:{
            touchStart(event) {
	            this.moveLeft.temp = this.moveLeft.sure;
                this.startPos.x = event.changedTouches[0].clientX;
            },
            touchMove(event) {
            	let disx = event.changedTouches[0].clientX - this.startPos.x;
            	if ((this.theSlidePos == 1 && disx > 0) ||
                    (this.theSlidePos == this.pageAllNum && disx < 0)) {
		            this.moveLeft.sure = disx/this.moveModulus + 'px';
                } else {
		            this.moveLeft.sure = disx + 'px';
                }
            },
            touchEnd(event) {

	            this.$nextTick(()=>{
		            this.isTransition = true;
	            });

            	this.$nextTick(()=>{
		            let clientWidth = document.documentElement.clientWidth;
		            let disx = event.changedTouches[0].clientX - this.startPos.x;

		            if (clientWidth / 2 <= disx){
			            this.theSlidePos = Math.max(1, this.theSlidePos-1);
		            } else if (-clientWidth / 2 >= disx) {
			            this.theSlidePos = Math.min(this.pageAllNum, this.theSlidePos+1);
		            }
		            this.moveLeft.sure = this.moveLeft.temp;
                });

                this.$nextTick(()=>{
	                this.isTransition = false;
                })

            },
        },
    }
</script>

<style lang="scss" scoped>
    .slideBox {
        height: 100%;
        position: relative;
        overflow: hidden;

        .slide {
            position: absolute;
            height: 3rem;
            width: 7.5rem;
        }

        .slide1 {
            left:0;
            top:0;
        }

        .slide2 {
            left:7.5rem;
            top:0;
        }

        .transitionStyle {
            transition: left 1s ease;
            -moz-transition: left 1s ease-in;
            -webkit-transition: left 1s ease-in;
            -o-transition: left 1s ease-in;
        }
    }
</style>