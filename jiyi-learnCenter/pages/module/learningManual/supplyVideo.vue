<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
			<view class="backArrow" @click="backTo">
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
			</view> 
			<view class="title">手册内容
			</view>
		</view>

		<!-- 搜索 -->
		<view class="select">
			<view>
				<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="left" shape="square" margin="30rpx 0rpx 0rpx 20rpx"  maxlength="16" class="input" v-model="title"></u-search>
			</view>
		</view>

		<!-- 列表详情 -->
		<view class="list" @click="supplyVideoJump('./supplyVideoContent')">
		<view class="listOne" v-for="(item, index) in videoList" :key="index">
			<view class="videoStyle">
				<video id="myVideo" class="video" :src="item.url"  controls show-fullscreen-btn></video>
			</view>
			<view class="listText">{{item.word}}</view>
			</view>
		</view> 
	
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title:'',
				videoList: [{
						url: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						word: "刮奖刮出一个谢字就足"
					},
					{
						url: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						word: "培养农业职业经理人，"
					},
					{
						url: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						word: "刮奖刮出一个谢字就足",
						sum: "1314"
					},
					{
						url: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4",
						word: "刮奖刮出一个谢字就足",
						sum: "1314"
					},
				
				]
			}
		},
		 onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		    },
		methods: {
			backTo() {
				uni.navigateBack({

				})
			},
			// 视频播放错误回馈
			videoErrorCallback: function(e) {
			       uni.showModal({
			            content: e.target.errMsg,
			            showCancel: false
			       })
			  },
			  // 供应商视频跳转
			  supplyVideoJump(url){
			  	uni.navigateTo({
			  		url:url
			  	})
			  }
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;

		.head {
			display: flex;
			margin: 15rpx 0rpx 0rpx 20rpx;
			.backArrow {
				margin-top: 6rpx;
			}

			.title {
				margin-left: 250rpx;
				font-size: 35rpx;
			}
		}

		.select {
			display: flex;
			height: 120rpx;
			background-color: #C9C9CE;
			margin-top: 20rpx;
			.input{
				width: 700rpx;
				
			}
			.uni-input-placeholder{
				margin-left: 200rpx;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			.listOne {
				display: flex;
				flex-direction: column;
				margin-top: 10rpx;
				.videoStyle{
					margin-top: 10rpx;
					.video{
						width: 350rpx;
						height: 200rpx;
						margin-left: 17rpx;
					}
				}
				.listText{
					font-size: 28rpx;
					text-align: center;
				}
			}
		}

	}
</style>
