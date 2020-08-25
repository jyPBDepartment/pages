<template>
	<view class="mask" v-if="isShow" @click="hide">
		<view @click.stop class="p-10 cancel">
			<view class="reasons p-x-10">
				<u-input v-model="value" type="textarea " />
			</view>
			<view class="btn g-flex g-j-e">
				<u-button @click="confirm" size="mini" class="confirm f-12 " shape="circle" type="error">确认取消</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CancelReason",
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				value: '',
			}
		},
		methods: {
			hide() {
				this.$emit('isShow', false)
			},
			confirm() {
				this.$emit('confirm', this.value)
			}
		}
	}
</script>

<style lang="scss">
	.mask {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 999;
		background-color: rgba($color: #000000, $alpha: .5);
	}

	.cancel {
		width: calc(100% - 40rpx);
		z-index: 999;
		background-color: #fff;
		position: absolute;
		bottom: 0;

		.reasons {
			background-color: #e5e5e5;
			height: 172rpx;
			color: #000;
		}

		.btn {
			width: 100%;

			.confirm {
				width: 160rpx;
				height: 56rpx;
				margin: 20rpx 0 0 0;
			}
		}
	}
</style>
