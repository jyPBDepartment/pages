<template>
	<view class="content">
		<!-- 头部 -->
		
		<view class="head">
				<view class="backArrow" @click="backTo"> 
					<u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				</view> 
				<view class="title">我的收藏</view>
		</view>
		
		<!-- 列表详情 -->
		<view class="list" v-for="(item, index) in collectionList" :key="index"  @click="collectionJump(item.id)">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.title}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.studyNum}}人已学</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>
		
	</view>
	
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default{
		
		data(){
			return{
				userId: "asdsadsad",
				collectionList:[]
			}
		},
		// 页面初始化
		onLoad(e) {
			// 收藏列表初始化
			this.initCollectionList();
		},
		methods:{
			// 收藏列表初始化
			initCollectionList(){
				uni.request({
					method: 'GET', //请求方式
					data: {
						userId:this.userId,
						isCollection:1
					},
					url: ApiPath.url.findCollection, //请求接口路径
					success: (res) => { //成功返回结果方法
						if (res.data.code == 200) {
							this.collectionList = res.data.data;
						} else {
							uni.showToast({
								title: "服务器出错，请联系管理员"
							})
						}
						
					},
					fail: (err) => {
						
					}
				
				})
			},		
			// 返回上一页
			backTo() {
				uni.navigateBack({
			
				})
			},
			// 我的收藏跳转详情页面
			collectionJump(getId){
				uni.navigateTo({
					url:'./collectionContent?id='+getId
				})
			},
			
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
			margin: 15rpx 0rpx 30rpx 20rpx;
			.backArrow{
				margin-top: 16rpx;
			}
			.title{
				margin-left: 250rpx;
				margin-top: 10rpx;
				font-size: 35rpx;
			}
		}
		.u-sticky{
			  position: -webkit-sticky;
			  position: sticky;
			  top: 2rpx;
			  z-index: 999;
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
