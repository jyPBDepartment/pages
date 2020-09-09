<template>
	<view class="service">
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen @screened="screened" @select="select" :screenList="screenList" :condition="condition"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10">
				<view class="app-modular g-flex" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
					<image class="app-img" :src="item.url" mode=""></image>
					<view class="app-info g-flex g-f-1 g-f-column g-j-s-b">
						<p class="title f-14">{{item.name}}</p>
						<view v-if="item.address" class="g-flex f-12 g-a-c" style="color: rgba(128, 128, 128, 1)">
							<u-icon style="margin-right: 5rpx;" name="map-fill" color="#A6A6A6" size="36"></u-icon>
							{{item.address}}
						</view>
						<!-- 						<view class="g-flex g-j-s-b f-12 tags">
							<view class="tagGrain">信誉商家</view>
						</view> -->
						<view class="g-flex g-j-s-b f-14 g-a-c">
							<view class="g-flex g-a-c">
								<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 40rpx;height:40rpx;margin-right: 20rpx;"></image>
								<view class="word">
									{{item.contactsUser}}
								</view>
							</view>
							<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">
								{{item.createDate}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	import Interface from '@/api/ApiPath.js'
	import MescrollMixin from "@/mescroll-uni/mescroll-mixins.js";
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			Screen,
			HeaderSearch,
		},
		data() {
			return {
				condition: [{
					name: "全部",
					code: null
				}, {
					name: "出售",
					code: 1
				}, {
					name: "收购",
					code: 0
				}, {
					name: "筛选",
					code: null
				}],
				screenList: [{
					title: '农作物类别',
					category: [{
						code: 0,
						name: "玉米"
					}, {
						code: 2,
						name: "水稻"
					}, {
						code: 3,
						name: "高粱"
					}, {
						code: 4,
						name: "黄豆"
					}]
				}],
				transactionTypeCode: null,
				transactionCategoryCode: null,
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {

				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: []
			}
		},
		onLoad() {

		},
		methods: {
			removeSpaces(string) {
				return string.replace(/\s*/g, '')
			},
			// 跳转详情页面
			jump(val) {
				uni.navigateTo({
					url: '../grain/space?id='+val
				})
			},
			search(e) {
				this.searchName = this.removeSpaces(e)
				this.downCallback()
			},
			select(code) {
				this.transactionTypeCode = code
				this.downCallback()
			},
			screened(code) {
				this.transactionCategoryCode = code
				this.downCallback()
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
				let url
				if (this.searchName == '') url = Interface.url.findAgriType
				if (this.searchName != '') url = Interface.url.findAgriInfo
				this.request(page, url)
			},
			request(page, url) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// 第1种: 请求具体接口
				uni.request({
					url: url,
					method: "GET",
					data: {
						type: 1,
						name: this.searchName,
						page: pageNum,
						size: pageSize,
						transactionTypeCode: this.transactionTypeCode,
						transactionCategoryCode: this.transactionCategoryCode

					},
					success: (res) => {
						if (res.data.state == 0) {
							let curPageData = res.data.data.content.map(item =>{
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
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
						uni.showToast({
							title: '请求失败',
							duration: 2000
						});
						this.mescroll.endErr()
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	.app-modular {
		padding-bottom: 20rpx;
		border-bottom: 1px solid rgba(229, 229, 229, 1);
	}

	.tagGrain {
		width: 140rpx;
		line-height: 40rpx;
		border-radius: 13rpx;
		border: 1px solid rgba(255, 87, 51, 1);
		color: rgba(255, 87, 51, 1);
		font-weight: bold;
		text-align: center;
	}

	.app-number-grain {
		color: #333;
		line-height: 60rpx;
	}

	.word {
		font-size: 13rpx;
		font-weight: bold;
	}
</style>
