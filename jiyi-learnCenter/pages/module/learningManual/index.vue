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
		<u-image width="100%" height="190rpx" v-for="(item,index) in banner" :key="index" :src="item.url"></u-image>
		<!-- 学习手册 -->
		<view class="rm-list">
			<view class="rm-manager" v-for="(item,index) in optionList" :key="index" @click="juniorManager(item.id)" >
				<view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view>
				<view class="rm-font">
					{{item.name}}学习手册
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default {
		data() {
			return {
				banner:[],
				show: false,
				optionList:[]
			}
		},
		// 页面初始化加载
		onLoad(e) {
			this.initModuleInfo();// 初始化加载职业类别信息	
			this.picture();//初始化加载banner图
		},
		methods: {
			// 初始化加载职业类别信息
			initModuleInfo() {
				uni.request({
					url: ApiPath.url.occupation,
					method: "GET",
					
					success: (res) => {
					
						if (res.data.state == 0) {	
							this.optionList = res.data.data
						}else{
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
			// 初始化加载banner图
			picture(){
					uni.request({
						url: ApiPath.url.getListByType,
						method: "GET",
						data: {
							picType:1
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.banner = res.data.data
							} else {
								uni.showToast({
									title: res.data.data
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
				uni.switchTab({
				    url: '../../tabbar/main/index'
				});
			},
			// 经理人跳转
			juniorManager(getId){
				uni.navigateTo({
					url: './agentArticle?id='+getId,//跳转地址
				});
				
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
