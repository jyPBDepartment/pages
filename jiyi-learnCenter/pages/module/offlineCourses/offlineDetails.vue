<template>
	<view id="offlineDetails">
		
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					<u-icon name="arrow-left"></u-icon>
				</view>
			</u-col>
			<u-col span="11">
				<view class="title">线下课程详情</view>
			</u-col>
		</u-row>
		
	
		<view class="offImg">
			<image :src="image" class="img"></image>
		</view>

		
		<u-row class="row1">
			<view style=" padding-left: 10rpx;">
				<view style="font-size: 16px; font-style: oblique;">
					{{title}}
				</view>
				<view style="font-size: 14px; padding-top: 10rpx;">
					开课时间：{{beginDate}}
				</view>
			</view>
		</u-row>
		
		<u-row>
			<u-col style="text-align: center; padding-top: 15rpx; font-size: 15px;">
				课程介绍
			</u-col>
		</u-row>
		
		<u-row class="row2">
			<view style=" padding-left: 10rpx;">
				<u-row style="font-size: 16px;">
					主讲人：{{name}}
				</u-row>
				<u-row style="font-size: 14px; padding-top: 10rpx;">
					课程介绍:{{courseIntroduction}}
				</u-row>
			</view>
		</u-row>
		
		<u-row>
			<u-col style="text-align: center; padding-top: 15rpx; font-size: 15px;">
				参课指南
			</u-col>
		</u-row>
		
		<u-row style="padding-top: 15rpx;">
			<u-col>
				{{courseGuide}}
			</u-col>
		</u-row>
		
		<u-row style="padding-top: 230rpx;">
			<u-col style="text-align: center;">
				<footer class="foot-nav">
					<span>若每月超过三次未准时参加，本月报名失效</span>
				</footer>
			</u-col>
		</u-row>
		
		<u-row>
			<u-col>
				<view style="text-align: center;margin-top: 20rpx;">
					<u-button type="primary" size="mini" @click="signUp(id)">立即报名</u-button>
				</view>
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
				id:'',
				title:'',
				beginDate:'',
				name:'',
				courseIntroduction:'',
				courseGuide:'',
				image:''
			}
		},
		
		onLoad(e) {
			this.offlineId(e.id);
			this.id=e.id;
		},
		
		methods: {
			//查看详情
			offlineId(val) {
				let param = {
					id: val,
				};
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.findById, //请求接口路径
					success: (res) => { //成功返回结果方法
					if (res.data.state == 0) {
						this.title = res.data.data.title
						this.beginDate = res.data.data.lessonDate
						this.name = res.data.data.teacherName
						this.courseIntroduction = res.data.data.content
						this.courseGuide = res.data.data.remark
						this.image = res.data.data.url
					}
					}
				})
			},
			
			//返回
			backTo() {
				uni.navigateBack({
				})
			},
			
			//立即报名跳转
			signUp(val){
				uni.navigateTo({
					url: '../offlineCourses/offlineSignUp?index=0&title='+this.title+'&id='+ val
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#offlineDetails {
		.title {
			text-align: center;
		}
		.row1{
			margin-top: 15rpx;
			border:groove;
			width: 723rpx;
			height: 150rpx;
			margin-left: 15rpx;
		}
		.row2{
			margin-top: 15rpx;
			border:groove;
			width: 723rpx;
			min-height: 140rpx;
			margin-left: 15rpx;
		}
		.offImg{
			.img{
				width: 750rpx;
				height: 360rpx;				
			}
		}
	}
</style>