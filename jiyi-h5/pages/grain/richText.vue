<template>
	<view>
		<HeaderSearch @searchCallback="search" title="玉米枯纹病"></HeaderSearch>
		<view class="p-x-10" style="margin-top: 30rpx;">
			<view v-html="demoHtml"></view>
		</view>
		<view class="catalog t-c f-14 shadow" @click="isShow">目录</view>
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:30rpx;">
				<view class="uni-title">抽屉式导航</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			uniDrawer,
			HeaderSearch
		},
		data() {
			return {
				demoHtml: ''
			}
		},
		onLoad() {
			this.demoHtml = '这里是富文本解析得内容'
		},
		methods: {
			search(e) {
				console.log(e)
			},
			isShow() {
				this.$refs.drawer.open()
			}
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
