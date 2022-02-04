<template>
		<view class="nav-bar">
			<view class="nav-bar-top">
				<!-- 顶部垫片（小程序的顶部信息导航栏） -->
				<view :style="{ height: statusHeight + 'rpx'}"></view>
				<!-- 静态搜索栏的展示 -->
				<view class="nav-bar-content" :style="{ marginRight : marginRight + 'rpx'}" @click="goSearchPage()">
					<uni-icons class="nav-bar-search-icon" type="search" color="#999"></uni-icons>
					<view class="nav-bar-search-txt"> 输入文章标题进行搜索</view>
				</view>
			</view> 
			<!-- 底部垫片：更哈的解决fixed布局脱离文档流的问题 -->
			<view :style="{ height:80 + statusHeight + 'rpx'}"></view>
		</view>
</template>

<script>
	export default {
		name: "NavBar", //devtols调试
		created() {
			this.initStatusBarHeight(); /* 初始化获取顶部状态栏高度 */
		},
		data() {
			return {
				statusHeight: 20, // 获取顶部状态栏的高度  
				marginRight: 0, // 距离右边的高度，为的是 微信小程序的顶部胶囊块
			};
		},
		methods: {
			initStatusBarHeight() {
				const systemInfo = uni.getSystemInfoSync()
				// 获取顶部状态栏的高度  微信小程序为 statusBarHeight: 20
				this.statusHeight = systemInfo.statusBarHeight ? systemInfo.statusBarHeight * 2 : 20;

				// #ifdef MP-WEIXIN
				/* 如果是小程序的换，进行胶囊处理*/
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
				this.marginRight = menuButtonInfo.width * 2 + 21; // marginRight 与有胶囊width 对其
				this.statusHeight = menuButtonInfo.top * 2 + 13;
				// #endif
			},
			goSearchPage() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './NavBar.scss'
</style>
