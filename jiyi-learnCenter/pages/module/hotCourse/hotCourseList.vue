<template>
	<view class="content">
		<!-- 头部 -->

		<view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon>
			</view>
			<view class="title">热门课程</view>
		</view>

		<!-- 搜索 -->
		<view class="select">
			<view>
				<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="left" shape="square" margin="30rpx 0rpx 0rpx 20rpx"
				 maxlength="16" class="input" v-model="title" @search="search"></u-search>
			</view>
		</view>

		<!-- 滑块 -->
		<u-tabs :list="labelList" :current="current" @change="change" font-size="30" item-width="150" :show-bar="false"
		 active-color="red" class="u-sticky"></u-tabs>

		<!-- 懒加载 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 列表详情 -->
			<view class="list" v-for="(item, index) in agentList" :key="index" @click="agentArticleJump(item.id)">
				<view class="listOne">
					<view class="img">
						<image class="listImg" :src="item.url"></image>
					</view>
					<view class="listText">{{item.title}}</view>
				</view>
				<view class="listSen">
					<view class="bride">{{item.studyNum}}人已学</view>
				</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
			</view>
		</mescroll-body>
	</view>

</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				labelList: [{
						code: "",
						id: "",
						name: '全部'
					}
				],
				current: "",
				learningId: "",
				labelId: "",
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
				title: '',
				agentList: [],
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
				},
			}
		},
		// 页面初始化
		onLoad(e) {
			this.learningId = e.id;
			// 标签初始化
			this.initLabel();
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
						title: this.title,
						createBy: this.createBy,
						vocationId: this.learningId,
						labelId: this.labelId,
						page: pageNum,
						size: pageSize
					},
					url: ApiPath.url.findById, //请求接口路径
					success: (res) => { //成功返回结果方法
					
						if (res.data.state == 0) {
							this.agentList = res.data.data;
							
							//设置列表数据
							if (page.num == 1) this.agentList = []; //如果是第一页需手动置空列表
							this.agentList = this.agentList.concat(res.data.data.content); //追加新数据
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
			// 标签点击事件
			change(index) {
				// 循环遍历list,如果i与当前序号相等，res.labelId 赋值给list.id
				for(let i=0;i<this.labelList.length;i++){
					if(i==index){
						this.labelId = this.labelList[i].id;
					}
				}
				// 选中点击
				this.current = index;
				// 调用下拉刷新的方法
				this.downCallback();
			},
			// 标签初始化
			initLabel() {
				uni.request({
					method: 'GET', //请求方式
					url: ApiPath.url.findLabel, //请求接口路径
					success: (res) => { //成功返回结果方法
						if (res.data.state == 0) {
							for (let i = 0; i < res.data.data.length; i++) {
								// 遍历循环，给标签list循环添加数据
								this.labelList.push({
									"id": res.data.data[i].id,
									"code": i,
									"name": res.data.data[i].name
								})

							}
							// 页码，数量
							let pages = {
								num: 1,
								size: 10
							};
							// 调用上拉加载方法
							this.upCallback(pages);
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
			// 返回上一页
			backTo() {
				uni.navigateBack({
					
				})
			},
			// 经销商文章跳转详情页面
			agentArticleJump(getId) {
					uni.navigateTo({
						url: '../../module/learningManual/agentArticleContent?id='+getId
					})
			},
			//搜索功能
			search() {
				this.downCallback()
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.head {
			display: flex;
			margin: 15rpx 0rpx 0rpx 20rpx;

			.backArrow {
				margin-top: 6rpx;
			}

			.title {
				margin-left: 250rpx;
				font-size: 35rpx;
			}
		}

		.u-sticky {
			position: -webkit-sticky;
			position: sticky;
			top: 0rpx;
			z-index: 999;
		}

		.select {
			display: flex;
			height: 120rpx;
			background-color: #C9C9CE;
			margin-top: 20rpx;

			.input {
				width: 700rpx;
			}

			.uni-input-placeholder {
				margin-left: 200rpx;
			}
		}

		.list {
			display: flex;
			flex-direction: column;
			background-color: #fff;

			.listOne {
				display: flex;
				margin-top: 10rpx;

				.img {
					.listImg {
						width: 220rpx;
						height: 160rpx;
						margin: 10rpx 10rpx;
					}
				}

				.listText {
					font-size: 26rpx;
					margin: 15rpx 10rpx 0rpx 20rpx;
				}
			}

			.listSen {
				.bride {
					font-size: 22rpx;
					color: #BFBFBF;
					margin: -50rpx 0rpx 0rpx 600rpx;
				}
			}

			.underline {
				border: 2rpx solid #BBBBBB;
			}
		}

	}
</style>
