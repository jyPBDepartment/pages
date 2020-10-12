<template>
	<view class="container">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> < </view> 
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
			<view class="video">
				<video id="myVideo" class="contentVideo" :src="item.url"  controls show-fullscreen-btn></video>
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
					{title:"小孩子在很多时候比大人还爱面子，因为世界小，所以，所有的小事都不小。",read:"300",publicTime:"2020-02-19 12:23:46",readGuide:"记绾长条欲别难。盈盈自此隔银湾。便无风雪也摧残。青雀几时裁锦字，玉虫连夜剪春幡。不禁辛苦况相关。供应商。",url:"https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",articleContent:"人生若只如初见，何事秋风悲画扇？等闲变却故人心，却道故人心易变。骊山语罢清宵半，泪雨霖铃终不怨。何如薄幸锦衣郎，比翼连枝当日愿。春花春月年年客，怜春又怕春离别。只为晓风愁，催花扑玉钩。娟娟双蛱蝶，宛转飞花侧。花底一声歌，疼花花奈何。"}
				]
			}
		},
		onReady: function(res) {
		       // #ifndef MP-ALIPAY
		       this.videoContext = uni.createVideoContext('myVideo')
		       // #endif
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
				font-weight: bold;
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
			.video{
				margin:10rpx 0rpx;
				.contentVideo{
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
