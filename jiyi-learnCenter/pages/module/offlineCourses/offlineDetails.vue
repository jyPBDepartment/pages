<template>
	<view class="offline-details">
		<header-box title="线下课程详情" @backTo="backTo"></header-box>
		<view class="offImg"><image :src="image" class="img"></image></view>

		<view class="course-title">
			<view class="name">{{ title }}</view>
			<view class="time">开课时间：{{ beginDate }}</view>
		</view>
		<view class="split-space"></view>
		<view class="split-title">课程介绍</view>
		<view class="split-space"></view>
		<view class="course-title">
			<view class="name">主讲人：{{ name }}</view>
			<view class="time">人数限制：{{ stuLimit }} 人</view>
			<view class="time">课程介绍：{{ courseIntroduction }}</view>
		</view>
		<view class="split-space"></view>
		<view class="split-title">参课指南</view>
		<view class="split-space"></view>
		<view class="course-title">
			<view class="time">{{ courseGuide }}</view>
		</view>
		<view class="split-space"></view>

		<view class="bottom-div">
			<span v-if="type == '0'">若每月超过三次未准时参加，本月报名失效</span>
			<span v-if="type == '1'">该课程已经报名，剩余名额{{ number }}人</span>
			<span v-if="type == '2'">该课程此次报名已结束</span>
		</view>

		<view style="text-align: center; margin: 40rpx;">
			<u-button :ripple="true" type="primary" size="mini" @click="signUp(id)" v-if="type == '0'">立即报名</u-button>
			<u-button :ripple="true" type="error" size="mini" @click="cancel()" v-if="type == '1'">取消报名</u-button>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
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
			closingDate: '',
			index: ''
		};
	},

	onLoad(e) {
		this.offlineId(e.id);
		this.id = e.id;
		this.index = e.index;
	},

	methods: {
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
						this.closingDate = res.data.data.closingDate;
						//判断截止日期
						const date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();

						let dateTime = [];
						this.closingDate.split('-');
						dateTime = this.closingDate.split('-');
						let returnAge = '';
						if (res.data.data.enrollStatus == 0) {
							let ageDiff = dateTime[0] - year; //年之差
							if (ageDiff >= 0) {
								if (dateTime[1] == month) {
									var dayDiff = dateTime[2] - day; //日之差
									if (dayDiff < 0) {
										returnAge = ageDiff - 1;
									} else {
										returnAge = dayDiff;
									}
								} else {
									var monthDiff = dateTime[1] - month; //月之差
									if (monthDiff < 0) {
										returnAge = ageDiff - 1;
									} else {
										returnAge = ageDiff;
									}
								}
							} else {
								returnAge = -1;
							}
							if (returnAge >= 0) {
								if (res.data.dataLesson == null) {
									this.type = 0;
								} else {
									this.type = 1;
								}
							} else {
								this.type = 2;
							}
						} else if (res.data.data.enrollStatus == 1) {
							uni.showToast({
								title: '此课程暂时不允许报名'
							});
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
							// 3秒后自动关闭
							uni.navigateTo({
								url: './offlineCourseMore'
							});
						}, 3000);
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
			if (this.index == 0) {
				uni.switchTab({
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
				url: '../offlineCourses/offlineSignUp?index=0&title=' + this.title + '&id=' + val
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
		margin: 20rpx;
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
	.bottom-div {
		text-align: center;
		padding: 20rpx;
		color: #fa3534;
		font-size: 24rpx;
		font-weight: bold;
	}
}
</style>
