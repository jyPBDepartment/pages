<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">考试成绩</view>
		</view>
		<!-- 内容 -->
		<view class="contain animate__animated animate__slideInRight">
			<view class="examGrade" v-for="(item,index) in examScoreList" :key="index">
					<view class="examTime">
						<view class="title">
							{{item.examPaperName}}
						</view>
						<view class="time">
							考试时间：{{item.examDate}}
						</view>
					</view>
					<view class="examTime">
						<view class="title">
							测评名称：{{item.vocationName}}
						</view>
						<view class="time">
							通过分数：{{item.passScore}}
						</view>
					</view>
					<view class="examTime">
						<view class="title">
							得分：{{item.score}}
						</view>
						
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default{
		data(){
			return{
				userId: localStorage.getItem("userId"),
				examScoreList:[]
			}
		},
		// 页面初始化加载
		onLoad(e) {
			this.examScore();//考试成绩初始化加载
		},
		methods:{
			//考试成绩初始化加载
			examScore(){
						uni.request({
							url: ApiPath.url.findExamScore,
							method: "GET",
							data: {
								userId:this.userId
							},
							success: (res) => {
							
								if (res.data.code == 200) {
									this.examScoreList = res.data.data
								} else {
									uni.showToast({
										title: "服务器出错，请联系管理员"
									})
								}
							},
							fail: (err) => {
								uni.showToast({
									title: "系统初始化失败，请联系管理员"
								})
							}
						});
					
			},
			// 返回上一页
			backTo() {
				uni.navigateBack({
			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		.head{
			display: flex;
			background-color: #F8F8F8;
			height: 90rpx;
			.backArrow{
				margin-top: 25rpx;
			}
			.title{
				margin:20rpx 0 0 250rpx;
				font-size: 35rpx;
			}
		}
		.contain{
			display: flex;
			flex-direction: column;
			margin: 30rpx 20rpx;
			.examGrade{
				display: flex;
				flex-direction: column;
				background-color: pink;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				.examTime{
					display: flex;
					justify-content: space-between;
					margin-top: 20rpx;
					padding: 0 20rpx 10rpx 20rpx;
				}
			}
		}
	}
	
</style>
