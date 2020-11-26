<template>
	<view class="comment-details-container">
		<HeaderSearch title="详情"></HeaderSearch>
		<view class="comment-content">
			<view class="title">{{commentData.title}}</view>
			<view class="date">{{commentData.updateDate}}</view>
			<view class="content">
				<u-parse :html="commentData.content"></u-parse>
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
				title: '文章标题1',
				content:
					'<p><img src="http://60.205.246.126/images/2020/11/25/1606288306423928.gif"><img src="http://60.205.246.126/images/2020/11/25/1606272943742215.gif"></p><p><br></p>',
				updateDate: '2020-11-26 09:38:46'
			}
		};
	},
	onShow() {
		this.getCommentDetails();
	},
	methods: {
		getCommentDetails() {
			console.log(this.commentId);

			let self = this;
			uni.request({
				method: 'GET', //请求方式
				data: {
					id: self.commentId
				}, //请求数据
				url: ApiPath.url.findArticleIdDetails, //请求接口路径
				success: res => {
					if (res.data.code == 200) {
						console.log(res.data);
					}
				},
				fail: err => {}
			});
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
			color: #666;
			font-size: 32rpx;
		}
	}
}
</style>
