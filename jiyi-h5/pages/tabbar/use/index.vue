<template>
	<view class="containt">
		<HeaderSearch hideBack title="我的"></HeaderSearch>
		<view class="content">
			<!-- 顶部 -->
			<!-- <view class="first g-flex g-a-c"> -->
			<!-- <u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" shape="circle" style="width: 132rpx;height: 132rpx;margin: 16rpx 0rpx 0rpx 0rpx;"></u-image> -->
			<!-- <view class="name g-f-1 f-16">
					{{nc}}
				</view> -->
			<!-- <view class="icon g-flex">
					<text class="text1 f-16">进入</text>
					<u-icon size="33" name="arrow-right" class="icon1" @click=""></u-icon>
				</view> -->
			<!-- </view> -->
			<!-- 下划线 -->
			<!-- <view class="line">
				<u-line></u-line>
			</view> -->

			<!-- 我的发布 -->
			<view class="second">

				<view class="lineContent">
					<!-- 	<u-line></u-line> -->
				</view>

				<!-- 农机发布 -->
				<view class="public g-flex g-a-c" @click="jump('../../catalog/agriculturalMachinery?index=0')">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/09/14/1600053715235457.png" class="icon2"></u-icon>
					<text class="text2 f-14"> 农机发布</text>
					<view class="tagg f-12"></view>
					<u-icon size="33" name="arrow-right" class="icon3" @click=""></u-icon>
				</view>

				<!-- 下划线 -->
				<view class="lineContentDown">
					<u-line></u-line>
				</view>

				<!-- 粮食买卖 -->
				<view class="public g-flex g-a-c" @click="jump('../../catalog/agriculturalMachinery?index=1')">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/09/14/1600053671176961.png" class="icon2"></u-icon>
					<text class="text2 f-14"> 粮食买卖</text>
					<view class="tag f-12"></view>
					<u-icon size="33" name="arrow-right" class="icon3" @click=""></u-icon>
				</view>

				<!-- 下划线 -->
				<view class="lineContentDown">
					<u-line></u-line>
				</view>

				<!-- 农服发布 -->
				<view class="public g-flex g-a-c" @click="jump('../../catalog/agriculturalMachinery?index=2')">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/09/14/1600053738955201.png" class="icon2"></u-icon>
					<text class="text2 f-14"> 农服发布</text>
					<view class="tag f-12"></view>
					<u-icon size="33" name="arrow-right" class="icon3" @click=""></u-icon>
				</view>

				<!-- 下划线 -->
				<view class="lineContentDown">
					<u-line></u-line>
				</view>

			</view>

			<!-- 我的预约 -->
			<view class="third">
				<!-- 下划线 -->
				<view class="linea">
					<!-- <u-line></u-line> -->
				</view>

				<!-- 我的预约 -->
				<view class="public g-flex g-a-c" @click="jump('../../catalog/myAppointment')">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/09/14/1600053773729596.png" class="icon4"></u-icon>
					<text class="text3 f-14"> 我的预约</text>

					<u-icon size="33" name="arrow-right" class="icon5" @click=""></u-icon>
				</view>
				<!-- 下划线 -->
				<view class="lineContentDown">
					<u-line></u-line>
				</view>
				<!-- 下划线 -->
				<!-- <view class="lineb">
					<u-line></u-line>
				</view> -->

				<!-- 意向用户 -->
				<view class="public g-flex g-a-c" @click="jump('../../catalog/potentialCustomers')">
					<u-icon size="58" name="http://60.205.246.126:8001/images/2020/09/14/1600053791065559.png" class="icon4"></u-icon>
					<text class="text3 f-14"> 意向用户</text>

					<u-icon size="33" name="arrow-right" class="icon5" @click=""></u-icon>
				</view>

				<!-- 下划线 -->
				<view class="lineb">
					<u-line></u-line>
				</view>
				<!-- <view>
					<u-button @click="concat">联系客服</u-button>
				</view> -->
			</view>

		</view>
	</view>

</template>

<script>
	import HeaderSearch from '../../../components/HeaderSearch/HeaderSearch.vue'
	import Interface from '@/api/ApiPath.js'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				nc: Interface.common.nc
			}
		},
		onLoad() {

		},
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			concat() {
				uni.navigateTo({
					url: "../../window/index/index?userId=123456"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		margin: 0rpx 28rpx 0rpx 28rpx;

		.first {
			.name {
				font-weight: bold;
				margin-left: -380rpx;
				margin-top: 20rpx;
			}

			.icon {
				.text1 {
					margin-right: 30rpx;
				}

				.icon1 {
					margin: 10rpx 13rpx 0rpx 0rpx;
					color: #999999
				}
			}
		}

		.second {
			margin-top: 60rpx;

			.lineContent {
				width: 750rpx;
				border: 0px solid #f0f0f0;
				// background-color: #f0f0f0;
				margin: -20rpx 0rpx 10rpx -30rpx;
			}

			.public {
				margin-top: 10rpx;

				.icon2 {
					color: #999999;
					margin: 0rpx 32rpx 0rpx 0rpx;
				}

				.text2 {
					margin: 0rpx 282rpx 0rpx 0rpx;
				}

				.tagg {
					width: 40rpx;
					line-height: 40rpx;
					background: #ff0000;
					color: #fff;
					text-align: center;
					border-radius: 80rpx;
					margin: 8rpx 36rpx 0rpx 90rpx;
					font-weight: bold;
				}

				.icon3 {
					color: #999999;
					margin-top: 8rpx;
				}

				.tag {
					width: 80rpx;
					line-height: 45rpx;
					background: #ff0000;
					color: #fff;
					text-align: center;
					border-radius: 80rpx;
					margin: 8rpx 28rpx 0rpx 60rpx;
					font-weight: bold;
				}
			}
		}

		.third {
			.public {
				.icon4 {
					color: #999999;
					margin: 10rpx 32rpx 0rpx 0rpx;
				}

				.text3 {
					margin: 10rpx 450rpx 0rpx 0rpx;
				}

				.icon5 {
					color: #999999;
					margin-top: 10rpx;
				}
			}
		}

		.line {
			width: 750rpx;
			border: 0px solid #f0f0f0;

			margin: 16rpx 0rpx 40rpx -30rpx;
		}

		.lineContentDown {
			width: 750rpx;
			border: 0px solid #f0f0f0;

			margin: 16rpx 0rpx 10rpx -30rpx;
		}

		.linea {
			width: 750rpx;
			border: 0px solid #f0f0f0;

			margin: 50rpx 0rpx 0rpx -30rpx;
		}

		.lineb {
			width: 750rpx;
			border: 0px solid #f0f0f0;

			margin: 16rpx 0rpx 0rpx -30rpx;
		}
	}
</style>
