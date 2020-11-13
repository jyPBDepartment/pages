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
		<view class="split-space">
			
		</view>
		<!-- 内容介绍 -->
		<view class="introduce">
			<text class="containTitle">颁发证书考核内容介绍</text>
			<view class="subject">
				<view class="left"><u-steps :list="numList" :current="currentIndex" direction="column" mode="dot" active-color="#1565C0" class="steps"></u-steps></view>
				<view class="right">
					<!--认证名额  -->
					<view class="one">
						<view class="introduceTitle">认证名额申请成功</view>
						<view class="introduceContain">你已成为组织中的一员，赶紧开始学习之旅吧！</view>
					</view>
					<!--  能力测评-->
					<view class="one">
						<view class="introduceTitle">能力测评</view>
						<view class="line"><u-line class="underline"></u-line></view>
						<view id="exam" v-for="(item, key) in examList" :key="key">
							<view class="titleName">
								<view class="choose">{{ key + 1 }}、{{ item.name }}</view>
								<view class="choose">（约{{ item.answerTime }}分钟，不限考次）</view>
								<view>
									<button v-if="item.isPass == 0" class="btn" @click="answer(item)" size="mini">答题</button>
									<button v-if="item.isPass == 1" class="btnPass" disabled="disabled" size="mini">已通过</button>
									<button v-if="item.isPass == 2" class="btn" @click="answer(item)" size="mini">重新答题</button>
								</view>
							</view>
							<view class="sum">(共{{ item.questionNum }}题)</view>
						</view>
					</view>
					<!-- 获得证书 -->
					<view class="one">
						<view class="introduceTitle">获得证书</view>
						<view class="identity" @click="mineCredential">
							<image src="http://60.205.246.126/images/2020/10/27/1603764777256292.png" class="identImg"></image>
							<text class="identText">专业证书</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal
			v-model="show"
			@confirm="confirm"
			:async-close="true"
			:content="grade == '0' ? '请先通过测评' : '恭喜你晋级成功，专业证书已经打印，请在我的证书中查看。'"
		></u-modal>
	</view>
</template>

<script>
import ApiPath from '@/api/ApiPath.js';
export default {
	data() {
		return {
			value:
				'农业经理人是指在农民专业合作社等农业经济合作组织中，从事农业生产组织、设备作业、技术支持、产品加工与销售等管理服务的人员。2020年3月3日，根据《中华人民共和国劳动法》有关规定，人力资源社会保障部、农业农村部共同制定了家畜繁殖员等8个国家职业技能标准，现予颁布施行。原相应国家职业技能标准同时废止。',
			numList: [{ name: '' }, { name: '' }, { name: '' }],
			pass: '0',
			grade: '0',
			show: false,
			currentIndex: '1',
			examList: [],
			index: null
		};
	},
	// 初始化加载页面
	onLoad(e) {
		this.initExamPaperInfo(e.id); // 初始化加载试卷列表信息
	},
	methods: {
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
						if (count == this.examList.length) {
							this.currentIndex = 2;
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
			uni.navigateBack({});
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
		padding: 20rpx 0 0 20rpx;
		background-color: #fff;
		.containTitle {
			font-size: 30rpx;
			font-weight: bold;
			padding: 10rpx 0;
			border-bottom: 1px solid #f4f4f4;
			
		}
		.subject {
			display: flex;
			margin-bottom: -72rpx;
			.left {
				margin-top: 40rpx;
			}

			.right {
				margin: 40rpx 0rpx 0rpx -50rpx;
				width: 666rpx;
				.one {
					background-color: #f2f2f7;
					border-radius: 20rpx;
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
							border: 2rpx solid #d1d1d3 !important;
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
							background-color: #fff;
							border: 1rpx solid red;
							margin-top: 14rpx;
							padding: 0;
							width: 134rpx;
						}
						.btnPass {
							margin-top: 14rpx;
							padding: 0;
							width: 138rpx;
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
