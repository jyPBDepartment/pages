<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :screenList="screenList" :condition="condition" :type="2"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10  g-flex g-f-warp g-f-row g-j-s-b" style="margin:20rpx 0;">
				<view @click="jump" class="commodity b-f" v-for="(item, index) in dataList" :key="index">
					<view class="label f-12">{{item.labelCode}}</view>
					<image style="width: 316rpx;height: 298rpx;" :src="item.url" mode="">

					</image>
					<p class="f-14 o-e">{{item.name}}</p>
					<view class="info g-flex g-a-c f-12" style="margin-top: 24rpx; margin-bottom: 15rpx;">
						<view class="f-14 g-f-1" style="color: #1e1e1e;">￥{{item.price}}</view>
						<!-- <view style="color: #999999;">月销3笔</view> -->
					</view>
				</view>
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	let _this
	import Interface from '@/api/ApiPath.js'
	import MescrollMixin from "@/mescroll-uni/mescroll-mixins.js";
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			Screen,
			HeaderSearch
		},
		data() {
			return {
				condition: ["全部", "购买", "出售", "租赁", "筛选"],
				screenList: [{
					title: '机器类型',
					category: ["xd-500", "39006", "WS654", "GX321"]
				}],
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
				// 列表数据
				dataList: []
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '../grain/space?index=1'
				})
			},
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
				// 第1种: 请求具体接口
				uni.request({
					url: Interface.url.findAgriType,
					method: "GET",
					data: {
						type: 2,
						page: pageNum,
						size: pageSize
					},
					success: (res) => {
						if (res.data.state == 0) {
							let curPageData = res.data.data.content
							let curPageLen = curPageData.length;
							//设置列表数据
							if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(curPageData); //追加新数据
							this.mescroll.endByPage(curPageLen, res.data.data.totalPages);
						}
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: (err) => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				});

			}

		}
	}
</script>

<style lang="scss">
	page {
		background: rgba(229, 229, 229, 1);
	}

	.commodity {
		width: 316rpx;
		padding: 12rpx;
		margin-bottom: 20rpx;
		position: relative;
	}


	.label {
		width: 72rpx;
		line-height: 50rpx;
		text-align: center;
		z-index: 99;
		position: absolute;
		top: 20;
		left: 20;
		background: #ff8d1a;
		color: #fff;
	}
</style>
