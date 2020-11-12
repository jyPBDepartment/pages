<template>
	<view class="container">
		<!-- 头部 -->
		<header-box title="文章详情" @backTo="backTo"></header-box>
		<!-- 内容 -->
		<view class="content"  style="margin-top: 80rpx;">
			<view class="title">{{ title }}</view>
			<view class="smallTitle">
				<view class="read">阅读：{{ studyNum }}</view>
				<view class="pulicTime">发布时间：{{ createDate }}</view>
			</view>
			<view class="ReadGuide">
				<b>[导读]</b>
				{{ guide }}
			</view>
			<view class="img"><image class="contentImg" :src="url"></image></view>
			<u-parse :html="content" :selectable="true" :show-with-animation="true" class="parse"></u-parse>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			userId: localStorage.getItem('userId'),
			title: '',
			studyNum: '',
			createDate: '',
			guide: '',
			url: '',
			content: '',
			id: ''
		};
	},
	onLoad(e) {
		// 文章内容初始化
		this.collectionArticle(e.id);
		this.id = e.id;
	},
	methods: {
		// 文章内容详情显示
		collectionArticle(val) {
			uni.request({
				method: 'GET', //请求方式
				data: {
					id: val,
					userId: this.userId,
					isCollection: 1
				}, //请求数据
				url: ApiPath.url.getManualListByUserId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						for (let i = 0; i < res.data.data.length; i++) {
							if (this.id == res.data.data[i].id) {
								this.title = res.data.data[i].title;
								this.studyNum = res.data.data[i].studyNum;
								this.createDate = res.data.data[i].createDate;
								this.guide = res.data.data[i].guide;
								this.url = res.data.data[i].url;
								this.content = res.data.data[i].content;
							}
						}
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				}
			});
		},
		// 返回上一页
		backTo() {
			uni.redirectTo({ url: './myCollection' });
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;

	.content {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.title {
			margin-top: 10rpx;
			font-size: 30rpx;
			font-weight: bolder;
			line-height: 60rpx;
		}

		.smallTitle {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			color: #bbb;
			font-size: 22rpx;
			line-height: 50rpx;
		}
		.ReadGuide {
			margin-top: 10rpx;
			font-weight: 400;
			width: 710rpx;
			word-break: break-all;
		}
		.img {
			margin-top: 10rpx;
			.contentImg {
				width: 710rpx;
				height: 400rpx;
			}
		}
		.parse {
			margin: 10rpx;
			width: 690rpx;
			word-break: break-all;
		}
	}
}
</style>
