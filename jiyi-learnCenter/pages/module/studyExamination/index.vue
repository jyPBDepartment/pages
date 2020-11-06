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
			<u-col span="5" v-for="(item,key) in studyExaminationList" :key="key" class="se-col">
				<!-- 角标 -->
				<!-- <view class="brage" v-if="item.pass=='0'">
					<text>已通过</text>
					:style="item.backgroundColor"
					 @click="linkTo(item.levelCode,item.pass)"
				 </view> -->
				<view class="se-text"></view>
				<view style="text-align: center;margin-top: -100rpx;margin-left: 58rpx;  font-size: 24rpx;font-weight: bold;position: absolute;z-index: 99;">{{item.name}}考试</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default {
		data() {
			return {
				src: 'http://60.205.246.126/images/2020/09/29/1601348332838540.png',
				studyExaminationList: []
			}
		},
		onLoad(e) {
			// 初始化加载考试列表信息	
			this.initExamInfo();
		},
		methods: {
			// 初始化加载考试列表信息
			initExamInfo() {
				uni.request({
					url: ApiPath.url.findTypeOfBussiness,
					method: "GET",
					data: {},
					success: (res) => {
						console.log(res)
						if (res.data.state == 0) {
							this.studyExaminationList = res.data.data
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
			// linkTo(val,pass) {
			// 	if(pass=='1'){
			// 		uni.navigateTo({
			// 			url: "./credentials"
			// 		})
			// 	}

			// },
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
			position: relative;

			.se-text {
				width: 150rpx;
				height: 140rpx;
				text-align: center;
				border-radius: 12rpx;
				padding-top: 50rpx;
				margin: 80rpx 0 0 74rpx;
				color: #fff;
				font-size: 32rpx;
				position: relative;
			}
			.se-text:after {
				content: "";
				display: inline-block;
				position: absolute;
				left: -10px;
				top: -6px;
				width: 160rpx;
				height: 152rpx;
				font-size: 14px;
				border-radius: 9px;
				z-index: 99;
			}
			
			// .se-text:nth-child(2n+1):after {
				
			// 	background-color: #e58b1c;
			// }
			
			// .se-text:nth-child(2n):after {
				
			// 	background-color: #fcca00;
			// }
			// .se-text:nth-child(4n+2):after {
				
			// 	background-color: #fee78c;
			// }
		
		}
		
		.se-col:after {
			content: "";
			display: inline-block;
			position: absolute;
			left: 8px;
			top: 8px;
			width: 250rpx;
			height: 250rpx;
			font-size: 14px;
			border-radius: 9px;
		}

		.se-col:nth-child(3n):after {
			
			background-color: #f2c48b;
		}
		
		.se-col:nth-child(3n+1):after {
			
			background-color: #b4e4bf;
		}
		
		.se-col:nth-child(4n+2):after {
			
			background-color: #fee78c;
		}
		
	}
</style>
