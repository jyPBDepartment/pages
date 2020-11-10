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
		<view class="contents" >
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
			<u-parse class="artContent" :html="content" :selectable="true" :show-with-animation="true" ></u-parse>
		</view>
		<u-toast ref="uToast" />
	</view>
	
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default {
		data() {
			return {
				name:'heart',
				id:"",
				title:"",
				read:"",
				createDate:"",
				guide:"",
				studyNum:"",
				url:"",
				content:"",
				style:'color:#333333',
				articleList:[],
				userId: localStorage.getItem("userId"),
				manualInfoId:"",
				isCollection: 0
			}
		},
		onLoad(e) {
			// 文章内容初始化
			this.learningArticle(e.id);
			this.manualInfoId = e.id;
		},
		methods:{
			// 文章内容详情显示
			learningArticle(val){
				let param = {
					id:val
				}
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.findArticleContent, //请求接口路径
					success: (res) => { //成功返回结果方法
					if (res.data.code == 200) {
						this.title = res.data.data.title
						this.createDate = res.data.data.createDate
						this.guide = res.data.data.guide
						this.url = res.data.data.url
						this.content = res.data.data.content
						this.studyNum = res.data.data.studyNum
						if(res.data.dataUserManual == null){
							this.name = "heart";
							this.style="color:#333";
						}
						else if(res.data.dataUserManual.isCollection == 1){
							this.name = "heart-fill";
							this.style="color:red";
						}
					}else{
							uni.showToast({
								title: "服务器出错，请联系管理员"
							})
						}
					}
				})
			},
			backTo() {
				uni.redirectTo({url: './agentArticle'})
			},
			// 收藏
			collection(){
				let isCancel = 0;
				if(this.name=="heart"){
					this.name = "heart-fill";
					this.style="color:red";
					this.isCollection = 1;
				}else{
					isCancel = 1;
					this.name = "heart";
					this.style="color:#333";
					this.isCollection = 0;
				}
				let param = {
					userId:this.userId,
					manualInfoId:this.manualInfoId,
					isCollection:this.isCollection,
					isCancel:isCancel
				}
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.saveUserManualInfo, //请求接口路径
					success: (res) => { //成功返回结果方法
					if (res.data.code == 200) {
						this.$refs.uToast.show({
							title: '收藏成功，请到我的收藏查看手册。',
							type: 'success'
						});
					}else{
						this.$refs.uToast.show({
							title: '已取消收藏',
							type: 'info'
						});
						}
					}
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
			.star{
				margin-left: 250rpx;
				margin-top: 2rpx;
			}
		}
		.contents{
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
				width: 710rpx;
				word-break:break-all;
				
			}
			.img{
				margin:10rpx 0rpx;
				.contentImg{
					width: 750rpx;
					height: 400rpx;
				}
			}
			.artContent{
					margin:0rpx 20rpx;
					width: 710rpx;
					word-break:break-all;
			}
			
		}
	}
</style>
