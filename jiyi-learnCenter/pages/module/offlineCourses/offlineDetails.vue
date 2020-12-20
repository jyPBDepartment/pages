<template>
	<view class="offline-details">
		<header-box title="线下课程详情" @backTo="backTo"></header-box>
		<view class="offImg"><image :src="image" class="img"></image></view>

		<view class="course-title">
			<view class="name">{{ title }}</view>
			<view class="time">开课时间：{{ beginDate }}</view>
		</view>
		<view class="split-space"></view>

		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-line color="#f2f8ff"></u-line>
		<view class="course-title course-title-b" v-if="current == 0">
			<view class="name">主讲人：{{ name }}</view>
			<view class="time">人数限制：{{ stuLimit }} 人</view>
			<view class="time">课程介绍：{{ courseIntroduction }}</view>
		</view>
		<view class="course-title course-title-b" v-if="current == 1">
			<view class="time">{{ courseGuide }}</view>
		</view>
		<view class="bottom">
			<view class="bottom-div">
				<span v-if="type == '0'">若每月超过三次未准时参加，本月报名失效</span>
				<span v-if="type == '1'">该课程已经报名，剩余名额{{ number }}人</span>
				<span v-if="type == '2'">该课程此次报名已结束</span>
				<span v-if="type == '3'">此次课程已结束或已开始</span>
			</view>

			<view style="text-align: center; margin: 20rpx auto">
				<u-button :ripple="true" type="primary" size="medium" @click="signUp(id)" v-if="type == '0'">立即报名</u-button>
				<u-button :ripple="true" type="error" size="medium" @click="cancel()" v-if="type == '1'">取消报名</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			list: [
				{
					name: '课程介绍'
				},
				{
					name: '参课指南'
				}
			],
			current: 0,
			cencalIsShow: false,
			id: '',
			title: '',
			beginDate: '',
			name: '',
			courseIntroduction: '',
			courseGuide: '',
			image: '',
			stuLimit: '',
			type: '',
			userId: localStorage.getItem('userId'),
			date: new Date().toISOString().slice(0, 10),
			number: '',
			status: ''
		};
	},

	onLoad(e) {
		this.offlineId(e.id);
		this.id = e.id;
		this.status = e.status;
	},

	methods: {
		change(index) {
			this.current = index;
		},
		//查看详情
		offlineId(val) {
			let param = {
				lessonId: val,
				userId: this.userId
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.findByLessonId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.title = res.data.data.title;
						this.beginDate = res.data.data.lessonDate;
						this.name = res.data.data.teacherName;
						this.courseIntroduction = res.data.data.content;
						this.courseGuide = res.data.data.remark;
						this.image = res.data.data.url;
						this.stuLimit = res.data.data.stuLimit;
						this.number = this.stuLimit - res.data.lesson.length;
						let nowDay = new Date(this.date).getTime();
						let lessonDay = new Date(res.data.data.lessonDay).getTime();
						let closingDate = new Date(res.data.data.closingDate).getTime();
						if (nowDay >= lessonDay) {
							this.type = 3;
						} else {
							if (nowDay <= closingDate) {
								if (res.data.dataLesson == null) {
									if (res.data.data.enrollStatus == 0) {
										this.type = 0;
									} else if (res.data.data.enrollStatus == 1) {
										// uni.showToast({
										//   title: "此课程暂时不允许报名",
										// });
									}
								} else {
									this.type = 1;
								}
							} else {
								this.type = 2;
							}
						}
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				}
			});
		},

		//取消报名
		cancel() {
			let param = {
				lessonId: this.id,
				userId: this.userId
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.cancellationRegistr, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						uni.showToast({
							title: '取消报名成功'
						});
						setTimeout(() => {
							// 1秒后自动关闭
							uni.reLaunch({
								url: './offlineDetails?status=' + this.status + '&id=' + this.id
							});
						}, 500);
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				}
			});
		},

		//返回
		backTo() {
			if (this.status == 0) {
				uni.reLaunch({
					url: '../../tabbar/main/index'
				});
			} else {
				uni.navigateTo({
					url: './offlineCourseMore'
				});
			}
		},

		//立即报名跳转
		signUp(val) {
			uni.navigateTo({
				url: '../offlineCourses/offlineSignUp?index=0&title=' + this.title + '&status=' + this.status + '&id=' + val
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.offline-details {
	.offImg {
		margin-top: 80rpx;
		.img {
			width: 750rpx;
			height: 360rpx;
		}
	}
	.split-title {
		padding: 20rpx;
		text-align: center;
		font-size: 38rpx;
		line-height: 1;
		color: #000000;
	}
	.course-title {
		padding: 20rpx;
		margin: 0 20rpx;
		.name {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			line-height: 44rpx;
			color: #000000;
		}
		.time {
			font-size: 28rpx;
			margin-top: 20rpx;
			color: #333;
			
		}
	}
	.course-title-b {
		padding-bottom: 240rpx!important;
	}
	.bottom {
		position: fixed;
		bottom: 0rpx;
		background: #ffffff;
		z-index: 999;
		border-top: 1rpx solid #f4f4f4;
		width: 100%;
		height: 200rpx;
		.bottom-div {
			text-align: center;
			padding: 30rpx 20rpx 20rpx 20rpx;
			color: #fa3534;
			font-size: 24rpx;
			font-weight: bold;
		}
	}
}
</style>
