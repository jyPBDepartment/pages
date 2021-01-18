<template>
	<view>
		<HeaderSearch title="我的收藏"></HeaderSearch>
		<view class="top">
			<view class="filter-container">
				<view :class="tabIndex == 1 && 'select-tab'" @tap="clickTab(1)">粮食买卖</view>
				<view :class="tabIndex == 2 && 'select-tab'" @tap="clickTab(2)">看图识病</view>
				<view :class="tabIndex == 3 && 'select-tab'" @tap="clickTab(3)">独家点评</view>
				<view :class="tabIndex == 4 && 'select-tab'" @tap="clickTab(4)">圈子</view>
			</view>
		</view>

		<view class="content">
			<grain-rrading ref="contentList" v-if="tabIndex == 1"></grain-rrading>
			<pictures-diseases ref="contentList"  v-if="tabIndex == 2"></pictures-diseases>
			<exclusive-comments ref="contentList"  v-if="tabIndex == 3"></exclusive-comments>
			<vCommunity ref="contentList"  v-if="tabIndex == 4"></vCommunity>
		</view>
	</view>
</template>

<script>
import grainRrading from './grainRrading.vue';
import picturesDiseases from './picturesDiseases.vue';
import exclusiveComments from './exclusiveComments.vue';
import vCommunity from './community.vue';
export default {
	components: {
		grainRrading,
		picturesDiseases,
		exclusiveComments,
		vCommunity
	},
	onReachBottom() {
		this.getListData();
	},
	data() {
		return {
			tabIndex: 1
		};
	},
	methods: {
		getListData() {
			this.$refs.contentList.getMoreList()
		},
		clickTab(val) {
			this.tabIndex = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	position: fixed;
	top: 88rpx;
	left: 0;
	right: 0;
	z-index: 99;
	background: #ffffff;
	.filter-container {
		margin: 20rpx auto;
		width: 686rpx;
		height: 88rpx;
		background: #f4f4f4;
		opacity: 1;
		border-radius: 30rpx;
		display: flex;
		view {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			font-weight: 600;
			color: #000000;
			opacity: 1;
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

.content {
	margin-top: 140rpx;
}
</style>
