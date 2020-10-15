<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">手册内容</view>
		</view>
		
		<!-- 搜索 -->
		<view class="select">
			<view>
				<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="left" shape="square" margin="30rpx 0rpx 0rpx 20rpx"  maxlength="16" class="input" v-model="title"></u-search>
			</view>
		</view>
		
		<!-- 列表详情 -->
		<view class="list" v-for="(item, index) in bookList" :key="index" @click="supplyArticleJump('./supplyArticleContent')">
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
				bookList:[
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482268784681.jpg",word:"日光斜射过阳台落在脸上 仙人掌立在窗台",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/15/1602729475566615.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/15/1602729475566615.jpg",word:"刮奖刮出一个谢字就足够了。静谧的小路上，灯光撒了一地...",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482268784681.jpg",word:"我们都是赶路者。生老病死，一路赶着走。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482268784681.jpg",word:"疲惫生活中总要有些温暖梦想.我们终究上岸，阳光万里.生活是一堆玻璃渣子找糖.日益努力，然后风生水起.",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/15/1602729405920122.jpg",word:"日光洒满了整个小屋，轻抚着阳台上熟睡的橘猫和多肉...",sum:"1314"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
			// 供应商跳转详情
			supplyArticleJump(url){
				uni.navigateTo({
					url:url
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
			margin:15rpx 0rpx 0rpx 20rpx;
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
						margin: 10rpx;
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
					margin:-50rpx 0rpx 0rpx 600rpx;
				}
			}
			.underline{
				border: 2rpx solid #BBBBBB;
			}
		}
		
	}
</style>
