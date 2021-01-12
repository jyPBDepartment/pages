<template>
	<view class="comment-details-container">
		<HeaderSearch title="详情"></HeaderSearch>
		<view class="comment-content">
			<view class="title">{{ commentData.title }}</view>
			<view class="date">{{ commentData.updateDate }}</view>
			<view class="content"><u-parse :html="commentData.content" :tag-style="style"></u-parse></view>
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
		<view class="dividing-line">
			
		</view>
		<view class="comment-box-c">
			<view class="top-box-c">
				<text>评论(25)</text>
				<text class="right" @tap="goCommentList">全部评论/去评论 ></text>
			</view>
			<u-line v-if="false" color="rgba(0, 0, 0, 0.1)" />
			<view class="content">
				<view class="header">
					<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
					<text class="users">zhoux</text>
				</view>
		
				<p class="words">{{ content }}</p>
			</view>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';

export default {
	onLoad(datas) {
		this.commentId = datas.commentId;
	},
	data() {
		return {
			commentId: '',
			commentData: {
				title: '',
				content: '',
				updateDate: ''
			},
			style: {
				p: 'word-wrap: break-word;word-break: break-all;overflow: hidden;color:#000000;font-size:28rpx;font-weight:blod;'
			},
			content:121212121
		};
	},
	onShow() {
		this.getCommentDetails();
	},
	methods: {
		getCommentDetails() {
			let self = this;
			this.$ajax(ApiPath.url.findArticleIdDetails, 'GET', { id: self.commentId })
				.then(res => {
					if (res.code == 200) {
						self.commentData = res.data;
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-details-container {
	.comment-content {
		padding: 40rpx;

		.title {
			line-height: 80rpx;
			font-size: 42rpx;
			font-weight: 600;
			color: #000000;

		}
		.date {
			width: 100%;
			line-height: 30rpx;
			font-size: 20rpx;
			font-weight: 400;
			text-align: right;
			color: #9FA3A8;

		}
		.content {
			padding: 20rpx 0 0 0;
			font-size: 28rpx;
			font-weight: 600;
			line-height: 40rpx;
			color: #000000;
			opacity: 1;

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
		padding: 0 40rpx 20rpx 40rpx;
		.item{
			display: flex;
			align-items: center;
			height: 30rpx;
		}
	}
	
	.comment-box-c {
		padding-bottom: 80rpx;
		.top-box-c {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			font-weight: 400;
			color: #000000;
			opacity: 1;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 40rpx;
			.right {
				color: #5eb14e;
			}
		}
		.content {
			.header {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				opacity: 1;
				height: 80rpx;
				line-height: 80rpx;
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
			}
			.words {
				padding: 0 40rpx 20rpx 40rpx;
				font-size: 24rpx;
				font-weight: 400;
				line-height: 30rpx;
				color: #000000;
				opacity: 1;
			}
		}
	}
	
}
</style>
