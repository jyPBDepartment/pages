<template>
	<view class="compent">
		<!-- 头部 -->
		<!-- 	<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view> 
				<view class="title">线下课程</view>
		</view> -->
		<header-box title="线下课程" @backTo="backTo"></header-box>

		<!-- 懒加载 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 列表详情 -->
			<view
				class="offlineCourse card-box animate__animated animate__lightSpeedInRight delay-5s 5s"
				v-for="(item, index) in offlineCourseList"
				:key="index"
				@click="courseDetail(item.id)"
			>
				<view class="list-item left"><image class="listImg" :src="item.url"></image></view>
				<view class="list-item right">
					<view class="name">{{ item.title }}</view>
					<view class="time">开课时间：{{ item.lessonDate }}</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			title: '',
			offlineCourseList: [],
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的配置(可选, 绝大部分情况无需配置)
			downOption: {},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			formInline: {
				page: 1,
				limit: 10,
				varLable: '',
				varName: '',
				currentPage: 1,
				pageSize: 10,
				total: 10
			},
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		};
	},
	methods: {
		/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			uni.request({
				method: 'GET', //请求方式
				data: {
					name: this.title,
					createBy: this.createBy,
					page: pageNum,
					size: pageSize
				},
				url: ApiPath.url.findLessonPage, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.offlineCourseList = res.data.data;

						//设置列表数据
						if (page.num == 1) this.offlineCourseList = []; //如果是第一页需手动置空列表
						this.offlineCourseList = this.offlineCourseList.concat(res.data.data.content); //追加新数据
						this.mescroll.endByPage(res.data.data.content.length, res.data.data.totalPages);
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
					// 请求成功,隐藏加载状态
					this.mescroll.endSuccess();
				},
				fail: err => {
					// 请求失败,隐藏加载状态
					this.mescroll.endErr();
				}
			});
		},
		backTo() {
			uni.switchTab({
				url: '../../tabbar/main/index'
			});
		},
		// 跳转详情页面
		courseDetail(getId) {
			uni.navigateTo({
				url:"./offlineDetails?status=1&id="+getId
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.compent {
	display: flex;
	flex-direction: column;
	background-color: #FFFFFF;
	padding-top: 80rpx;
	.offlineCourse {
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
