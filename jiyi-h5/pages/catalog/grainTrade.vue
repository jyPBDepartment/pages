<template>
	<view class="service">
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :screenList="screenList" :condition="condition"></Screen>
		<view class="p-x-10">
			<view class="app-modular g-flex" @click="jump" v-for="(item, index) in 2" :key="index">
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
					<view class="g-flex g-j-s-b f-14 g-a-c">
						<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 40rpx;height:40rpx;"></image>
						<view class="word">
							小智慧
						</view>
						<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">
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
					"全部", "出售", "收割", "筛选"
				],
				screenList: [{
					title: '农作物类别',
					category: ["玉米", "水稻", "高粱", "水稻"]
				}]
			}
		},
		onLoad() {

		},
		methods: {
			search(e) {
				console.log(e)
			},
			jump(){
				uni.navigateTo({
					url:'../grain/space?index=0'
				})
			}

		}
	}
</script>

<style lang="scss">
	.app-modular {
		border-bottom: 1px solid rgba(229, 229, 229, 1);
	}

	.tagGrain {
		width: 140rpx;
		line-height: 40rpx;
		border-radius: 13rpx;
		border: 1px solid rgba(255, 87, 51, 1);
		color: rgba(255, 87, 51, 1);
		font-weight: bold;
		text-align: center;
	}

	.app-number-grain {
		color: #333;
		line-height: 60rpx;
	}

	.word {
		margin-left: -145rpx;
		font-size: 13rpx;
		font-weight: bold;
	}
</style>
