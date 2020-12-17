<template>
	<view class="content">
		<!--头部 -->
		<header-box title="考试列表" @backTo="backTo"></header-box>
		<!-- 各个功能页面 -->
		<view class="function">
			<view class="item card-box" :class="getItemBg(index)" v-for="(item, index) in examScoreList" :key="index">
				<view class="title-name">{{ item.vocationName }}考试</view>
				<view class="btn-box">
					<u-button class="btn" type="success" size="mini" @tap="examScore(item.vocationName)">查询成绩</u-button>
					<u-button class="btn" type="primary" plain size="mini" v-if="item.isApply == 0" @tap="applyShow(item.vocationId, item.vocationName)">证书申请</u-button>
				</view>
			</view>
			<data-empty v-if="examScoreList.length == 0" :option="{tip:'暂无数据'}"></data-empty>
		</view>
		<u-popup v-model="show" mode="center" width="620rpx" height="530rpx" border-radius="10" :mask-close-able="false">
			<view class="my-popup-title">请完善信息获取{{ type }}证书！</view>
			<view class="my-popup-content">
				<view class="item">
					<view class="title">姓名</view>
					<text>:</text>
					<view class="input"><u-input type="text" placeholder="输入姓名" :focus="true" v-model="name" height="60" maxlength="10" /></view>
				</view>
				<u-line></u-line>
				<view class="item">
					<view class="title">手机号</view>
					<text>:</text>
					<view class="input"><u-input type="text" placeholder="输入手机号" :focus="true" maxlength="11" v-model="phone" height="60" /></view>
				</view>
				<u-line></u-line>
				<view class="item">
					<view class="title">身份证号</view>
					<text>:</text>

					<view class="input"><u-input type="text" placeholder="输入身份证号" :focus="true" maxlength="18" v-model="idCard" height="60" /></view>
				</view>
				<u-line></u-line>
				<u-row style="margin-top: 40rpx;">
					<u-col :span="6" style="text-align: center;"><u-button size="medium" type="primary" @tap="applyCertificate">提交</u-button></u-col>
					<u-col :span="6" style="text-align: center;"><u-button size="medium" type="info" @tap="cancelApply">取消</u-button></u-col>
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
			type: '',
			vocationId: '',
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
		getItemBg(i) {
			let classStr = 'item1';
			if ((i + 1) % 5 == 1) {
				classStr = 'item1';
			}
			if ((i + 1) % 5 == 2) {
				classStr = 'item2';
			}
			if ((i + 1) % 5 == 3) {
				classStr = 'item3';
			}
			if ((i + 1) % 5 == 4) {
				classStr = 'item4';
			}
			if ((i + 1) % 5 == 0) {
				classStr = 'item5';
			}
			return classStr;
		},
		cancelApply() {
			this.show = false;
			this.vocationId = '';
			this.type = '';
			console.log(this.show )
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
			if (this.idCard == '' || !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.idCard)) {
				this.$refs.uToast.show({
					title: '请输入正确的身份证号',
					type: 'error'
				});
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
		applyShow(m, n) {
			this.show = true;
			this.vocationId = m;
			this.type = n;
			console.log(this.show )
			
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
	padding-top: 80rpx;

	.function {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;

		.item {
			font-weight: 500;
			height: 160rpx;
			padding: 40rpx;
			margin: 20rpx 20rpx 0rpx 20rpx;
			display: flex;
			align-items: center;
			color: #ffffff;
			.title-name {
				font-size: 36rpx;
				flex: 1;
			}

			.btn-box {
				width: 120rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.btn {
					margin-top: 10rpx;
					width: 100%;
				}
			}
		}
		.item1 {
			background-color: #fcca00;
		}
		.item2 {
			background-color: #ff8d00;
		}

		.item3 {
			background-color: #27b148;
		}

		.item4 {
			background-color: #ff3328;
		}

		.item5 {
			background-color: #1f9cf9;
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
