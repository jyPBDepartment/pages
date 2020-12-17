<template>
	<view class="learning-manual-container">
		<header-box title="学习手册" @backTo="backTo"></header-box>
		<!--  背景图 -->
		<u-image class="bg-image" width="100%" height="270rpx" v-for="(item, index) in banner" :key="index" :src="item.url"></u-image>
		<!-- 学习手册 -->
		<view class="rm-list">
			<view class="rm-manager card-box" v-for="(item, index) in optionList" :key="index" @click="juniorManager(item.id)">
				<!-- <view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view> -->
				<view class="rm-font">{{ item.name }}学习手册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default {
		data() {
			return {
				banner: [],
				show: false,
				optionList: []
			};
		},
		// 页面初始化加载
		onLoad(e) {
			this.initModuleInfo(); // 初始化加载职业类别信息
			this.picture(); //初始化加载banner图
		},
		methods: {
			// 初始化加载职业类别信息
			initModuleInfo() {
				uni.request({
					url: ApiPath.url.occupation,
					method: 'GET',

					success: res => {
						if (res.data.state == 0) {
							this.optionList = res.data.data;
						} else {
							uni.showToast({
								title: '服务器出错，请联系管理员'
							});
						}
					},
					fail: err => {
						uni.showToast({
							title: '系统初始化失败，请联系管理员'
						});
					}
				});
			},
			// 初始化加载banner图
			picture() {
				uni.request({
					url: ApiPath.url.getListByType,
					method: 'GET',
					data: {
						picType: 1
					},
					success: res => {
						if (res.data.code == 200) {
							this.banner = res.data.data;
						} else {
							uni.showToast({
								title: res.data.data
							});
						}
					},
					fail: err => {
						uni.showToast({
							title: '系统初始化失败，请联系管理员'
						});
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
			juniorManager(val) {
				uni.navigateTo({
					url: 'agentArticle?id=' + val //跳转地址
				});

			}
		}
	};
</script>

<style lang="scss" scoped>
	.learning-manual-container {
		background-color: #ffffff;
		padding-top: 80rpx;
		.rm-list {
			display: flex;
			flex-direction: column;

			.rm-manager {
				display: flex;
				margin: 20rpx;
				border-radius: 10rpx;
				height: 120rpx;;
				.rm-img {
					margin: 20rpx;

					.rm-cover {
						width: 240rpx;
						height: 160rpx;
					}
				}

				.rm-font {
					margin-top: 40rpx;
					text-align: center;
					margin-left: 130rpx;
				}
			}
		}
	}
</style>
