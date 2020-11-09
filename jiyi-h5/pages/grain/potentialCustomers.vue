<template>
	<view class="g-flex g-f-column">
		<HeaderSearch background="#e51c2e" color="#fff" title="详情"></HeaderSearch>
		<swiper class="circul" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
			<block v-for="(item, index) in banner" :key="index">
				<swiper-item class="swiperItem"><image :src="item.imgurl" mode="aspectFill" class="swiperImage"></image></swiper-item>
			</block>
		</swiper>
		<view class="p-x-10 b-t">
			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">干活时间</view>
				<view class="info g-f-1 f-12" style="position: relative">{{ farmwork.beginDate }}至{{ farmwork.beginDate }}</view>
			</view>

			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">面积</view>
				<view class="info g-f-1 f-12" style="position: relative">{{ farmwork.area }}亩</view>
			</view>

			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">干活地点</view>
				<view class="info g-f-1 f-12" style="position: relative">{{ farmwork.workArea }}</view>
			</view>
			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">农活价格</view>
				<view class="info g-f-1 f-12" style="position: relative">{{ farmwork.workPrice }}元</view>
			</view>
			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">联系人</view>
				<view class="info g-f-1 f-14" style="position: relative">{{ farmwork.contactUser }}</view>
			</view>
			<view class="item-g g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx">联系电话</view>
				<view class="info g-f-1 f-12" style="position: relative">{{ farmwork.contactPhone }}</view>
			</view>
			<view class="btn g-flex" v-if="isShow == '0'">
				<view class="g-f-1"></view>
				<view class="g-f-1"><u-button type="error" shape="circle" @click="confirmBtn">确认</u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			cencalIsShow: false,
			sexShow: false,
			map: '',
			value: '',
			banner: [],
			title: '水稻植保详情',
			farmwork: [],
			isShow: 0
		};
	},
	onLoad(e) {
		this.isShow = e.index;
		this.loadPotentialCustomer(e.id);
		this.id = e.id;
	},
	methods: {
		loadPotentialCustomer(val) {
			uni.request({
				method: 'GET',
				data: {
					id: val
				},
				url: ApiPath.url.findFarmWorkById,
				success: res => {
					if (res.data.state == 0) {
						this.farmwork = res.data.data;

						//查找图片
						for (var i = 0; i < res.data.dataFarmPic.length; i++) {
							this.banner.push({
								imgurl: res.data.dataFarmPic[i].picUrl
							});
						}
					}
				}
			});
		},
		confirmBtn() {
			let param = {
				id: this.id,
				status: this.status
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.userUpdateStatus,
				success: res => {
					if (res.data.state == 0) {
						uni.showToast({
							title: '确认成功'
						});
						//确认跳转
						uni.navigateTo({
							url: '../catalog/potentialCustomers'
						});
					}
				}
			});
		},
		cencal(e) {
			this.cencalIsShow = e;
		},
		confirm(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
.item-g {
	border-bottom: 2upx solid $comm-border-color;
}
.circul {
	width: 750rpx;
	height: 750rpx;

	.swiperItem {
		width: 100%;
		height: 100%;

		.swiperImage {
			width: 750rpx;
			height: 750rpx;
		}
	}
}

.title {
	width: 90rpx;
	color: #505050;
}

.img {
	width: 100%;
	height: 320rpx;
	background: #d9d9d9;

	image {
		width: 100rpx;
		height: 100rpx;
	}
}

.tag {
	width: 118rpx;
	height: 38rpx;
	border: 1px solid #7948ea;
	color: #7948ea;
	border-radius: 10rpx;
}

.input-icon {
	position: absolute;
	right: 10rpx;
	z-index: 9;
	top: 14rpx;
}

.btn {
	view {
		padding: 20rpx;
	}
}
</style>
