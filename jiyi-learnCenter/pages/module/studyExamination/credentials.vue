<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon>
			</view>
			<view class="title">申领职业证书</view>
		</view>
		
		<!-- 前言 -->
		<view class="read">
			<textarea :value="value" class="readTextarea"/>
		</view>
		<!-- 内容介绍 -->
		<view class="introduce">
			<text class="containTitle">
				颁发证书考核内容介绍
			</text>
			<view class="subject">
				<u-steps :list="numList" :current="0" direction="column"></u-steps>
				<view class="right">
					<view class="one">
						<text class="introduceTitle">认证名额申请成功</text><br>
						<text class="introduceContain">你已成为组织中的一员，赶紧开始学习之旅吧！</text>
					</view>
					<view class="two">
						<text class="introduceTitle">能力测评</text>
							<u-line class="underline"></u-line>
						<view class="introduceContain">选择题（约10分钟，不限考次）</view>
						<view class="titleName">
							<view class="news">
								1、新手上路
							</view>
							<view>
								<button class="titleBtn">答题</button>
							</view>
							
						</view>
						<view class="titleName">
							<view class="news">
								1、新手上路
							</view>
							<view>
								<button class="titleBtn">答题</button>
							</view>
							
						</view>
						<view class="titleName">
							<view class="news">
								1、新手上路
							</view>
							<view>
								<button class="titleBtn">答题</button>
							</view>
							
						</view>
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
				value:"农业经理人是指在农民专业合作社等农业经济合作组织中，从事农业生产组织、设备作业、技术支持、产品加工与销售等管理服务的人员。2020年3月3日，根据《中华人民共和国劳动法》有关规定，人力资源社会保障部、农业农村部共同制定了家畜繁殖员等8个国家职业技能标准，现予颁布施行。原相应国家职业技能标准同时废止。",
				numList: [
				{name:""},
				{name:""},
				{name:""},
				],
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head {
			display: flex;
			margin-top: 15rpx;
			margin-left: 20rpx;
		
			.backArrow {
				margin-top: 6rpx;
			}
		
			.title {
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}
		.read{
			margin-top: 20rpx;
			.readTextarea{
				width: 100%;
				height: 180rpx;
				background-color: #FFCCC7;
				font-size: 20rpx;
				color: #888888;
				text-indent: 50rpx;
			
			}
		}
		.introduce{
			display: flex;
			flex-direction: column;
			padding-top: 20rpx;
			padding-left: 20rpx;
			background-color: #fff;
			.containTitle{
				font-size: 30rpx;
				font-weight: bold;
			}
			.subject{
				display: flex;
				.right{
					display: flex;
					flex-direction: column;
					margin-top: 40rpx;
					.one{
						background-color:#F2F2F7;
						width: 666rpx;
						height: 150rpx;
						margin-left: -50rpx;
						margin-bottom: 20rpx;
						border-radius: 20rpx;
						.introduceTitle{
							font-size: 30rpx;
							font-weight: bolder;
							
							margin-left: 20rpx;
						}
						.introduceContain{
							font-size: 24rpx;
							margin-left: 20rpx;
							font-weight: bold;
						}
					}
					.two{
						background-color:#F2F2F7;
						width: 666rpx;
						// height: 150rpx;
						margin-left: -50rpx;
						border-radius: 20rpx;
						.introduceTitle{
							font-size: 30rpx;
							font-weight: bolder;
							
							margin-left: 20rpx;
						}
						.underline{
							border: 2rpx solid #858586;
						}
						.introduceContain{
							font-size: 24rpx;
							margin-left: 20rpx;
							font-weight: bold;
							
						}
						.titleName{
							display: flex;
							margin-left: 20rpx;
							margin-top: 10rpx;
							.news{
								font-size: 24rpx;
								
								font-weight: bold;
								// line-height: 80rpx;
							}
							.titleBtn{
								width: 100rpx;
								height: 60rpx;
								margin-left: 380rpx;
								border-radius: 40%;
								background-color: #fff;
								border: 2rpx solid red;
							}
						}
						
					}
				}
				
			}
		}
		
	}
	
	
	
</style>
