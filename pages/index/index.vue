<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labelList="labelList" :activeIndex="activeIndex" @changeCurrentIndex="changeCurrentIndex"></TabBar>
		<!-- 文章容器组件 -->
		<ArticleList :labelList="labelList" :activeIndex="activeIndex" @changeCurrentIndex="changeCurrentIndex"
			class="list-container"></ArticleList>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this._initLabelList();
		},
		data() {
			return {
				labelList: [], // label数据
				activeIndex: 0,
			}
		},
		methods: {
			// 初始化 获取 label 的远程数据 from server
			async _initLabelList() {
				// 封装一下，通用
				// uniCloud.callFunction({
				// 	name: 'get_label_list',
				// 	success: (res) => {
				// 		// this指向问题, 没有使用箭头函数时，指向的不是vue！
				// 		this.labelList = res.result.labelList;
				// 		// console.log('index labelist', this.labelList)
				// 	}
				// })
				// =>

				const labelList = await this.$http.get_label_list();
				this.labelList = labelList;
				// console.log('index page labelist', this.labelList)
			},
			/* 修改当前activeIndex值 */
			changeCurrentIndex(index) {
				this.activeIndex = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		display: flex;
	}

	.home-container {
		overflow: hidden;
		flex: 1; // 占满
		box-sizing: border-box;
		@include flex(flex-start, column);
		align-items: inherit;
	}

	.list-container {
		flex: 1;
		box-sizing: border-box;
	}
</style>
