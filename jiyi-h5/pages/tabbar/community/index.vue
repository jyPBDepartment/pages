<template>
	<view>
		<HeaderSearch title="圈子" @searchCallback="search"></HeaderSearch>
		<view class="tabs g-flex g-j-s-a g-a-c f-14">
			<view @click="selectTab(item, index)" :class="(index == tabIndex) && 'tab-hover'" v-for="(item, index) in tabsList"
			 :key="index">{{item.name}}</view>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<CommunityInfo @click="jump(item.id)" v-for="(item, index) in dataList" :key="index" :communityInfo="item" />
		</mescroll-body>

		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:46rpx 20rpx">
				<view class="f-12" style="line-height: 52rpx;margin-bottom: 20rpx;">筛选类别</view>
				<view class="categorys g-flex g-f-warp g-j-s-b">
					<view :class="(index == selectCategoryIndex && tabIndex == 4) && 'screened'" class="f-14 t-c category" @click="selectCategory(item, index)"
					 v-for="(item, index) in categoryList " :key="index">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="btns g-flex g-j-s-b">
				<u-button class="btn" shape="circle" @click="recharge" plain>重置</u-button>
				<u-button class="btn" shape="circle" type="error">确认</u-button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import Interface from '@/api/ApiPath.js'
	import MescrollMixin from "@/mescroll-uni/mescroll-mixins.js";
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import CommunityInfo from '../../../components/CommunityInfo/CommunityInfo.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniDrawer,
			CommunityInfo
		},
		data() {
			return {
				tabIndex: 0,
				tabsList: [],
				categoryList: [],
				selectCategoryIndex: null,
				postType: null,
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
		watch: {
			selectCategoryIndex(newValue) {
				if (newValue != null) {
					this.tabIndex = this.tabsList.findIndex(item => item.name == '筛选')
				} else {
					this.tabIndex = 0
				}
			}
		},
		onLoad() {
			// 初始化帖子类型信息
			this.initPostType();
		},
		methods: {
			initPostType(){
				uni.request({
					url: Interface.url.getPostType,
					method: "GET",
					data: {},
					success: (res) => {
						this.tabsList.push({
							name: "全部",
							postType: null
						})
						res.data.data.forEach((item, index) => {
							if (index <= 2) {
								this.tabsList.push(item)
							}
						})
						this.tabsList.push({
							name: "筛选",
							postType: null
						})
						this.categoryList = res.data.data
					},
					fail: (err) => {}
				});
			},
			selectTab(item, index) {
				if (item.name == "筛选") {
					this.$refs.drawer.open()
				} else {
					console.log(item)
					this.tabIndex = index
					this.postType = item.parentCode
					this.mescroll.resetUpScroll();
				}
			},
			selectCategory(item, index) {
				this.selectCategoryIndex = index
				this.postType = item.parentCode
				this.mescroll.resetUpScroll();
			},
			jump(item) {
				uni.navigateTo({
					// url: `../../grain/article?params=${JSON.stringify(item)}`
					url: `../../grain/article?id=`+item
				})
			},
			recharge() {
				if (this.selectCategoryIndex != null) {
					this.selectCategoryIndex = null
					this.$refs.drawer.close()
					this.postType = null
					this.mescroll.resetUpScroll();
				}
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
				this.request(page, Interface.url.findAllPostInfo)
			},
			request(page, url) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				// 第1种: 请求具体接口
				uni.request({
					url: url,
					method: "GET",
					data: {
						page: pageNum,
						size: pageSize,
						postType: this.postType
					},
					success: (res) => {
						console.log(res.data)
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
	.tabs {
		width: 100%;
		height: 88rpx;
		background-color: #e51c2e;
		color: rgba(255, 255, 255, .7);
	}

	.tab-hover {
		color: #fff;
	}

	.article-info {
		margin-top: 20rpx;
	}

	.category {
		width: 128rpx;
		line-height: 64rpx;
		background-color: #e5e5e5;
		color: #505050;
		margin-bottom: 20rpx;
	}

	.btns {
		position: absolute;
		bottom: 60rpx;
		width: 100%;

		.btn {
			width: 192rpx;
		}
	}

	.screened {
		background-color: #e51c2e !important;
		color: #fff !important;
	}
</style>
