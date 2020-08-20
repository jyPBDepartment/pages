<template>
	<view class="appointment b-t">
		<view class="title">
			<view class="f-16 g-f-1">{{ title }}</view>
			<view class="f-14" @click="more">更多</view>
			<u-icon class="f-14" @click="more" name="arrow-right"></u-icon>
		</view>
		<view class="preview" @click="details">
			<view class="buju" v-for="(item, index) in previewList" :key="index">
				<view class="img">
					<view v-if="type == 3" class="tag f-12 t-c">出租</view>
					<image class="preview-img" :src="item.src" mode=""></image>
					<view class="number g-flex g-a-c" v-show="type == 0">
						<image class="m-r-5" src="../../static/img/qa.png" mode=""></image>
						<span class="f-12 c-f">{{item.number}}</span>
					</view>
				</view>
				<p class="f-14 title" v-if="type == 1 || !type" :class="type == 1 && 'g-j-c'">{{item.title}}</p>
				<p class="f-12 o-e" style="height: 47px;line-height: 23px;" v-else>现货供应大型玉米收割机自走式玉现货供应大型玉米收割机现货供应大型玉米收割机</p>
				<p v-show="type == 0" class="f-12 address">{{item.address}}</p>
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
		},
		methods: {
			more() {
				switch (this.type) {
					case 0:
						uni.switchTab({
							url: '/pages/tabbar/service/index'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/catalog/findDisease'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/catalog/grainTrade'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/catalog/sellAgriculturalMachinery'
						})
						break;
				}
			},
			details(item) {
				switch (this.type) {
					case 0:
						uni.switchTab({
							url: '/pages/gf/service/index'
						});
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/grain/richText'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/grain/space?index=0'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/grain/space?index=1'
						})
						break;
				}
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
				position: relative;
				.tag{
					position: absolute;
					z-index: 9;
					border-radius: 5rpx;
					color: #fff;
					top: 2rpx;
					left: 2rpx;
					background: #ff0000;
					width: 72rpx;
					line-height: 50rpx;
					
				}
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
