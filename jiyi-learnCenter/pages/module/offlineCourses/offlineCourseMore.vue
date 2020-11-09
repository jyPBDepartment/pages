<template>
	<view class="compent">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view> 
				<view class="title">线下课程</view>
		</view>
		<view class="offlineCourse animate__animated animate__lightSpeedInRight delay-5s 5s" v-for="(item, index) in offlineCourseList" :key="index"  @click="courseDetail">
				<view class="background">		
				<view class="logo">
					<image class="courseImg" :src="item.url"></image>
				</view>
				<view class="title1">
					{{item.title}}
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="courseTime">
					开课时间：{{item.courseTime}}
				</view>
			</view>
			
		</view>
	</view>
		
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				offlineCourseList:[
					{url:"http://60.205.246.126/images/2020/10/22/1603331441054086.png",title:"现代职业农业经理人",content:"职业生涯规划",courseTime:"2020-12-12 09:00"},
					{url:"http://60.205.246.126/images/2020/10/22/1603331441054086.png",title:"现代职业农业经理人",content:"农技知识",courseTime:"2020-12-12 09:00"},
					{url:"http://60.205.246.126/images/2020/10/22/1603331441054086.png",title:"经销商",content:"职业生涯规划",courseTime:"2020-12-12 09:00"},
					{url:"http://60.205.246.126/images/2020/10/22/1603331441054086.png",title:"供应商",content:"职业生涯规划",courseTime:"2020-12-12 09:00"},
					{url:"http://60.205.246.126/images/2020/10/22/1603331441054086.png",title:"现代职业农业经理人",content:"农技知识",courseTime:"2020-12-12 09:00"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
			// 行业案例跳转详情页面
			courseDetail(){
				uni.navigateTo({
					url:"./offlineDetails"
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.compent{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head{
			display: flex;
			margin-top: 15rpx;
			margin-left: 20rpx;
			height: 60rpx;
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}
		.offlineCourse{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			
			.background{
				margin-top: 20rpx;
				font-weight: bold;
				color: #fff;
				
				.logo{
					.courseImg{
						width: 140rpx;
						height: 60rpx;
						margin: 20rpx 0rpx 0rpx 20rpx;
					}
				}
				.title1{
					font-size: 36rpx;
					text-align: center;
					margin-top: -15rpx;
				}
				.content{
					font-size: 20rpx;
					text-align: center;
					margin-top: 20rpx;
				}
				.courseTime{
					font-size: 16rpx;
					text-align: center;
					margin-top: 20rpx;
					margin-bottom: 15rpx;
				}
			}
			
			
		}
		.offlineCourse:nth-child(even){
			background-color: #91D5FF;
		}
		.offlineCourse:nth-child(odd){
			background-color: #ff73ab;
		}
		.offlineCourse:nth-child(3n+1){
			background-color: pink;
		}
		.offlineCourse:nth-child(4n+1){
			background-color: #ffaa7f;
		}
		.offlineCourse:nth-child(5n+1){
			background-color: #75ffb6;
		}
	}
	
</style>
