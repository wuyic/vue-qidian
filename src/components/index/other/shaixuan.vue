<template>
  <div class="shaixuan">
    <div class="head-title">
      <div class="head-body">

        <div class="head-left">
          <img class="head-left-img" src="../../../assets/image/close.png" alt="">
        </div>

        <div class="head-center">
          <p>{{getTitle.title}}</p>
        </div>

        <div class="head-right">

        </div>
      </div>
    </div>

    <div class="body">
      <div class="all">
        <div class="type-value allbook">
          <p class="name">全部</p>
          <p class="value">0</p>
        </div>
      </div>

      <div class="state">
        <div class="state-title">
          <p>状态</p>
        </div>
        <div class="state-body">
          <div class="type-value statebook" v-for="item in state">
            <p class="name">{{item.name}}</p>
            <p class="value">{{item.value}}</p>
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
			return {
        state:[
          {name:'连载', value:"124"},
          {name:'完本', value:"124"},
          {name:'超过50章未读', value:"124"},
          {name:'超过100章未读', value:"124"},
          {name:'未读过', value:"124"},
          {name:'读完', value:"124"},
        ]
      }
		},
    created() {
		  this.$store.dispatch('getBookBigType');
    },

		mounted() {

		},
		methods: {},

	}
</script>

<style>
  .shaixuan .head-title {
  }

  .shaixuan .head-body {
    height: 44px;
    padding:0 15px 0 15px;

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
    padding:15px;
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
    color:#dc5051;
    font-weight: 700;
  }

  .shaixuan .allbook .value {
    color:#db5568;
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
    justify-content: space-between;
  }

  .shaixuan .state .statebook {
    margin-bottom: 15px;
    width: 48%;
    background-color: #f6f7fb;
  }

</style>
