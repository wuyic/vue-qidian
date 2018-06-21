<template>
    <!--主页下拉刷新的导读页面， 上滑后取消-->
    <div class="searchBody">
        <!--默认推荐栏-->
        <div class="recommond">
            <div class="hot">
                <div class="smallTitle">
                    <p class="word">热门搜索</p>
                    <p class="word" style="text-align: right">换一换</p>
                </div>
                <div class="smallBody">
                    <div class="cell" v-for="(item, index) in list">{{item.name}}</div>
                </div>
            </div>
            <div class="hotSearchRank">

            </div>

            <div class="advertising">

            </div>
        </div>
    </div>
</template>
<script>

	export default {
		name: 'list',
		data() {
			return {
				jiying: '都市',
				list:[
                    {name:'万劫'},
                    {name:'英雄联盟'},
                    {name:'刀山火海'},
                    {name:'均'},
                    {name:'厉害'},
                    {name:'万劫'},
                    {name:'很牛逼'},
                    {name:'超似懂非懂'},
                ]
			}
		},

		created() {

		},

		computed: {},

		methods: {}
	}
</script>

<style>
    .recommond {
        background-color: #eee;
    }

    .recommond .hot {
        background-color: #fff;
        height: 2.3rem;
        width: 7.5rem;
    }

    .recommond .smallTitle {
        width: 6.9rem;
        height: 0.8rem;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding:0 0.3rem;
    }

    .recommond  .smallTitle .word{

        height: 0.8rem;
        width: 3rem;
        text-align: left;
        line-height: 0.8rem;
        color: #333;
        font-size: 0.28rem;
    }
    .recommond  .smallBody{
        width: 6.9rem;
        padding: 0 0.3rem;

        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content:flex-start;
        flex-wrap:wrap;

    }
    .recommond  .smallBody .cell{
        height: 0.55rem;
        line-height: 0.55rem;
        font-size: 0.28rem;
        border:0.01rem solid #eee;
        border-radius: 0.225rem;
        padding: 0 0.2rem;
        margin: 0 0.1rem 0.2rem 0;
        color:#757575;
    }

    .recommond .hotSearchRank {
        background-color: #fff;
        height: 0.8rem;
        margin-top: 0.2rem;
    }

    .recommond .advertising {
        background-color: #fff;
        min-height: 1.3rem;
        margin-top: 0.2rem;
        width: 7.5rem;
    }


</style>
