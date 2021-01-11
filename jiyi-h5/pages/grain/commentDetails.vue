<template>
	<view class="comment-details-container">
		<HeaderSearch title="详情"></HeaderSearch>
		<view class="comment-content">
			<view class="title">{{ commentData.title }}</view>
			<view class="date">{{ commentData.updateDate }}</view>
			<view class="content"><u-parse :html="commentData.content" :tag-style="style"></u-parse></view>
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
			}
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
		padding: 20rpx;

		.title {
			line-height: 80rpx;
			font-size: 36rpx;
			color: #333333;
			font-weight: 600;
		}
		.date {
			width: 100%;
			line-height: 40rpx;
			font-size: 28rpx;
			color: #999;
			font-weight: 500;
			text-align: right;
		}
		.content {
			padding: 20rpx;
		}
	}
}
</style>
