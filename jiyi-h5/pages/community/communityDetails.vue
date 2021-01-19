<template>
	<view class="list-container-s">
		<HeaderSearch title="圈子详情"></HeaderSearch>

		<view class="title" style="margin-top: 20rpx;">{{ detailsData.name }}</view>
		<view class="content">
			<view class="header">
				<image class="image" :src="detailsData.header || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
				<text class="users">{{ detailsData.is_anonymous ? '匿名' : detailsData.create_user ? detailsData.create_user : '匿名' }}</text>
				<text class="times">{{ detailsData.update_date ? formatTime(detailsData.update_date) : '' }}</text>
			</view>
			<view class="paragraph">
				<u-read-more ref="uReadMore" text-indent="0" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="detailsData.code"></rich-text>
				</u-read-more>
			</view>
			<view v-if="detailsData.picture"><communituPicList :picList="detailsData.picture"></communituPicList></view>
			<view class="fun-btn">
				<view class="item">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
					<text>{{ detailsData.pageview }}</text>
				</view>
				<view class="item" @tap.stop="clickIcon(detailsData, 1)">
					<u-icon
						v-if="detailsData.isUserCollection == 0"
						style="margin-right: 10rpx;"
						name="http://60.205.246.126/images/2021/01/11/1610334200305905.png"
						size="24"
					></u-icon>
					<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
					<text>{{ detailsData.collection_num }}</text>
				</view>
				<view class="item" @tap.stop="clickIcon(detailsData, 2)">
					<u-icon
						v-if="detailsData.isUserPraise == 0"
						style="margin-right: 10rpx;"
						name="http://60.205.246.126/images/2021/01/11/1610333920310281.png"
						size="24"
					></u-icon>
					<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>
					<text>{{ detailsData.praise_num }}</text>
				</view>
			</view>
		</view>

		<view class="dividing-line"></view>

		<view class="title">全部评论({{ totalElements }})</view>
		<view class="content" v-for="(item, i) in dataList" :key="i">
			<view class="header">
				<image class="image" :src="item.commentPic || 'http://60.205.246.126/images/2021/01/15/1610696168592617.png'"></image>
				<text class="users">{{ item.isAnonymous ? '匿名' : item.nickName ? item.nickName : '匿名' }}</text>
				<text class="times">{{ item.commentTime }}</text>
			</view>
			<view class="paragraph">
				<u-read-more text-indent="0"  :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="item.content"></rich-text>
				</u-read-more>
			</view>
			<view class="reply-b">
				<view class="left" @tap="goReplay(item)">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" size="24"></u-icon>
					<text>回复({{ item.replyNum }})</text>
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
import Interface from '@/api/ApiPath.js';
import communituPicList from './communituPicList.vue';

