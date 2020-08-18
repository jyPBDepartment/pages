<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :screening="screening" :condition="condition" :type="1"></Screen>
		<view class="p-x-10 g-flex g-j-s-b g-f-row g-f-warp" style="margin-top: 30rpx;">
			<view style="width: 324rpx;" v-for="(item, index) in 10" :key="index">
				<image style="width: 324rpx;height: 304rpx;" src="../../static/logo.png" mode=""></image>
				<p class="f-14" style="line-height: 96rpx;">玉米枯纹病</p>
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
				condition: ["全部", "玉米", "水稻", "高粱", "黄豆"],
				screening: ["全部", "虫害", "草害", "病害"]
			}
		},
		methods: {
			search(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	
</style>
