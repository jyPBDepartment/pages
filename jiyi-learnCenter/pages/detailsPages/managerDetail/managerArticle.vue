<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> < </view> 
				<view class="title">手册内容</view>
		</view>
		
		<!-- 搜索 -->
		<view class="select">
			<view>
				<u-icon size="40" name="search" class="iconSearch"></u-icon>
				<u-input class="input" placeholder="搜索标题或标签" type="text"  :clearable="true"  border height="64" input-align="center" maxlength="10" v-model="title" />
			<!-- 	<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="center" shape="square" margin="30rpx 0rpx 0rpx 20rpx" style="width: 590rpx;" maxlength="16" ></u-search> -->
			</view>
			<view class="textBtn">Cancle</view>
		</view>
		
		<!-- 列表详情 -->
		<view class="list" v-for="(item, index) in bookList" :key="index" @click="managerArticleJump('./manArticleContent')">
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
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"刮奖刮出一个谢字就足够了 爱情上也一样 没有必要把谢谢惠顾四个字刮得干干净净才肯放手。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"刮奖刮出一个谢字就足够了。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"刮奖刮出一个谢字就足够了 爱情上也一样 没有必要把谢谢惠顾四个字刮得干干净净才肯放手。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"刮奖刮出一个谢字就足够了 爱情上也一样 没有必要把谢谢惠顾四个字刮得干干净净才肯放手。",sum:"1314"},
					{url:"http://60.205.246.126:8001/images/2020/10/12/1602482016341534.jpg",word:"刮奖刮出一个谢字就足够了 爱情上也一样 没有必要把谢谢惠顾四个字刮得干干净净才肯放手。",sum:"1314"}
				]
			}
		},
		methods:{
			backTo() {
				uni.navigateBack({
			
				})
			},
			managerArticleJump(url){
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
			margin-top: 15rpx;
			margin-left: 20rpx;
			
			.backArrow{
				font-weight: bold;
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
			.iconSearch{
				margin:43rpx 0rpx 0rpx 40rpx;
				position: relative;
				z-index: 1;
			}
			.input{
				background-color: #fff;
				margin:-55rpx 0rpx 0rpx 20rpx;
				width: 600rpx;
				input-align: center;
			}
			.textBtn{
				margin-top: 40rpx;
				margin-left: 20rpx;
				color: #318BF6;
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
					margin-left: 600rpx;
					margin-top: -50rpx;
				}
			}
			.underline{
				border: 2rpx solid #BBBBBB;
			}
		}
		
	}
</style>
