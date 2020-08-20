<template>
	<view>
		<HeaderSearch focus @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex g-f-row g-f-warp" style="margin-top: 20rpx;">
				<view class="tag f-12" v-for="(item, index) in 4" :key="index">农业精选</view>
			</view>
			<view>
				<view class="title f-16 g-flex g-j-s-b g-a-c">
					搜索历史
					<u-icon @click="open" size="44" name="trash"></u-icon>
				</view>
				<view class="history g-flex f-16" v-for="(item, index) in 5" :key="index">
					<u-icon name="clock" style="margin-right: 20rpx;"></u-icon>
					<view class="g-f-1">玉米</view>
					<u-icon class="g-j-e" name="close"></u-icon>
				</view>
				
			</view>
		</view>
		<u-modal v-model="show" :show-title="false" show-cancel-button :content="content"></u-modal>
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
				show: false,
				content: '确认删除全部历史记录'
			}
		},
		methods: {
			search(e) {
				console.log(e)
			},
			open() {
				this.show = true;
			}
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	.tag {
		padding: 10rpx 20rpx;
		margin-top: 20rpx;
		background: #e5e5e5;
		border-radius: 15px;
		color: #000000;
		margin-right: 20rpx;
	}

	.title {
		margin: 40rpx 0 30rpx 0;
		color: #333333;
	}

	.history {
		border-bottom: 1px solid #d8d8d8;
		color: #505050;
		line-height: 80rpx;
	}
</style>
