<template>
	<view class="service">
		<!-- 列表数据显示 -->
		<!-- <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"> -->
			<view class="comm-list-item" @tap.stop="jump(item.id)" v-for="(item, index) in dataList" :key="index">
				<image class="item-img" :src="item.url" mode=""></image>
				<view class="item-info">
					<view class="title">
						<text>{{ item.name }}</text>
						<view @click.stop="">
							<u-icon style="margin-right: 5rpx;z-index: 999;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="32"></u-icon>
						</view>
					</view>
					<view v-if="item.address" class="address g-flex g-a-c" style="color: rgba(128, 128, 128, 1)">
						<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334898551200.png" color="#9FA3A8" size="24"></u-icon>
						{{ item.address }}
					</view>
					<view class="contactsUser">
						<view class="g-flex g-a-c">
							<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 28rpx;height:28rpx;margin-right: 20rpx;"></image>
							<view class="word">{{ item.contactsUser }}</view>
						</view>
						<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">{{ item.createDate }}</view>
					</view>
					<view class="fun-btn"></view>
				</view>
			</view>
		<!-- </mescroll-body> -->
		
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
	data() {
		return {
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
			noData: false
		};
	},
	created() {
		this.getGrainList(this.page)
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.getGrainList(this.page)
	},
	methods: {
		// 跳转详情页面
		jump(val) {
			uni.navigateTo({
				url: '../grain/space?id=' + val + '&isMain=0' + '&type=0'
			});
		},
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.getGrainList(this.page);
		},
		getGrainList(page) {
			let self = this
		
			// 第1种: 请求具体接口
			uni.request({
				url: Interface.url.findAgriInfo,
				method: 'GET',
				data: {
					type: 1,
					name: '',
					page: page,
					size: 10,
					transactionTypeCode: '',
					transactionCategoryCode: '',
					identityCode: '',
					address: ''
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
.service {
	overflow: hidden;
}
</style>
