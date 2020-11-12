<template>
	<view class="container">
		<!-- 头部 -->
		<header-box title="文章详情" @backTo="backTo"></header-box>
		<!-- 内容 -->
		<view class="content" v-for="(item, index) in articleList" :key="index">
			<view class="title">{{ item.title }}</view>
			<view class="smallTitle">
				<view class="read">阅读：{{ item.read }}</view>
				<view class="pulicTime">发布时间：{{ item.publicTime }}</view>
			</view>
			<view class="ReadGuide">
				<b>[导读]</b>
				{{ item.readGuide }}
			</view>
			<view class="img"><image class="contentImg" :src="item.url"></image></view>
			<view class="artContent">{{ item.articleContent }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			articleList: [
				{
					title: '不要紧，山野都有雾灯.',
					read: '300',
					publicTime: '2020-02-19 12:23:46',
					readGuide: '少女的征途是星辰大海，而并非烟尘人间.经销商。',
					url: 'http://60.205.246.126/images/2020/10/15/1602727948520251.jpg',
					articleContent: '故事的开始，总会有个人，故意选择隐匿他的过去，惟你，让我的回忆汹涌而平静。'
				}
			]
		};
	},
	methods: {
		backTo() {
			uni.navigateBack(-1);
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;
	.head {
		display: flex;
		margin: 15rpx 0rpx 10rpx 20rpx;

		.backArrow {
			margin-top: 6rpx;
		}
		.title {
			margin-left: 250rpx;
			font-size: 35rpx;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.title {
			margin-top: 10rpx;
			font-size: 30rpx;
			font-weight: bolder;
			line-height: 60rpx;
		}

		.smallTitle {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			color: #bbb;
			font-size: 22rpx;
			line-height: 50rpx;
		}
		.ReadGuide {
			margin-top: 10rpx;
			font-weight: 400;
			width: 710rpx;
			word-break: break-all;
		}
		.img {
			margin-top: 10rpx;
			.contentImg {
				width: 710rpx;
				height: 400rpx;
			}
		}
		.parse {
			margin: 10rpx;
			width: 690rpx;
			word-break: break-all;
		}
	}
}
</style>
