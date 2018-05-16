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
      <div class="type-value allbook">
        <p class="name">全部</p>
        <p class="value">0</p>
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
    width: 100%;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .shaxuan .type-value .name {
    padding-left: 12px;
  }
  .shaxuan .type-value .value {
    padding-right: 12px;
  }

  .shaixuan .allbook {
    background-color: #fff5f4;
  }



  .shaixuan .allbook .name {
    color:#dc5051;
    font-size: 14px;
  }
  .shaixuan .allbook .value {
    color:#db5568;
    font-size: 12px;
    font-weight: 700;
  }

</style>
