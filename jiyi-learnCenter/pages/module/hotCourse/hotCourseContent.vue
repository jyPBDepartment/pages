<template>
	<view class="container">
		<!-- 头部 -->
		<view class="head">
			<u-icon name="arrow-left" color="#333" size="44" @click="backTo"></u-icon>
			<view class="title">文章详情</view>
			<!-- <view><u-button @click="share()">分享</u-button></view> -->
			<view class="star"><u-icon :name="name" size="38" :style="style" @click="collection"></u-icon></view>
		</view>

		<!-- 内容 -->
		<view class="contents">
			<view class="title">{{ title }}</view>
			<view class="smallTitle">
				<view class="read">阅读：{{ studyNum }}</view>
				<view class="pulicTime">发布时间：{{ createDate }}</view>
			</view>
			<view class="ReadGuide">
				<b>[导读]</b>
				{{ guide }}
			</view>
			<view class="img"><image class="contentImg" :src="url"></image></view>
			<u-parse class="artContent" :html="content" :selectable="true" :show-with-animation="true"></u-parse>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
// import wx from '@/utils/wechat.js';
export default {
	data() {
		return {
			name: 'heart',
			id: '',
			title: '',
			read: '',
			createDate: '',
			guide: '',
			studyNum: '',
			url: '',
			content: '',
			style: 'color:#333333',
			articleList: [],
			userId: localStorage.getItem('userId'),
			manualInfoId: '',
			isCollection: 0,
			type:''
		};
	},
	onLoad(e) {
		this.id=e.id;
		// 文章内容初始化
		this.learningArticle(e.id);
		this.manualInfoId = e.id;
		this.type = e.type;
	},
	methods: {
		share(){
			//初始化微信配置（重要）
			let callback = true;
			// wx.initJssdkShare(callback,ApiPath.url.getWxConfig);
			
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentRoute = page.route;
		
			//整合分享数据
			let url = '#/'+currentRoute+'?id='+this.id+'&type='+this.type;
			let data = {
				title:this.title,
				desc:this.guide,
				imgUrl:this.url
			}
			// wx.share(data,ApiPath.url.getWxConfig)
		},
		// 文章内容详情显示
		learningArticle(val) {
			let param = {
				id: val,
				userId: this.userId
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.findManualInfoId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.title = res.data.data.title;
						this.createDate = res.data.data.createDate;
						this.guide = res.data.data.guide;
						this.url = res.data.data.url;
						this.content = res.data.data.content;
						this.studyNum = res.data.data.studyNum;
						if (res.data.dataUserManual == null) {
							this.name = 'heart';
							this.style = 'color:#333';
						} else if (res.data.dataUserManual.isCollection == 1) {
							this.name = 'heart-fill';
							this.style = 'color:red';
						}
					} else {
						uni.showToast({
							title: '服务器出错，请联系管理员'
						});
					}
				}
			});
		},
		// 返回
		backTo() {
			if (this.type == 0) {
				//如果type==0，则返回首页；如果type==1，则返回列表页
				uni.reLaunch({
					url: '../../tabbar/main/index'
				});
			} else {
				uni.redirectTo({ url: './hotCourseList' });
			}
		},
		// 收藏
		collection() {
			let isCancel = 0;
			if (this.name == 'heart') {
				this.name = 'heart-fill';
				this.style = 'color:red';
				this.isCollection = 1;
			} else {
				isCancel = 1;
				this.name = 'heart';
				this.style = 'color:#333';
				this.isCollection = 0;
			}
			let param = {
				userId: this.userId,
				manualInfoId: this.manualInfoId,
				isCollection: this.isCollection,
				isCancel: isCancel
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.saveUserManualInfo, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.$refs.uToast.show({
							title: '收藏成功，请到我的收藏查看手册。',
							type: 'success'
						});
					} else {
						this.$refs.uToast.show({
							title: '已取消收藏',
							type: 'info'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;
	.head {
		display: flex;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		height: 80rpx;
		border-bottom: 1rpx solid #f4f4f4;
		.title {
			font-size: 32rpx;
		}
	}
	.contents {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		.title {
			margin-top: 10rpx;
			font-size: 30rpx;
			font-weight: bolder;
			line-height: 60rpx;
		}

		.smallTitle {
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			color: #bbb;
			font-size: 22rpx;
			line-height: 50rpx;
		}
		.ReadGuide {
			margin-top: 10rpx;
			font-weight: 400;
			width: 710rpx;
			word-break: break-all;
		}
		.img {
			margin-top: 10rpx;
			.contentImg {
				width: 710rpx;
				height: 400rpx;
			}
		}
		.artContent {
			margin: 10rpx;
			width: 690rpx;
			word-break: break-all;
		}
	}
}
</style>
