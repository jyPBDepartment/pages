<template>
	<view class="list-container">
		<HeaderSearch title="评论"></HeaderSearch>
		<view class="title">全部评论({{count}})</view>
		<view class="content" v-for="(item, i) in commentList" :key="i">
			<view class="header">
				<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
				<text class="users">{{item.comment_user_name}}</text>
				<text class="times">{{item.date}}</text>
			</view>
			<view class="paragraph">
				<u-read-more :ref="`uReadMore${i}`" :toggle="true" close-text="展开" open-text="收起" :shadow-style="shadowStyle" :show-height="100">
					<rich-text :nodes="item.comment_content"></rich-text>
				</u-read-more>
			</view>
			<view class="reply-b">
				<view class="left">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610355717998322.png" color="#9FA3A8" size="24"></u-icon>
					<text  @tap="goReplay">回复（{{item.replyCount}}）</text>
				</view>
				<text class="right" v-if="item.is_mine!=null" @click="delItem(item.id)">删除</text>
			</view>
		</view>
		<view class="no-comment" v-if="list.length == 0">
			<image src="../../static/svg/no-comment.svg"></image>
			<text>暂无评论</text>
		</view>

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
	onLoad(val) {
		this.initComment(val);
	},
	data() {
		return {
			content: `1111111111`,
			shadowStyle: {
				backgroundImage: 'none',
				paddingTop: '0',
				marginTop: '20rpx'
			},
			list: [1, 2, 3, 4, 5, 6],
			tipModalShow:false,
			delModalShow:false,
			commentList:[],
			count:'',
		};
	},
	methods: {
		initComment(val){
			let params = {
				userId: '22',
				artId: val.id
			};
			this.$ajax(ApiPath.url.articleFindCommentByUserId, 'GET', params).then(res => {
				if (res.code == "200") {
					console.log(JSON.stringify(res.data))
					this.count = res.data.length;
					this.commentList = res.data;
				}
			})
		},
		goReplay() {
			uni.navigateTo({
				url: '/pages/commentList/reply'
			});
		},
		commentPublish(val, isAnonymous) {
			if (val) {
				this.showReply = false;
				this.tipModalShow = true
				setTimeout(()=>{
					this.tipModalShow = false
				},2000)
			} else {
				uni.showToast({
					title: '请输入评论内容在评论'
				});
			}
		},
		delItem(val){
			
			
			
			
			
			
			this.delModalShow = true
			setTimeout(()=>{
				this.delModalShow = false
			},2000)
			
			
			
			
		}
		
	}
};
</script>

<style lang="scss" scoped>
.list-container {
	padding-bottom: 230rpx;
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
