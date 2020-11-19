<template>
	<view id="studyExamination">
		<!-- 头部 -->
		<header-box title="学习考试" @backTo="backTo"></header-box>

		<!--  背景图 -->
		<u-image class="bg-image" width="100%" height="270rpx" v-for="(item, index) in banner" :key="index" :src="item.url"></u-image>
		<!--  考试列表 -->
		<view class="exam-list">
			<view class="list-item card-box" :class="getItemBg(key)" v-for="(item, key) in studyExaminationList" :key="key" @click="linkTo(item.id, item.isPass)">
				<view class="brage" v-if="item.isPass == 1"><text>已通过</text></view>
				<view class="se-text"></view>
				<view class="title">{{ item.name }}考试</view>
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
			studyExaminationList: []
		};
	},
	// 初始化加载页面
	onLoad(e) {
		this.initExamInfo(); // 初始化加载考试列表信息
		this.picture(); //初始化加载banner图
	},
	methods: {
		// 初始化加载考试列表信息
		initExamInfo() {
			uni.request({
				url: ApiPath.url.findStudyExamInfo,
				method: 'GET',
				data: {
					userId: localStorage.getItem('userId')
				},
				success: res => {
					if (res.data.state == 0) {
						this.studyExaminationList = res.data.data;
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
					picType: 2
				},
				success: res => {
					if (res.data.code == 200) {
						this.banner = res.data.data;
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
		linkTo(val, pass) {
			if (pass == '0') {
				setTimeout(() => {
					uni.navigateTo({
						url: './credentials?id=' + val
					});
				}, 200);
			} else {
				// uni.showToast({
				// 	title: '您已通过该考试无需重复考试'
				// });
			}
		},
		backTo() {
			uni.switchTab({
				url: '../../tabbar/main/index'
			});
		},
		getItemBg(i) {
			let classStr = 'item1';
			if ((i + 1) % 5 == 1) {
				classStr = 'item1';
			}
			if ((i + 1) % 5 == 2) {
				classStr = 'item2';
			}
			if ((i + 1) % 5 == 3) {
				classStr = 'item3';
			}
			if ((i + 1) % 5 == 4) {
				classStr = 'item4';
			}
			if ((i + 1) % 5 == 0) {
				classStr = 'item5';
			}
			return classStr;
		}
	}
};
</script>

<style lang="scss" scoped>
#studyExamination {
	background-color: #ffffff;
	position: relative;
	padding-top: 80rpx;

	.exam-list {
		width: 100%;
		padding-top: 80rpx;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		padding: 20rpx;
		.list-item {
			margin: 20rpx;
			width: 315rpx;
			height: 310rpx;
			border-radius: 10rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 999;
			cursor: hand;
			.brage {
				width: 150rpx;
				height: 60rpx;
				border: 2rpx solid #dd4e44;
				border-radius: 4rpx;
				text-align: center;
				line-height: 60rpx;
				color: #dd4e44;
				position: absolute;
				top: 40rpx;
				right: 10rpx;
				background-color: #ffffff;
				font-size: 24rpx;
				transform: rotate(-35deg);
				-ms-transform: rotate(-35deg);
				-webkit-transform: rotate(-35deg);
				z-index: 99;
			}
			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: #ffffff;
				position: relative;
				z-index: 999;
			}
		}
		.list-item:after {
			content: '';
			display: inline-block;
			position: absolute;
			left: 0px;
			top: 0px;
			width: 315rpx;
			height: 310rpx;
			font-size: 14px;
			border-radius: 12px;
		}

		// .list-item:active {
		// 	background:#007AFF ;
		// }

		.item1 {
			background-color: #fcca00;
		}
		.item2 {
			background-color: #ff8d00;
		}

		.item3 {
			background-color: #27b148;
		}

		.item4 {
			background-color: #ff3328;
		}

		.item5 {
			background-color: #1f9cf9;
		}

		// .list-item:nth-child(odd):after {
		// 	background-color: #f5af19;
		// }

		// .list-item:nth-child(even):after {
		// 	background-color: #6dd5ed;
		// }

		// .list-item:nth-child(3n + 1):after {
		// 	background-color: #1E9600;
		// }
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
			content: '';
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
	}
}
</style>
