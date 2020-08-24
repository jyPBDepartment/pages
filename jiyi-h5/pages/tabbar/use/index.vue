<template>
	<view class="containt">
		<HeaderSearch hideBack title="我的"></HeaderSearch>
		<view class="content">

			<view class="first  g-flex g-a-c">
				<u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" shape="circle" style="width: 132rpx;height: 132rpx;margin: 16rpx 0rpx 0rpx 0rpx;"></u-image>
				<view class="name g-f-1 f-16" style="font-weight: bold;margin-left: -250rpx;">
					小吉易
				</view>
				<view class="icon g-flex">
					<text class="f-16" style="margin-right:30rpx;">进入</text>
					<u-icon size="33" name="arrow-right" color="#999999" style="margin-right: 13rpx;  margin-top: 10rpx;" @click=""></u-icon>
				</view>
			</view>
			<view class="second">
				<view class="public g-flex g-a-c">

					<u-icon size="58" name="coupon" color="#999999" style="margin:10rpx 32rpx 0rpx 0rpx;"></u-icon>
					<text class="f-14" style="margin:0rpx 282rpx 0rpx 0rpx;"> 农机发布</text>
					<view class="tagg f-12" style="margin-left: 90rpx;margin-right:36rpx;font-weight: bold;">8</view>
					<u-icon size="33" name="arrow-right" color="#999999" style="margin-top: -4rpx;" @click=""></u-icon>
				</view>

				<view class="public g-flex g-a-c" v-for="item in public" :key="item">
					<u-icon size="58" name="coupon" color="#999999" style="margin:10rpx 32rpx 0rpx 0rpx;"></u-icon>
					<text class="f-14" style="margin:0rpx 282rpx 0rpx 0rpx;"> {{item.name}}</text>
					<view class="tag f-12" style="margin-left: 60rpx;margin-right:28rpx;font-weight: bold;">{{item.badge}}</view>
					<u-icon size="33" name="arrow-right" color="#999999" style="margin-top: -4rpx;" @click=""></u-icon>
				</view>

			</view>
			<view class="line">
				<u-line class="useLine"></u-line>
			</view>
			<view class="third">
				<view class="public g-flex g-a-c" v-for="item in mine" :key="item">
					<u-icon size="58" name="coupon" color="#999999" style="margin:10rpx 32rpx 0rpx 0rpx;"></u-icon>
					<text class="f-14" style="margin-left:0rpx;margin-right: 340rpx;"> {{item.name}}</text>
					<u-icon size="33" name="arrow-right" color="#999999" style="margin-top: -4rpx;" @click=""></u-icon>
				</view>
			</view>
			<view class="line">
				<u-line class="useLine"></u-line>
			</view>
		</view>
	</view>

</template>

<script>
	import HeaderSearch from '../../../components/HeaderSearch/HeaderSearch.vue'

	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				title: 'Hello',
				public: [{
						name: '粮食买卖',
						badge: 'New'
					},
					{
						name: '农服发布',
						badge: ''
					}
				],
				mine: [{
						name: '我预约的农服列表'
					},
					{
						name: '预约我的农服列表'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		margin-left: 28rpx;
		margin-right: 28rpx;

		.second {
			margin-top: 60rpx;

			.public {

				.tagg {
					width: 40rpx;
					line-height: 40rpx;
					background: #ff0000;
					color: #fff;
					text-align: center;
					border-radius: 80rpx;
				}

				.tag {
					width: 80rpx;
					line-height: 45rpx;
					background: #ff0000;
					color: #fff;
					text-align: center;
					border-radius: 80rpx;

				}
			}
		}

		.line {
			width: 750rpx;
			margin: 28rpx 0rpx 40rpx -30rpx;

			.useLine {
				color: #999999;
			}

		}


	}
</style>
