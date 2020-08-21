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
		<view>
			  <button round>立即预约 </button>
		</view>

	</view>
</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				banner: [],
				title:"水稻植保详情",
				price: "100",
				date: "2020-08-11 —— 2020-09-11",
				sum: "10",
				info: {
					area: '',
					workArea: '',
					contactUser: '',
					tel: ''
				},

			}
		},
		onLoad() {
			this.info = {
				area: '面积：100亩',
				workArea: '干活地点：长春农安101号',
				contactUser: '联系人：小植保',
				tel: '联系电话：12345678901'
			}
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
	button{
		margin-top: 40rpx;
		width: 680rpx;
		border-radius: 40rpx;
		background-color: rgba(229, 28, 46, 1);
		color: #fff;
	}
</style>
