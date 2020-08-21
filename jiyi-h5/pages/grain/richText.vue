<template>
	<view>
		<HeaderSearch @searchCallback="search" title="玉米枯纹病"></HeaderSearch>
		<view class="p-x-10" style="margin-top: 30rpx;">
			<view v-html="demoHtml"></view>
		</view>
		<view class="catalog t-c f-14 shadow" @click="isShow">目录</view>
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view class="title f-12" style="line-height: 36rpx;padding: 10rpx;">
				目录
			</view>
			<view class="f-14" :class="index == selectIndex && 'select'" @click="select(index)" style="padding: 10rpx 20rpx;" v-for="(item, index) in 3" :key="index">
				形态特征
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
				demoHtml: '',
				selectIndex: 0
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
			},
			select(index) {
				this.selectIndex = index
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
	.select{
		background-color: #e5e5e5;
	}
</style>
