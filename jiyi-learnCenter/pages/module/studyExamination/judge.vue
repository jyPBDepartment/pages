<template>
	<view class="content">
		<!-- 头部 -->
		<!-- <view class="head">
			<view class="backArrow" @click="backTo"><u-icon name="arrow-left" color="#333" size="32"></u-icon></view>
			<view class="title">试卷要求</view>
		</view> -->
		<header-box title="试卷要求" @backTo="backTo"></header-box>
		<!-- 内容 -->
		<view class="contain">
			<view class="top">
				<view class="left">
					<view class="time">答题时间</view>
					<view class="minute">
						<view class="wave">
							<view class="word">{{ answerTime }}</view>
						</view>
					</view>
					<view class="Company">分钟</view>
				</view>
				<view><u-line class="underLine" direction="column"></u-line></view>

				<view class="right">
					<view class="time1">通过分数</view>
					<view class="minute1">
						<view class="wave1">
							<view class="word1">{{ passScore }}</view>
						</view>
					</view>
					<view class="Company1">满分{{ totalScore }}分</view>
				</view>
			</view>

			<view class="center">本次选择题试卷通过分数为{{ passScore }}分，请您仔细审题。</view>
			<view class="bottom"><button type="primary" style="font-size: 30rpx;" @click="examPage()">开始考试</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			answerTime: 0,
			passScore: 0,
			totalScore: 0,
			count: 0,
			name: '',
			id: '',
			_id: ''
		};
	},
	// 初始化加载页面
	onLoad(e) {
		this.initBaseInfo(e.item);
	},
	methods: {
		initBaseInfo(val) {
			let item = JSON.parse(val);
			this.answerTime = item.answerTime;
			this.passScore = item.passScore;
			this.totalScore = item.totalScore;
			this.count = item.questionNum;
			this.id = item.id;
			this.name = item.vocation.name;
			this._id = item.vocation.id;
		},
		backTo() {
			uni.navigateBack(-1);
	
		},
		examPage() {
			let param = {
				id: this.id, //试卷Id
				time: this.answerTime, //答题时间
				count: this.count, //总题数
				name: this.name, //考试名称
				_id: this._id, //职业类别Id(考试Id)
				passScore: this.passScore, //通过分数
				totalScore: this.totalScore //总分数
			};

			uni.navigateTo({
				url: './examPage?param=' + JSON.stringify(param)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 80rpx;


	.contain {
		display: flex;
		flex-direction: column;
		width: 600rpx;
		height: 600rpx;
		border-radius: 10rpx;
		-moz-box-shadow: 0 0 60px #c2c2c2;
		-webkit-box-shadow: 0 0 60px #c2c2c2;
		box-shadow: 0 0 60rpx #c2c2c2;
		margin: 80rpx 0 0 75rpx;

		.top {
			display: flex;
			justify-content: space-evenly;
			padding-top: 20rpx;
			.left {
				text-align: center;

				.time {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}

				.minute {
					position: absolute;
					width: 150rpx;
					height: 150rpx;
					padding: 34rpx;
					border: 6rpx solid rgb(118, 218, 255);
					top: 320rpx;
					left: 30%;
					transform: translate(-50%, -50%);
					border-radius: 50%;
					overflow: hidden;
					-moz-box-shadow: 0 0 60px rgb(118, 218, 255);
					-webkit-box-shadow: 0 0 60px rgb(118, 218, 255);
					box-shadow: 0 0 60rpx rgb(118, 218, 255);

					.wave {
						position: relative;
						width: 150rpx;
						height: 150rpx;
						background-color: rgb(118, 218, 255);
						border-radius: 50%;
						top: -36rpx;
						left: -48%;

						&::before,
						&::after {
							content: '';
							position: absolute;
							width: 150rpx;
							height: 150rpx;
							top: 20rpx;
							left: 46%;
							background-color: rgba(255, 255, 255, 0.3);
							border-radius: 40%;
							transform: translate(-50%, -70%) rotate(0);
							animation: rotate 6s linear infinite;
							z-index: 10;
						}

						&::after {
							border-radius: 48%;
							background-color: rgba(255, 255, 255, 0.8);
							transform: translate(-50%, -70%) rotate(0);
							animation: rotate 5s linear -5s infinite;
							z-index: 20;
						}

						@keyframes rotate {
							50% {
								transform: translate(-60%, -80%) rotate(180deg);
							}

							100% {
								transform: translate(-50%, -70%) rotate(360deg);
							}
						}

						.word {
							font-size: 60rpx;
							padding-top: 26rpx;
						}
					}
				}

				.Company {
					font-size: 28rpx;
					margin-top: 200rpx;
				}
			}

			.right {
				text-align: center;

				.time1 {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 30rpx;
				}

				.minute1 {

					position: absolute;
					width: 150rpx;
					height: 150rpx;
					padding: 35rpx;
					border: 6rpx solid rgb(118, 218, 255);
					top: 320rpx;
					left: 70%;
					transform: translate(-50%, -50%);
					border-radius: 50%;
					overflow: hidden;
					-moz-box-shadow: 0 0 60px rgb(118, 218, 255);
					-webkit-box-shadow: 0 0 60px rgb(118, 218, 255);
					box-shadow: 0 0 60rpx rgb(118, 218, 255);

					.wave1 {
						position: relative;
						width: 150rpx;
						height: 150rpx;
						background-color: rgb(118, 218, 255);
						border-radius: 50%;
						top: -36rpx;
						left: -53%;

						&::before,
						&::after {
							content: '';
							position: absolute;
							width: 150rpx;
							height: 150rpx;
							top: 20rpx;
							left: 51%;
							background-color: rgba(255, 255, 255, 0.3);
							border-radius: 40%;
							transform: translate(-50%, -70%) rotate(0);
							animation: rotate 6s linear infinite;
							z-index: 10;
						}

						&::after {
							border-radius: 48%;
							background-color: rgba(255, 255, 255, 0.8);
							transform: translate(-50%, -70%) rotate(0);
							animation: rotate 5s linear -5s infinite;
							z-index: 20;
						}

						@keyframes rotate {
							50% {
								transform: translate(-60%, -80%) rotate(180deg);
							}

							100% {
								transform: translate(-50%, -70%) rotate(360deg);
							}
						}

						.word1 {
							font-size: 60rpx;
							padding-top: 26rpx;
						}
					}
				}

				.Company1 {
					font-size: 28rpx;
					margin-top: 200rpx;
				}
			}

			.underline {
				border: 2rpx solid #333 !important;
			}
		}

		.center {
			margin: 80rpx 0 0 20rpx;
			font-size: 26rpx;
			font-weight: bold;
		}

		.bottom {
			margin: 80rpx 0 0 200rpx;

			width: 200rpx;
		}
	}
}
</style>
