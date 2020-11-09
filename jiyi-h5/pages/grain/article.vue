<template>
	<view>
		<HeaderSearch bold :title="param.name" @searchCallback="search"></HeaderSearch>

		<view class="content f-14">{{ param.text }}</view>
		<view class="title f-14 g-flex g-f-warp">
			<view class="f-16">{{ param.author }}</view>
			<view class="g-f-1">农业专家</view>
			<view class="g-f-2 t-c">发布时间：{{ param.createDate }}</view>
		</view>

		<view class="comment">
			<view class="comments g-flex g-a-c">
				<view class="g-f-1 f-14" style="color: #999999">精选留言</view>
				<view class="f-14" @click="writeReview" style="color: #1890ff; margin-left: 20rpx">写留言</view>
			</view>
			<view v-if="!commentList.length" class="f-14 t-c" style="padding: 30rpx">暂无评论内容</view>
			<view style="padding: 20rpx 36rpx">
				<view v-for="(item, index) in commentList" :key="index" @click="replyComments(item)">
					<view class="name f-14">{{ item.commentUserName }}</view>
					<view class="comment-content">{{ item.commentContent }}</view>
					<view class="other g-flex f-12 g-a-c">
						<view class="time">{{ formatDate(item.commentDate) }}</view>
						<view class="number t-c" @click.stop v-if="item.replyList != null" @click="viewReply(item)">{{ item.replySize }}回复</view>
					</view>

					<view class="child-item" @click.stop v-for="(item1, index1) in item.getReplyList" :key="index1">
						<view style="padding: 0 24rpx; border-left: 1rpx solid #e5e5e5">
							<view class="name f-14">{{ item1.replyUserName }}</view>
							<view class="comment-content f-12">{{ item1.replyContent }}</view>
						</view>

						<view class="other g-flex f-12 g-a-c">
							<view class="time">{{ formatDate(item1.replyDate) }}</view>
						</view>
					</view>
				</view>
				<view v-if="commentList.length < totalElements" @click.stop @click="getMoreComment" class="f-14 t-c" style="padding: 30rpx; color: #2b85e4">展开更多评论</view>
			</view>
		</view>
		<CancelReason name="确认回复" @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
	</view>
</template>

