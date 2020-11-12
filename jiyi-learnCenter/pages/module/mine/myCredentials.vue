<template>
	<view class="content">
		<!-- 头部 -->
		<header-box title="我的证书" @backTo="backTo"></header-box>
		<!-- 图片 -->
		<view class="credential">
			<view class="package card-box" v-for="(item, index) in creList" :key="index">
				<image class="image" :src="item.url" mode="fill"></image>
				<button size="mini" type="primary" @click="btnFunction(item.url)">保存至相册</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			creList: [{ url: 'http://60.205.246.126/images/2020/11/03/1604386819438592.jpg' }, { url: 'http://60.205.246.126/images/2020/11/03/1604386819438592.jpg' }]
		};
	},
	methods: {
		btnFunction(url) {
		
			uni.downloadFile({
				url,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								this.tools.toast('保存成功');
							},
							fail: function() {
								this.tools.toast('保存失败，请稍后重试');
							}
						});
					} else {
						this.tools.toast('下载失败');
					}
				}
			});
		},
		backTo() {
			uni.switchTab({
				url:'/pages/tabbar/my/index'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 20rpx;
	.credential {
		margin-top: 80rpx;
		display: flex;
		justify-content: space-between;
		.package {
			display: flex;
			flex-direction: column;
			width: 345rpx;
			align-items: center;
			justify-content: flex-start;
			padding: 20rpx;
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
