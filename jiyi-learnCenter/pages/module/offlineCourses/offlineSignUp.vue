<template>
	<view id="offlineSignUp">
		
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
		
		<view style="padding-top: 30rpx;">
			<u-row>
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					姓名:
				</u-col>
				<u-col span="8">
					<u-input type="text" placeholder="输入姓名" :focus="true" v-model="name" border height="54" />
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 40rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					身份证号:
				</u-col>
				<u-col span="8">
					<u-input type="text" placeholder="输入身份证号" :focus="true" v-model="idCard" border height="54" />
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 40rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					手机号:
				</u-col>
				<u-col span="5">
					<u-input type="text" placeholder="输入手机号" :focus="true" maxlength="11" v-model="phone" border height="54" />
				</u-col>
				<u-col span="2">
					<u-button size="mini" >获取验证码</u-button>
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 40rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					验证码:
				</u-col>
				<u-col span="5">
					<u-input type="text" placeholder="输入验证码" :focus="true" v-model="code" border height="54" />
				</u-col>
			</u-row>
			
			<u-row style="padding-top: 80rpx;">
				<u-col>
					<view style="text-align: center;margin-top: 20rpx;">
						<u-button type="primary" size="mini" @click="signUp()">立即报名</u-button>
					</view>
				</u-col>
			</u-row>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cencalIsShow: false,
				name:'',
				idCard:'',
				phone:'',
				code:'',
				classId:'',
				id:'tianjiaid121323',
			}
		},
		
		onLoad(e) {
			this.offlineSignUpId(e.id);
			//index=1编辑
			if(e.index=='1'){
				this.searchSignUpId()
				this.name=e.name;
				this.idCard=e.idCard;
				this.phone=e.phone;
			}
		},
		
		methods: {
			offlineSignUpId(val) {
				this.classId = val
			},
			
			//立即报名
			signUp(){
				//不为空判断
				if (this.name == '') {
					this.$refs.uToast.show({
						title: "请输入姓名",
						type: 'error',
					})
					return false;
				}
				
				if (this.idCard == '') {
					this.$refs.uToast.show({
						title: "请输入身份证号",
						type: 'error',
					})
					return false;
				}
				
				if (this.phone == '') {
					this.$refs.uToast.show({
						title: "请输入手机号码",
						type: 'error',
					})
					return false;
				}
				if (this.phone == '' || !/^1[345789]\d{9}$/.test(this.phone)) {
					this.$refs.uToast.show({
						title: "请输入正确的手机号码",
						type: 'error',
					})
					return false;
				}
				
				if (this.code == '') {
					this.$refs.uToast.show({
						title: "请输入验证码",
						type: 'error',
					})
					return false;
				}
				
				uni.navigateTo({
					url: '../offlineCourses/offlineSignUpShow?name='+this.name+'&idCard='+this.idCard+'&phone='+this.phone+''
				})
			},
			
			//重新编辑通过id查询
			searchSignUpId(){},
			
			//返回
			backTo() {
				uni.navigateBack({
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	#offlineSignUp {
		.title {
			text-align: center;
			font-size: 16px;
		}
	}
</style>
