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
		<view class="content" >
			<view class="title">
				{{title}}
			</view>
			<view class="smallTitle">
				<view class="read">
					阅读：{{studyNum}}
				</view>
				<view class="pulicTime">
					发布时间：{{createDate}} 
				</view>
			</view>
			<view class="ReadGuide">
				<b>[导读]</b>{{guide}}
			</view>
			<view class="img">
				<image class="contentImg" :src="url"></image>
			</view>
			<u-parse :html="content" :selectable="true" :show-with-animation="true" class="parse" ></u-parse>
		</view>
	</view>
	
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default {
		data() {
			return {
				userId: "asdsadsad",
				title:"",
				studyNum:"",
				createDate:"",
				guide:"",
				url:"",
				content:""
			}
		},
		onLoad(e) {
			// 文章内容初始化
			this.collectionArticle(e.id);
		},
		methods:{
			// 文章内容详情显示
			collectionArticle(val){
				let param = {
					id:val
				}
				uni.request({
					method: 'GET', //请求方式
					data: {
						param,
						userId:this.userId,
						isCollection:1
					}, //请求数据
					url: ApiPath.url.findCollection, //请求接口路径
					success: (res) => { //成功返回结果方法
					// console.log(JSON.stringify(res.data.data[0].title))
					if (res.data.code == 200) {
						this.title = res.data.data[0].title
						this.studyNum = res.data.data[0].studyNum
						this.createDate =  res.data.data[0].createDate
						this.guide =  res.data.data[0].guide
						this.url =  res.data.data[0].url
						this.content =  res.data.data[0].content
					}else{
							uni.showToast({
								title: "服务器出错，请联系管理员"
							})
						}
					}
				
				})
			},
			// 返回上一页
			backTo() {
				uni.navigateBack({
			
				})
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
			.parse{
					margin:0rpx 10rpx;
			}
			
		}
	}
</style>
