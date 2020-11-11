<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo"> 
				 <u-icon name="arrow-left" color="#333" size="32"></u-icon> 
				 </view> 
				<view class="title">报名课程</view>
		</view>
		<!-- 内容 -->
		<view class="contain ">
			<view class="examGrade animate__animated animate__slideInRight" v-for="(item,index) in examScoreList" :key="index">
					<view class="examTime">
						<view class="title">
							{{item.vocationName}}--{{item.lessonName}}
						</view>
						<view class="type" v-if="item.status == '0'" >
							已开始
						</view>
						<view class="type" v-if="item.status == '1'" >
							取消报名
						</view>
						<view class="type" v-if="item.status == '2'" >
							已结束
						</view>
					</view>
					<view class="examTime">
						<view class="time">
							<b>课程时间：</b> {{item.lessonTime}}
						</view>
					</view>
					<view class="examTime">
						<view class="title">
							<b>课程地点：</b>{{item.address}}
						</view>
						
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default{
		data(){
			return{
				// type=0为已开始，type=1为取消报名，type=2为已结束
				examScoreList:[
					// {type:'0',title:'供应商认证、平台服务',beginTime:'2020/08/12 13:46',endTime:'2020/10/12 13:46',address:'吉林省长春市南关区长春大学1号教学楼2楼201室'},
					// {type:'1',title:'供应商认证、平台服务',beginTime:'2020/11/03 13:46',endTime:'2021/10/12 13:46',address:'吉林省长春净月国家高新技术产业开发区福祉大路1016号'},
					// {type:'2',title:'供应商认证、平台服务',beginTime:'2020/11/11 13:46',endTime:'2021/10/12 13:46',address:'吉林省长春市净月开发区天富路1567号中国长春人力资源产业园B11栋(12)层'}
				],
				userId: localStorage.getItem("userId")
			}
		},
		onLoad(e) {
			// 文章内容初始化
			this.initUserCourseInfo();
		},
		methods:{
			initUserCourseInfo(){
				uni.request({
					url: ApiPath.url.getLessonsByUserId,
					method: "GET",
					data: {
						userId:this.userId
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.examScoreList = res.data.data
							// console.log(JSON.stringify(this.examScoreList))
						} else {
							uni.showToast({
								title: "服务器出错，请联系管理员"
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title: "系统初始化失败，请联系管理员"
						})
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
		display: flex;
		flex-direction: column;
		.head{
			display: flex;
			background-color: #F8F8F8;
			height: 90rpx;
			.backArrow{
				margin-top: 25rpx;
			}
			.title{
				margin:20rpx 0 0 250rpx;
				font-size: 35rpx;
			}
		}
		.contain{
			display: flex;
			flex-direction: column;
			margin: 30rpx 20rpx;
			.examGrade{
				display: flex;
				flex-direction: column;
				background-color: pink;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				.examTime{
					display: flex;
					justify-content: space-between;
					margin-top: 10rpx;
					padding: 0rpx 20rpx 4rpx 20rpx;
					.type{
						border: 2rpx solid #fff;
						background-color: #fff;
						font-size: 20rpx;
						border-radius: 6rpx;
					}
				}
			}
		
		}
		
	}
	
</style>
