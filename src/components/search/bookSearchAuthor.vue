<template>
    <div class="ansAuthorInfo" @click="(authorInfo.AuthorId)">
        <div>
            <img class="authorImg" :src="authorInfo.AuthorImageUrl" alt="">
        </div>
        <div class="AuthorInfoRight">
            <div class="authorInfo">
                <p class="authorName" v-html="dealAnsWord(authorInfo.AuthorName)"></p>
                <p class="authorLevel">{{authorInfo.AuthorLevel}}</p>
            </div>
            <div>
                <p class="authorDesc" v-html="dealAnsWord(authorInfo.AuthorWorksDescription)"></p>
            </div>
        </div>
    </div>
</template>

<script>
	import {mapGetters} from 'vuex';
	export default {
		props: ["authorInfo"],
		name: 'authorInfo',
		data() {
			return {}
		},
		computed:{
			...mapGetters({
				dealAnsWord:'search/dealAnsWord'
			})
		},


		mounted() {

		},
		methods: {},
	}
</script>

<style scoped>
    .ansAuthorInfo {
        background-color: #fff;
    }

    .ansAuthorInfo {
        height: 1.6rem;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        padding: 0 0.3rem;
    }

    .ansAuthorInfo .authorImg {
        height: 1.05rem;
        width: 1.05rem;
        border-radius: 0.5025rem;
    }

    .AuthorInfoRight {
        margin-left: 0.2rem;
        height: 1.05rem;

    }

    .authorInfo {
        display: -webkit-flex;
        display: flex;
        height: 0.4rem;
    }

    .authorName {
        font-size: 0.28rem;
    }

    .authorLevel {
        font-size: 0.08rem;
        padding: 0 0.4rem;
        margin-left: 0.4rem;
        border: 1px solid #E8BC97;
        color: #E8BC97;
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform-origin:left;
    }

    .authorDesc {
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        color: #9a9a9a;
        font-size:0.24rem;
        text-align: left;
        align-items: center;
    }




</style>