export default {
	components: {
		communituPicList
	},
	onLoad(e) {
		this.id = e.id;
	},
	onShow() {
		this.getCommunityDetails();
		this.getCommentList(true);
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.getCommentList();
	},
	data() {
		return {
			content: '',
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			scrollTop: 0,
			collection: false,
			thumbs: false,
			id: '',
			detailsData: {},
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '点我加载更多',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			totalElements: 0,
			page: 1,
			dataList: [],
			tipModalShow: false,
			delModalShow: false
		};
	},
	methods: {
		addPostpageview(id) {
			let self = this;
			self.$ajax(Interface.url.postInfoFindById, 'GET', { id: id }).then(res => {
				if (res.code == 200) {
					self.detailsData.pageview = res.data.pageview;
				}
			});
		},
		formatTime(datetime) {
			var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear(),
				month = ('0' + (date.getMonth() + 1)).slice(-2),
				sdate = ('0' + date.getDate()).slice(-2),
				hour = ('0' + date.getHours()).slice(-2),
				minute = ('0' + date.getMinutes()).slice(-2),
				second = ('0' + date.getSeconds()).slice(-2);
			// 拼接
			var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute;
			// 返回
			return result;
		},
		goReplay(item) {
			uni.setStorageSync('commentData', JSON.stringify(item));
			uni.navigateTo({
				url: '/pages/commentList/reply?id=' + item.id + '&type=4'
			});
		},
		clickIcon(item, val, i) {
			if (val == 1) {
				//收藏点击
				this.setCollection(item);
			}
			if (val == 2) {
				// 点赞
				this.setPraiseThumbs(item);
			}
		},
		// 收藏
		setCollection(item) {
			let self = this;
			let params = {
				isCancelCollection: item.isUserCollection ? 1 : 0,
				circleId: item.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(Interface.url.postInfoPostCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (res.code == 200) {
							if (item.isUserCollection == 1) {
								this.detailsData.collection_num = parseInt(this.detailsData.collection_num) - 1;
								this.detailsData.isUserCollection = 0;
							} else {
								this.detailsData.collection_num = parseInt(this.detailsData.collection_num) + 1;
								this.detailsData.isUserCollection = 1;
							}
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				})
				.catch(err => {});
		},
		// 点赞
		setPraiseThumbs(item, i) {
			let self = this;
			let params = {
				isCancelThumbs: item.isUserPraise ? 1 : 0,
				circleId: item.id,
				thumbsUserId: getApp().globalData.userId
			};
			this.$ajax(Interface.url.postInfoPostThumbs, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserPraise == 1) {
							this.detailsData.praise_num = parseInt(this.detailsData.praise_num) - 1;
							this.detailsData.isUserPraise = 0;
						} else {
							this.detailsData.praise_num = parseInt(this.detailsData.praise_num) + 1;
							this.detailsData.isUserPraise = 1;
						}
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
				.catch(err => {});
		},
		//获取帖子详情
		getCommunityDetails() {
			let self = this;
			this.$ajax(Interface.url.postInfoFindByPostId, 'GET', {
				userId: getApp().globalData.userId,
				id: this.id
			})
				.then(res => {
					self.$u.debounce(this.addPostpageview(self.id), 2000);
					if (res.code == 200) {
						self.detailsData = res.data;
					} else {
						uni.navigateTo({
							url: '/pages/myCollection/deletedPage'
						});
					}
				})
				.catch(err => {
					uni.showToast({
						title: '系统错误，请联系管理员',
						icon: 'none',
						duration: 2000
					});
				});
		},

		// 获取评论列表
		getCommentList(action) {
			let self = this;
			if (action) {
				this.page = 1;
				this.dataList = [];
			}
			let url = Interface.url.postInfoFindByCommentPage;
			let params = {
				userId: getApp().globalData.userId,
				postId: this.id,
				page: this.page,
				size: 10
			};
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
		// 发布帖子评论
		commentPublish(val, isAnonymous) {
			let self = this;
			if (!val) {
				uni.showToast({
					title: '请输入评论内容~'
				});
				return;
			}
			let url = Interface.url.addCommentInfo;
			let params = {
				postId: this.id,
				commentContent: val,
				commentUserName: getApp().globalData.nickName,
				commentPic: getApp().globalData.pic,
				commentUserId: getApp().globalData.userId,
				isAnonymous: isAnonymous ? 1 : 0
			};
			this.$ajax(url, 'GET', params)
				.then(res => {
					if (res.state == 0 || res.code == 200) {
						this.tipModalShow = true;
						setTimeout(() => {
							this.tipModalShow = false;
						}, 1000);
						self.getCommentList(true);
					}
				})
				.catch(err => {});
		},
		// 删除我的评论
		delItem(item) {
			let self = this;
			// 圈子
			let url = Interface.url.commentInfoDelCommentInfo;
			let params = {
				id: item.id
			};

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
								if (res.state == 0 || res.code == 200) {
									self.delModalShow = true;
									setTimeout(() => {
										self.delModalShow = false;
									}, 1000);
									self.getCommentList(true);
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
.list-container-s {
	background: #ffffff;
	padding-bottom: 250rpx;
	.title {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #000000;
		padding: 0 40rpx;
		font-weight: 600;
	}
	.no-comment {
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 40rpx;
		> text {
			font-size: 28rpx;
			font-family: Proxima Nova;
			font-weight: 400;
			margin-top: 20rpx;
			color: #000000;
		}
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
}
</style>
