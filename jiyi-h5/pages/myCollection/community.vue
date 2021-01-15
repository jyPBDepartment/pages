<template>
	<view class="list-container-s" @click.stop="jump">
		<!-- <view class="title">标题1111</view> -->
		<view class="title">
			<text>标题1111</text>
			<view @click.stop="">
				<u-icon style="margin-right: 5rpx;z-index: 999;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="32"></u-icon>
			</view>
		</view>
		<view class="content">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">zhoux</text>
				<text class="times">2021-01-11</text>
			</view>
			<view class="paragraph">
				<u-read-more ref="uReadMore" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="pictues-group">
				<easy-loadimage v-for="(item, i) in url" class="preview-img" :scroll-top="scrollTop" :image-src="item.imgUrl" :key="i"></easy-loadimage>
			</view>
		</view>
	</view>
</template>

<script>
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';
import Interface from '@/api/ApiPath.js';

export default {
	components: {
		easyLoadimage
	},
	data() {
		return {
			url: [
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346336119875.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346150825084.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346862930577.png'
				},
				{
					imgUrl: 'http://60.205.246.126/images/2021/01/11/1610346862930577.png'
				}
			],
			content: `1111111111`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			scrollTop: 0
		};
	},
	methods: {
		jump(item) {
			uni.navigateTo({
				url: `../community/communityDetails?id=` + item
			});
		},
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				isCancelCollection: item.isUserCollection ? 1 : 0,
				circleId: item.id,
				userId: '20200909'
			};
			this.$ajax(Interface.url.postInfoPostCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						
					}
				})
				.catch(err => {});
		},
		
	}
	
};
</script>

<style lang="scss" scoped>
.list-container-s {
	background: #ffffff;
	.title {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #000000;
		padding: 0 40rpx;
		font-weight: 600;
		display: flex;
		justify-content: space-between;
	}
	.content {
		margin-bottom: 20rpx;
		.header {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 40rpx;
			.image {
				width: 48rpx;
				height: 48rpx;
				border-radius: 24rpx;
			}
			.users {
				flex: 1;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
			.times {
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #9fa3a8;
				opacity: 1;
			}
		}
		.paragraph {
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			padding: 0rpx 40rpx 20rpx 40rpx;
		}
		.pictues-group {
			padding: 0 20rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: start;
			.preview-img {
				height: 220rpx;
				width: 220rpx;
				margin: 0rpx 0 15rpx 15rpx;
				border-radius: 10rpx;
			}
		}
		.fun-btn {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
			color: #9fa3a8;
			opacity: 1;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 40rpx;
			.item {
				display: flex;
				align-items: center;
				height: 30rpx;
			}
		}
	}
}
</style>