<script>
let type;
import Interface from '@/api/ApiPath.js';
import CancelReason from '../../components/CancelReason/CancelReason.vue';
export default {
	components: {
		CancelReason
	},
	data() {
		return {
			cencalIsShow: false,
			value: '',
			contentId: '',
			commentPage: 1,
			commentSize: 1,
			totalPages: null,
			totalElements: null,
			commentList: [],
			expandReplyIndex: null,
			replyList: [],
			param: {
				id: '',
				name: '',
				author: '',
				text: '',
				createDate: ''
			},
			postCommentInfoEntity: {
				commentContent: '',
				commentUserName: '',
				commentUserId: localStorage.getItem('userId'),
				// commentDate: '',
				postId: ''
			}
		};
	},
	onLoad(e) {
		// 缓存帖子id
		this.param.id = e.id;
		// 根据Id获取帖子信息
		this.getPostInfoById(e.id);
	},
	methods: {
		replyComments(item) {
			this.contentId = item.id;
			this.cencalIsShow = true;
			type = 2;
		},
		writeReview() {
			this.cencalIsShow = true;
			type = 1;
		},
		viewReply(item) {
			this.contentId = item.id;
			uni.request({
				url: Interface.url.findByCommentId,
				method: 'GET',
				data: {
					commentId: this.contentId,
					page: 1,
					size: 5
				},
				success: res => {
					let index = this.commentList.findIndex(item => item.id == this.contentId);
					this.commentList[index].getReplyList = res.data.data.content;
				},
				fail: err => {}
			});
		},
		cencal(item) {
			this.cencalIsShow = item;
		},
		confirm(e) {
			if (type == 1) {
				this.postCommentInfoEntity.commentContent = e;
				this.postCommentInfoEntity.postId = this.param.id;
				uni.request({
					url: Interface.url.addCommentInfo,
					method: 'GET',
					data: this.postCommentInfoEntity,
					success: res => {
						if (res.data.state == 0) {
							uni.showToast({
								title: '发表成功',
								icon: 'success',
								duration: 2000
							});
							this.findCommentInfoById(this.param.id);
						} else {
							uni.showToast({
								title: '发表失败',
								icon: 'none',
								duration: 2000
							});
						}
						this.cencalIsShow = false;
					},
					fail: err => {
						uni.showToast({
							title: '发表失败',
							icon: 'none',
							duration: 2000
						});
						this.cencalIsShow = false;
					}
				});
			}
			if (type == 2) {
				uni.request({
					url: Interface.url.addReplyInfo,
					method: 'GET',
					data: {
						replyContent: e,
						replyUserName: 'ceshi',
						commentId: this.contentId
					},
					success: res => {
						if (res.data.state == 0) {
							uni.showToast({
								title: '发表成功',
								icon: 'success',
								duration: 2000
							});
							this.findCommentInfoById(this.param.id);
						} else {
							uni.showToast({
								title: '发表失败',
								icon: 'none',
								duration: 2000
							});
						}
						this.cencalIsShow = false;
					},
					fail: err => {
						uni.showToast({
							title: '发表失败',
							icon: 'none',
							duration: 2000
						});
						this.cencalIsShow = false;
					}
				});
			}
		},
		//时间戳转换方法    date:时间戳数字
		formatDate(date) {
			console.log(date);
			var date = new Date(date);
			var YY = date.getFullYear() + '-';
			var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return YY + MM + DD + ' ' + hh + mm + ss;
		},
		getMoreComment() {
			if (this.commentSize == 1) {
				this.commentSize = 10;
				this.findCommentInfoById(this.param.id);
			} else {
				this.commentPage += 1;
				this.findCommentInfoById(this.param.id);
			}
		},
		// 根据id获取帖子信息
		getPostInfoById(val) {
			uni.request({
				method: 'GET',
				url: Interface.url.findPostInfoById,
				data: {
					id: val
				},
				success: res => {
					if (res.data.status == 0) {
						//数据成功返回

						this.param.name = res.data.data.name;
						this.param.author = res.data.data.author;
						this.param.text = res.data.data.code;
						this.param.createDate = res.data.data.createDate;

						this.findCommentInfoById(val);
					}
				}
			});
		},
		// 根据postId获取评论回复信息
		findCommentInfoById(val) {
			uni.request({
				url: Interface.url.findByPostId,
				method: 'GET',
				data: {
					postId: val,
					page: this.commentPage,
					size: this.commentSize
				},
				success: res => {
					this.totalPages = res.data.data.totalPages;
					this.totalElements = res.data.data.totalElements;
					let data = res.data.data.content.map(item => {
						item.getReplyList = [];
						return item;
					});
					if (this.commentPage == 1) {
						this.commentList = data;
					} else {
						this.commentList = this.commentList.concat(data);
					}
				},
				fail: err => {}
			});
		}
	}
};
</script>

<style lang="scss">
.title {
	padding: 26rpx 42rpx;
	color: #808080;
	border-bottom: 1px solid $comm-border-color;

	view:nth-child(1) {
		color: #000;
		width: 100%;
		line-height: 42rpx;
		margin-bottom: 10rpx;
	}
}

.content {
	padding: 30rpx;
}

.comments {
	padding: 0 30rpx;
	height: 94rpx;
	border-bottom: 2rpx solid $comm-border-color;
}

.name {
	line-height: 60rpx;
	margin: 24rpx 0 12rpx 0;
}
.comment-content {
	font-size: 24rpx;
	padding: 20rpx;
	color: #666;
}

.other {
	color: #808080;
	border-bottom: 2rpx solid $comm-border-color;
	padding: 16rpx 24rpx;
	.number {
		background-color: #e5e5e5;
		padding: 5rpx 20rpx;
		margin-left: 20rpx;
		border-radius: 20rpx;
	}
}
.child-item {
	margin-left: 20rpx;
}
</style>
