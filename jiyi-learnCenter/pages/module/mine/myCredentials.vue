<template>
	<view class="content">
		<!-- 头部 -->
		<header-box title="我的证书" @backTo="backTo"></header-box>
		<!-- 图片 -->
		<view class="credential">
			<view class="package card-box" v-for="(item, index) in creList" :key="index">
				<image class="image" :lazy-load="true"	 :src="item.url || defaultImage" mode="fill"></image>
				<button size="mini" type="primary">长按保存至相册</button>
			</view>
		</view>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';

export default {
	data() {
		return {
			userId: localStorage.getItem('userId'),
			creList: [],
			defaultImage: 'http://60.205.246.126/images/2020/11/16/1605505637623190.jpg' //证书默认图片
		};
	},
	// 页面初始化
	onLoad(e) {
		// 收藏列表初始化
		this.initCredenList();
	},
	methods: {
		initCredenList() {
			uni.request({
				method: 'GET', //请求方式
				data: {
					userId: this.userId
				},
				url: ApiPath.url.getCertificateByUserId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.creList = res.data.data;
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				},
				fail: err => {}
			});
		},
		backTo() {
			uni.switchTab({
				url: '/pages/tabbar/my/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 20rpx;
	.credential {
		margin-top: 80rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0 20rpx;
		.package {
			display: flex;
			flex-direction: column;
			width: 345rpx;
			align-items: center;
			justify-content: flex-start;
			padding: 20rpx;
			margin-top: 20rpx;
			.image {
				width: 305rpx;
				height: 446rpx;
				margin-bottom: 20rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
