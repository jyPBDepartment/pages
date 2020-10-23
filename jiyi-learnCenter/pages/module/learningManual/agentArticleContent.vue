<template>
	<view class="container">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">文章详情</view>
				<view class="star">
					<u-icon :name="name" size="38" :style="style" @click="collection"></u-icon>
				</view>
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
		<u-toast ref="uToast" />
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				name:'heart',
				style:'color:#333333',
				articleList:[
					{title:"不要紧，山野都有雾灯.",read:"300",publicTime:"2020-02-19 12:23:46",readGuide:"少女的征途是星辰大海，而并非烟尘人间.经销商。",url:"http://60.205.246.126/images/2020/10/15/1602727948520251.jpg",articleContent:"故事的开始，总会有个人，故意选择隐匿他的过去，惟你，让我的回忆汹涌而平静。"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
			collection(){
				if(this.name=="heart"){
					this.name = "heart-fill";
					this.style="color:red";
					this.$refs.uToast.show({
						title: '收藏成功，请到我的收藏查看手册。',
						type: 'success'
					});
				}else{
					this.name = "heart";
					this.style="color:#333";
					this.$refs.uToast.show({
						title: '已取消收藏',
						type: 'info'
					});
				}
			}
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
			.star{
				margin-left: 250rpx;
				margin-top: 2rpx;
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
