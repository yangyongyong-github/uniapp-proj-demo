<template>
	<view class="tab">
		<!-- 横向滚动区域 -->
		<scroll-view scroll-x="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view class="tab-scroll-item" :class="{active: activeIndex===index}" v-for="(item, index) in labList"
					:key="index" @click="navClickFn(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 右侧的 管理图标 -->
		<view class="tab-icons">
			<uni-icons @click="goLabelAdmin" type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		data() {
			return {
				activeIndex: 0,
			};
		},
		props:{
			labList:Array
		},
		methods: {
			goLabelAdmin() {
				uni.navigateTo({
					url: "/pages/labelAdmin/labelAdmin",
				});
			},
			navClickFn(index) {
				this.activeIndex = index;
			},
		},
	}
</script>

<style lang="scss">
	@import './TabBar.scss'
</style>
