<template>
	<view class="pictues-group">
		<image :lazy-load="true" v-for="(item, i) in list" class="preview-img" :src="item" :key="i" @click="showBigImg(item)"></image>
		<u-mask :show="show" :custom-style="{ background: 'rgba(0, 0, 0, 0.7)' }" @click="show = false">
			<view class="preview-img-big" v-show="show"><image :src="imgUrl" mode="widthFix"></image></view>
		</u-mask>
	</view>
</template>

<script>
export default {
	props: {
		picList: {
			type: String,
			default: ''
		}
	},
	created() {
		if (this.picList) {
			this.list = this.picList.split(',');
		}
	},
	watch: {
		picList(newValue) {
			if (newValue) {
				this.list = this.picList.split(',');
			} else {
				this.list = [];
			}
		},
		show(newValue) {
			if (!newValue) {
				this.imgUrl = '';
			}
		}
	},
	data() {
		return {
			list: [],
			show: false,
			imgUrl: ''
		};
	},
	methods: {
		showBigImg(url) {
			console.log(111111111111);
			this.imgUrl = url;
			this.show = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.pictues-group {
	padding: 0 20rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: start;
	.preview-img {
		height: 220rpx;
		width: 220rpx;
		margin: 0rpx 0 15rpx 15rpx;
		border-radius: 10rpx;
	}
}
.preview-img-big {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
	background: rgba(0, 0, 0, 0.8);
	> image {
		width: 750rpx;
	}
}
</style>
