<template>
	<view class="container">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">文章详情</view>
		</view>
		
		<!-- 内容 -->
		<view class="content" v-for="(item,index) in articleList" :key="index">
			<view class="title">
				{{item.title}}
			</view>
			<view class="smallTitle">
				<view class="read">
					阅读：{{item.read}}
				</view>
				<view class="pulicTime">
					发布时间：{{item.publicTime}} 
				</view>
			</view>
			<view class="ReadGuide">
				<b>[导读]</b>{{item.readGuide}}
			</view>
			<view class="img">
				<image class="contentImg" :src="item.url"></image>
			</view>
			<view class="artContent">
				{{item.articleContent}}
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				articleList:[
					{title:"小孩子在很多时候比大人还爱面子，因为世界小，所以，所有的小事都不小。",read:"300",publicTime:"2020-02-19 12:23:46",readGuide:"小院闲窗春色深。重帘未卷影沈沈。倚楼无语理瑶琴。远岫出山催薄暮，细风吹雨弄轻阴。梨花欲谢恐难禁。供应商。",url:"http://60.205.246.126:8001/images/2020/09/29/1601371541428254.jpg",articleContent:"人生若只如初见，何事秋风悲画扇？等闲变却故人心，却道故人心易变。骊山语罢清宵半，泪雨霖铃终不怨。何如薄幸锦衣郎，比翼连枝当日愿。春花春月年年客，怜春又怕春离别。只为晓风愁，催花扑玉钩。娟娟双蛱蝶，宛转飞花侧。花底一声歌，疼花花奈何。"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
		}
		}
</script>

<style lang="scss" scoped>
	.container{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head{
			display: flex;
			margin:15rpx 0rpx 10rpx 20rpx ;
			
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 35rpx;
			}
		}
		.content{
			display: flex;
			flex-direction: column;
			margin-top: 15rpx;
			background-color: #fff;
			.title{
				margin:10rpx 15rpx 10rpx 30rpx;
				font-size: 30rpx;
				font-weight: bolder;
			}
			.smallTitle{
				display: flex;
				justify-content: space-between;
				color: #bbb;
				font-size: 22rpx;
				margin:10rpx 15rpx 10rpx 30rpx;
			}
			.ReadGuide{
				margin:10rpx 15rpx 10rpx 30rpx;
				font-weight: 400;
			}
			.img{
				margin:10rpx 0rpx;
				.contentImg{
					width: 750rpx;
					height: 400rpx;
				}
			}
			.artContent{
					margin:0rpx 10rpx;
			}
			
		}
	}
</style>
