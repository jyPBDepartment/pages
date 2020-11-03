<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">我的证书</view>
		</view>
		<!-- 图片 -->
		<view class="credential"> 
			<view class="package" v-for="(item,index) in creList" :key="index">
				<view class="creImage">
					<image class="image" :src="item.url" mode="fill"></image>
				</view>
				<view>
					<button size="mini" class="btn" @click="btnFunction"> 保存至相册</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				creList:[
					{url:'http://60.205.246.126/images/2020/11/03/1604386819438592.jpg'},
					{url:'http://60.205.246.126/images/2020/11/03/1604386819438592.jpg'}
				]
			}
		},
		methods:{
			btnFunction(){
				uni.chooseImage({
				    count: 1,
				    sourceType: ['camera'],
				    success: function (res) {
				        uni.saveImageToPhotosAlbum({
				            filePath: res.tempFilePaths[0],
				            success: function () {
				                console.log('save success');
				            }
				        });
				    }
				});
			},
			backTo() {
				uni.navigateBack({
			
				})
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.head{
			display: flex;
			padding: 15rpx 0 0 20rpx;
			background-color: #F8F8F8;
			width: 750rpx;
			height: 80rpx;
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 35rpx;
			}
		}
		.credential{
			display: flex;
			.package{
				display: flex;
				flex-direction: column;
				margin: 22rpx;
				.creImage{
					.image{
						width: 330rpx;
						height: 446rpx;
					}
				}
					.btn{
						margin:16rpx 0 0 56rpx;
					}
			}
		}
	}
</style>
