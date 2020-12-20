<template>
	<view class="content">
		<header-box title="我的收藏" @backTo="backTo"></header-box>
		<!-- 列表详情 -->
		<view class="list-box">
			<view class="list" v-for="(item, index) in collectionList" :key="index" @click="collectionJump(item.id)">
				<view class="listOne"><image class="listImg" :src="item.url"></image></view>
				<view class="listSen">
					<view class="listText">{{ item.title }}</view>
					<view class="bride">{{ item.studyNum }}人已学</view>
				</view>
			</view>
			<data-empty v-if="collectionList.length == 0" :option="{tip:'暂无收藏'}"></data-empty>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			userId: localStorage.getItem('userId'),
			collectionList: []
		};
	},
	// 页面初始化
	onLoad(e) {
		// 收藏列表初始化
		this.initCollectionList();
	},
	methods: {
		// 收藏列表初始化
		initCollectionList() {
			uni.request({
				method: 'GET', //请求方式
				data: {
					userId: this.userId,
					isCollection: 1
				},
				url: ApiPath.url.getManualListByUserId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.collectionList = res.data.data;
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				},
				fail: err => {}
			});
		},
		// 返回上一页
		backTo() {
			uni.switchTab({
				url: '../../tabbar/my/index'
			});
		},
		// 我的收藏跳转详情页面
		collectionJump(getId) {
			uni.navigateTo({
				url: './collectionContent?id=' + getId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;

	.list-box {
		margin-top: 80rpx;
		.list {
			display: flex;
			background-color: #fff;
			padding: 20rpx;
			border-bottom: 2rpx solid #f4f4f4;
			.listOne {
				.listImg {
					width: 220rpx;
					height: 160rpx;
				}
			}
			.listSen {
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				width: 100%;
				padding-left: 20rpx;
				.listText {
					font-size: 28rpx;
				}
				.bride {
					font-size: 24rpx;
					color: #bfbfbf;
					text-align: right;
				}
			}
		}
	}
}
</style>
