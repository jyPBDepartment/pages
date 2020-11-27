<template>
	<view class="comment-list-container">
		<HeaderSearch title="更多点评"></HeaderSearch>
		<view class="tab-container">
			<u-tabs :list="listTab" font-size="28" :current="current" @change="change"></u-tabs>
			<u-line color="#f4f4f4"></u-line>
		</view>
		<view style="padding-top: 88rpx;">
			<view class="list" v-for="(item, i) in commentListData" @tap="goDetails(item.id)" :key="i">
				<view class="left"><image :src="item.url || `../../static/img/tabbar/首页-s-r.png`"></image></view>
				<view class="right">
					<view class="title">{{ item.title }}</view>
					<view class="date">{{ item.updateDate }}</view>
				</view>
			</view>
		</view>

		<view class="no-data" v-if="noData">
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1"></image>
			<text>暂无数据</text>
		</view>

		<u-loadmore v-if="commentListData.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore" />
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';

export default {
	data() {
		return {
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '戳我试试',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			page: 1,
			list: 10,
			listTab: [],
			current: 0,
			selectTab: null,
			commentListData: [],
			nomore: false,
			noData:false,
		};
	},
	created() {
		this.getSectionTab();
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.getCommentList(this.listTab[this.current].id);
	},

	methods: {
		loadmore(){
			this.status = 'loading';
			this.page = ++this.page;
			this.getCommentList(this.listTab[this.current].id);
		},
		change(index) {
			this.current = index;
			this.selectTab = this.listTab[index];
			this.page = 1;
			this.commentListData = [];
			this.getCommentList(this.listTab[index].id);
		},
		goDetails(id) {
			uni.navigateTo({
				url: '/pages/grain/commentDetails?commentId=' + id
			});
		},
		getCommentList(id) {
			let self = this;
			let params = {
				sectionId: id,
				page: self.page,
				size: 10
			};
			self.$ajax(ApiPath.url.findArticleList, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (res.data.content.length < 10) {
							self.nomore = true;
							self.status = 'nomore';
							self.commentListData = self.commentListData.concat(res.data.content);
							if(self.commentListData.length == 0){
								self.noData = true
							}else{
								self.noData = false
							}
						} else {
							setTimeout(() => {
								self.nomore = false;
								self.status = 'loadmore';
								self.commentListData = self.commentListData.concat(res.data.content);
								if(self.commentListData.length == 0){
									self.noData = true
								}else{
									self.noData = false
								}
							}, 200);
						}
						
					}
				})
				.catch(err => {});
		},
		getSectionTab() {
			let self = this;
			this.$ajax(ApiPath.url.findSectionList, 'GET', {})
				.then(res => {
					if (res.code == 200) {
						self.listTab = res.data;
						self.commentListData = [];
						self.getCommentList(self.listTab[0].id);
						
					}
				})
				.catch(err => {});
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
			padding: 0 0 20rpx 20rpx;
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
	.tab-container {
		position: fixed;
		height: 80rpx;
		top: 88rpx;
		background: #007aff;
		left: 0;
		right: 0;
		z-index: 22;
	}
	.no-data {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 160rpx;
		> image {
			width: 300rpx;
			height: 300rpx;
		}
		text {
			font-size: 28rpx;
			color: #999;
		}
	}
}
</style>
