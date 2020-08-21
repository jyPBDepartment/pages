<template>
	<view>
		<HeaderSearch bold :title="param.title" @searchCallback="search"></HeaderSearch>
		<view class="title f-14 g-flex g-f-warp">
			<view class="f-16">小吉易</view>
			<view class="g-f-1">农业专家</view>
			<view class="g-f-1">发布时间：2020-8-20</view>
		</view>
		<view class="content f-14">


			水稻直播指的是直接将种子播种的稻田之中，而不经过育苗、移栽的过程。


			水稻直播省去了育苗、移栽、插秧的过程，省时省工;水稻直播不存在返青和拔秧植伤的过程，生育期要比同期移栽的水稻短;水稻直播简单、方便，有利于规模化发展。 
		</view>
		<view class="comment">
			<view class="comments g-flex g-a-c">
				<u-input v-model="value" type="text" />
				<view class="f-14" style="color: #1890ff;margin-left: 20rpx;">写留言</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				param: {
					title: ''
				}
			}
		},
		onLoad(e) {
			this.param = JSON.parse(e.params)
			console.log(this.param)
		}
	}
</script>

<style lang="scss">
	.title {
		padding: 26rpx 42rpx;
		color: #808080;
		border-bottom: 1px solid #cccccc;

		view:nth-child(1) {
			color: #000;
			width: 100%;
			line-height: 42rpx;
			margin-bottom: 10rpx;
		}
	}

	.content {
		padding: 30rpx 30rpx 60rpx 30rpx;
	}

	.comments {
		padding: 0 30rpx;
		height: 94rpx;
		border-bottom: 1rpx solid #ddd;
		border-top: 1rpx solid #ddd;
	}
</style>
