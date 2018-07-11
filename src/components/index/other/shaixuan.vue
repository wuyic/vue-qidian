<template>
    <div class="shaixuan">
        <div class="head-title">
            <div class="head-body">

                <div class="head-left" @click="goToBookCase(-10000)">
                    <img class="head-left-img" src="../../../assets/image/close.png" alt="">
                </div>

                <div class="head-center fontSize">
                    <p>{{getTitle.title}}</p>
                </div>
                <div class="head-right">

                </div>
            </div>
        </div>

        <div class="body">
            <div class="all">
                <div :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == -1}"
                     @click="goToBookCase(-1, 100)">
                    <p class="name fontSize">全部</p>
                    <p class="value">0</p>
                </div>
            </div>

            <div class="state">
                <div>
                    <div class="state-title fontSize">
                        <p>状态</p>
                    </div>
                    <div class="state-body">
                        <div v-for="item in bookCaseState"
                             :class="{'type-value':true, 'statebook':true,  colorPink:saixuanChoosed == item.Id, colorNone:item.num == 0}"
                             @click="goToBookCase(item.Id, item.num)">
                            <p class="name">{{item.name}}</p>
                            <p class="value">{{item.num}}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="state-title fontSize">
                        <p>类型</p>
                    </div>
                    <div class="state-body" style="border-bottom: 1px solid #e3e3e3;">
                        <div v-for="item in bigType"
                             :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.Id, colorNone:item.num == 0}"
                             @click="goToBookCase(item.Id, item.num)">
                            <p class="name">{{item.name}}</p>
                            <p class="value">{{item.num ? item.num : 0}}</p>
                        </div>
                    </div>

                    <div class="state-body" style=" margin-top: 10px;">
                        <div v-for="item in boyBookTypeHave"
                             :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.CategoryId, colorNone:item.num == 0}"
                             v-if="item.num > 0" @click="goToBookCase(item.CategoryId, item.num)">
                            <p class="name">{{item.CategoryName}}</p>
                            <p class="value">{{item.num}}</p>
                        </div>
                    </div>

                    <div class="state-body" style="border-top: 1px solid #e3e3e3; padding-top: 10px;"
                         v-if="bigType[1].num > 0">
                        <div v-for="item in girlBookTypeHave" v-if="item.num > 0"
                             :class="{'type-value':true, 'bookType':true,  colorPink:saixuanChoosed == item.CategoryId, colorNone:item.num == 0}"
                             @click="goToBookCase(item.CategoryId)">
                            <p class="name">{{item.CategoryName}}</p>
                            <p class="value">{{item.num}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'shaixuan',
		data() {
			return {}
		},

		created() {

		},

		computed: {
			bookCase() {
				return this.$store.state.bookcase.bookCase;
			},

			bigType() {
				let bookBigType = this.$store.state.bookcase.bookCase.bookTypeDivide;
				return bookBigType;
			},

			boyBookTypeHave() {
				let boyType = this.$store.state.bookcase.bookCase.bookTypeDivide[0].subType;
				return boyType;
			},

			girlBookTypeHave() {
				let girlType = this.$store.state.bookcase.bookCase.bookTypeDivide[1].subType;

				return girlType;
			},

			saixuanChoosed() {
				console.log(this.$store.state.bookcase.bookCase.saixuanChoosed);
				return this.$store.state.bookcase.bookCase.saixuanChoosed;
			},

			bookCaseState() {
				console.log(this.$store.state.bookcase.bookCase);
				let bookCaseState = this.$store.state.bookcase.bookCase.bookState;

				return bookCaseState;
			}

		},


		mounted() {

		},
		methods: {
			goToBookCase: function (type, num) {
				if (num > 0) {
					if (type > -100) {
						this.$store.commit('setSaixuanChoosed', type);
					}
				}
				this.$router.push({name: 'index'})
			}
		},

	}
</script>

<style scoped>
    .shaixuan .head-title {
    }

    .shaixuan .head-body {
        height: 44px;
        padding: 0 15px 0 15px;

        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .shaixuan .head-left-img {
        width: 20px;
        height: 20px;
    }

    .shaixuan .head-left {
        width: 44px;
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

    .shaixuan .body {
        margin-top: 44px;
        padding: 15px;
    }

    .shaixuan .type-value {
        height: 37px;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .shaixuan .type-value .name {
        padding-left: 12px;
        font-size: 14px;
        color: #33373d;
    }

    .fontSize {
        font-size: 0.3rem;
    }

    .shaixuan .type-value .value {
        padding-right: 12px;
        font-size: 12px;
        color: #969ba3;
    }

    .shaixuan .allbook {
        background-color: #fff5f4;
        width: 100%;
    }

    .shaixuan .allbook .name {
        color: #dc5051;
        font-weight: 700;
    }

    .shaixuan .allbook .value {
        color: #db5568;
    }

    .shaixuan .state-title {
        padding-bottom: 15px;
        padding-top: 15px;
        text-align: left;
    }

    .shaixuan .state-body {
        width: 100%;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .shaixuan .state .statebook {
        margin-bottom: 10px;
        width: 48%;
        background-color: #f6f7fb;
        margin-right: 2%;
    }

    .shaixuan .state .bookType {
        margin-bottom: 10px;
        width: 30%;
        background-color: #f6f7fb;
        margin-right: 3.3%;
    }

    .shaixuan .colorNone {
        background-color: #f6f7fb;
    }

    .shaixuan .colorPink {
        background-color: #fff5f4;
    }

    .shaixuan .colorNone .name {
        color: #969ba3;
    }

    .shaixuan .colorNone .value {
        color: #969ba3;
    }

    .shaixuan .colorPink .name {
        color: #dc5051;
    }

    .shaixuan .colorPink .value {
        color: #db5568;
    }


</style>
