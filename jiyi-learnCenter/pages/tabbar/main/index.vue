<template>
	<view id="main" class="main-container">
		<!--  标题 -->
		<header-box title="学习中心"  :showGoBack="false"></header-box>

		<!--  轮播图 -->
		<swiper class="circul" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
			<block v-for="(item, index) in banner" :key="index">
				<swiper-item class="swiperItem"><image :lazy-load="true" :src="item.url" mode="aspectFill" class="swiperImage"></image></swiper-item>
			</block>
		</swiper>
		<!--  模块 -->
		<u-grid class="grid" :col="3" :border="border">
			<u-grid-item @click="learningManual">
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603328600738326.png" :size="40" class="icon"></u-icon>
				<view class="grid-text">学习手册</view>
			</u-grid-item>
			<u-grid-item @click="studyExamination">
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603329404636433.png" :size="40" class="icon color-1"></u-icon>
				<view class="grid-text">学习考试</view>
			</u-grid-item>
			<u-grid-item @click="offlineCourses">
				<u-icon name="http://60.205.246.126/images/2020/10/22/1603329324137893.png" :size="40" class="icon color-2"></u-icon>
				<view class="grid-text">线下课程</view>
			</u-grid-item>
		</u-grid>
		<view class="split-space"></view>
		<comm-title title="热门课程" @more="rmMore"></comm-title>
		<view class="list-box card-box" v-for="(item, index) in hotCourseList" :key="index" @click="rmDetail(item.id, type)">
			<view class="list-item left"><image class="listImg" :src="item.url"></image></view>
			<view class="list-item right">
				<view class="title">{{ item.title }}</view>
				<view class="content">{{ item.readNum }}人已学</view>
			</view>
		</view>
		<data-empty v-if="hotCourseList.length == 0" :option="{tip:'暂无数据'}"></data-empty>
		
		<view class="split-space"></view>
		<comm-title title="最新课程" @more="hyMore"></comm-title>
		<view
			class="list-box offlineCourse card-box animate__animated animate__fadeIn "
			v-for="(item, index) in offlineCourseList"
			:key="'list' + index"
			@click="hyDetail(item.id)"
		>
			<view class="list-item left"><image class="listImg" :src="item.url"></image></view>
			<view class="list-item right">
				<view class="name">{{ item.title }}</view>
				<view class="time">开课时间：{{ item.lessonTime }}</view>
			</view>
			<!-- <view class="background">
				<view class="logo"><image class="courseImg" :src="item.url"></image></view>
				<view class="title1">{{ item.title }}</view>
				<view class="courseTime">开课时间：{{ item.lessonTime }}</view>
			</view> -->
		</view>
		<data-empty v-if="offlineCourseList.length == 0" :option="{tip:'暂无数据'}"></data-empty>
	</view>
</template>

<script>
import commTitle from '@/components/commTitle.vue';

