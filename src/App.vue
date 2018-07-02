<template>
    <div id="app">
        <div :class="{router:getTitle.isShowFoot,routerFoot:!getTitle.isShowFoot}">
            <router-view />
        </div>
        <footCommon></footCommon>
    </div>
</template>

<script>
	import titleCommon from './components/common/title.vue'
	import footCommon from './components/common/foot.vue';

	export default {
		name: 'App',
		components: {
			titleCommon: titleCommon,
			footCommon: footCommon
		}
	}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #ccc;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #ccc;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #ccc;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #ccc;
    }

    .head-title {
        top: 0;
        left: 0;
        width: 100vw;
        position: fixed;
        z-index: 1000;
    }



    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        font-size: 0.26rem;
    }

    .routerFoot {
        overflow: scroll;
        height:100vh;
    }

    .router {
        overflow: scroll;
        height:calc(100vh - 50px)
    }
</style>
