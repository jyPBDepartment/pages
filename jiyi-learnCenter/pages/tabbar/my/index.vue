<template>
	<view class="content comm-container">
		<!--头部 -->
		<!-- <view>
			<view class="title">我的</view>
		</view> -->
		<header-box title="我的"></header-box>
		<!-- 各个功能页面 -->
		<view class="function">
			<view class="functions" @click="myCollection">
				我的收藏
			</view>
			<view class="functions" @click="studyRecord">
				学习记录
			</view>
			<view class="functions" @click="examScore">
				考试成绩
			</view>
			<view class="functions" @click="signUp">
				报名课程
			</view>
			<view class="functions" @click="myCertificate">
				我的证书
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
			},
			methods:{
				myCollection() {
					uni.navigateTo({
						url: "../../module/mine/myCollection"
					})
				},
				studyRecord(){
					uni.navigateTo({
						url: "../../module/mine/studyRecord"
					})
				},
				examScore(){
					uni.navigateTo({
						url: "../../module/mine/examScore"
					})
				},
				signUp(){
					uni.navigateTo({
						url: "../../module/mine/signUpCourses"
					})
				},
				myCertificate(){
					uni.navigateTo({
						url: "../../module/mine/myCredentials"
					})
				}
			}
			
			}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		.title {
			text-align: center;
			padding: 20rpx 0;
			background-color: #f2f2f2;
			font-size: 34rpx;
		}
		.function{
			display: flex;
			flex-direction: column;
			margin-top: 90rpx;
			.functions{
				font-weight: bold;
				margin:20rpx 0 10rpx 0;
				background-color: #f2f2f2;
				height: 100rpx;
				padding: 26rpx 0 0 20rpx;
			}
		}
	}
</style>
