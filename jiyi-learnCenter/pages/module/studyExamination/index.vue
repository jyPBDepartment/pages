<template>
	<view id="studyExamination">
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					< </view> </u-col> <u-col span="11">
						<view class="title">学习考试</view>
			</u-col>
		</u-row>
		<!--  背景图 -->
		<u-image width="100%" height="190rpx" :src="src"></u-image>
		<!--  考试列表 -->
		<u-row>
			<u-col span="5" v-for="(item,key) in studyExaminationList" :key="key" class="se-col" :style="item.backgroundColor"
			 @click="linkTo(item.levelCode,item.pass)">
			 <!-- 角标 -->
				 <view class="brage" v-if="item.pass=='0'">
					<text>已通过</text>
				 </view>
				<view class="se-text" :style="item.levelColor">{{item.levelName}}</view>
				<view style="text-align: center;margin-top: 18rpx;font-size: 24rpx;font-weight: bold;">{{item.title}}</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126/images/2020/09/29/1601348332838540.png',
				studyExaminationList: [{
						levelCode: '0',
						levelName: '初级',
						title: '初级经理人考试',
						levelColor: 'background-color: #fcca00',
						backgroundColor: 'background-color: #fee78c',
						pass:'0'
					},
					{
						levelCode: '1',
						levelName: '中级',
						title: '中级经理人考试',
						levelColor: 'background-color: #e58b1c',
						backgroundColor: 'background-color: #f2c48b',
						pass:'1'
					},
					{
						levelCode: '2',
						levelName: '高级',
						title: '高级经理人考试',
						levelColor: 'background-color: #27b148',
						backgroundColor: 'background-color: #b4e4bf',
						pass:'0'
					},
				]
			}
		},
		methods: {
			linkTo(val,pass) {
				if(pass=='1'){
					uni.navigateTo({
						url: "./credentials"
					})
				}
				
			},
			backTo() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#studyExamination {
		background-color: #ffffff;

		.title {
			text-align: center;
		}

		.brage {
			width: 100rpx;
			height: 50rpx;
			border: 4rpx solid #dd4e44;
			text-align: center;
			padding-top: 4rpx;
			color: #dd4e44;
			position: relative;
			float: right;
			top: 26rpx;
			left: 6rpx;
			background-color: #FFFFFF;
			font-size: 20rpx;
			transform: rotate(-40deg);
			-ms-transform: rotate(-40deg);/* IE 9 */
			-webkit-transform: rotate(-40deg);/* Safari and Chrome */
		}

		.se-col {
			height: 280rpx;
			margin-left: 40rpx !important;
			margin-top: 14rpx;
			border-radius: 12rpx;

			.se-text {
				width: 150rpx;
				height: 140rpx;
				text-align: center;
				border-radius: 12rpx;
				padding-top: 50rpx;
				margin: 80rpx 0 0 74rpx;
				color: #fff;
				font-size: 32rpx;
			}
		}
	}
</style>
