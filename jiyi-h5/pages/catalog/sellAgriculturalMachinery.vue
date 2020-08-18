<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen :condition="condition" :type="2"></Screen>
		<view class="p-x-10">
			<view class="commodity" style="width: 340rpx;">
				<image style="width: 316rpx;height: 298rpx;margin: 12rpx;" src="../../static/logo.png" mode=""></image>
				<p style="height: 94rpx;line-height: 47rpx;" class="f-14 o-e">商品描述，最多两行，超出部分用商品描述，最多两行，超出部分用商品描述，最多两行，超出部分用...</p>
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
				condition: ["全部", "购买", "出售", "租赁"]
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
