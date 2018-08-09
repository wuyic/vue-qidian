<template>
    <div class="fansRank">
        <div class="indexTitle">
            <indexTitle
                    :headLeft="{text:'返回', type:'word'}"
                    :headCenter="{text:'粉丝榜',textSmall:'100万+', type:'word'}"
                    :headRight="{text:'', type:'word'}"
            ></indexTitle>

        </div>
        <div class="indexReco">
            <div class="fourFans">

            </div>
            <div class="fansList">

            </div>
            <div class="mine">
                <div class="image">
                    <img src="" alt="">
                    <p></p>
                </div>
                <div class="info">
                    
                </div>
                <div class="rankImg">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
			indexTitle
		},
		computed: {

		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .fansRank {
        height: 100%;
        overflow: hidden;
        .indexTitle {
            top: 0;
            left: 0;
            width: 100vw;
            position: fixed;
            z-index: 1000;
        }
        .indexReco {
            position: relative;
            margin-top: 44px;
            height: 100%;
            background-color: #f5f5f5;


            .fourFans {
                height: 1.85rem;
                width: 7.5rem;
                background-color: #fff;
            }

            .fansList {
                margin-top: 0.3rem;
                height: 9.35rem;
                background-color: #fff;
            }

            .mine {
                border-top: 2px solid #c69a66;
                position: fixed;
                bottom:0;
                left: 0;
                z-index:1000;
                height: 0.9rem;
                width: 7.5rem;
                background-color: #fff;

                display: -webkit-flex;
                display: flex;
                align-items: center;

                .image {
                    width: 0.85rem;
                    height: 0.85rem;
                }
            }
        }

    }




</style>
