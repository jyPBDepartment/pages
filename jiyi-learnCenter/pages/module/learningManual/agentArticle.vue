<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> <u-icon name="arrow-left" color="#333" size="32"></u-icon> </view> 
				<view class="title">手册内容</view>
		</view>
		
		<!-- 搜索 -->
		<view class="select">
			<view>
			<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="left" shape="square" margin="30rpx 0rpx 0rpx 20rpx"  maxlength="16" class="input" v-model="title"></u-search>
			</view>
		</view>
		
		<!-- 列表详情 -->
		<view class="list" v-for="(item, index) in agentList" :key="index"  @click="agentArticleJump('./agentArticleContent')">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.word}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.sum}}人已学</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				agentList:[
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481525521725.jpg",word:"人的欲望永无止尽 就像我一开始 只是想要知道你的名字",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481589403089.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481543327363.jpg",word:"刮奖刮出一个谢字就足够了。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481589403089.jpg",word:"你眼里有全宇宙 胜过我见过的所有山川河流",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481564370430.jpg",word:"孺子含辛，隐忍不嗔。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
			// 经销商文章跳转详情页面
			agentArticleJump(url){
				uni.navigateTo({
					url: url
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head{
			display: flex;
			margin: 15rpx 0rpx 0rpx 20rpx;
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 35rpx;
			}
		}
		.select{
			display: flex;
			height: 120rpx;
			background-color:#C9C9CE;
			margin-top: 20rpx;
			.input{
				width: 700rpx;
			}
			.uni-input-placeholder{
				margin-left: 200rpx;
			}
		}
		.list{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.listOne{
				display: flex;
				margin-top: 10rpx;
				.img{
					.listImg{
						width: 220rpx;
						height: 160rpx;
						margin: 10rpx 10rpx;
					}
				}
				.listText{
					font-size: 26rpx;
					margin:15rpx 10rpx 0rpx 20rpx;
				}
			}
			.listSen{
				.bride{
					font-size: 22rpx;
					color: #BFBFBF;
					margin: -50rpx 0rpx 0rpx 600rpx;
				}
			}
			.underline{
				border: 2rpx solid #BBBBBB;
			}
		}
		
	}
</style>
