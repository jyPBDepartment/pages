<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :condition="condition"></Screen>
		<view class="p-x-10  g-flex g-f-warp g-f-row g-j-s-b" style="margin:20rpx 0">
			<view class="commodity b-f" style="width: 316rpx;padding: 12rpx; margin-bottom: 20rpx;" v-for="(item, index) in 3" :key="index">
				<image style="width: 316rpx;height: 298rpx;" src="../../static/logo.png" mode=""></image>
				<p style="height: 94rpx;line-height: 47rpx;" class="f-14 o-e">现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机</p>
				<view class="info g-flex g-a-c f-12" style="margin-top: 24rpx; margin-bottom: 15rpx;" >
					<view class="f-14 g-f-1" style="color: #1e1e1e;">￥1500/公顷</view>
					<view style="color: #e51c2e;" v-if="index == 0">正在出租</view>
					<view style="color: #999999;" v-else>未出租</view>
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
			HeaderSearch
		},
		data() {
			return {
				condition: ["综合", "正在出租", "未出租", "筛选"]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background: rgba(229, 229, 229, 1);
	}
</style>
