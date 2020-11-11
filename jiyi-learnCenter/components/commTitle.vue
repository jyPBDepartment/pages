<template>
	<view class="comm-title">
		<view class="name">{{ title }}</view>
		<view class="more" @click="rmMore">{{ moreText }}</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '我的'
		},
		moreText: {
			type: String,
			default: '查看更多'
		}
	},
	data() {
		return {};
	},
	methods: {
		rmMore() {
			this.$emit('more');
		}
	}
};
</script>

<style lang="scss" scoped>
.comm-title {
	background: #ffffff;
	font-size: 32rpx;
	line-height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;

	.name {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 44px;
		color: #000000;
		font-weight: 500;
	}
	.more {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 44px;
		color: rgba(60, 60, 67, 0.5);
	}
}
</style>
