<template>
	<view class="rich-text-container">
		<HeaderSearch title="详情"></HeaderSearch>
		<view class="content">
			<view class="image-t"><image :src="detailsObj.url"></image></view>
			<view class="details-box">
				<view class="title">一、概述</view>
				<view class="html-content"><u-parse :html="detailsObj.describetion"></u-parse></view>
				<view class="filter-container">
					<view class="item" :class="tabIndex == 1 && 'select-tab'" @tap="clickTab(1)">危害</view>
					<view class="item" :class="tabIndex == 2 && 'select-tab'" @tap="clickTab(2)">传播途径/发病条件</view>
					<view class="item" :class="tabIndex == 3 && 'select-tab'" @tap="clickTab(3)">防治技术</view>
				</view>
				<view v-show="tabIndex == 1" class="html-content"><u-parse :html="detailsObj.harm"></u-parse></view>
				<view v-show="tabIndex == 2" class="html-content"><u-parse :html="detailsObj.channel"></u-parse></view>
				<view v-show="tabIndex == 3" class="html-content"><u-parse :html="detailsObj.controlTechnology"></u-parse></view>
			</view>
			<view class="fun-btn p-40">
				<view class="item">
					<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
					<text>{{ detailsObj.browse_num }}</text>
				</view>
				<view class="item" @tap.stop="clickIcon(detailsObj, 1)">
					<u-icon
						v-if="detailsObj.isUserCollection == 0"
						style="margin-right: 10rpx;"
						name="http://60.205.246.126/images/2021/01/11/1610334200305905.png"
						size="24"
					></u-icon>
					<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
					<text>{{ detailsObj.collection_num }}</text>
				</view>
				<view class="item" @tap.stop="clickIcon(detailsObj, 2)">
					<u-icon v-if="detailsObj.isUserPraise == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" size="24"></u-icon>
					<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>
					<text>{{ detailsObj.praise_num }}</text>
				</view>
				<view class="item" @tap.stop="clickIcon(detailsObj, 3)">
					<u-icon
						v-if="detailsObj.isUserIrrelevant == 0"
						style="margin-right: 10rpx;"
						name="http://60.205.246.126/images/2021/01/13/1610507402974982.png"
						size="24"
					></u-icon>
					<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/13/1610507433084156.png" size="24"></u-icon>
					<text>{{ detailsObj.irrelevant_num }}</text>
				</view>
			</view>
			<view class="dividing-line"></view>
			<view class="comment-box-c">
				<view class="top-box-c">
					<text>评论({{ detailsObj.comment_num }})</text>
					<view class="right">
						<text @tap="goCommentList">{{ detailsObj.comment_num ? '全部评论' : '去评论' }}</text>
						<u-icon name="arrow-right" style="margin-left: 5rpx" color="#5eb14e" size="24"></u-icon>
					</view>
				</view>
				<u-line v-if="detailsObj.comment_num && dataComment" color="rgba(0, 0, 0, 0.1)" />
				<view v-if="detailsObj.comment_num && dataComment" class="content">
					<view class="header">
						<image class="image" :src="dataComment.commentUserPic || '../../static/img/tabbar/guanzhuactive.png'"></image>
						<text class="users">{{ dataComment.commentUserName }}</text>
					</view>
					<p class="words">{{ dataComment.commentContent }}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';

