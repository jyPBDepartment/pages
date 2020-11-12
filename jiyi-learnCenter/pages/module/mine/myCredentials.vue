<template>
	<view class="content">
		<!-- 头部 -->
		<header-box title="我的证书" @backTo="backTo"></header-box>
		<!-- 图片 -->
		<view class="credential">
			<view class="package card-box" v-for="(item, index) in creList" :key="index">
				<image class="image" :src="item.url" mode="fill"></image>
				<button size="mini" type="primary" @click="btnFunction">保存至相册</button>
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
		btnFunction() {
			uni.chooseImage({
				count: 1,
				sourceType: ['camera'],
				success: function(res) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePaths[0],
						success: function() {
							console.log('save success');
						}
					});
				}
			});
		},
		backTo() {
			uni.navigateBack(-1);
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
