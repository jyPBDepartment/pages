<template>
	<view id="learningManual">
		<u-row style="background-color: #ffffff;height: 60rpx;">
			<u-col span="1">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>  
				</view> 
			</u-col>
			<u-col span="11">
				<view class="title">学习手册</view>
			</u-col>
		</u-row>
		<!--  背景图 -->
		<u-image width="100%" height="190rpx" :src="src"></u-image>
		<!-- 学习手册 -->
		<view class="rm-list">
			
			<!-- 初级经理人学习手册 -->
			<view class="rm-manager" @click="juniorManager">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					初级经理人学习手册
				</view>
			</view>
			<!-- 初级经理人学习手册 -->
			<view class="rm-manager" @click="middleManager">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					中级经理人学习手册
				</view>
			</view>
			<!-- 初级经理人学习手册 -->
			<view class="rm-manager" @click="seniorManager">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					高级经理人学习手册
				</view>
			</view>
			
			<!-- 供应商学习手册 -->
			<view class="rm-manager" @click="suuplyJump">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					供应商学习手册
				</view>
			</view>
			
			<!-- 经销商学习手册 -->
			<view class="rm-manager" @click="agentJump">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					经销商学习手册
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126/images/2020/09/29/1601348332838540.png',
				show: false
			}
		},
		methods: {
			// 返回上一页
			backTo() {
				uni.navigateBack({

				})
			},
			// 经理人跳转
			juniorManager(){
				uni.navigateTo({
					url: "./managerArticle",//跳转地址
				});
				
			},
			middleManager(){
				uni.navigateTo({
					url: "./managerArticle",//跳转地址
				});
			},
			seniorManager(){
				uni.navigateTo({
					url: "./managerArticle",//跳转地址
				});
				
			},
			// 供应商跳转
			suuplyJump(){
				uni.navigateTo({
					url:"./supplyArticle"
				})
			},
			// 经销商跳转
			agentJump(){
				uni.navigateTo({
					url:"./agentArticle"
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#learningManual {
		background-color: #ffffff;
		.backArrow {
			margin-left: 10rpx;
			
		}
		.title {
			text-align: center;
			margin-left: -40rpx;
		}
		.rm-list{
			display: flex;
			flex-direction: column;
			margin-top: 12rpx;
			.rm-manager{
				display: flex;
				margin-top: 20rpx;
				background-color: #f2f2f2;
				border-radius:18rpx;
				.rm-img{
					margin: 15rpx 20rpx 10rpx 20rpx;
					.rm-cover{
						width: 240rpx;
						height: 160rpx;
					}
				}
				.rm-font{
					margin-top: 70rpx;
				}
			}
		}
		.content {
			padding: 24rpx;
			text-align: center;
			.confrim-btn{
				margin-top: 40rpx;
				.btnDistance{
					margin-bottom: 20rpx;
				}
			}
		}
		
	}
</style>
