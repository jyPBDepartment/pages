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
							{{item.title}}
						</view>
						<view class="time">
							考试时间：{{item.examTime}}
						</view>
					</view>
					<view class="examTime">
						<view class="title">
							测评名称：{{item.examTitle}}
						</view>
						<view class="time">
							通过分数：{{item.passScore}}
						</view>
					</view>
					<view class="examTime">
						<view class="title">
							得分：{{item.getScore}}
						</view>
						
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				examScoreList:[
					{title:'初级经理人考试',examTime:'2020/08/12 13:46',examTitle:'农机知识',passScore:'80',getScore:'56'},
					{title:'中级经理人考试',examTime:'2020/11/03 13:46',examTitle:'农机服务',passScore:'80',getScore:'60'},
					{title:'高级经理人考试',examTime:'2020/11/11 13:46',examTitle:'团队协作',passScore:'80',getScore:'79'}
				]
			}
		},
		methods:{
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
