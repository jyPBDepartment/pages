<template>
	<view class="content">
		<!--头部 -->
		<header-box title="我的" :showGoBack="false"></header-box>
		<!-- 各个功能页面 -->
		<view class="function">
			<view class="split-space"></view>
			<view class="item" @click="myCollection">
				<u-icon name="star" color="#2979ff" size="32"></u-icon>
				<text>我的收藏</text>
				<u-icon name="arrow-right" color="#666666" size="32"></u-icon>
			</view>
			<view class="split-space"></view>
			<!-- <view class="item" @click="studyRecord">
				<u-icon name="file-text" color="#2979ff" size="32"></u-icon>
				<text>学习记录</text>
				<u-icon name="arrow-right" color="#666666" size="32"></u-icon>
			</view> -->
			<!-- <view class="split-space"></view> -->
			<view class="item" @click="examScore">
				<u-icon name="order" color="#2979ff" size="32"></u-icon>
				<text>考试成绩</text>
				<u-icon name="arrow-right" color="#666666" size="32"></u-icon>
			</view>
			<view class="split-space"></view>
			<view class="item" @click="signUp">
				<u-icon name="list" color="#2979ff" size="32"></u-icon>
				<text>报名课程</text>
				<u-icon name="arrow-right" color="#666666" size="32"></u-icon>
			</view>
			<view class="split-space"></view>
			<view class="item" @click="myCertificate">
				<u-icon name="bookmark" color="#2979ff" size="36"></u-icon>
				<text>我的证书</text>
				<u-icon name="arrow-right" color="#666666" size="32"></u-icon>
			</view>
			<view class="split-space"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		myCollection() {
			uni.navigateTo({
				url: '../../module/mine/myCollection'
			});
		},
		studyRecord() {
			uni.navigateTo({
				url: '../../module/mine/studyRecord'
			});
		},
		examScore() {
			uni.navigateTo({
				url: '../../module/mine/examScoreIndex'
			});
		},
		signUp() {
			uni.navigateTo({
				url: '../../module/mine/signUpCourses'
			});
		},
		myCertificate() {
			uni.navigateTo({
				url: '../../module/mine/myCredentials'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	background: #f4f4f4;
	.function {
		display: flex;
		flex-direction: column;
		margin-top: 80rpx;
		background-color: #ffffff;
		.item {
			font-weight: 500;
			height: 80rpx;
			padding: 20rpx 40rpx;
			display: flex;
			align-items: center;
			
			> text {
				margin-left: 30rpx;
				flex: 1;
			}
		}
	}
}
</style>
