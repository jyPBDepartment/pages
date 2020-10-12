<template>
	<view id="main">
		<!--  标题 -->
		<view class="title">学习中心</view>
		<!--  背景图 -->
		<u-image width="100%" height="320rpx" :src="src"></u-image>
		<!--  模块 -->
		<u-grid class="grid" :col="4">
			<u-grid-item @click="learningManual">
				<u-icon name="https://cdn.uviewui.com/uview/example/button.png" :size="46"></u-icon>
				<view class="grid-text">学习手册</view>
			</u-grid-item>
			<u-grid-item @click="studyExamination">
				<u-icon name="lock" :size="46"></u-icon>
				<view class="grid-text">学习考试</view>
			</u-grid-item>
			<u-grid-item @click="onlineTraining">
				<u-icon name="hourglass" :size="46"></u-icon>
				<view class="grid-text">在线培训</view>
			</u-grid-item>
			<u-grid-item @click="offlineCourses">
				<u-icon name="hourglass" :size="46"></u-icon>
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
		<view class="list" v-for="(item, index) in hotCourseList" :key="index"  @click="rmDetail">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.word}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.sum}}人已读</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>
<!-- 		<u-row class="rm-row"  @click="rmDetail('')">
			<u-col span="4">
				<u-image class="rm-image" width="220rpx" height="160rpx" src="http://60.205.246.126:8001/images/2020/09/29/1601345920052441.jpg"></u-image>
			</u-col>
			<u-col span="8">
				<view>通过row组件的justify来对分栏进行灵活的对齐， 可选值为start(或flex-start)、end(或flex-end)</view>
				<view class="rm-font">200人已读</view>
			</u-col>
		</u-row>
		<u-row class="rm-row">
			<u-col span="4" @click="rmDetail">
				<u-image class="rm-image" width="220rpx" height="160rpx" src="http://60.205.246.126:8001/images/2020/09/29/1601345997114502.jpg"></u-image>
			</u-col>
			<u-col span="8" @click="rmDetail">
				<view>显示列表信息展示内容</view>
				<view class="rm-font">134人已读</view>
			</u-col>
		</u-row> -->

		<!--  行业案例 -->
		<u-row style="background-color: #f2f2f2;font-size: 24rpx;">
			<u-col span="9">
				<view>行业案例</view>
			</u-col>
			<u-col span="3">
				<view style="text-align: right;" @click="hyMore">更多>>></view>
			</u-col>
		</u-row>
		<!-- <u-row class="rm-row">
			<u-col span="4" @click="hyDetail('111')">
				<u-image width="220rpx" height="160rpx" src="http://60.205.246.126:8001/images/2020/09/29/1601345920052441.jpg"></u-image>
			</u-col>
			<u-col span="8" @click="hyDetail('111')">
				<view>通过row组件的justify来对分栏进行灵活的对齐， 可选值为start(或flex-start)、end(或flex-end)</view>
				<view class="rm-font">200人已读</view>
			</u-col>
		</u-row>
		<u-row class="rm-row">
			<u-col span="4" @click="hyDetail('111')">
				<u-image width="220rpx" height="160rpx" src="http://60.205.246.126:8001/images/2020/09/29/1601345997114502.jpg"></u-image>
			</u-col>
			<u-col span="8" @click="hyDetail('111')">
				<view>显示列表信息展示内容</view>
				<view class="rm-font">134人已读</view>
			</u-col>
		</u-row> -->
		<view class="list" v-for="(item, index) in industryCaseList" :key="'list'+index"  @click="hyDetail">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.word}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.sum}}人已读</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
				// danmuList: [{
				// 		text: '第 1s 出现的弹幕',
				// 		color: '#ff0000',
				// 		time: 1
				// 	},
				// 	{
				// 		text: '第 3s 出现的弹幕',
				// 		color: '#ff00ff',
				// 		time: 3
				// 	}
				// ],
				hotCourseList:[
					{url:"http://60.205.246.126:8001/images/2020/09/29/1601345920052441.jpg",word:"通过row组件的justify来对分栏进行灵活的对齐， 可选值为start(或flex-start)、end(或flex-end)",sum:"200"},
					{url:"http://60.205.246.126:8001/images/2020/09/29/1601345997114502.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"300"}
				],
				industryCaseList:[
					{url:"http://60.205.246.126:8001/images/2020/09/29/1601345920052441.jpg",word:"通过row组件的justify来对分栏进行灵活的对齐， 可选值为start(或flex-start)、end(或flex-end)",sum:"500"},
					{url:"http://60.205.246.126:8001/images/2020/09/29/1601345997114502.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"1314"}
				]
			}
		},
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			// this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		methods: {
			offlineCourses() {
				uni.navigateTo({
					url: "../../module/offlineCourses/index"
				})
			},
			onlineTraining() {
				uni.navigateTo({
					url: "../../module/onlineTraining/index"
				})
			},
			studyExamination() {
				uni.navigateTo({
					url: "../../module/studyExamination/index"
				})
			},
			learningManual() {
				uni.navigateTo({
					url: "../../module/learningManual/index"
				})
			},
			rmMore() {
				alert("进入热门课程列表页面")
			},
			hyMore() {
				alert("进入行业案例列表页面")
			},
			rmDetail() {
				
				uni.navigateTo({
					url: "../../detailsPages/hotCourseDetail/index"
				})
			},
			hyDetail(val) {
				
				uni.navigateTo({
					url: "../../detailsPages/IndustryCaseDetail/index"
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
			},
			// videoErrorCallback: function(e) {

			// 	alert(JSON.stringify(e.target))
			// 	uni.showModal({
			// 		content: e.target.errMsg,
			// 		showCancel: false
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	#main {
		background-color: lightgray;

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
			margin-left: 10rpx;
			margin-right: 12rpx;
			background-color: #ffffff;
			width: auto;
			height: 180rpx;

			.rm-image {
				margin-top: 4rpx;
				margin-buttom: 12rpx;
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
			margin-top: 4rpx;
			color: $u-type-info;
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
					margin-left: 600rpx;
					margin-top: -50rpx;
				}
			}
			.underline{
				border:0px solid #d3d3d3;
			}
		}
	}
</style>
