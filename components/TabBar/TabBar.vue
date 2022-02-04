<template>
	<view class="tab">
		<!-- 横向滚动区域 -->
		<scroll-view scroll-x="true" :scroll-into-view="currentIndex" :scroll-with-animation="true" class="tab-scroll">
			<view class="tab-scroll-box">
				<view :id="`item${index}`" class="tab-scroll-item" :class="{active: activeIndex===index}" v-for="(item, index) in labelList"
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
				currentIndex: ''
			};
		},
		props: {
			labelList: Array,
			activeIndex: Number,
		},

		watch: {
			// 负责监控swiper和顶部active(NavBar)的对应一致
			activeIndex(index) {
				this.currentIndex = `item${index}`
			}
		},
		methods: {
			goLabelAdmin() {
				uni.navigateTo({
					url: "/pages/labelAdmin/labelAdmin",
				});
			},
			navClickFn(index) {
				// this.activeIndex = index;
				this.$emit('changeCurrentIndex', index)
			},
		},
	}
</script>

<style lang="scss">
	@import './TabBar.scss'
</style>
