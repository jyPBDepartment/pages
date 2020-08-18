<template>
	<view class="appointment b-t">
		<view class="title">
			<view class="f-16 g-f-1">{{ title }}</view>
			<view class="f-14">更多推荐</view>
			<u-icon class="f-14" name="arrow-right"></u-icon>
		</view>
		<view class="preview">
			<view class="buju" v-for="(item, index) in previewList" :key="index">
				<view class="img">
					<image class="preview-img" :src="item.src" mode=""></image>
					<view class="number g-flex g-a-c" v-show="!type">
						<image class="m-r-5" src="../../static/img/qa.png" mode=""></image>
						<span class="f-12 c-f">{{item.number}}</span>
					</view>
				</view>
				<p class="f-14 title" :class="type && 'g-j-c'" >{{item.title}}</p>
				<p v-show="!type" class="f-12 address">{{item.address}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Overview",
		props: {
			previewList: {
				type: Array,
				default: () => {
					return []
				}
			},
			title: {
				type: String,
				default: ''
			},
			type: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.appointment {
		line-height: 82rpx;

		.title {
			display: flex;
		}
	}

	.preview {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.buju {
			width: 210rpx;
			padding-bottom: 20rpx;

			.img {
				width: 210rpx;
				height: 174rpx;
				position: relative;
				overflow: hidden;

				.preview-img {
					width: 100%;
					height: 100%;
				}

				.number {
					position: absolute;
					bottom: 0;
					right: 30rpx;

					image {
						width: 28rpx;
						height: 28rpx;
					}
				}
			}

			.title {
				line-height: 66rpx;
			}

			.address {
				line-height: 42rpx;
			}
		}
	}
</style>
