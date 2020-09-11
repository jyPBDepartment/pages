<template>
	<view class="g-flex g-f-column">
		<HeaderSearch title="详情"></HeaderSearch>

		<swiper class="circul" indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item class="swiperItem">
					<image :src="item.url" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-10">
			<view class="g-flex g-a-c">
				<view class="title g-f-1 f-16" style="padding:0rpx;">
					{{agriName}}
				</view>
			</view>
			<view class="price" style="font-size: 42rpx;margin-top: 16rpx;">
				￥{{workPrice}}元/亩
			</view>
			<view class="info g-f-warp g-flex">
				<view class="g-flex">
					<view class="f-12" style="color: #999999;margin-top: 24rpx;">
					日期
					{{beginDate}}至{{endDate}}</view>
					<view class="count">共{{days}}天</view>
				</view>
			</view>
			<view class="info g-f-warp g-flex">
				<view class="g-flex">
					<view class="f-12" style="color: #999999;margin-top: 24rpx;">面积{{area}}</view>
				</view>
			</view>
			<view class="info g-f-warp g-flex">
				<view class="g-flex">
					<view class="f-12" style="color: #999999;margin-top: 24rpx;">地点{{workArea}}</view>
				</view>
			</view>
			<view class="info g-f-warp g-flex">
				<view class="g-flex">
					<view class="f-12" style="color: #999999;margin-top: 24rpx;"> 联系人{{contactUser}}</view>
					<view class="count">联系电话{{contactPhone}}</view>
				</view>
			</view>
		</view>
		<view class="btn g-flex">
			<view class="g-f-1">

			</view>
			<view class="g-f-1">
				<u-button class="btn" type="error" shape="circle" @click="call(contactPhone)" size="mini">联系商家</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import CancelReason from '../../components/CancelReason/CancelReason.vue'
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			CancelReason,
			HeaderSearch
		},
		data() {
			return {
				cencalIsShow: false,
				banner: [],
				workPrice: '',
				agriName:'',
				beginDate: '',
				endDate: '',
				days: '',
				area: '',
				workArea: '',
				contactUser: '',
				contactPhone: '',
				status:'',
				reason:'',
				id:'',
			}
		},
		onLoad(e) {
			this.farmWorkFindById(e.id);
		},
		methods: {
			farmWorkFindById(val){
				uni.request({
					method: "GET",
					data: {
						id: val
					},
					url: ApiPath.url.findFarmWorkById,
					success: (res) => {
						if (res.data.state == 0) {
							this.workPrice =res.data.data.workPrice;
							this.beginDate =res.data.data.beginDate;
							this.endDate =res.data.data.endDate;
							this.days =res.data.data.days;
							this.area =res.data.data.area;
							this.workArea =res.data.data.workArea;
							this.contactUser =res.data.data.contactUser;
							this.contactPhone =res.data.data.contactPhone;
							this.agriName=res.data.data.agriName;
							this.reason=res.data.data.reason;
							//查找图片
							for (var i = 0; i < res.data.dataFarmPic.length; i++) {
								this.banner.push({
									'url': res.data.dataFarmPic[i].picUrl
								})
							}
						}
					}
				})
			},
			cencal(e) {
				this.cencalIsShow = e
			},
			confirm(e) {
				console.log(e)
			},
			call(contactPhone) {
				uni.makePhoneCall({
					phoneNumber: contactPhone //仅为示例
				});
			},
		}

	}
</script>

<style lang="scss">
	.circul {
		width: 750rpx;
		height: 750rpx;
		margin-top: 20rpx;

		.swiperItem {
			width: 100%;
			height: 100%;

			.swiperImage {
				width: 750rpx;
				height: 750rpx;
			}
		}
	}

	.info {
		.count {
			color: #999999;
			margin: 24rpx 0rpx 0rpx 170rpx;
			font-size: 20rpx;
		}

		.text {
			min-width: 50%;
		}
	}

	.button {
		margin-top: 40rpx;
		width: 680rpx;
		border-radius: 40rpx;
		color: #fff;
	}

	.btn {
		width: 100%;

		view {
			padding: 20rpx;
		}
	}
</style>
