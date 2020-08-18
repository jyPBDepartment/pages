<template>
	<view class="p-y-10 btn b-t">
		<view class="box" v-for="(item, index) in btnList" :key="index">
			<view class="modular" :style="{'background-color':item.backgroundColor}">
				<image :src="item.src" mode=""></image>
			</view>
			<p>{{item.title}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		name: "FuncIcon",
		props: {
			btnList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.btn {
		display: flex;
		flex-wrap: wrap;

		.box {
			flex: 1;
			min-width: 20%;
			max-width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;

			.modular {
				border-radius: 28rpx;
				overflow: hidden;
				width: 100rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 56rpx;
					height: 56rpx;
				}
			}

			p {
				font-size: 22rpx;
				text-align: center;
				line-height: 56rpx;
			}
		}
	}
</style>
