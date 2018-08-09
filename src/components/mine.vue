<template>
    <div>
        <indexTitle></indexTitle>
        {{daojishi}}
    </div>
</template>

<script>
	import indexTitle from './index/index/title.vue';

	export default {
		name: 'good',
		data() {
			return {
				createTime: new Date().getTime(),
				orderExpire: 30 * 60 * 1000,
				lessTime: 0,
				msg: 'Welcome to Your Vue.js App'
			}
		},
        mounted() {
	        this.getData()
        },

		computed: {
			daojishi() {
				if (this.lessTime < 1000) {
					return '订单超时';
				} else {
					let min = new Date(this.lessTime).getMinutes();
					let sec = new Date(this.lessTime).getSeconds();
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					return '支付剩余时间' + min + ':' + sec;
				}
			}
		},
		methods: {
			getData() {
				this.lessTime = this.createTime + this.orderExpire - new Date().getTime();

				let inter = setInterval(() => {

					if (this.lessTime >= 1000) {
						this.lessTime -= 1000;
					} else {
						clearInterval(inter)
                    }
				}, 1000);

			}
		},

		components: {
			indexTitle: indexTitle
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
