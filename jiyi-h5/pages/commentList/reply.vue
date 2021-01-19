<template>
	<view class="list-container">
		<HeaderSearch title="回复"></HeaderSearch>

		<view class="content">
			<view class="header">
				<image class="image" :src="commentData.commentPic || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
				<text class="users">{{ commentData.isAnonymous ? '匿名' : commentData.nickName }}</text>
				<text class="times">{{ commentData.date || commentData.commentTime }}</text>
			</view>
			<view class="paragraph">
				<u-read-more ref="uReadMore1" text-indent="0" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="commentData.content"></rich-text>
				</u-read-more>
			</view>
		</view>
		<view class="space"></view>

		<view class="title">全部回复({{ totalElements }})</view>

		<view class="reply-content" v-for="(item, i) in dataList" :key="i">
			<view class="header">
				<image class="image" :src="item.replyPic || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
				<text class="users">{{ item.isAnonymous ? '匿名' : item.replyUserName }}</text>
				<text class="times">{{ item.replyDate }}</text>
			</view>
			<view class="paragraph">
				<u-read-more text-indent="0" :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<view class="reply-content-c">
						回复
						<text class="nick-name">{{ commentData.nickName }}：</text>
						<text>{{ item.replyContent }}</text>
					</view>
				</u-read-more>
			</view>
			<view class="reply-b" v-if="item.isMyReply">
				<view class="left"></view>
				<text class="right" @click="delItem(item)">删除</text>
			</view>
		</view>
		<view class="no-comment" v-if="dataList.length == 0">
			<image src="../../static/svg/no-comment.svg"></image>
			<text>暂无回复</text>
		</view>

		<u-loadmore v-if="dataList.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore" />

		<u-modal v-model="tipModalShow" :show-title="false" :show-confirm-button="false">
			<view class="slot-content">
				<image src="../../static/svg/publish-success.svg"></image>
				<text>发布成功</text>
			</view>
		</u-modal>
		<u-modal v-model="delModalShow" :show-title="false" :show-confirm-button="false">
			<view class="slot-content">
				<image src="../../static/svg/comment-delete.svg"></image>
				<text>删除成功</text>
			</view>
		</u-modal>
		<commReply @reply="replyPublish"></commReply>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			content: `回复周先生`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			dataList: [],

			tipModalShow: false,
			delModalShow: false,
			commentID: '',
			commentData: {},
			page: 1,
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '点我加载更多',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			totalElements: 0,
			userId: localStorage.getItem('userId')
		};
	},
	onLoad(data) {
		this.commentID = data.id;
		this.type = data.type;
		this.commentData = JSON.parse(uni.getStorageSync('commentData'));
		this.initPageList();
	},
	methods: {
		// 加载下一页
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.initPage();
		},
		initPageList(action) {
			if (action) {
				this.page = 1;
				this.dataList = [];
			}
			let url = ApiPath.url.articleFindCommentByUserId;
			let params = {};
			if (this.type == 1) {
				// 粮食买卖
				url = ApiPath.url.grainTradingFindReplyPage;
				params = {
					cid: this.commentID,
					page: this.page,
					size: 10,
					userId: this.userId
				};
			}
			if (this.type == 2) {
				// 文章点评
				url = ApiPath.url.exclusiveFindReplyByUserId;
				params = {
					commentId: this.commentID,
					page: this.page,
					size: 10,
					userId: this.userId
				};
			}
			if (this.type == 3) {
				// 看图识病
				url = ApiPath.url.caseInfoFindReplyPage;
				params = {
					commentId: this.commentID,
					page: this.page,
					size: 10,
					userId: this.userId
				};
			}
			if (this.type == 4) {
				// 圈子
				url = ApiPath.url.postInfoFfindByReplyPage;
				params = {
					commentId: this.commentID,
					page: this.page,
					size: 10,
					userId: this.userId
				};
			}
			this.getReplyList(url, params);
		},
		// 获取评论列表
		getReplyList(url, params) {
			let self = this;
			this.$ajax(url, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (res.data.content.length < 10) {
							self.nomore = true;
							self.status = 'nomore';
							self.dataList = self.dataList.concat(res.data.content);
							if (self.dataList.length == 0) {
								self.noData = true;
							} else {
								self.noData = false;
							}
						} else {
							setTimeout(() => {
								self.nomore = false;
								self.status = 'loadmore';
								self.dataList = self.dataList.concat(res.data.content);
								if (self.dataList.length == 0) {
									self.noData = true;
								} else {
									self.noData = false;
								}
							}, 200);
						}

						self.totalElements = res.data.totalElements;
					}
				})
				.catch(err => {});
		},
		// 发布回复
		replyPublish(val, isAnonymous) {
			if (val) {
				let url = '';
				let params = {};
				let nickName = getApp().globalData.nickName;
				let pic = getApp().globalData.pic;
				let userId = getApp().globalData.userId;
				if (this.type == 1) {
					// 粮食买卖
					url = ApiPath.url.grainTradingAddReply;
					params = {
						commentId: this.commentID,
						replyContent: val,
						replyUserName: nickName,
						replyPic: pic,
						replyUserId: this.userId,
						isAnonymous: isAnonymous ? 1 : 0
					};
				}
				if (this.type == 2) {
					// 文章点评
					url = ApiPath.url.exclusiveAddReply;
					params = {
						commentId: this.commentID,
						replyContent: val,
						replyUserName: nickName,
						replyPic: pic,
						replyUserId: this.userId,
						isAnonymous: isAnonymous ? 1 : 0,
						status: 0
					};
				}
				if (this.type == 3) {
					// 看图识病
					url = ApiPath.url.caseInfoReplySave;
					params = {
						commentId: this.commentID,
						replyContent: val,
						replyUserName: nickName,
						replyPic: pic,
						replyUserId: this.userId,
						isAnonymous: isAnonymous ? 1 : 0
					};
				}
				if (this.type == 4) {
					// 圈子
					url = ApiPath.url.replyInfoAddReplyInfo;
					params = {
						commentId: this.commentID,
						replyContent: val,
						replyUserName: nickName,
						replyPic: pic,
						replyUserId: this.userId,
						isAnonymous: isAnonymous ? 1 : 0
					};
				}
				this.saveReply(url, params);
			} else {
				uni.showToast({
					title: '请输入回复内容~'
				});
			}
		},
		// 发布回复
		saveReply(url, params) {
			let self = this;
			this.$ajax(url, 'GET', params)
				.then(res => {
					if (res.code == 200 || res.state == 0) {
						this.tipModalShow = true;
						setTimeout(() => {
							this.tipModalShow = false;
						}, 1000);
						self.initPageList(true);
					}
				})
				.catch(err => {});
		},
		// 删除回复
		delItem(item) {
			let self = this;
			let url = '';
			let params = {};
			if (this.type == 1) {
				// 粮食买卖
				url = ApiPath.url.grainTradingDeleteReply;
				params = {
					replyId: item.id
				};
			}
			if (this.type == 2) {
				// 文章点评
				url = ApiPath.url.exclusiveDeleteReply;
				params = {
					replyId: item.id
				};
			}
			if (this.type == 3) {
				// 看图识病
				url = ApiPath.url.caseInfoReplyDelete;
				params = {
					id: item.id
				};
			}
			if (this.type == 4) {
				// 圈子
				url = ApiPath.url.replyInfoDelReplyInfo;
				params = {
					id: item.id
				};
			}

			uni.showModal({
				title: '您确定删除？',
				content: '删除后将无法恢复，请慎重考虑',
				cancelText: '确定',
				confirmText: '取消',
				cancelColor: '#000000',
				confirmColor: '#000000',
				success: function(res) {
					if (res.cancel) {
						self.$ajax(url, 'GET', params)
							.then(res => {
								if (res.code == 200 || res.state == 0) {
									self.delModalShow = true;
									setTimeout(() => {
										self.delModalShow = false;
									}, 1000);
									self.initPageList(true);
								}
							})
							.catch(err => {});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.list-container {
	padding-bottom: 250rpx;
	.title {
		line-height: 80rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #000000;
		opacity: 1;
		padding: 0 40rpx;
	}
	.space {
		width: 100%;
		height: 20rpx;
		background-color: rgba(229, 229, 229, 1);
	}
	.reply-content {
		padding: 0;
		.header {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-weight: 500;
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
		.reply-b {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 20rpx;
			font-weight: 400;
			color: #9fa3a8;
			padding: 0 40rpx;
			.left {
				display: flex;
				align-items: center;
			}
			.right {
				color: #5eb14e;
			}
		}
	}
	.content {
		padding: 20rpx 0;
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
		.reply-b {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 20rpx;
			font-weight: 400;
			color: #9fa3a8;
			opacity: 1;
			padding: 0 40rpx;
			.left {
				display: flex;
				align-items: center;
				flex: 1;
			}
			.right {
				color: #5eb14e;
			}
		}
	}
	.no-comment {
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		> text {
			font-size: 28rpx;
			font-family: Proxima Nova;
			font-weight: 400;
			margin-top: 40rpx;
			color: #000000;
		}
	}
}

.nick-name {
	margin-left: 10rpx;
	color: #5eb14e;
}
.reply-content-c {
}
</style>
