<template>
	<view id="offlineDetails">
		<!-- 	<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					<u-icon name="arrow-left"></u-icon>
				</view>
			</u-col>
			<u-col span="11">
				<view class="title">线下课程详情</view>
			</u-col>
		</u-row> -->
		<header-box title="线下课程详情" @backTo="backTo"></header-box>

		<view class="offImg"><image :src="image" class="img"></image></view>

		<u-row class="row1">
			<view style="padding-left: 10rpx">
				<view style="font-size: 16px; font-style: oblique">{{ title }}</view>
				<view style="font-size: 14px; padding-top: 10rpx">开课时间：{{ beginDate }}</view>
			</view>
		</u-row>

		<u-row><u-col style="text-align: center; padding-top: 15rpx; font-size: 15px">课程介绍</u-col></u-row>

		<u-row class="row2">
			<view style="padding-left: 10rpx">
				<u-row style="font-size: 16px">主讲人：{{ name }}</u-row>
				<u-row style="font-size: 14px; padding-top: 10rpx">人数限制：{{ stuLimit }} 人</u-row>
				<u-row style="font-size: 14px; padding-top: 10rpx">课程介绍:{{ courseIntroduction }}</u-row>
			</view>
		</u-row>

		<u-row><u-col style="text-align: center; padding-top: 15rpx; font-size: 15px">参课指南</u-col></u-row>

		<u-row style="padding-top: 15rpx">
			<u-col>{{ courseGuide }}</u-col>
		</u-row>

		<u-row style="padding-top: 230rpx">
			<u-col style="text-align: center">
				<footer class="foot-nav">
					<span v-if="type == '0'">若每月超过三次未准时参加，本月报名失效</span>
					<span v-if="type == '1'">该课程已经报名，剩余名额{{ number }}人</span>
					<span v-if="type == '2'">该课程此次报名已结束</span>
					<span v-if="type=='3'">此次课程已结束或已开始</span>
				</footer>
			</u-col>
		</u-row>

		<u-row>
			<u-col>
				<view style="text-align: center; margin-top: 20rpx" v-if="type == '0'"><u-button type="primary" size="mini" @click="signUp(id)">立即报名</u-button></view>
				<view style="text-align: center; margin-top: 20rpx" v-if="type == '1'"><u-button type="primary" size="mini" @click="cancel()">取消报名</u-button></view>
			</u-col>
		</u-row>
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
			status:''
		};
	},

	onLoad(e) {
		this.offlineId(e.id);
		this.id = e.id;
		this.status = e.status
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
						let nowDay = new Date(this.date).getTime();
						let lessonDay = new Date(res.data.data.lessonDay).getTime();
						let closingDate = new Date(res.data.data.closingDate).getTime();
						if(nowDay>=lessonDay){
							this.type=3;
						}else{
						if(nowDay<=closingDate){
							if (res.data.dataLesson == null) {
								if(res.data.data.enrollStatus == 0){
									this.type = 0;
								}else if(res.data.data.enrollStatus == 1){
									uni.showToast({
										title: "此课程暂时不允许报名"
									})
								}
								
							} else {
								this.type = 1;
							}
						}else {
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
								url: './offlineDetails?id='+this.id,
							})
						}, 1000)
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
			if(this.status == 0){
				uni.reLaunch({
					url:'../../tabbar/main/index'
				})
			}else{
				uni.navigateTo({
					url: './offlineCourseMore',
				})
			}
		},

		//立即报名跳转
		signUp(val) {
			uni.navigateTo({
				url: '../offlineCourses/offlineSignUp?index=0&title=' + this.title + '&status=' + this.status + '&id=' + val
			})
		}

	}
};
</script>

<style lang="scss" scoped>
#offlineDetails {
	.title {
		text-align: center;
	}

	.row1 {
		margin-top: 15rpx;
		border: groove;
		width: 723rpx;
		height: 150rpx;
		margin-left: 15rpx;
	}

	.row2 {
		margin-top: 15rpx;
		border: groove;
		width: 723rpx;
		min-height: 140rpx;
		margin-left: 15rpx;
	}

	.offImg {
		margin-top: 80rpx;
		.img {
			width: 750rpx;
			height: 360rpx;
		}
	}
}
</style>
