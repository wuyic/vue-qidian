<template>
    <div class="common">
        <div class="head-title">
            <div class="head-body">

                <div class="head-left">
                    <img class="head-left-img" src="../../assets/image/close.png" alt="">
                </div>

                <div class="head-center">
                    <p>{{getTitle.title}}</p>
                </div>

                <div class="head-right">

                </div>
            </div>
        </div>
    </div>
</template>

<script>

	export default {
		name: 'commonTitle',
		data() {
			return {}
		},
		mounted() {

		},
		methods: {},

	}
</script>

<style scoped>
    .shaixuan .head-title {
        border-bottom: 1px solid #f00;
    }

    .shaixuan .head-body {
        height: 0.80rem;
        padding: 0 15px 0 15px;

        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .shaixuan .head-left-img {
        width: 0.40rem;
        height: 0.40rem;
    }

    .shaixuan .head-left {
        width: 0.80rem;
        flex-grow: 0;
        font-size: 0;
    }

    .shaixuan .head-center {
        width: 50vw;
        flex-grow: 1;
    }

    .shaixuan .head-right {
        width: 44px;
        flex-grow: 0;
    }
</style>
