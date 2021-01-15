<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen @screened="screened" @select="select" :screenList="screenList" :condition="condition"></Screen>
		<FilterCom @selectTab="selectTab"></FilterCom>

		<view class="comm-list-item" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
			<image class="item-img" :src="item.url" mode=""></image>
			<view class="item-info">
				<p class="title">{{ item.name }}</p>
				<view style="color: #9FA3A8;font-size: 24rpx;">{{ item.createDate }}</view>
				<view class="fun-btn">
					<view class="item">
						<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
						<text>{{ item.browseNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(item, 1, index)">
						<u-icon
							v-if="item.isUserCollection == 0"
							style="margin-right: 10rpx;"
							name="http://60.205.246.126/images/2021/01/11/1610334200305905.png"
							size="24"
						></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
						<text>{{ item.collectionNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(item, 2, index)">
						<u-icon v-if="item.isUserPraise == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" size="24"></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>
						<text>{{ item.praiseNum }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="no-data" v-if="noData">
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1"></image>
			<text>暂无数据</text>
		</view>
		<u-loadmore v-if="dataList.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore" />
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';
import Screen from '@/components/Screen/screen.vue';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		Screen,
		HeaderSearch
	},
	data() {
		return {
			condition: [
				{
					name: '全部',
					code: null
				}
			],
			screenList: [
				{
					title: '类别',
					category: []
				}
			],
			dipTypeCode: null,
			cropsTypeCode: null,
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的配置(可选, 绝大部分情况无需配置)
			downOption: {},
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
			dataList: [],
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '点我加载更多',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			page: 1,
			nomore: false,
			noData: false,
			sortIndex: 1,
			collection: false,
			thumbs: false,
			userId: localStorage.getItem('userId')
		};
	},
	onLoad() {
		uni.request({
			url: Interface.url.getDipList,
			method: 'GET',
			data: {},
			success: res => {
				if (res.data.state == 0) {
					let data = res.data.data.map(item => {
						item.code = item.id;
						return item;
					});
					this.screenList[0].category = data;
				}
			}
		});
		uni.request({
			url: Interface.url.getCaseList,
			method: 'GET',
			data: {},
			success: res => {
				if (res.data.state == 0) {
					let data = res.data.data.map(item => {
						item.code = item.id;
						return item;
					});
					data.forEach(item => this.condition.push(item));
				}
				this.condition.push({
					name: '筛选',
					code: null
				});
			}
		});
	},

	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.request();
	},
	onShow() {
		this.request(true);
	},
	methods: {
		clickIcon(item, val, i) {
			if (val == 1) {
				//收藏点击
				this.setCollection(item, i);
			}
			if (val == 2) {
				// 点赞
				this.setPraiseThumbs(item, i);
			}
		},
		selectTab(val) {
			this.sortIndex = val;
			this.downCallback();
		},
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				isCollection: item.isUserCollection ? 1 : 0,
				caseId: item.id,
				collectionUserId: this.userId
			};
			this.$ajax(Interface.url.caseInfoSaveCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserCollection == 1) {
							this.dataList[i].collectionNum = parseInt(this.dataList[i].collectionNum) - 1;
							this.dataList[i].isUserCollection = 0;
						} else {
							this.dataList[i].collectionNum = parseInt(this.dataList[i].collectionNum) + 1;
							this.dataList[i].isUserCollection = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.dataList.splice(0, 0);
					}
				})
				.catch(err => {});
		},
		// 点赞
		setPraiseThumbs(item, i) {
			let self = this;
			let params = {
				isFabulous: item.isUserPraise ? 1 : 0,
				caseId: item.id,
				praiseUserId: this.userId
			};
			this.$ajax(Interface.url.caseInfoSaveCasePraise, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserPraise == 1) {
							this.dataList[i].praiseNum = parseInt(this.dataList[i].praiseNum) - 1;
							this.dataList[i].isUserPraise = 0;
						} else {
							this.dataList[i].praiseNum = parseInt(this.dataList[i].praiseNum) + 1;
							this.dataList[i].isUserPraise = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.dataList.splice(0, 0);
					}
				})
				.catch(err => {});
		},

		removeSpaces(string) {
			return string.replace(/\s*/g, '');
		},
		// 跳转病虫害详情
		jump(val) {
			uni.navigateTo({
				url: '../grain/richText?id=' + val
			});
		},
		search(e) {
			this.searchName = this.removeSpaces(e);
			this.downCallback();
		},
		select(code, name) {
			this.cropsTypeCode = name;
			this.downCallback();
		},
		screened(code, name) {
			this.dipTypeCode = name;
			this.downCallback();
		},
		downCallback() {
			this.request(true);
		},

		request(action) {
			let self = this;
			if (action) {
				this.page = 1;
				this.dataList = [];
			}
			// 第1种: 请求具体接口
			let userId = localStorage.getItem('userId');
			uni.request({
				url: Interface.url.caseInfoFindCaseInfoList,
				method: 'GET',
				data: {
					name: this.searchName,
					page: this.page,
					size: 10,
					dipTypeCode: this.dipTypeCode,
					cropsTypeCode: this.cropsTypeCode,
					sort: this.sortIndex,
					userId: userId
				},
				success: res => {
					if (res.data.code == 200) {
						if (res.data.data.content.length < 10) {
							self.nomore = true;
							self.status = 'nomore';
							self.dataList = self.dataList.concat(res.data.data.content);
							if (self.dataList.length == 0) {
								self.noData = true;
							} else {
								self.noData = false;
							}
						} else {
							setTimeout(() => {
								self.nomore = false;
								self.status = 'loadmore';
								self.dataList = self.dataList.concat(res.data.data.content);
								if (self.dataList.length == 0) {
									self.noData = true;
								} else {
									self.noData = false;
								}
							}, 200);
						}
					}
				},
				fail: err => {
					// 请求失败,隐藏加载状态
					// this.mescroll.endErr();
				}
			});
		}
	}
};
</script>

<style lang="scss">
.find-disease-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin-top: 30rpx;
	.list-item-l {
		width: 345rpx;
		margin-bottom: 30rpx;
		margin-left: 20rpx;
		padding: 16rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		> image {
			width: 320rpx;
			height: 320rpx;
			border-radius: 8rpx;
		}
		p {
			width: 100%;
			height: 80rpx;
			line-height: 40rpx;
			text-align: left;
			padding: 10rpx 16rpx;
			box-sizing: border-box;
		}
	}
}
</style>
