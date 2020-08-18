<template>
	<view>
		<HeaderSearch @searchCallback="search" title="水稻植保预约"></HeaderSearch>
	</view>
</template>

<script>
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
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
	.catalog {
		width: 72rpx;
		line-height: 72rpx;
		border-radius: 36rpx;
		position: fixed;
		right: 10rpx;
		top: 700rpx;
	}
</style>
