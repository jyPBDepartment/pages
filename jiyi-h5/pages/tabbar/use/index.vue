<template>
	<view class="my-container">
		<!-- <HeaderSearch hideBack title="我的"></HeaderSearch> -->
		<view class="header-info">
			<image class="image" :src="pic" mode=""></image>
			<text>{{ nickName }}</text>
		</view>
		<view class="my-items">
			<view class="item" @click="jump('../../catalog/agriculturalMachinery?index=0')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350638208923.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">农机发布</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>
			<view class="item" @click="jump('../../catalog/agriculturalMachinery?index=1')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350691155054.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">粮食买卖</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>

			<view class="item" @click="jump('../../catalog/agriculturalMachinery?index=2')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350739722880.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">农服发布</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>
			<view class="item" @click="jump('../../myCollection/myCollection')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350759440345.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">我的收藏</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>
			<view class="item" @click="jump('../../catalog/myAppointment')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350781201538.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">我的预约</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>
			<view class="item" @click="jump('../../catalog/potentialCustomers')">
				<view class="image-box">
					<u-icon name="http://60.205.246.126/images/2021/01/11/1610350806505907.png" style="margin-right: 10rpx;" color="#000000" size="44"></u-icon>
				</view>
				<text class="title-name">意向用户</text>
				<u-icon size="33" name="arrow-right" class="arrow-icon"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '../../../components/HeaderSearch/HeaderSearch.vue';
import Interface from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			nc: Interface.common.nc,
			nickName: getApp().globalData.nickName,
			pic: getApp().globalData.pic
		};
	},
	onLoad() {},
	methods: {
		jump(url) {
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="scss">
.my-container {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	.header-info {
		height: 400rpx;
		position: relative;
		width: 100%;
		z-index: -1;
		background: url(../../../static/img/my-bg.jpg);
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.image {
			width: 174rpx;
			height: 174rpx;
			margin-bottom: 20rpx;
		}
	}

	.my-items {
		position: absolute;
		top: 350rpx;
		left: 0;
		right: 0;
		background: #ffffff;
		border-radius: 30rpx 30rpx 0 0;
		z-index: 1;
		padding: 48rpx 0 100rpx 0;
		.item {
			width: 686rpx;
			height: 108rpx;
			background: #ffffff;
			border: 1rpx solid #dbdbdb;
			opacity: 1;
			border-radius: 24rpx;
			display: flex;
			align-items: center;
			margin: 0 auto 30rpx auto;
			padding: 0 20rpx;
			.image-box {
				width: 72rpx;
				height: 72rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #edf4fe;
				border-radius: 24rpx;
			}
			.title-name {
				flex: 1;
				text-align: left;
				padding-left: 24rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #000000;
				opacity: 1;
			}
			.arrow-icon {
				color: #c2c4ca;
				margin-top: 8rpx;
			}
		}
	}

	.content {
		text-align: center;
		padding: 0rpx 24rpx;
		position: relative;
		left: 0;
		right: 0;
		.content-box {
			box-sizing: border-box;
			margin-top: 24rpx;
			background: #fff;
			padding: 20rpx 24rpx 30rpx 24rpx;
			width: 100%;
			box-sizing: border-box;
			border-radius: 10rpx;
			box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.12), 0 0 12rpx rgba(0, 0, 0, 0.04);
			.public {
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				padding: 10rpx 0;
				.item-icon {
					color: #999999;
					margin: 0rpx 32rpx 0rpx 0rpx;
				}
				.title-name {
					flex: 1;
					text-align: left;
					padding-left: 24rpx;
					font-size: 28rpx;
					color: #333;
				}

				.arrow-icon {
					color: #999999;
					margin-top: 8rpx;
				}
			}
		}
	}
}
</style>
