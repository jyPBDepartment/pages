<template>
	<view>
		<HeaderSearch title="圈子" @searchCallback="search"></HeaderSearch>
		<view class="tabs g-flex g-j-s-a g-a-c f-14">
			<view @click="selectTab(item, index)" :class="index == tabIndex && 'tab-hover'" v-for="(item, index) in tabsList" :key="index">{{ item.name }}</view>
		</view>
		<FilterCom @selectTab="selectTabCom"></FilterCom>

		<view class="list-container-s" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
			<view class="title">{{ item.name }}</view>
			<view class="content">
				<view class="header">
					<image class="image" :src=" item.header || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
					<text class="users">{{ item.nickName || '匿名' }}</text>
					<text class="times">{{ item.updateDate ? formatTime(item.updateDate) : '' }}</text>
				</view>
				<view class="paragraph">
					<p>{{ item.code }}</p>
				</view>
				<view class="pictues-group"><image v-for="(item, i) in url" class="preview-img" :src="item.imgUrl" :key="i"></image></view>
				<view class="fun-btn">
					<view class="item">
						<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
						<text>{{ item.pageview }}</text>
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

		<uni-drawer ref="drawer" mode="right" :width="300" :visible="true">
			<view style="padding: 20rpx">
				<view class="f-16" style="line-height: 52rpx; margin-bottom: 20rpx">筛选类别</view>
				<view class="comm-drawer-categorys b-t">
					<view
						:class="index == selectCategoryIndex && tabIndex == 4 && 'screened'"
						class="item"
						@click="selectCategory(item, index)"
						v-for="(item, index) in categoryList"
						:key="index"
					>
						{{ item.name }}
					</view>
				</view>
			</view>
			<view class="drawer-bottom-btn">
				<u-button class="btn" shape="circle" size="medium" @click="recharge" plain>重置</u-button>
				<u-button class="btn" shape="circle" size="medium" @tap="searchData" type="error">确认</u-button>
			</view>
		</uni-drawer>
		<u-mask :show="show" :mask-click-able="maskAble"></u-mask>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import CommunityInfo from '../../../components/CommunityInfo/CommunityInfo.vue';
import CommunityItem from '../../../components/CommunityInfo/CommunityItem.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		uniDrawer,
		CommunityInfo,
		CommunityItem
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
	data() {
		return {
			url: [
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346336119875.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346150825084.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346862930577.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346862930577.png'
				}
			],
			tabIndex: 0,
			tabsList: [],
			categoryList: [],
			selectCategoryIndex: null,
			postType: null,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			scrollTop: 0,
			// 列表数据
			dataList: [],
			show: true,
			maskAble: false,

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
			sortIndex: 1
		};
	},
	watch: {
		selectCategoryIndex(newValue) {
			if (newValue != null) {
				this.tabIndex = this.tabsList.findIndex(item => item.name == '筛选');
			} else {
				this.tabIndex = 0;
			}
		}
	},
	onLoad() {
		// 初始化帖子类型信息
		this.initPostType();
	},
	methods: {
		formatTime(datetime) {
			var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear(),
				month = ('0' + (date.getMonth() + 1)).slice(-2),
				sdate = ('0' + date.getDate()).slice(-2),
				hour = ('0' + date.getHours()).slice(-2),
				minute = ('0' + date.getMinutes()).slice(-2),
				second = ('0' + date.getSeconds()).slice(-2);
			// 拼接
			var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute;
			// 返回
			return result;
		},
		selectTabCom(val){
			this.sortIndex = val
			this.downCallback();
		},
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
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				isCancelCollection: item.isUserCollection ? 1 : 0,
				circleId: item.id,
				userId: '20200909'
			};
			this.$ajax(Interface.url.postInfoPostCollection, 'GET', params)
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
							title: res.msg,
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
				isCancelThumbs: item.isUserPraise ? 1 : 0,
				circleId: item.id,
				thumbsUserId: '20200909'
			};
			this.$ajax(Interface.url.postInfoPostThumbs, 'GET', params)
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
							title: res.msg,
							icon: 'none'
						});
						this.dataList.splice(0, 0);
					}
				})
				.catch(err => {});
		},
		selectTab(val) {
			console.log(val);
			this.sortIndex = val;
			this.downCallback();
		},
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.request();
		},
		searchData() {
			this.request({ num: 1, size: 10 }, Interface.url.findAllPostInfo);
			this.$refs.drawer.close();
		},
		initPostType() {
			uni.request({
				url: Interface.url.getPostType,
				method: 'GET',
				data: {},
				success: res => {
					if (res.data.state == 0) {
						this.tabsList.push({
							name: '全部',
							postType: null
						});
						res.data.data.forEach((item, index) => {
							if (index <= 2) {
								this.tabsList.push(item);
							}
						});
						this.tabsList.push({
							name: '筛选',
							postType: null
						});
						this.categoryList = res.data.data;
					}

					this.show = false;
				},
				fail: err => {
					this.show = false;
				}
			});
		},
		selectTab(item, index) {
			if (item.name == '筛选') {
				this.$refs.drawer.open();
			} else {
				this.tabIndex = index;
				this.postType = item.code;
				this.request(true);
			}
		},
		selectCategory(item, index) {
			console.log(1111, item);
			this.selectCategoryIndex = index;
			this.postType = item.code;
			this.request(true);
		},
		jump(id) {
			uni.navigateTo({
				url: `../../community/communityDetails?id=` + id
			});
		},
		recharge() {
			if (this.selectCategoryIndex != null) {
				this.selectCategoryIndex = null;
				this.$refs.drawer.close();
				// this.postType = null;
				this.request(true);
			}
		},
		request(action) {
			let self = this;
			if (action) {
				this.page = 1;
				this.dataList = [];
			}
			// 第1种: 请求具体接口
			uni.request({
				url: Interface.url.postInfoFindPostInfoList,
				method: 'GET',
				data: {
					page: this.page,
					size: 10,
					// postType: this.postType,
					parentCode: this.postType,
					sort: 1,
					userId: getApp().globalData.userId
				},
				success: res => {
					console.log(res.data.data);
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
					this.show = false;
				},
				fail: err => {
					this.show = false;
					// 请求失败,隐藏加载状态
				}
			});
		}
	}
};
</script>

<style lang="scss">
.tabs {
	width: 100%;
	height: 88rpx;
	// background-color: #e51c2e;
	color: #000;
}

.tab-hover {
	color: #e51c2e;
}

.screened {
	background-color: #e51c2e !important;
	color: #fff !important;
}

.list-container-s {
	background: #ffffff;
	.title {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #000000;
		padding: 0 40rpx;
		font-weight: 600;
	}
	.content {
		margin-bottom: 20rpx;
		.header {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 40rpx;
			.image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 24rpx;
			}
			.users {
				flex: 1;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
			.times {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
		}
		.paragraph {
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			padding: 0rpx 40rpx 20rpx 40rpx;
		}
		.pictues-group {
			padding: 0 20rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: start;
			.preview-img {
				height: 220rpx;
				width: 220rpx;
				margin: 0rpx 0 15rpx 15rpx;
				border-radius: 10rpx;
			}
		}
		.fun-btn {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
			color: #9fa3a8;
			opacity: 1;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 40rpx;
			.item {
				display: flex;
				align-items: center;
				height: 30rpx;
			}
		}
	}
}
</style>
