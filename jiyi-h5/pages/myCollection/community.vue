<template>
	<view>
		<view class="list-container-s" @click.stop="jump(item)" v-for="(item, index) in dataList" :key="index">
			<!-- 圈子 -->
			<view class="title">
				<text>{{ item.name }}</text>
				<view @click.stop="cancelCollection(item)">
					<u-icon style="margin-right: 5rpx;z-index: 999;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="32"></u-icon>
				</view>
			</view>
			<view class="content">
				<view class="header">
					<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
					<text class="users">{{ item.isAnonymous ? '匿名' : item.createUser ? item.createUser : '匿名' }}</text>
					<text class="times">{{ item.createDate ? formatTime(item.createDate) : '' }}</text>
				</view>
				<view class="paragraph"><rich-text :nodes="item.code"></rich-text></view>
				<view class="pictues-group"><image v-for="(items, i) in url" class="preview-img" :src="items.imgUrl" :key="i"></image></view>
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
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
import Interface from '@/api/ApiPath.js';

export default {
	components: {
		easyLoadimage
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
			content: `1111111111`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			scrollTop: 0,
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
			noData: false
		};
	},
	created() {
		this.getCommunitList();
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
		getMoreList() {
			if (this.nomore) {
				return false;
			}
			this.status = 'loading';
			this.page = ++this.page;
			this.getCommunitList();
		},
		jump(item) {
			uni.navigateTo({
				url: `../community/communityDetails?id=` + item.id
			});
		},
		getCommunitList() {
			let self = this;
			if(this.page == 1){
				this.dataList = []
			}

			// 第1种: 请求具体接口
			uni.request({
				url: Interface.url.postInfoPostByUserId,
				method: 'GET',
				data: {
					userId: getApp().globalData.userId,
					page: this.page,
					size: 10
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
					uni.showToast({
						title: '请求失败',
						duration: 2000
					});
				}
			});
		},
		// 收藏
		cancelCollection(item) {
			let self = this;
			let params = {
				isCancelCollection: 1,
				circleId: item.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(Interface.url.postInfoPostCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						this.page = 1;
						this.getCommunitList();
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.list-container-s {
	background: #ffffff;
	.title {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #000000;
		padding: 0 40rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
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
