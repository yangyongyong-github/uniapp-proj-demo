<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :labList="labelList"></TabBar>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this._initLabelList();
		},
		data() {
			return {
				labelList: [] // label数据
			}
		},
		methods: {
			// 初始化 获取 label 的远程数据 from server
			_initLabelList() {
				uniCloud.callFunction({
					name: 'get_lab_list',
					success: (res) => {
						// this指向问题, 没有使用箭头函数时，指向的不是vue！
						this.labelList = res.result.labelList;
						// console.log('index labelist', this.labelList)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		overflow: hidden;
	}
</style>
