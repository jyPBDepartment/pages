<!-- 注：param==0为粮食收购-出售详情，param==1为出售农机-出售详情,param==2为出租农机-出售详情 -->
<template>
	<view>


		<view class="init">
			<image class="agri-img" src="@/static/logo.png" mode=""></image>

			<text v-if="param == 2 " class="sell-bg">
				出租
			</text>
			<text v-if="param == 2 " class="sell-title">{{title}}aaa</text>

			<view v-if="param == 2 " class="sell-cool">
				<image class="sell-img" src="@/static/logo.png" mode=""></image>
				<text class="sell-text">分享</text>
			</view>

			<text v-if="param == 0 || param ==1" class="title">{{title}}aaa</text>
			<text v-if="param == 0" class="price">¥{{price}}元/公斤</text>
			<text v-if="param == 1 " class="price">¥{{price}}55555.00</text>
			<text v-if="param == 2 " class="price">¥{{price}}元/亩</text>

			<view class="tag">
				<view class="tagGrain">
					{{item.brige}}aaa
				</view>
				<view class="tagG">
					{{item.brige}}aaa
				</view>
			</view>

			<view class="type">
				<text v-if="param == 0" class="type-text">类别：{{corn}}aaa</text>
				<text v-if="param == 1 || param == 2 " class="type-agri">型号：{{corn}}bbb</text>
				<text v-if="param == 1 || param == 2 " class="type-agri">货号：{{corn}}bbb</text>

				<text v-if="param == 0" class="type-map">{{address}}吉林省榆树市五棵松市</text>
				<text v-if="param == 1 || param == 2 " class="type-mapAgri">{{address}}长春公主岭</text>
			</view>
			<view class="tel">
				<text class="phone">
					电话：{{phone}}11111
				</text>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				param: {
					param: Number,
					default: 0
				},
				// param: 0,
				item: {
					type: Array,
					default: () => {
						return []
					}
				},
			};
		},
		onLoad(e) {
			this.param = e.index
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.init {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 24rpx;

		.sell-bg {
			border: 1px solid rgba(255, 0, 0, 1);
			background-color: rgba(255, 0, 0, 1);
			width: 70rpx;
			line-height: 40rpx;
			text-align: center;
			font-size: 24rpx;
			color: #FFF;
		}

		.sell-title {
			font-size: 30rpx;
			margin-bottom: 24rpx;
			margin-top: -45rpx;
			margin-left: 90rpx;
		}

		.sell-cool {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 650rpx;
			margin-top: -70rpx;

			.sell-img {
				width: 46rpx;
				height: 46rpx;
				background-color: #fff;
			}

			.sell-text {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);

			}
		}

		.title {
			font-size: 30rpx;
			margin-bottom: 24rpx;
		}

		.price {
			font-size: 42rpx;
			margin-bottom: 24rpx;
		}

		.tag {
			display: flex;
			flex-direction: row;
			align-items: center;

			.tagGrain {
				margin-right: 20rpx;
				width: 100rpx;
				border-radius: 16rpx;
				border: 1px solid rgba(255, 87, 51, 1);
				color: rgba(255, 87, 51, 1);
				text-align: center;
				font-size: 24rpx;
				margin-bottom: 36rpx;
			}

			.tagG {
				margin-right: 20rpx;
				width: 100rpx;
				border-radius: 16rpx;
				border: 1px solid rgba(24, 144, 255, 1);
				color: rgba(24, 144, 255, 1);
				text-align: center;
				font-size: 24rpx;
				margin-bottom: 36rpx;
			}
		}

		.type {
			display: flex;
			margin-bottom: 20rpx;

			.type-text {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
			}

			.type-agri {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				margin-right: 100rpx;
			}

			.type-map {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				margin-left: 300rpx;
			}

			.type-mapAgri {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
				margin-left: 80rpx;
			}
		}

		.tel {
			.phone {
				font-size: 24rpx;
				color: rgba(153, 153, 153, 1);
			}
		}

		.agri-img {
			margin-left: -89rpx;
			margin-bottom: -40rpx;
			width: 880rpx;
			height: 750rpx;
		}
	}
</style>
