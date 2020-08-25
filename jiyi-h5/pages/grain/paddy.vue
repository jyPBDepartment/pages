<template>
	<view class="g-flex g-f-column">
		<HeaderSearch title="水稻植保详情"></HeaderSearch>

		<swiper class="circul" indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
			<block v-for="item in 5" :key="item">
				<swiper-item class="swiperItem">
					<image src="@/static/logo.png" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-10">
			<view v-if="state == 3" class="tips f-12" style="color: #e51c2e;line-height: 60rpx;">
				商家取消理由：库存不足
			</view>
			<view class="g-flex g-a-c">

				<view class="title g-f-1 f-16" style="padding:0rpx;">
					{{title}}
				</view>

			</view>

			<view class="price" style="font-size: 42rpx;margin-top: 16rpx;">
				￥{{price}}元/亩
			</view>

			<view class="info g-f-warp g-flex">

				<view class="g-flex">

					<view class="f-12" style="color: #999999;margin-top: 24rpx;"> 日期 {{date}}</view>

					<view class="count">共{{sum}}天</view>
				</view>

				<view class="text g-f-1 f-12" style="color: #999999;margin-top: 24rpx;" v-for="item in info" :key="item">
					{{item}}
				</view>

			</view>


		</view>

		<view class="p-10" v-if="state == null">
			<u-button type="error" shape="circle">立即预约</u-button>
		</view>
		<view class="btn g-flex">
			<view class="g-f-1">

			</view>
			<view class="g-f-1">
				<u-button v-if="state == 0" @click="cencal(true)" shape="circle">取消</u-button>
				<u-button v-if="state == 1 || state == 2" type="error" shape="circle">联系商家</u-button>
				<u-button v-if="state == 3" type="error" shape="circle">重新预约</u-button>
			</view>
		</view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
	</view>
</template>

<script>
	import CancelReason from '../../components/CancelReason/CancelReason.vue'
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			CancelReason,
			HeaderSearch
		},
		data() {
			return {
				cencalIsShow: false,
				banner: [],
				title: "水稻植保详情",
				price: "100",
				date: "2020-08-11 —— 2020-09-11",
				sum: "10",
				info: {
					area: '',
					workArea: '',
					contactUser: '',
					tel: ''
				},
				state: null

			}
		},
		onLoad(e) {
			if (e.state !== null) {
				this.state = e.state
			}
			this.info = {
				area: '面积：100亩',
				workArea: '干活地点：长春农安101号',
				contactUser: '联系人：小植保',
				tel: '联系电话：12345678901'
			}
		},
		methods: {
			cencal(e) {
				this.cencalIsShow = e
			},
			confirm(e) {
				console.log(e)
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
