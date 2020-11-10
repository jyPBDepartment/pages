<template>
	<view class="compent">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view> 
				<view class="title">线下课程</view>
		</view>
		<!-- 懒加载 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 列表详情 -->
			<view class="offlineCourse animate__animated animate__lightSpeedInRight delay-5s 5s" v-for="(item, index) in offlineCourseList" :key="index"  @click="courseDetail(item.id)">
					<view class="background">		
					<view class="logo">
						<image class="courseImg" :src="item.url"></image>
					</view>
					<view class="title1">
						{{item.title}}
					</view>
					<view class="courseTime">
						开课时间：{{item.lessonDate}}
					</view>
				</view>
				
			</view>
		</mescroll-body>
	</view>
		
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data(){
			return{
				title:"",
				offlineCourseList:[],
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {
				
				},
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
					varLable: "",
					varName: "",
					currentPage: 1,
					pageSize: 10,
					total: 10,
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
			}
		},
		methods:{
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
					success: (res) => { //成功返回结果方法
						if (res.data.code == 200) {
							this.offlineCourseList = res.data.data;
							
							//设置列表数据
							if (page.num == 1) this.offlineCourseList = []; //如果是第一页需手动置空列表
							this.offlineCourseList = this.offlineCourseList.concat(res.data.data.content); //追加新数据
							this.mescroll.endByPage(res.data.data.content.length, res.data.data.totalPages);
						} else {
							uni.showToast({
								title: "服务器出错，请联系管理员"
							})
						}
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: (err) => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
			
				})
			
			},
			backTo() {
				uni.navigateBack({
			
				})
			},
			// 行业案例跳转详情页面
			courseDetail(getId){
				uni.navigateTo({
					url:"./offlineDetails?id="+getId
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.compent{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head{
			display: flex;
			margin-top: 15rpx;
			margin-left: 20rpx;
			height: 60rpx;
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}
		.offlineCourse{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			
			.background{
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
					margin-top: -15rpx;
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
					margin-bottom: 15rpx;
				}
			}
			
			
		}
		.offlineCourse:nth-child(even){
			background-color: #91D5FF;
		}
		.offlineCourse:nth-child(odd){
			background-color: #ff73ab;
		}
		.offlineCourse:nth-child(3n+1){
			background-color: pink;
		}
		.offlineCourse:nth-child(4n+1){
			background-color: #ffaa7f;
		}
		.offlineCourse:nth-child(5n+1){
			background-color: #75ffb6;
		}
	}
	
</style>
