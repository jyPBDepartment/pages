<template>
	<view>
		<!-- 列表数据显示 -->
		<view class="comm-list-item" @tap.stop="jump(item.id)" v-for="(item, index) in dataList" :key="index">
			<image class="item-img" :src="item.url" mode=""></image>
			<view class="item-info">
				<view class="title">
					<text>{{ item.name }}</text>
					<view @click.stop="cancelCollection(item)">
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
					<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">{{ item.updateDate ? formatTime(item.updateDate) : '' }}</view>
				</view>
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
		this.getGrainList(this.page);
	},
	methods: {
		getMoreList(){
			if (this.nomore) {
				return false;
			}
			this.status = 'loading';
			this.page = ++this.page;
			this.getGrainList();
		},
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
		
		cancelCollection(item) {
			let self = this;
			
			
			uni.showModal({
			    title: '提示',
			    content: '是否取消收藏',
				cancelText: '否',
				confirmText:'是',
			    success: function (res) {
			        if (res.confirm) {
			            let params = {
			            	action: 0,
			            	agrId: item.id,
			            	userId: getApp().globalData.userId
			            };
			            self.$ajax(Interface.url.grainTradingSetCollection, 'GET', params)
			            	.then(res => {
			            		if (res.code == 200) {
			            			self.dataList = [];
			            			self.getGrainList(1);
			            		}
			            	})
			            	.catch(err => {});
			        } 
			    }
			});
			
		},
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
		getGrainList() {
			let self = this;

			// 第1种: 请求具体接口
			uni.request({
				url: Interface.url.grainTradingFindMyCollection,
				method: 'GET',
				data: {
					userId: getApp().globalData.userId,
					page: this.page,
					size: 10
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
