<template>
	<view class="comment-list-container">
		<HeaderSearch title="更多点评"></HeaderSearch>
		<u-tabs :list="listTab" font-size="28" :current="current" @change="change"></u-tabs>
		<u-line color="#f4f4f4"></u-line>
		<view class="list" v-for="(item, i) in commentListData" @tap="goDetails(item.id)" :key="i">
			<view class="left"><image :src="item.url || `../../static/img/tabbar/首页-s-r.png`"></image></view>
			<view class="right">
				<view class="title">{{ item.title }}</view>
				<view class="date">{{ item.updateDate }}</view>
			</view>
		</view>
		<view class="no-data" v-if="commentListData.length <= 0">
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1"></image>
			<text>暂无数据</text>
		</view>

		<u-loadmore v-if="commentListData.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" />
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
				loadmore: '上啦加载更多',
				loading: '正在加载中...',
				nomore: '没有更多'
			},
			page: 1,
			list: 10,
			listTab: [
				{
					id: '402881ee75fd0a5d0175fd0b47ba0001',
					name: '版块名称1',
					createBy: 'admin',
					createDate: '2020-11-25 09:36:16',
					updateBy: 'admin',
					updateDate: '2020-11-25 09:54:45',
					status: 0
				},
				{
					id: '402881ed75f8250c0175f826f7380003',
					name: '版块名称2',
					createBy: 'admin',
					createDate: '2020-11-24 10:48:25',
					updateBy: 'admin',
					updateDate: '2020-11-24 15:53:57',
					status: 0
				}
			],
			current: 0,
			selectTab: null,
			commentListData: [],
			nomore: false
		};
	},
	onShow() {
		this.getSectionTab();
		this.getCommentList(this.listTab[0].id);
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.getCommentList(this.listTab[0].id);
		// setTimeout(() => {
		// 	this.status = 'loadmore';
		// }, 2000);
	},

	methods: {
		change(index) {
			this.current = index;
			this.selectTab = this.listTab[index];
			this.commentListData = [];
			this.getCommentList(this.listTab[index].id);
		},
		goDetails(id) {
			uni.navigateTo({
				url: '/pages/grain/commentDetails?commentId='+id
			});
		},
		getCommentList(id) {
			let self = this;
			let params = {
				sectionId: id,
				page: this.page,
				size: 10
			};
			this.$ajax(ApiPath.url.findArticleList,'GET',params).then((res)=>{
				if (res.code == 200) {
					if (res.data.content.length < 10) {
						self.nomore = true;
						self.status = 'nomore';
						self.commentListData = self.commentListData.concat(res.data.content);
					} else {
						setTimeout(() => {
							self.status = 'loadmore';
							self.commentListData = self.commentListData.concat(res.data.content);
						}, 2000);
					}
				}
			}).catch((err)=>{
				
			})
		},
		getSectionTab() {
			let self = this;
			this.$ajax(ApiPath.url.findSectionList,'GET',{}).then((res)=>{
				if (res.code == 200) {
					console.log(res.data)
				}
			}).catch((err)=>{
				
			})
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
	.no-data {
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 80rpx;
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