import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		commTitle
	},
	data() {
		return {
			border: false,
			picType: '',
			banner: [],
			hotCourseList: [],
			offlineCourseList: [],
			type: 0
		};
	},
	// 页面初始化加载
	onLoad(e) {
		// 从外部接口获取客户信息
		this.initCustomerInfo(e);
		
		
		// this.checkWeixin();
	},
	onShow() {
		this.picture(); //初始化加载banner图
		this.hotCourse(); //初始化加载热门课程
		this.offLineCourse(); //初始化加载线下课程
	},
	methods: {
		checkWeixin(){
			uni.request({
				method:'POST',
				url:ApiPath.getWxConfig,
				data:'',
				success: (res) => {
					console.log(JSON.stringify(res))
				}
			})
		},
		// 从外部接口获取客户信息
		initCustomerInfo(e) {
			// alert("从app获取用户id=" + e.U + " sessionId=" + e.SI)
			// Interface.common.userId = e.U; //缓存用户id
			// Interface.common.sessionId = e.SI; //缓存sessionId
			localStorage.setItem('userId', e.U);
			// localStorage.setItem('userId', '20200909');
		},
		// 初始化加载banner图
		picture() {
			uni.request({
				url: ApiPath.url.getListByType,
				method: 'GET',
				data: {
					picType: 0
				},
				success: res => {
					if (res.data.code == 200) {
						this.banner = res.data.data;
						if(!this.banner.length){
							this.banner.push({
								url:'http://60.205.246.126/images/2020/12/17/1608190895100322.png'
							})
						}
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
		// 初始化加载热门课程
		hotCourse() {
			uni.request({
				url: ApiPath.url.getListByReading,
				method: 'GET',
				success: res => {
					if (res.data.code == 200) {
						this.hotCourseList = res.data.data;
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
		// 初始化加载线下课程
		offLineCourse() {
			uni.request({
				url: ApiPath.url.getListByLessonDay,
				method: 'GET',
				success: res => {
					if (res.data.code == 200) {
						this.offlineCourseList = res.data.data;
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
		// 线下课程
		offlineCourses() {
			uni.navigateTo({
				url: '../../module/offlineCourses/offlineCourseMore'
			});
		},
		// 学习考试
		studyExamination() {
			uni.navigateTo({
				url: '../../module/studyExamination/index'
			});
		},
		// 学习手册
		learningManual() {
			uni.navigateTo({
				url: '../../module/learningManual/index'
			});
		},
		// 热门课程更多
		rmMore() {
			uni.navigateTo({
				url: '../../module/hotCourse/hotCourseList'
			});
		},
		// 线下课程更多
		hyMore() {
			uni.navigateTo({
				url: '../../module/offlineCourses/offlineCourseMore'
			});
		},
		// 热门课程详情
		rmDetail(getId, type) {
			uni.navigateTo({
				url: '../../module/hotCourse/hotCourseContent?id=' + getId + '&type=' + type
			});
		},
		// 线下课程详情
		hyDetail(val) {
			uni.navigateTo({
				url: "../../module/offlineCourses/offlineDetails?status=0&id="+val
			})
		},
		initDate() {
			uni.request({
				method: 'GET',
				url: '',
				data: '',
				success: res => {}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	background-color: #ffffff;

	.circul {
		width: 750rpx;
		height: 320rpx;
		margin-top: 80rpx;
		.swiperItem {
			width: 100%;
			height: 100%;

			.swiperImage {
				width: 750rpx;
				height: 320rpx;
			}
		}
	}

	.icon {
		width: 75rpx;
		height: 75rpx;
		background-color: #009688;
		border-radius: 50%;
		padding-left: 17rpx;
	}

	.color-1 {
		background-color: #fcca00;
	}
	.color-2 {
		background-color: #3291f8;
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
			margin: 4rpx 0 12rpx 0;
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
		margin: 10rpx 0 -10rpx 0;
		color: #333;
	}

	.u-row {
		margin: 40rpx 0;
	}

	.list-box {
		display: flex;
		margin: 20rpx;
		.list-item {
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			> image {
				width: 200rpx;
				height: 160rpx;
			}
			.title {
				font-size: 32rpx;
				color: #666666;
			}

			.content {
				font-size: 24rpx;
				color: #bfbfbf;
				text-align: right;
			}
			.name {
				font-size: 32rpx;
				color: #ffffff;
			}
			.time {
				font-size: 24rpx;
				color: #ffffff;
			}
		}
		.left {
			width: 220rpx;
		}
		.right {
			flex: 1;
		}
	}
	.offlineCourse {
		color: #ffffff;
	}
	.offlineCourse:nth-child(odd) {
		background-color: #27b148;
		// background-image: linear-gradient(to right, #22c1c3, #fdbb2d);
	}

	.offlineCourse:nth-child(even) {
		background-color: #ff3328;
		// background-image: linear-gradient(to right, #4568DC, #B06AB3);
	}
}
</style>
