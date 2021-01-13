<template>
	<view>
		<view class="comm-list-item" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
			<image class="item-img" :src="item.url" mode=""></image>
			<view class="item-info">
				<view class="title">
					<text>{{ item.name }}</text>
					<view @click.stop="">
						<u-icon style="margin-right: 5rpx;z-index: 999;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="32"></u-icon>
					</view>
				</view>
				<view style="color: #9FA3A8;font-size: 24rpx;">{{ item.createDate }}</view>
				<view class="fun-btn"></view>
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
export default {
	components: {},
	data() {
		return {
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
		this.getPicList(this.page);
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.getPicList(this.page);
	},
	methods: {
		jump(val) {
			uni.navigateTo({
				url: '../grain/richText?id=' + val
			});
		},
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.getPicList(this.page);
		},
		getPicList(page) {
			let self = this;
			uni.request({
				url: Interface.url.findCasePage,
				method: 'GET',
				data: {
					name: '',
					page: page,
					size: 10,
					dipTypeCode: '',
					cropsTypeCode: ''
				},
				success: res => {
					if (res.data.state == 0) {
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
					
					self.status = 'nomore';
				},
				fail: err => {
					uni.showToast({
						title: '请求失败',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
