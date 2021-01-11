<template>
	<view class="list-container">
		<HeaderSearch title="回复"></HeaderSearch>

		<view class="content">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">zhoux</text>
				<text class="times">2021-01-11</text>
			</view>
			<view class="paragraph">
				<u-read-more :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="reply-b">
				<view class="left">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" color="#9FA3A8" size="24"></u-icon>
					<text>回复（22）</text>
				</view>
				<text class="right">删除</text>
			</view>
		</view>
		<view class="space"></view>
		
		<view class="title">全部回复(25)</view>
		
		<view class="reply-content"  v-for="i in 5" :key="i">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">zhoux</text>
				<text class="times">2021-01-11</text>
			</view>
			<view class="paragraph">
				<u-read-more :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
		<!-- 	<view class="reply-b">
				<view class="left">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" color="#9FA3A8" size="24"></u-icon>
					<text>回复（22）</text>
				</view>
				<text class="right">删除</text>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: `回复周先生`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.list-container {
	.title {
		line-height: 80rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #000000;
		opacity: 1;
		padding: 0 40rpx;
	}
	.space {
		width: 100%;
		height: 20rpx;
		background-color: rgba(229, 229, 229, 1);
	}
	.reply-content{
		padding: 0;
		.header {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 40rpx;
			.image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 24rpx;
			}
			.users {
				flex: 1;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
			.times {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
		}
		.paragraph {
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			padding: 0rpx 40rpx 20rpx 40rpx;
		}
		.reply-b {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 20rpx;
			font-weight: 400;
			color: #9fa3a8;
			opacity: 1;
			padding: 0 40rpx;
			.left {
				display: flex;
				align-items: center;
				flex: 1;
			}
			.right {
				color: #5eb14e;
			}
		}
			
	}
	.content {
		padding: 20rpx 0;
		.header {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 40rpx;
			.image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 24rpx;
			}
			.users {
				flex: 1;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
			.times {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
		}
		.paragraph {
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			padding: 0rpx 40rpx 20rpx 40rpx;
		}
		.reply-b {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 20rpx;
			font-weight: 400;
			color: #9fa3a8;
			opacity: 1;
			padding: 0 40rpx;
			.left {
				display: flex;
				align-items: center;
				flex: 1;
			}
			.right {
				color: #5eb14e;
			}
		}
	
	}
}
</style>
