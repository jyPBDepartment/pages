<template>
	<view class="learning-manual-container">
		<header-box title="学习手册" @backTo="backTo"></header-box>
		<!--  背景图 -->
		<u-image class="bg-image" width="100%" height="270rpx" mode="scaleToFill" v-for="(item, index) in banner" :key="index" :src="item.url"></u-image>
		<!-- 学习手册 -->
		<view class="rm-list">
			<view class="rm-manager card-box" v-for="(item, index) in optionList" :key="index" @click="juniorManager(item.id)">
				<!-- <view class="rm-img">
					<image class="rm-cover" src="http://60.205.246.126/images/2020/09/29/1601345831839353.png"></image>
				</view> -->
				<view class="rm-font" :style="{ color: getColor(index) }">{{ item.name }}学习手册</view>
				<!-- <u-icon name="arrow-right" style="margin-right: 40rpx;" color="#666" size="40"></u-icon> -->
			</view>
			<data-empty v-if="optionList.length == 0" :option="{ tip: '暂无学习手册' }"></data-empty>
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
		getColor(i) {
			let colorArr = ['#fcca00', '#ff8d00', '#ff3328', '#006919', '#f6fbff'];
			let index = i % 5;
			return colorArr[index];
		},
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
						if(!this.banner.length){
							this.banner.push({
								url:'http://60.205.246.126/images/2020/12/17/1608192914066744.png'
							})
						}
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
		margin-top: 20rpx;
		.rm-manager {
			display: flex;
			margin: 20rpx;
			border-radius: 60rpx;
			height: 120rpx;
			align-items: center;
			background-image: url(../../../static/bg-learn.png);
			background-size: 100% 100%;
			.rm-font {
				text-align: center;
				margin-left: 130rpx;
				font-size: 36rpx;
				font-weight: 600;
			}
		}
	}
}
</style>
