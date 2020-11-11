<template>
	<view id="offlineSignUpShow">
		
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					<u-icon name="arrow-left"></u-icon>
				</view>
			</u-col>
			<u-col span="11">
				<view class="title">报名</view>
			</u-col>
		</u-row>
		
		<view style="padding-top: 40rpx;">
			<u-row>
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					姓名:
				</u-col>
				<u-col span="8">
					<span>{{name}}</span>
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 50rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					身份证号:
				</u-col>
				<u-col span="8">
					<span>{{idCard}}</span>
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 50rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					手机号:
				</u-col>
				<u-col span="8">
					<span>{{phone}}</span>
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 80rpx;">
				<u-col span="7">
					<view style="text-align: center;margin-top: 20rpx;">
						<!-- 确认报名弹出框 -->
						<u-popup v-model="show" mode="center" border-radius="14" width="650rpx" height="330rpx" :mask-close-able="false" >
							<view style="text-align: center;padding-top: 10rpx; font-size: 14px;">温馨提示</view>
							<u-line color="#515151" style="padding-top: 10rpx;width: 620rpx; margin-left: 15rpx;"></u-line>
							<u-icon name="checkbox-mark" color="#00aa00" size="90"></u-icon>
							<view style="padding-top: 10rpx;font-size: 16px;">《{{className}}》报名成功，请您准时参加!</view>
							<u-line color="#515151" style="padding-top: 10rpx;width: 620rpx; margin-left: 15rpx;"></u-line>
							<view style="padding-top: 20rpx;">
								<u-button type="primary" size="mini" @click="close(show = false)">关闭</u-button>
							</view>
						</u-popup>
						<u-button type="primary" size="mini" @click="confirm()">确定报名</u-button>
					</view>
				</u-col>
				<u-col span="1">
					<view style="text-align: center;margin-top: 20rpx;">
						<u-button type="primary" size="mini" @click="reEdit()">重新编辑</u-button>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default {
		data() {
			return {
				show: false,
				cencalIsShow: false,
				name:'',
				idCard:'',
				phone:'',
				id:'',
				lessonId:'',
				userId:'',
				userName:'',
				userTel:'',
				className:'',
			}
		},
		onLoad(e) {
			this.name=e.name;
			this.idCard=e.idCard;
			this.phone=e.phone;
			this.className = e.title
			this.lessonId = e.lessonId
		},
		methods: {
			//确认报名
			confirm(){
				let param = {
					lessonId:this.lessonId,
					userId:localStorage.getItem("userId"),
					userName: this.name,
					useTel:this.phone
				};
				
				uni.request({
				  method: "GET", //请求方式
				  data: param, //请求数据
				  url: ApiPath.url.enrollLesson, //请求接口路径
				  success: (res) => {
				    //成功返回结果方法
				    if (res.data.code == 200) {
						this.show = true
				    }
					else if(res.data.code == 6001) {
						uni.showToast({
						  title: "该课程报名人数已达上限",
						});
					}
					 else {
				      uni.showToast({
				        title: "报名失败,联系管理员或重新报名",
				      });
				    }
				  },
				});
				
			},
			
			//重新编辑跳转
			reEdit(){
				uni.navigateTo({
					url: '../offlineCourses/offlineSignUp?index=1&name='+this.name+'&idCard='+this.idCard+'&phone='+this.phone+'&lessonId='+this.lessonId+'&title='+this.className+''
				})
			},
			
			//弹出层关闭跳转到课程列表页
			close(){
				uni.navigateTo({
					url: '../offlineCourses/offlineDetails?id='+this.lessonId
				})
			},
			
			//返回
			backTo() {
				uni.navigateBack({
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#offlineSignUpShow {
		.title {
			text-align: center;
			font-size: 16px;
		}
	}
</style>
