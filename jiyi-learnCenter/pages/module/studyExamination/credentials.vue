<template>
	<view class="content">
		<!-- 头部 -->
		<!-- <view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon>
			</view>
			<view class="title">申领职业证书</view>
		</view> -->
		<header-box title="申领职业证书" @backTo="backTo"></header-box>

		<!-- 前言 -->
		<view class="read">
			<p class="readTextarea">{{ value }}</p>
		</view>
		<view class="split-space"></view>
		<!-- 内容介绍 -->
		<view class="introduce">
			<text class="containTitle">颁发证书考核内容介绍</text>
			<view class="subject">
				<view class="left">
					<u-steps :list="numList" :current="currentIndex" direction="column" mode="dot" active-color="#1565C0" class="steps"></u-steps>
				</view>
				<view class="right">
					<!--认证名额  -->
					<view class="one card-box">
						<view class="introduceTitle">认证名额申请成功</view>
						<view class="introduceContain">你已成为组织中的一员，赶紧开始学习之旅吧！</view>
					</view>
					<!--  能力测评-->
					<view class="one card-box">
						<view class="introduceTitle">能力测评</view>
						<view class="line">
							<u-line class="underline"></u-line>
						</view>
						<view id="exam" v-for="(item, key) in examList" :key="key">
							<view class="titleName">
								<view class="choose">{{ key + 1 }}、{{ item.name }}</view>
								<view class="choose">（约{{ item.answerTime }}分钟，不限考次）</view>
								<view>
									<u-button type="primary" v-if="item.isPass == 0" class="btn" @click="answer(item)" size="mini">答题</u-button>
									<u-button type="success" v-if="item.isPass == 1" class="btn" disabled="disabled" size="mini">已通过</u-button>
									<u-button type="warning" v-if="item.isPass == 2" class="btn" @click="answer(item)" size="mini">重新答题</u-button>
									<!-- 			<button v-if="item.isPass == 0" class="btn" @click="answer(item)" size="mini">答题</button>
									<button v-if="item.isPass == 1" class="btnPass" disabled="disabled" size="mini">已通过</button>
									<button v-if="item.isPass == 2" class="btnRep" @click="answer(item)" size="mini">重新答题</button> -->
								</view>
							</view>
							<view class="sum">(共{{ item.questionNum }}题)</view>
						</view>
					</view>
					<!-- 获得证书 -->
					<view class="one card-box" v-if="allPass == 1">
						<view class="introduceTitle">获得证书</view>
						<view class="identity" @click="improveInformation()">
							<image src="http://60.205.246.126/images/2020/10/27/1603764777256292.png" class="identImg"></image>
							<text class="identText">专业证书</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<u-popup v-model="show" mode="center" width="620rpx" height="530rpx" border-radius="10" :mask-close-able="false">
			<view class="my-popup-title">恭喜你晋级成功，请完善信息获取证书！</view>
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
				value: '农业经理人是指在农民专业合作社等农业经济合作组织中，从事农业生产组织、设备作业、技术支持、产品加工与销售等管理服务的人员。2020年3月3日，根据《中华人民共和国劳动法》有关规定，人力资源社会保障部、农业农村部共同制定了家畜繁殖员等8个国家职业技能标准，现予颁布施行。原相应国家职业技能标准同时废止。',
				numList: [{
						name: ''
					},
					{
						name: ''
					},
					{
						name: ''
					}
				],
				pass: '0',
				grade: '0',
				show: false,
				currentIndex: '1',
				examList: [],
				index: null,
				allPass: 0,
				examId: '', //试卷Id
				name: '', //用户姓名
				phone: '', //用户手机号码
				idCard: '' //身份证号
			};
		},
		// 初始化加载页面
		onLoad(e) {
			this.examId = e.id;
			this.initExamPaperInfo(e.id); // 初始化加载试卷列表信息
		},
		methods: {
			cancelApply() {
				//取消申请
				this.show = false;
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
						vocationId: this.examId
					},
					success: res => {
						if (res.data.state == 0) {
							this.$refs.uToast.show({
								title: '申请已经申请，等待审核！',
								type: 'success'
							});
							
							setTimeout(function() {
								this.show = false;
								uni.navigateTo({
									url: './index'
								});
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
			improveInformation() {
				//完善信息
				this.show = true;
			},
			initExamPaperInfo(val) {
				uni.request({
					url: ApiPath.url.getExamListByVocationId,
					method: 'GET',
					data: {
						vocationId: val,
						userId: localStorage.getItem('userId')
					},
					success: res => {
						if (res.data.code == 200) {
							this.examList = res.data.data;
							let count = 0;
							for (let i = 0; i < this.examList.length; i++) {
								if (this.examList[i].isPass == 1) {
									count = count + 1;
								}
							}
							if (this.examList.length > 0) {
								if (count == this.examList.length) {
									this.currentIndex = 2;
									this.allPass = 1;
									this.improveInformation();
								}
							} else {
								this.$refs.uToast.show({
									title: '暂无试卷，无法答题！',
									type: 'warning'
								});

								setTimeout(function() {
									uni.navigateTo({
										url: './index'
									})
								}, 1000);
							}
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
			backTo() {
				uni.navigateTo({
					url: './index'
				});
			},
			answer(val) {
				uni.navigateTo({
					url: './judge?item=' + JSON.stringify(val)
				});
			},
			mineCredential() {
				if (this.grade == '0') {
					this.show = true;
				} else {
					this.show = true;
				}
			},
			confirm() {
				setTimeout(() => {
					// 3秒后自动关闭
					this.show = false;
					// 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
					// this.$refs.uModal.clearLoading();
					uni.navigateTo({
						url: '../mine/mineCredentials'
					});
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
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

	.content {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;

		.read {
			margin-top: 80rpx;

			.readTextarea {
				font-size: 24rpx;
				color: #666;
				margin: 20rpx;
				text-indent: 48rpx;
				line-height: 44rpx;
				color: #333;
				font-weight: bold;
			}
		}

		.introduce {
			display: flex;
			flex-direction: column;
			padding: 20rpx;
			background-color: #fff;

			.containTitle {
				font-size: 30rpx;
				font-weight: bold;
				padding: 10rpx;
				border-bottom: 1px solid #f4f4f4;
			}

			.subject {
				display: flex;
				margin-bottom: 20rpx;

				.left {
					margin-top: 40rpx;
				}

				.right {
					margin: 40rpx 0rpx 0rpx -50rpx;
					width: 666rpx;

					.one {
						background-color: #f4f4f4;
						padding: 20rpx 10rpx 20rpx 20rpx;
						margin-bottom: 20rpx;

						.introduceTitle {
							font-size: 30rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}

						.introduceContain {
							font-size: 24rpx;
							font-weight: bold;
						}

						.line {
							margin-left: -20rpx;

							.underline {
								border: 1rpx solid #d1d1d3 !important;
							}
						}

						.choose {
							font-size: 24rpx;
							font-weight: bold;
							margin-top: 20rpx;
						}

						.titleName {
							display: flex;
							justify-content: space-between;

							.btn {
								margin-top: 14rpx;
								padding: 0;
								width: 135rpx;
							}
						}

						.sum {
							font-size: 22rpx;
							color: #b3b3b4;
							margin: -10rpx 0 0 40rpx;
						}

						.identity {
							display: flex;
							flex-direction: column;
							margin-left: 40rpx;

							.identImg {
								width: 80rpx;
								height: 80rpx;
								margin-bottom: 20rpx;
								padding-left: 20rpx;
							}

							.identText {
								font-size: 28rpx;
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
</style>
