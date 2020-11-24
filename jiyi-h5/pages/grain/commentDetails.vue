<template>
	<view class="comment-details-container">
		<HeaderSearch title="详情"></HeaderSearch>
		<view class="comment-content">
			<view class="title">点评标题</view>
			<view class="date">2020-11-24</view>
			<view class="content">
				<text>
					文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容
					文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容
					文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容
				</text>
			</view>
			<view class="bottom">
				<view class="download">下载APP</view>
				<image class="image" src="../../static/img/tabbar/首页-s-r.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.comment-details-container {
	.comment-content{
		padding: 20rpx;
		
		.title{
			line-height: 80rpx;
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
		}
		.date{
			width: 100%;
			line-height: 40rpx;
			font-size: 28rpx;
			color: #999;
			font-weight: 500;
			text-align: right;
		}
		.content{
			padding: 20rpx 0;
			color: #666;
			font-size: 32rpx;
			
		}
		.bottom{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.download{
				text-align: center;
			}
			.image{
				width: 500rpx;
				height: 400rpx;
			}
		}
	}
}
</style>
