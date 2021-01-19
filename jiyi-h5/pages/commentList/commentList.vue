<template>
	<view class="list-container">
		<HeaderSearch title="评论"></HeaderSearch>
		<view class="title">全部评论({{ totalElements }})</view>
		<view class="content" v-for="(item, i) in dataList" :key="i">
			<view class="header">
				<image class="image" :src="item.commentPic || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
				<text class="users">{{ item.isAnonymous ? '匿名' : item.nickName ? item.nickName : '匿名' }}</text>
				<text class="times">{{ item.commentTime }}</text>
			</view>
			<view class="paragraph">
				<u-read-more :ref="`uReadMore${i}`" text-indent="0" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="item.content"></rich-text>
				</u-read-more>
			</view>
			<view class="reply-b">
				<view class="left">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" color="#9FA3A8" size="24"></u-icon>
					<text @tap="goReplay(item)">回复({{ item.replyNum }})</text>
				</view>
				<text class="right" v-if="item.isMyComment" @click="delItem(item)">删除</text>
			</view>
		</view>
		<view class="no-comment" v-if="dataList.length == 0">
			<image src="../../static/svg/no-comment.svg"></image>
			<text>暂无评论</text>
		</view>
		<u-loadmore v-if="dataList.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore" />

		<commReply @reply="commentPublish"></commReply>

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
	</view>
</template>
<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			content: `1111111111`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			page: 1,
			dataList: [],
			tipModalShow: false,
			delModalShow: false,
			commentList: [],
			count: '',
			title: '评论',
			type: 1, // 1 粮食 2 文章 3 看图识病 4 圈子
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '点我加载更多',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			totalElements: 0
		};
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.initPage();
	},
	onLoad(data) {
		this.type = data.type;
		this.id = data.id;
	},
	onShow() {
		this.status = 'loading';
		this.initPage(true);
	},
	methods: {
		// 加载下一页
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.initPage();
		},
		// 根据type 查询接口配置
		initPage(action) {
			if (action) {
				this.page = 1;
				this.dataList = [];
			}
			let url = '';
			let params = {};
			if (this.type == 1) {
				// 粮食买卖
				url = ApiPath.url.grainTradingFindCommentPage;
				params = {
					aid: this.id,
					page: this.page,
					size: 10,
					userId: getApp().globalData.userId
				};
			}
			if (this.type == 2) {
				// 文章点评
				url = ApiPath.url.articleFindCommentByUserId;
				params = {
					userId: getApp().globalData.userId,
					artId: this.id,
					page: this.page,
					size: 10
				};
			}
			if (this.type == 3) {
				// 看图识病
				url = ApiPath.url.caseInfoFindCommentPage;
				params = {
					userId: getApp().globalData.userId,
					caseId: this.id,
					page: this.page,
					size: 10
				};
			}
			if (this.type == 4) {
				// 圈子
				url = ApiPath.url.postInfoFindByCommentPage;
				params = {
					userId: getApp().globalData.userId,
					postId: this.id,
					page: this.page,
					size: 10
				};
			}

			this.getCommentList(url, params);
		},
		// 获取评论列表
		getCommentList(url, params) {
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
		// 去评论页面
		goReplay(item) {
			uni.setStorageSync('commentData', JSON.stringify(item));
			uni.navigateTo({
				url: '/pages/commentList/reply?id=' + item.id + '&type=' + this.type
			});
		},
		// 发布评论
		commentPublish(val, isAnonymous) {
			let nickName = getApp().globalData.nickName;
			let pic = getApp().globalData.pic;
			let userId = getApp().globalData.userId;
			if (val) {
				this.showReply = false;
				let url = '';
				let params = {};
				if (this.type == 1) {
					// 粮食买卖
					url = ApiPath.url.grainTradingAddComment;
					params = {
						aid: this.id,
						commentContent: val,
						commentUserName: nickName,
						commentPic: pic,
						commentUserId: userId,
						isAnonymous: isAnonymous ? 1 : 0
					};
				}
				if (this.type == 2) {
					// 文章点评
					url = ApiPath.url.exclusiveAddComment;
					params = {
						artId: this.id,
						commentContent: val,
						commentUserName: nickName,
						commentPic: pic,
						commentUserId: userId,
						isAnonymous: isAnonymous ? 1 : 0,
						status: 0
					};
				}
				if (this.type == 3) {
					// 看图识病
					url = ApiPath.url.caseInfoCommentSave;
					params = {
						caseId: this.id,
						commentContent: val,
						commentUserName: nickName,
						commentUserPic: pic,
						commentUserId: userId,
						isAnonymous: isAnonymous ? 1 : 0
					};
				}
				this.saveComment(url, params);
			} else {
				uni.showToast({
					title: '请输入评论内容在评论'
				});
			}
		},
		saveComment(url, params) {
			let self = this;
			this.$ajax(url, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						this.tipModalShow = true;
						setTimeout(() => {
							this.tipModalShow = false;
						}, 1000);
						self.initPage(true);
					}
				})
				.catch(err => {});
		},
		// 我的评论删除
		delItem(item) {
			let self = this;
			let url = '';
			let params = {};
			if (this.type == 1) {
				// 粮食买卖
				url = ApiPath.url.grainTradingDeleteComment;
				params = {
					commentId: item.id
				};
			}
			if (this.type == 2) {
				// 文章点评
				url = ApiPath.url.exclusiveDeleteComment;
				params = {
					commentId: item.id
				};
			}
			if (this.type == 3) {
				// 看图识病
				url = ApiPath.url.caseInfoCommentDelete;
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
					console.log(res);
					if (res.cancel) {
						self.$ajax(url, 'GET', params)
							.then(res => {
								if (res.code == 200) {
									self.delModalShow = true;
									setTimeout(() => {
										self.delModalShow = false;
									}, 1000);
									self.initPage(true);
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
		font-size: 28rpx;
		font-weight: 500;
		color: #000000;
		opacity: 1;
		padding: 0 40rpx;
	}
	.content {
		margin-bottom: 40rpx;
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
		padding-top: 200rpx;
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
</style>
