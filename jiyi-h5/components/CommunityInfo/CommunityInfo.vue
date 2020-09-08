<template>
	<view class="content p-10" @click="jump(communityInfo)">
		<view class="title f-16">
			{{ communityInfo.name }}
		</view>
		<view class="simple f-12 o-e3">
			{{ communityInfo.code }}
		</view>
		<view class="article-info f-12 g-flex">
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

<style lang="scss">
	.content {
		border-bottom: 1rpx solid rgba(217, 217, 217, 1);

		.title {
			font-weight: bold;
			line-height: 54rpx;
			margin-bottom: 12rpx;
		}

		.simple {
			height: 124rpx;
			line-height: 40rpx;
		}
	}
</style>
