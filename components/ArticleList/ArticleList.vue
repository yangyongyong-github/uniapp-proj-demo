<template>
	<swiper class="swiper-container" :current="activeIndex" @change="changeCurrentIndex">
		<swiper-item v-for="(item, index) in labelList" :key="index">
			{{item.name}}
			<!-- <view class="swiper-item uni-bg-red">
				<list-item></list-item>
			</view> -->
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "ArticleList",
		data() {
			return {
			};
		},
		props: {
			labelList: Array,
			activeIndex: Number
		},
		methods: {
			changeCurrentIndex(e) {
				const {
					current
				} = e.detail;
				this.$emit('changeCurrentIndex', current)
			}
		}
	}
</script>

<style lang="scss">
	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
