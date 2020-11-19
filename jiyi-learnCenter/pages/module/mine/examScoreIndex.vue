<template>
	<view class="content">
		<!--头部 -->
		<header-box title="考试成绩" @backTo="backTo"></header-box>
		<!-- 各个功能页面 -->
		<view class="function">
			<view class="split-space"></view>
			<view v-for="(item, index) in examScoreList" :key="index">
				<view class="item">
					<!-- <u-icon name="star" color="#2979ff" size="32"></u-icon> -->
					<u-row style='margin-top:20rpx;'>
						<u-col :span='10'>
							<u-row>
								<u-col><text>{{item.vocationName}}考试</text></u-col>
								<u-col><u-button type='success' size='mini' style="margin-top:12rpx;" v-if="item.isApply==0" @click="applyShow(item.vocationId,item.vocationName)">证书申请</u-button></u-col>
							</u-row>
						</u-col>
						<u-col :span='2'>
							<u-icon name="arrow-right" color="#666666" size="32"  @click="examScore(item.vocationName)"></u-icon>
						</u-col>
					</u-row>
				</view>
				<view class="split-space"></view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="620rpx" height="530rpx" border-radius="10" :mask-close-able="false">
			<view class="my-popup-title">请完善信息获取{{type}}证书！</view>
			<view class="my-popup-content">
				<view class="item">
					<view class="title">姓名</view>
					<text>:</text>
					<view class="input">
						<u-input type="text" placeholder="输入姓名" :focus="true" v-model="name" height="60" maxlength="10" />
					</view>
				</view>
				<u-line></u-line>
				<view class="item">
					<view class="title">手机号</view>
					<text>:</text>
					<view class="input">
						<u-input type="text" placeholder="输入手机号" :focus="true" maxlength="11" v-model="phone" height="60" />
					</view>
				</view>
				<u-line></u-line>
				<view class="item">
					<view class="title">身份证号</view>
					<text>:</text>
		
					<view class="input">
						<u-input type="text" placeholder="输入身份证号" :focus="true" maxlength="18" v-model="idCard" height="60" />
					</view>
				</view>
				<u-line></u-line>
				<u-row style="margin-top: 40rpx;">
					<u-col :span="6">
						<u-button type="primary" @click="applyCertificate()">提交</u-button>
					</u-col>
					<u-col :span="6">
						<u-button type="info" @click="cancelApply()">取消</u-button>
					</u-col>
				</u-row>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js';
	export default {
		data() {
			return {
				userId: localStorage.getItem('userId'),
				examScoreList: [],
				show: false,
				type:'',
				vocationId:'',
				name: '', //用户姓名
				phone: '', //用户手机号码
				idCard: '' //身份证号
			};
		},
		// 页面初始化加载
		onLoad(e) {
			this.initExamScore(); //判断考试是否都通过
		},
		methods: {
			cancelApply(){
				this.vocationId='';
				this.type='';
				this.show=false;
			},
			applyCertificate() {
				//不为空判断
				if (this.name == '') {
					this.$refs.uToast.show({
						title: '请输入姓名',
						type: 'error'
					});
					return false;
				}

				if (this.phone == '') {
					this.$refs.uToast.show({
						title: '请输入手机号码',
						type: 'error'
					});
					return false;
				}
				if (this.phone == '' || !/^1[345789]\d{9}$/.test(this.phone)) {
					this.$refs.uToast.show({
						title: '请输入正确的手机号码',
						type: 'error'
					});
					return false;
				}

				if (this.idCard == '') {
					this.$refs.uToast.show({
						title: '请输入身份证号',
						type: 'error'
					});
					return false;
				}
				if (this.idCard == '' || !
					/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.idCard)) {
					this.$refs.uToast.show({
						title: "请输入正确的身份证号",
						type: 'error',
					})
					return false;
				}
				//证书申请
				uni.request({
					url: ApiPath.url.applyCertificate,
					method: 'GET',
					data: {
						userId: localStorage.getItem('userId'),
						userName: this.name,
						userTel: this.phone,
						userCard: this.idCard,
						vocationId: this.vocationId
					},
					success: res => {
						if (res.data.state == 0) {
							this.$refs.uToast.show({
								title: '申请已经申请，等待审核！',
								type: 'success'
							});
							
							setTimeout(function() {
								this.show = false;
								// uni.navigateTo({
								// 	url: './index'
								// });
							}, 1000);
							
						} else {
							uni.showToast({
								title: '服务器出错，请联系管理员'
							});
						}
					},
					fail: err => {
						uni.showToast({
							title: '系统初始化失败，请联系管理员'
						});
					}
				});
			},
			applyShow(m,n){
				this.vocationId = m;
				this.type = n;
				this.show=true;
			},
			initExamScore() {
				uni.request({
					url: ApiPath.url.getExamIsPassByUserId,
					method: 'GET',
					data: {
						userId: this.userId
					},
					success: res => {
						if (res.data.code == 200) {
							this.examScoreList = res.data.data;
						} else {
							uni.showToast({
								title: '服务器出错，请联系管理员'
							});
						}
					},
					fail: err => {
						uni.showToast({
							title: '系统初始化失败，请联系管理员'
						});
					}
				});
			},
			examScore(val) {
				uni.navigateTo({
					url: './examScore?name=' + val
				});
			},
			// 返回上一页
			backTo() {
				uni.switchTab({
					url: '/pages/tabbar/my/index'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		background: #f4f4f4;

		.function {
			display: flex;
			flex-direction: column;
			margin-top: 80rpx;
			background-color: #ffffff;

			.item {
				font-weight: 500;
				height: 180rpx;
				padding: 20rpx 40rpx;
				// display: flex;
				align-items: center;

				>text {
					margin-left: 30rpx;
					flex: 1;
				}
			}
		}
	}
	.my-popup-title {
		text-align: center;
		line-height: 80rpx;
		color: red;
		font-size: 32rpx;
		font-weight: 600;
	}
	
	.my-popup-content {
		padding: 30rpx;
	
		.item {
			display: flex;
			justify-content: center;
			line-height: 60rpx;
			padding: 10rpx;
	
			.title {
				width: 120rpx;
				height: 60rpx;
				text-align: justify;
				color: #000000;
				font-size: 28rpx;
				font-weight: 500;
			}
	
			.title::after {
				display: inline-block;
				content: '';
				width: 120rpx;
				height: 60rpx;
				text-align: justify;
				overflow: hidden;
			}
	
			.input {
				flex: 1;
				margin-left: 20rpx;
			}
		}
	}
</style>
