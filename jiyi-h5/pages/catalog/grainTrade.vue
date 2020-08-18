<template>
	<view class="service">
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :condition="condition"></Screen>
		<view class="p-x-10">
			<view class="app-modular g-flex" v-for="(item, index) in 2" :key="index">
				<image class="app-img" src="@/static/logo.png" mode=""></image>
				<view class="app-info g-f-1">
					<p class="title f-14">收购玉米价格0.65-0.71之间</p>
					<view class="g-flex f-12 g-a-c" style="color: rgba(128, 128, 128, 1)">
						<u-icon style="margin-right: 5rpx;" name="map-fill" color="#A6A6A6" size="36"></u-icon>
						长春市·榆树市·黑林镇
					</view>
					<view class="g-flex g-j-s-b f-12 tags">
						<view class="tagGrain">信誉商家</view>
					</view>
					<view class="bottom">
						<view class="img-col">
							<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 40rpx;height:40rpx;"></image>
						</view>
						<view class="word">
							<text >小智慧</text>
						</view>
						<view class="date">
							2030-05-12
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			Screen,
			HeaderSearch,
		},
		data() {
			return {
				condition: [
					"综合", "次数", "信用", "筛选"
				]
			}
		},
		onLoad() {

		},
		methods: {
			search(e) {
				console.log(e)
			},

		}
	}
</script>

<style lang="scss">
	.tagGrain {	
		
		width: 140rpx;
		line-height: 40rpx;
		border-radius: 13rpx;
		border: 1px solid rgba(255, 87, 51, 1);
		color: rgba(255, 87, 51, 1);
		font-weight: bold;
		text-align: center;
		
	}
	.bottom{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		align-items: center;
		.img-col{
			margin-top: 10rpx;
		}
		.word{
			line-height: 35rpx;
			margin-left: -145rpx;
			font-size: 24rpx;
			
		}
		.date{
			color: rgba(128, 128, 128, 1);
			font-size: 12px;
		}
		
	}
	
	
</style>
