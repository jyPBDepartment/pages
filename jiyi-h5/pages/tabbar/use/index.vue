<template>
	<view class="my-container">
		<HeaderSearch hideBack title="我的"></HeaderSearch>
		<view class="content">
			<view class="content-box">
				<u-line color="#e5e5e5"></u-line>
				<!-- 农机发布 -->
				<view class="public" @click="jump('../../catalog/agriculturalMachinery?index=0')">
					<u-icon size="58" name="http://60.205.246.126/images/2020/09/14/1600053715235457.png" class="item-icon"></u-icon>
					<text class="title-name f-14">农机发布</text>
					<u-icon size="33" name="arrow-right" class="arrow-icon" @click=""></u-icon>
				</view>
				<u-line color="#e5e5e5"></u-line>
				<!-- 粮食买卖 -->
				<view class="public" @click="jump('../../catalog/agriculturalMachinery?index=1')">
					<u-icon size="58" name="http://60.205.246.126/images/2020/09/14/1600053671176961.png" class="item-icon"></u-icon>
					<text class="title-name f-14">粮食买卖</text>
					<u-icon size="33" name="arrow-right" class="arrow-icon" @click=""></u-icon>
				</view>
				<u-line color="#e5e5e5"></u-line>

				<!-- 农服发布 -->
				<view class="public" @click="jump('../../catalog/agriculturalMachinery?index=2')">
					<u-icon size="58" name="http://60.205.246.126/images/2020/09/14/1600053738955201.png" class="item-icon"></u-icon>
					<text class="title-name">农服发布</text>
					<u-icon size="33" name="arrow-right" class="arrow-icon" @click=""></u-icon>
				</view>
				<u-line color="#e5e5e5"></u-line>
			</view>

			<!-- 我的预约 -->
			<view class="content-box">
				<u-line color="#e5e5e5"></u-line>
				<!-- 我的预约 -->
				<view class="public" @click="jump('../../catalog/myAppointment')">
					<u-icon size="58" name="http://60.205.246.126/images/2020/09/14/1600053773729596.png" class="item-icon"></u-icon>
					<text class="title-name">我的预约</text>
					<u-icon size="33" name="arrow-right" class="arrow-icon" @click=""></u-icon>
				</view>

				<u-line color="#e5e5e5"></u-line>

				<!-- 意向用户 -->
				<view class="public" @click="jump('../../catalog/potentialCustomers')">
					<u-icon size="58" name="http://60.205.246.126/images/2020/09/14/1600053791065559.png" class="item-icon"></u-icon>
					<text class="title-name">意向用户</text>
					<u-icon size="33" name="arrow-right" class="arrow-icon" @click=""></u-icon>
				</view>

				<u-line color="#e5e5e5"></u-line>
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
			nc: Interface.common.nc
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
	background: #f4f4f4;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
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
			padding: 10rpx 24rpx;
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
