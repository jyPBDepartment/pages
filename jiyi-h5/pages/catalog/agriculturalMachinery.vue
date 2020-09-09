<template>
	<view>
		<HeaderSearch :title="title"></HeaderSearch>
		<Screen :listIndex="listIndex" @select="select" :condition="condition"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10">
				<view @click="jump(item.id)" class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in list" :key="index">
					<view class="image" :class="`${item.stateNum == 1 && 'green' } ${item.stateNum == 2 && ' red'}`">
						<image class="app-img" :src="item.imageUrl" style="width: 200rpx;height: 200rpx;"></image>
					</view>
					<view class="info g-f-1">
						<view class="title f-14 g-flex" style="margin-bottom: -20rpx;">
							<view class="o-e" style="width: 300rpx;">
								{{item.name}}
							</view>
							<view class="price f-14" >
								<span v-if="item.isFace=='0'">面议</span>
								<span v-if="item.isFace=='1'">￥{{item.price}}{{company}}</span>
							</view>
						</view>
						<view class="other g-a-c g-flex g-j-s-b" v-if="index1==0">
							型号：{{item.model}}
							<view class="g-j-e">
								{{item.purchaseDate}}
							</view>
						</view>
						<!-- 农机地址 -->
						<view class="other g-a-c g-flex g-j-s-b " style="font-size: smaller;" v-if="index1==0">
							地址：{{item.address}}
						</view>
						<!--粮食买卖 -->
						 <view  v-if="index1==1" style="margin: 16rpx 0;">
							<view>{{item.address}}</view>
						</view>
						<view  v-if="index1==1">
							<view>{{item.createDate}}</view>
						</view>
						<!--农服发布-->
						<view class="other g-a-c g-flex g-j-s-b" v-if="index1==2">
							<span v-if="item.transactionCategoryCode=='0'">农作物：玉米</span>
							<span v-if="item.transactionCategoryCode=='2'">农作物：水稻</span>
							<span v-if="item.transactionCategoryCode=='3'">农作物：高粱</span>
							<span v-if="item.transactionCategoryCode=='4'">农作物：黄豆</span>
							<view>{{item.beginDate}}至{{item.endDate}}</view>
						</view>
						<view class="other g-a-c g-flex g-j-s-b" v-if="index1==2">
							农机台数：{{item.machineNum}}
						</view>
						<view class="other g-a-c g-flex g-j-s-b" v-if="index1==2">
							<span v-if="item.farmingMode=='0'">农活方式：整活</span>
							<span v-if="item.farmingMode=='1'">农活方式：零活</span> </view>
						<view class="reason" v-if="item.stateNum == 2">
							理由：{{item.examineReason}}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	let list = []
	import MescrollMixin from "@/mescroll-uni/mescroll-mixins.js";
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			Screen,
			HeaderSearch
		},
		data() {
			return {
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
				machineNum: '',
				title: '',
				name: '',
				status: '',
				price: '',
				model: '',
				purchaseDate: '',
				articleNumber: '',
				address: '',
				examineReason: '',
				imageUrl: '',
				createDate: '',
				beginDate: '',
				endDate: '',
				transactionCategoryCode: '',
				farmingMode: '',
				company:'',
				index1: '',
				condition: [{
						code: 0,
						name: "待审核"
					}, {
						code: 1,
						name: "审核通过"
					},
					{
						code: 2,
						name: "拒绝通过"
					},
					{
						code: "",
						name: "全部"
					},
				],
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
				list: [],
				listIndex: 3
			}
		},
		onLoad(e) {
			if (e.index == 0) {
				this.index1 = 0
			}
			if (e.index == 1) {
				this.index1 = 1
			}
			if (e.index == 2) {
				this.index1 = 2
			}
			if (e.index == 0) {	
				this.title = "农机发布"
			}
			if (e.index == 1) {
				this.title = "粮食买卖"
			}
			if (e.index == 2) {
				this.title = "农服发布 "
			}
			if (e.index == 0) {
			    this.company = "元/亩"
			   }
			   if (e.index == 1) {
			    this.company = "元/公斤"
			   }
			   if (e.index == 2) {
			    this.company = "元/天 "
			   }
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
				// 第1种: 请求具体接口
				console.log("aaa" + this.index1)
				if (this.index1 == 0) {
					uni.request({
						url: ApiPath.url.findMyPublication,
						method: "GET",
						data: {
							type: 2,
							status: this.status,
							page: pageNum,
							size: pageSize,
						},
						success: (res) => {
							if (res.data.state == 0) {
								let curPageData = res.data.data.content
								let curPageLen = curPageData.length;
								//设置列表数据
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
								for (var i = 0; i < res.data.data.content.length; i++) {
									curPageData[i].imageUrl = curPageData[i].url.split(",")[0];
								}
								this.list = this.list.concat(curPageData); //追加新数据
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
				if (this.index1 == 1) {
					uni.request({
						url: ApiPath.url.findMyPublication,
						method: "GET",
						data: {
							type: 1,
							status: this.status,
							page: pageNum,
							size: pageSize,
						},
						success: (res) => {
							if (res.data.state == 0) {
								let curPageData = res.data.data.content
								let curPageLen = curPageData.length;
								//设置列表数据
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表

								for (var i = 0; i < res.data.data.content.length; i++) {
									curPageData[i].imageUrl = curPageData[i].url.split(",")[0];
								}
								this.list = this.list.concat(curPageData); //追加新数据
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
				if (this.index1 == 2) {
					uni.request({
						url: ApiPath.url.findMyPublication,
						method: "GET",
						data: {
							type: 0,
							status: this.status,
							page: pageNum,
							size: pageSize,
						},
						success: (res) => {
							if (res.data.state == 0) {
								let curPageData = res.data.data.content
								let curPageLen = curPageData.length;

								//设置列表数据
								if (page.num == 1) this.list = []; //如果是第一页需手动置空列表

								for (var i = 0; i < res.data.data.content.length; i++) {
									curPageData[i].imageUrl = curPageData[i].url.split(",")[0];
								}

								this.list = this.list.concat(curPageData); //追加新数据

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
			},
			jump(getId) {
				if (this.index1 == 0) {
					uni.navigateTo({
						url: '../grain/spaceCancel?id=' + getId
					})
				}
				if (this.index1 == 1) {
					uni.navigateTo({
						url: '../grain/space?id=' + getId
					})
				}
				if (this.index1 == 2) {
					uni.navigateTo({
						url: '../grain/spaceModify?id=' + getId
					})
				}
			},
			select(code) {
				this.status = code
				this.downCallback()
			}
		}
	}
</script>

<style lang="scss">
	.box {
		color: #808080;

		.image {
			width: 200rpx;
			height: 200rpx;
			margin-right: 20rpx;
			color: #fff;
		}

		.orange {

			background-color: #ff8d1a;
		}

		.green {

			background-color: #43cf7c;
		}

		.red {

			background-color: #e51c2e;
		}

		.info {
			.title {
				height: 76rpx;
				color: #333;
				.price {
					width: 210rpx;
					text-align: right;
					margin-left: -30rpx;
				}
			}

			.other {
				line-height: 40rpx;
			}
		}
		.reason {
			text-align: right;
			color: #e51c2e;
		}
	}

	.box-border {
		border-bottom: 1rpx solid #e5e5e5;
	}
</style>
