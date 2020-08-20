<template>
	<view>
		<HeaderSearch title="发布" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10  g-flex g-a-c " style="position: absolute; bottom: 40rpx;">

			<view class="btn f-12">
				<view class="img g-flex g-a-c g-j-c">
					<image src="../../../static/logo.png" mode=""></image>
				</view>
				<view class="name">
					农服
				</view>
			</view>
			<view class="btn f-12">
				<view class="img g-flex g-a-c g-j-c">
					<image src="../../../static/logo.png" mode=""></image>
				</view>
				<view class="name">
					农服
				</view>
			</view>
			<view class="btn f-12">
				<view class="img g-flex g-a-c g-j-c">
					<image src="../../../static/logo.png" mode=""></image>
				</view>
				<view class="name">
					农服
				</view>
			</view>
		</view>
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

			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {

		},
		methods: {

		}
	};
</script>

<style lang="scss">
	.btn {
		width: 92rpx;
		margin-left: 60rpx;

		.img {
			width: 92rpx;
			height: 92rpx;
			background-color: #55be95;
			border-radius: 26rpx;

			image {
				width: 56rpx;
				height: 56rpx;
			}
		}

		.name {
			line-height: 56rpx;
			text-align: center;
			color: #505050;
		}
	}
</style>
