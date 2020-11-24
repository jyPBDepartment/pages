<template>
	<view class="comment-list-container">
		<HeaderSearch title="更多点评"></HeaderSearch>
		<view class="list" v-for="i in list" @tap="goDetails" :key="i">
			<view class="left"><image src="../../static/img/tabbar/首页-s-r.png"></image></view>
			<view class="right">
				<view class="title">文章标题{{i}}</view>
				<view class="date">2020-11-24</view>
			</view>
		</view>
		<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
			page:1,
			list:10,
		};
	},
	onReachBottom() {
		console.log('loadmore');
		if (this.page >= 3) return;
		this.status = 'loading';
		this.page = ++this.page;
		setTimeout(() => {
			this.list += 10;
			if (this.page >= 3) this.status = 'nomore';
			else this.status = 'loading';
		}, 2000);
	},
	methods: {
		goDetails() {
			uni.navigateTo({
				url: '/pages/grain/commentDetails'
			});
		}
	}
};
</script>

<style lang="scss">
.comment-list-container {
	padding-bottom: 40rpx;
	.list {
		margin: 20rpx;
		border-bottom: 1rpx solid #f4f4f4;
		display: flex;
		.left {
			image {
				width: 200rpx;
				height: 200rpx;
			}
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx 0 20rpx 20rpx;
			.title {
				line-height: 80rpx;
				font-size: 36rpx;
				color: #333333;
				font-weight: 500;
			}
			.date {
				width: 100%;
				line-height: 40rpx;
				font-size: 28rpx;
				color: #999;
				font-weight: 500;
				text-align: right;
			}
		}
	}
}
</style>
