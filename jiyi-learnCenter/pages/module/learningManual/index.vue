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
			
			<!-- 经理人学习手册 -->
			<view class="rm-manager" @click="show = true">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					经理人学习手册
				</view>
			</view>
			
			<!-- 供应商学习手册 -->
			<view class="rm-manager" @click="suuplyJump">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					供应商学习手册
				</view>
			</view>
			
			<!-- 经销商学习手册 -->
			<view class="rm-manager" @click="agentJump">
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					经销商学习手册
				</view>
			</view>
			
		</view>
		
		<!-- 弹出层 -->
		<u-popup v-model="show" mode="center" width="400" height="400" >
				<view class="content">
					<view class="confrim-btn">
						<u-button class="btnDistance" @click="linkJunior(show=false)">初级经理人</u-button>
						<u-button class="btnDistance" @click="linkMiddle(show=false)">中级经理人</u-button>
						<u-button class="btnDistance" @click="linkSenior(show=false)">高级经理人</u-button>
					</view>
				</view>
			</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126:8001/images/2020/09/29/1601348332838540.png',
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
			linkJunior(){
				uni.navigateTo({
					url: "./juniorManagerManual",//跳转地址
				});
				this.Show=false;
				this.$emit("close");
			},
			linkMiddle(){
				uni.navigateTo({
					url: "./middleManagerManual",//跳转地址
				});
				this.Show=false;
				this.$emit("close");
			},
			linkSenior(){
				uni.navigateTo({
					url: "./seniorManagerManual",//跳转地址
				});
				this.Show=false;
				this.$emit("close");
			},
			// 供应商跳转
			suuplyJump(){
				uni.navigateTo({
					url:"./supplyFunctions"
				})
			},
			// 经销商跳转
			agentJump(){
				uni.navigateTo({
					url:"./agentFunctions"
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
