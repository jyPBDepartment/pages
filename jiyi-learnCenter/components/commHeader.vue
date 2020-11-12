<template>
	<view class="header">
		<u-icon v-if="showGoBack" class="go-back" name="arrow-left" color="#333" size="44" @tap="backTo"></u-icon>
		<view class="title">{{ title }}</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '我的'
		},
		showGoBack: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	methods: {
		backTo() {
			this.$emit('backTo');
		},
		collection() {
			this.$emit('collection');
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	width: 750rpx;
	height: 80rpx;
	background: #ffffff;
	border-bottom: 1rpx solid #f4f4f4;
	line-height: 1;
	display: flex;
	align-items: center;
	padding: 0 40rpx;
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 888;
	.title {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 88rpx;
		color: #000000;
		text-align: center;
		flex: 1;
	}
	.go-back {
		position: absolute;
		left: 10rpx;
		right: 0;
		width: 44rpx;
	}
	.start{
		
	}
}
</style>
