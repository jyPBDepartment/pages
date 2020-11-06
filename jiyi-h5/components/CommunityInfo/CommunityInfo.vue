<template>
	<view class="content" @click="jump(communityInfo)">
		<view class="title">
			{{ communityInfo.name }}
		</view>
		<view class="simple o-e3">
			{{ communityInfo.code }}
		</view>
		<view class="article-info">
			<view style="width: 168rpx;">{{ communityInfo.author }}</view>
			<view class="g-f-1">{{ communityInfo.commentSize }}评论</view>
			<view style="color: #999999;">{{ communityInfo.time }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CommunityInfo",
		props: {
			communityInfo: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods:{
			jump(item){
				this.$emit("click",item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		border-bottom: 1rpx solid rgba(217, 217, 217, 1);
		margin:0 30rpx;
		padding: 20rpx 0;
		
		.title {
			font-weight: bold;
			line-height: 54rpx;
			margin: 12rpx 0;
			font-size: 32rpx;
			
			
		}

		.simple {
			height: 128rpx;
			line-height: 40rpx;
			margin: 12rpx 0;
			background-color: #f4f4f4;
			padding: 10rpx;
			border-radius: 8rpx;
			
		}
		.article-info{
			display: flex;
			justify-content: space-between;
		}
	}
</style>
