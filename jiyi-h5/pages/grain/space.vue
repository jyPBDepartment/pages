<template>
	<view>

		<!-- <view v-if="!param" class=""> -->
		<view class="init">
			<image class="agri-img" src="@/static/logo.png" mode=""></image>
			<text class="title">{{title}}aaa</text>
			<text class="price">¥{{price}}元/公斤</text>
			<view class="tagGrain" v-for="(item, index) in item" :key="index">
				{{item.brige}}aaa
			</view>
			
			<view class="type">
				<text>类别：{{corn}}aaa</text>
			</view>
			<view class="two">
				<text>地址:{{address}}aaa</text>
				<view>
					<image class="icon" style="width: 50rpx;height: 50rpx;" src="@/static/logo.png" mode=""></image>
					<text>{{name}}aaa</text>
				</view>
			</view>
			<view class="tel">
				<text>
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
				param: 0,
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

		.title {
			font-size: 30rpx;
			
			margin-bottom: 24rpx;
		}

		.price {
			font-size: 42rpx;
			
			margin-bottom: 24rpx;
		}

		.tagGrain {
			display: flex;
			flex-direction: row;
			justify-content: center;
			width: 100rpx;
			border-radius: 16rpx;
			border: 1px solid rgba(255, 87, 51, 1);
			color: rgba(255, 87, 51, 1);			
			text-align: center;
			font-size: 24rpx;
			margin-bottom: 24rpx;
		}


		.agri-img {
			margin-left: -24rpx;
			width: 750rpx;
			height: 750rpx;
		}
	}

	
</style>
