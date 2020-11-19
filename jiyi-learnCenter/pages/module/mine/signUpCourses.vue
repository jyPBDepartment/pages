<template>
	<view class="content">
		<!-- 头部 -->

		<header-box title="报名课程" @backTo="backTo"></header-box>
		<!-- 内容 -->
		<view class="contain">
			<view class="examGrade animate__animated animate__slideInRight" v-for="(item, index) in examScoreList" :key="index">
				<view class="examTime">
					<view class="title">{{ item.vocationName }}--{{ item.lessonName }}</view>
					<view class="type" v-if="item.status == '0'">未开始</view>
					<view class="type success" v-if="item.status == '1'">已开始</view>
					<view class="type  end" v-if="item.status == '2'">已结束</view>
				</view>
				<view class="examTime">
					<view class="time">
						<b>课程时间：</b>
						{{ item.lessonTime }}
					</view>
				</view>
				<view class="examTime">
					<view class="time">
						<b>课程地点：</b>
						{{ item.address }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			examScoreList: [],
			userId: localStorage.getItem('userId')
		};
	},
	onLoad(e) {
		// 文章内容初始化
		this.initUserCourseInfo();
	},
	methods: {
		initUserCourseInfo() {
			uni.request({
				url: ApiPath.url.getLessonsByUserId,
				method: 'GET',
				data: {
					userId: this.userId
				},
				success: res => {
					if (res.data.code == 200) {
						this.examScoreList = res.data.data;
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
		backTo() {
			uni.switchTab({
				url: '../../tabbar/my/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	.head {
		display: flex;
		background-color: #f8f8f8;
		height: 90rpx;
		.backArrow {
			margin-top: 25rpx;
		}
		.title {
			margin: 20rpx 0 0 250rpx;
			font-size: 35rpx;
		}
	}
	.contain {
		display: flex;
		flex-direction: column;
		margin: 110rpx 20rpx 30rpx 20rpx;
		.examGrade {
			display: flex;
			flex-direction: column;
			// background-image: linear-gradient(to right, #f12711, #f5af19);
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			padding: 20rpx 0;
			color: #ffffff;
			.examTime {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				padding: 0 20rpx 10rpx 20rpx;

				.time {
					font-size: 28rpx;
					font-weight: 500;
				}
				.title {
					font-size: 32rpx;
					font-weight: 500;
				}
			}
			.type {
				background-color: #2979ff;
				line-height: 40rpx;
				height: 40rpx;
				font-size: 20rpx;
				border-radius: 8rpx;
				padding: 0 15rpx;
				font-weight: 500;
				font-size: 24rpx;
			}
			.success {
				background-color: #19be6b;
			}
			.end {
				background-color: #fa3534;
			}
		}
		
		.examGrade:nth-child(odd) {
			background-color: #27b148;
			background-image: linear-gradient(to right, #27b148, #11998e);
		}
		
		.examGrade:nth-child(even) {
			background-color: #ff3328;
			background-image: linear-gradient(to right, #ff3328, #ED213A);
		}
	
	
	}
}
</style>
