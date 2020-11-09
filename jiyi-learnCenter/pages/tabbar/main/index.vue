<template>
	
	<view id="main">
		<!--  标题 -->
		<view class="title">学习中心</view>
		<!--  轮播图 -->
		<swiper class="circul" indicator-dots='true' autoplay='true' interval='3000' duration='1000' circular='true'>
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item class="swiperItem">
					<image :src="item.url" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<!--  模块 -->
		<u-grid class="grid" :col="3" :border="border">
			<u-grid-item @click="learningManual" >
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603328600738326.png" :size="40" class="icon" ></u-icon>
				<view class="grid-text" >学习手册</view>
			</u-grid-item>
			<u-grid-item @click="studyExamination">
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603329404636433.png" :size="40" class="icon1"></u-icon>
				<view class="grid-text">学习考试</view>
			</u-grid-item>
			<u-grid-item @click="offlineCourses">
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603329324137893.png" :size="40" class="icon2"></u-icon>
				<view class="grid-text">线下课程</view>
			</u-grid-item>
		</u-grid>

		<!--  热门课程 -->
		<u-row style="background-color: #f2f2f2;font-size: 24rpx;">
			<u-col span="9">
				<view>热门课程</view>
			</u-col>
			<u-col span="3">
				<view style="text-align: right;" @click="rmMore">更多>>></view>
			</u-col>
		</u-row>
		<view class="list" v-for="(item, index) in hotCourseList" :key="index"  @click="rmDetail(item.id)">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.title}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.readNum}}人已学</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>

		<!--  线下课程 -->
		<u-row style="background-color: #f2f2f2;font-size: 24rpx;">
			<u-col span="9">
				<view>线下课程</view>
			</u-col>
			<u-col span="3">
				<view style="text-align: right;" @click="hyMore">更多>>></view>
			</u-col>
		</u-row>
		<view class="offlineCourse animate__animated animate__fadeIn " v-for="(item, index) in offlineCourseList" :key="'list'+index"  @click="hyDetail">
				<view class="background">		
				<view class="logo">
					<image class="courseImg" :src="item.url"></image>
				</view>
				<view class="title1">
					{{item.title}}
				</view>
				<view class="courseTime">
					开课时间：{{item.lessonTime}}
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
				border:false,
				picType:'',
				banner:[],
				hotCourseList:[],
				offlineCourseList:[]
			}
		},
		// 页面初始化加载
		onLoad(e) {
			this.picture();//初始化加载banner图
			this.hotCourse();//初始化加载热门课程
			this.offLineCourse();//初始化加载线下课程
		},
		methods: {
			// 初始化加载banner图
			picture(){
					uni.request({
						url: ApiPath.url.findBanner,
						method: "GET",
						data: {
							picType:0
						},
						success: (res) => {
							if (res.data.code == 200) {
								this.banner = res.data.data
							} else {
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
			// 初始化加载热门课程
			hotCourse(){
					uni.request({
						url: ApiPath.url.findHotCourse,
						method: "GET",
						data: {},
						success: (res) => {
							if (res.data.code == 200) {
								
								this.hotCourseList = res.data.data
							} else {
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
			// 初始化加载线下课程
			offLineCourse(){
				uni.request({
					url: ApiPath.url.findOffLineCourse,
					method: "GET",
					data: {},
					success: (res) => {
						if (res.data.code == 200) {
							this.offlineCourseList = res.data.data
						} else {
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
			// 线下课程
			offlineCourses() {
				uni.navigateTo({
					url: "../../module/offlineCourses/offlineCourseMore"
				})
			},
			// 学习考试
			studyExamination() {
				uni.navigateTo({
					url: "../../module/studyExamination/index"
				})
			},
			// 学习手册
			learningManual() {
				uni.navigateTo({
					url: "../../module/learningManual/index"
				})
			},
			// 热门课程更多
			rmMore() {
				uni.navigateTo({
					url:"../../module/hotCourse/hotCourseList"
				})
			},
			// 线下课程更多
			hyMore() {
				uni.navigateTo({
					url: "../../module/offlineCourses/offlineCourseMore"
				})
			},
			// 热门课程详情
			rmDetail(getId) {
				
				uni.navigateTo({
					url:'../../module/hotCourse/hotCourseContent?id='+getId
				})
			},
			// 线下课程详情
			hyDetail(val) {
				
				uni.navigateTo({
					url: "../../module/offlineCourses/offlineDetails"
				})
			},
			initDate() {
				uni.request({
					method: "GET",
					url: "",
					data: "",
					success: (res) => {

					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	#main {
		background-color: lightgray;
		.circul {
			width: 750rpx;
			height: 320rpx;
			.swiperItem {
				width: 100%;
				height: 100%;
		
				.swiperImage {
					width: 750rpx;
					height: 320rpx;
				}
			}
		}
		.icon{
			width: 75rpx;
			height: 75rpx;
			background-color: #009688;
			border-radius: 50%;
			padding-left: 17rpx;
		}
		.icon1{
			width: 75rpx;
			height: 75rpx;
			background-color: #FCCA00;
			border-radius: 50%;
			padding-left: 17rpx;
		}
		.icon2{
			width: 75rpx;
			height: 75rpx;
			background-color: #3291F8;
			border-radius: 50%;
			padding-left: 17rpx;
		}
		.title {
			text-align: center;
			height: 32rpx;
			padding-top: 10rpx;
			padding-bottom: 50rpx;
			background-color: #f2f2f2;
		}

		.u-cell-box {
			// line-height: 20rpx;
			// height: 20rpx;
		}

		.m-cell {
			// height: 120rpx;
		}

		.u-row {
			margin-top: 2rpx !important;
			margin-bottom: 2rpx !important;
		}

		.rm-row {
			margin: 0 12rpx 0 10rpx;
			background-color: #ffffff;
			width: auto;
			height: 180rpx;

			.rm-image {
				margin:4rpx 0 12rpx 0;
			}

			.rm-font {
				text-align: right;
				font-size: 10rpx;
				color: #aaaa7f;
			}
		}

		.grid {
			// margin-top: 10px;
			
		}

		.grid-text {
			font-size: 24rpx;
			margin:10rpx 0 -10rpx 0;
			color: #333;
		}

		.u-row {
			margin: 40rpx 0;
		}
		.list{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.listOne{
				display: flex;
				margin-top: 10rpx;
				.img{
					.listImg{
						width: 220rpx;
						height: 160rpx;
						margin: 10rpx 10rpx;
					}
				}
				.listText{
					font-size: 26rpx;
					margin:15rpx 10rpx 0rpx 20rpx;
				}
			}
			.listSen{
				
				.bride{
					font-size: 22rpx;
					color: #BFBFBF;
					margin: -50rpx 0rpx 0rpx 600rpx;
				}
			}
			.underline{
				border:0px solid #d3d3d3;
			}
		}
		.offlineCourse{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			
			.background{
				height: 260rpx;
				margin-top: 20rpx;
				font-weight: bold;
				color: #fff;
				.logo{
					.courseImg{
						width: 140rpx;
						height: 60rpx;
						margin: 20rpx 0rpx 0rpx 20rpx;
					}
				}
				.title1{
					font-size: 36rpx;
					text-align: center;
				}
				.content{
					font-size: 20rpx;
					text-align: center;
					margin-top: 20rpx;
				}
				.courseTime{
					font-size: 16rpx;
					text-align: center;
					margin-top: 20rpx;
				}
			}
			
		}
		.offlineCourse:nth-child(odd){
			background-color: #91D5FF;
		}
		.offlineCourse:nth-child(even){
			background-color: #ffaa7f;
		}
		
	}
</style>
