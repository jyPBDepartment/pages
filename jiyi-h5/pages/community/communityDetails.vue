<template>
	<view class="list-container-s">
		<HeaderSearch title="圈子详情"></HeaderSearch>
		
		<view class="title">标题1111</view>
		<view class="content">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">zhoux</text>
				<text class="times">2021-01-11</text>
			</view>
			<view class="paragraph">
				<u-read-more :ref="uReadMore" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="content"></rich-text>
				</u-read-more>
			</view>
			<view class="pictues-group">
				<easy-loadimage v-for="(item, i) in url" class="preview-img" :scroll-top="scrollTop" :image-src="item.imgUrl" :key="i"></easy-loadimage>
			</view>
			<view class="fun-btn">
				<view class="item">
					<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" color="#9FA3A8" size="24"></u-icon>
					<text>123</text>
				</view>
				<view class="item" @tap.stop="clickIcon(2)">
					<u-icon v-if="collection" style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334200305905.png" color="#9FA3A8" size="24"></u-icon>
					<u-icon v-else style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" color="#9FA3A8" size="24"></u-icon>
					<text>111</text>
				</view>
				<view class="item" @tap.stop="clickIcon(1)">
					<u-icon v-if="thumbs" style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" color="#9FA3A8" size="24"></u-icon>
					<u-icon v-else style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" color="#9FA3A8" size="24"></u-icon>

					<text>21</text>
				</view>
			</view>
		</view>
	
		<view class="dividing-line"></view>
		
		<view class="title">全部评论(25)</view>
		<view class="content" v-for="i in 5" :key="i">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">zhoux</text>
				<text class="times">2021-01-11</text>
			</view>
			<view class="paragraph">
				
				<u-read-more :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
						<rich-text :nodes="content"></rich-text>
					</u-read-more>
			</view>
			<view class="reply-b">
				<view class="left" @tap="goReplay">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" color="#9FA3A8" size="24"></u-icon>
					<text>回复（22）</text>
				</view>
				<text class="right">删除</text>
			</view>
		</view>
	
	</view>
</template>

<script>
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';

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
		goReplay(){
			uni.navigateTo({
				url:'/pages/commentList/reply'
			})
		}
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
		.reply-b{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 20rpx;
			font-weight: 400;
			color: #9FA3A8;
			opacity: 1;
			padding: 0 40rpx;
			.left{
				display: flex;
				align-items: center;
				flex: 1;
			}
			.right{
				color: #5EB14E;
			}
		}
	}
}
</style>
