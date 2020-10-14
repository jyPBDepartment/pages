<template>
	<view class="containt">
		<!-- 头部 -->
		<view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon> 
			</view> 
			<view class="title">经销商手册
			</view>
		</view>
		
		<!-- 下划线 -->
		<view>
			<u-line class="line"></u-line>
		</view>
		
		<!-- 内容 -->
		<view class="bottom">
			
			<view class="article" @click="jump('./agentArticle')">
				<view class="left">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/10/10/1602294129370420.png" class="icon4"></u-icon>
					<text class="articleText"> 文章</text>
				</view>
				<view class="right">
					<u-icon size="33" name="arrow-right"></u-icon>
				</view>

			</view>
			
			<!-- 下划线 -->
			<view>
				<u-line></u-line>
			</view>
			
			<view class="article" @click="jump('./agentVideo')" style="margin-top: 20rpx;">
				<view class="left">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/10/10/1602294206658703.png" class="icon4"></u-icon>
					<text class="articleText"> 视频</text>
				</view>
				<view class="right">
					<u-icon size="33" name="arrow-right"></u-icon>
				</view>
			</view>
			<!-- 下划线 -->
			<view>
				<u-line></u-line>
			</view>

		</view>

	</view>

</template>

<script>
	export default {

		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			// 经销商功能跳转页面
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			backTo() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		height: 55rpx;
		margin-top: 20rpx;

		.backArrow {
			margin: 0rpx 260rpx 0rpx 20rpx;
			font-weight: bold;
		}

		.title {
			text-align: center;
		}
	}

	.line {
		border: 4rpx solid #dfdfdf;
	}

	.bottom {
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;

		.article {
			display: flex;
			margin: 0rpx 0rpx 10rpx 20rpx;
			justify-content: space-between;

			.left {
				display: flex;

				.articleText {
					font-size: 28rpx;
					line-height: 60rpx;
					margin-left: 30rpx;
				}
			}

			.right {
				margin: 5rpx 20rpx 0rpx 0rpx;
			}

		}

	}
</style>