export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			selectIndex: 0,
			title: '',
			url: '',
			tabIndex: 1,
			id: '',
			detailsObj: {},
			dataComment: {},
			userId: localStorage.getItem('userId')
		};
	},
	onLoad(e) {
		this.id = e.id;
		// this.$u.debounce(this.getInfoById(e.id), 1000);
	},
	onShow() {
		this.$u.debounce(this.getInfoById(this.id), 1000);
	},
	methods: {
		addCaseInfoViewNum(id) {
			let self = this;
			self.$ajax(ApiPath.url.caseInfoFindNumById, 'GET', { id: id }).then(res => {
				if (res.code == 200) {
					self.detailsObj.browse_num = res.data.browseNum;
				}
			});
		},
		clickIcon(item, val) {
			if (val == 1) {
				//收藏点击
				this.setCollection(item);
			}
			if (val == 2) {
				// 点赞
				this.setPraiseThumbs(item);
			}
			if (val == 3) {
				// 点赞
				this.setIrrelevant(item);
			}
		},
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				isCollection: item.isUserCollection ? 1 : 0,
				caseId: item.id,
				collectionUserId: this.userId
			};
			this.$ajax(ApiPath.url.caseInfoSaveCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserCollection == 1) {
							this.detailsObj.collection_num = parseInt(this.detailsObj.collection_num) - 1;
							this.detailsObj.isUserCollection = 0;
						} else {
							this.detailsObj.collection_num = parseInt(this.detailsObj.collection_num) + 1;
							this.detailsObj.isUserCollection = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
				.catch(err => {});
		},
		// 点赞
		setPraiseThumbs(item, i) {
			let self = this;
			let params = {
				isFabulous: item.isUserPraise ? 1 : 0,
				caseId: item.id,
				praiseUserId: this.userId
			};
			this.$ajax(ApiPath.url.caseInfoSaveCasePraise, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserPraise == 1) {
							this.detailsObj.praise_num = parseInt(this.detailsObj.praise_num) - 1;
							this.detailsObj.isUserPraise = 0;
						} else {
							this.detailsObj.praise_num = parseInt(this.detailsObj.praise_num) + 1;
							this.detailsObj.isUserPraise = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
				.catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				});
		},
		// 点赞isIrrelevant
		setIrrelevant(item, i) {
			let self = this;
			let params = {
				isIrrelevant: item.isUserIrrelevant ? 1 : 0,
				caseId: item.id,
				irrelevantnUserId: this.userId
			};
			this.$ajax(ApiPath.url.caseInfoIsIrrelevant, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.isUserIrrelevant == 1) {
							this.detailsObj.irrelevant_num = parseInt(this.detailsObj.irrelevant_num) - 1;
							this.detailsObj.isUserIrrelevant = 0;
						} else {
							this.detailsObj.irrelevant_num = parseInt(this.detailsObj.irrelevant_num) + 1;
							this.detailsObj.isUserIrrelevant = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})
				.catch(err => {});
		},

		clickTab(val) {
			this.tabIndex = val;
		},
		getInfoById(val) {
			let param = {
				id: val,
				userId: this.userId
			};
			let self = this;
			uni.request({
				method: 'GET',
				url: ApiPath.url.caseInfoFindChannelId,
				data: param,
				success: res => {
					if (res.data.code == 200) {
						self.detailsObj = res.data.data;
						self.dataComment = res.data.dataComment;
						self.$u.debounce(self.addCaseInfoViewNum(self.id), 2000);
					}
				},
				fail: () => {}
			});
		},
		search(e) {
			console.log(e);
		},
		isShow() {
			this.$refs.drawer.open();
		},
		select(index) {
			this.selectIndex = index;
		},
		goCommentList() {
			uni.navigateTo({
				url: '/pages/commentList/commentList?id=' + this.id + '&type=3'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.rich-text-container {
	.content {
		.image-t {
			width: 750rpx;
			height: 750rpx;
			> image {
				width: 750rpx;
				height: 750rpx;
			}
		}
		.details-box {
			.title {
				font-size: 42rpx;
				font-weight: 600;
				line-height: 60rpx;
				color: #5eb14e;
				opacity: 1;
				padding: 20rpx 40rpx;
			}
			.html-content {
				padding: 20rpx 40rpx;
				min-height: 100rpx;
			}
			.filter-container {
				margin: 20rpx auto;
				width: 708rpx;
				height: 88rpx;
				background: #f4f4f4;
				opacity: 1;
				border-radius: 30rpx;
				display: flex;
				.item {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-weight: 600;
					color: #000000;
					opacity: 1;
				}
				.item:first-child {
					flex: 0.5;
				}
				.item:last-child {
					flex: 0.5;
				}

				.select-tab {
					flex: 1;
					height: 88rpx;
					background: #5eb14e;
					opacity: 1;
					border-radius: 30rpx;
					color: #ffffff;
					opacity: 1;
				}
			}
		}
		.p-40 {
			padding: 20rpx 40rpx;
		}
		.comment-box-c {
			padding-bottom: 40rpx;
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
}
</style>
