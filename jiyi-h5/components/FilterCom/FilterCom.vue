<template>
	<view>
		<view class="filter-container">
			<view :class="tabIndex == 1 && 'select-tab'" @tap="clickTab(1)">最火</view>
			<view :class="tabIndex == 2 && 'select-tab'" @tap="clickTab(2)">最新</view>
			<view :class="tabIndex == 3 && 'select-tab'" @tap="clickTab(3)">精品</view>
			<view :class="tabIndex == 4 && 'select-tab'" @tap="clickTab(4)">热议</view>
			<view :class="tabIndex == 5 && 'select-tab'" @tap="clickTab(5)">好评</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		
	},
	data() {
		return {
			tabIndex: 1
		};
	},
	methods: {
		clickTab(val) {
			this.tabIndex = val;
			this.$emit('selectTab', val);
		}
	}
};
</script>

<style lang="scss">
.filter-container {
	margin: 20rpx auto;
	width: 686rpx;
	height: 88rpx;
	background: #f4f4f4;
	opacity: 1;
	border-radius: 30rpx;
	display: flex;
	view {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #000000;
		opacity: 1;
	}

	.select-tab {
		flex: 1;
		height: 88rpx;
		background: #5eb14e;
		opacity: 1;
		border-radius: 30rpx;
		color: #ffffff;
		opacity: 1;
	}
}
</style>
