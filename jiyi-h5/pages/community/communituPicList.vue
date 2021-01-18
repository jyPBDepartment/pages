<template>
	<view class="pictues-group"><image v-for="(item, i) in list" class="preview-img" :src="item" :key="i"></image></view>
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
		if(this.picList){
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
		}
	},
	data() {
		return {
			list: []
		};
	},
	methods: {}
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
</style>
