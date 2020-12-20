<template>
	<view class="empty" :class="{ 'empty-fixed': option.fixed }" :style="{ 'z-index': option.zIndex, top: option.top }">
		<view> <image v-if="icon" class="empty-icon" :src="icon" mode="widthFix" /> </view>
		<view v-if="tip" class="empty-tip">{{ tip }}</view>
	</view>
</template>

<script>

export default {
	props: {
		// empty的配置项
		option: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	// 使用computed获取配置,用于支持option的动态配置
	computed: {
		// 图标
		icon() {
			return this.option.icon == null ? 'https://www.mescroll.com/img/mescroll-empty.png' : this.option.icon; // 此处不使用短路求值, 用于支持传空串不显示图标
		},
		// 文本提示
		tip() {
			return this.option.tip == null ? '暂无数据' : this.option.tip; // 此处不使用短路求值, 用于支持传空串不显示文本提示
		}
	}
};
</script>

<style scoped>
/* 无任何数据的空布局 */
.empty {
	box-sizing: border-box;
	width: 100%;
	padding: 30rpx 20rpx;
	text-align: center;
	background: #fff;
	
}

.empty.empty-fixed {
	z-index: 99;
	position: absolute; /*transform会使fixed失效,最终会降级为absolute */
	top: 100rpx;
	left: 0;
}

.empty .empty-icon {
	width: 280rpx;
	height: 280rpx;
}

.empty .empty-tip {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: gray;
}

.empty .empty-btn {
	display: inline-block;
	margin-top: 40rpx;
	min-width: 200rpx;
	padding: 18rpx;
	font-size: 28rpx;
	border: 1rpx solid #e04b28;
	border-radius: 60rpx;
	color: #e04b28;
}

.empty .empty-btn:active {
	opacity: 0.75;
}
</style>
