<template>
	<view class="content">
		<!-- 头部 -->
	
		<header-box title="考试结果" :showGoBack="false"></header-box>
		<view class="contain">
			<!-- 试题列表-->
			<view class="examResult">
				<view class="isPass" :style="examGrade>=passScore ? 'background-color:#6ca984;' : 'background-color: #E51C2E;'">
					<image :src="examGrade>=passScore ? 'http://60.205.246.126/images/2020/10/29/1603956788960268.png' : 'http://60.205.246.126/images/2020/10/29/1603956449935082.png'"
					 class="examIcon"></image>
					<text class="examWord">{{examGrade>=passScore ? '通过' : '未通过'}}</text>
				</view>
				<view class="currentGrade">
					<view class="getScore">
						<b>{{examGrade}}</b>分
					</view>
					<view class="full">
						满分{{totalScore}}分
					</view>
				</view>
				<view class="tips">
					{{examGrade>=passScore ? '恭喜你通过考试！' : '不要紧，山野都有雾灯，再试一次吧(◕ᴗ◕✿)'}}
				</view>
			</view>
			<!-- 下划线 -->
			<view class="line">
				<u-line class="underline"></u-line>
			</view>
			<!-- 表格 -->
			<view class="examTable">
				<u-table>
					<u-tr>
						<u-th class="thStyle">题型</u-th>
						<u-th class="thStyle">题目数</u-th>
						<u-th class="thStyle">错题数</u-th>
						<u-th class="thStyle">得分</u-th>
					</u-tr>
					<u-tr v-for="(item,index) in examTableInfo" :key="index">
						<u-td class="tdStyle">{{item.type == '1' ? '判断题' : '单选题'}}</u-td>
						<u-td class="tdStyle">{{item.queNum}}</u-td>
						<u-td class="tdStyle">{{item.wrongNum}}</u-td>
						<u-td class="tdStyle">{{item.getGrade}}</u-td>
					</u-tr>

				</u-table>
			</view>
			<view class="questionAnswer">
				<!-- 答题卡 -->
				<view class="answerCard">
					<view class="answerTitle">
						答题卡（{{wrongCount}}/{{count}}）
					</view>
					<view class="answerTips">
						<view class="left">
							<view class="correct"></view>
							<text class="word">正确</text>
						</view>
						<view class="left">
							<view class="error"></view>
							<text class="word">错误</text>
						</view>
					</view>

					<!-- 题目选项 -->
					<view class="answerIndex">
						<view class="answer" v-for="(subjectItem,subjectIndex) in examTableList" :key="subjectIndex">
							<view class="answerCorrect" :style="subjectItem.queIsCorrect==1 ? 'background-color: #27B148;' : 'background-color:#E51C2E;'">{{subjectIndex+1}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 错题解析 -->
			<view class="analysis animate__animated animate__slideInRight" v-for="(titleItem,titleIndex) in examTableList" :key="titleIndex" v-if="titleItem.queIsCorrect=='2'" >
				<view class="quetype">
					<text>错题解析：{{titleItem.queType == '0' ? '单选题' : '判断题'}}</text>
					<text>本题分值：{{titleItem.queScore}}分</text>
				</view>
				<view class="queName">
					<text>{{titleItem.queNum}}、{{titleItem.queName}}</text>
				</view>
				<!-- 错题答案 -->
				<view class="queAnswer" v-for="(item1,index1) in titleItem.queAnalysis" :key="index1">
					<view class="answerStyle">
						<image :src="item1.queIndex != titleItem.correctAnswers ? 'http://60.205.246.126/images/2020/10/30/1604029013343857.png' : 'http://60.205.246.126/images/2020/10/30/1604029038740080.png'"
						 class="answerIcon"></image>
						<text class="word">{{item1.queIndex}}、{{item1.queSelectAnswer}}</text>
					</view>
				</view>
				<!-- 正确答案 -->
				<view class="correctAnswer">
					<view class="correctSelect">
						<text>正确答案</text>
						<text class="selectStyle">{{titleItem.correctAnswers}}</text>
					</view>
					<view class="userSelect">
						<text>您的答案</text>
						<text class="selectStylea" >{{titleItem.queChoose}}</text>
					</view>
				</view>
			</view>
			<view style="margin-top:12rpx;">
				<u-row>
					<u-col :span="6" v-if="examGrade>=passScore">
						<u-button type="primary" @click="continueExam()">继续考试</u-button>
					</u-col>
					<u-col :span="6" v-if="examGrade<passScore">
						<u-button type="primary" @click="returnExam()">重新答题</u-button>
					</u-col>
					<u-col :span="6">
						<u-button type="error" @click="exitExam()">退出考试</u-button>
					</u-col>
				</u-row>
			</view>
		</view>
		
	</view>
	
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default {
		data() {
			return {
				wrongCount: 0,
				count: 0,
				examGrade: "",
				passScore: "",
				totalScore: "",
				vocationId:"",
				examTableInfo: [],
				examTableList: [],
			}
		},
		onLoad(e) {
			let val = JSON.parse(e.param);
			this.vocationId = val.studyExamationId;
			this.passScore = val.passScore;
			this.totalScore = val.totalScore;
			// 从外部接口获取客户信息
			this.initQueResultCard(val);
		},
		methods: {
			returnExam(){
				uni.navigateTo({
						url:"./index?id="+this.vocationId
					})
			},
			// 继续考试
			continueExam(){
				uni.navigateTo({
						url:"./credentials?id="+this.vocationId
					})
			},
			// 退出考试
			exitExam(){
				uni.navigateTo({
						url:"./index"
					})
			},
			initQueResultCard(val) {
				uni.request({
					url: ApiPath.url.submitExam,
					method: "GET",
					data: {
						entity: val
					},
					success: (res) => {
						if (res.data.state == 0) {
							//请求返回值
							let result = res.data.data.examTableList;
							this.examTableList = res.data.data.examTableList;
							this.examTableInfo = res.data.data.examTableInfo;
							//总题数设置
							let count = result.length;
							let radioCount = 0;
							let radioWrongCount = 0;
							let asertCount = 0;
							let asertWrongCount = 0;
							let totalScore = 0;
							for (let i = 0; i < result.length; i++) {
								if (result[i].queType == '1') { //选择题
									radioCount = radioCount + 1;
									if (result[i].queIsCorrect == "2") { //如果是错题
										radioWrongCount = radioWrongCount + 1;
									}
								} else {
									asertCount = asertCount + 1;
									if (result[i].queIsCorrect == "2") { //如果是错题
										asertWrongCount = asertWrongCount + 1;
									}
								}
							}
							
							for(let i = 0;i<this.examTableInfo.length;i++){
								totalScore = totalScore + this.examTableInfo[i].getGrade;
							}
							this.examGrade = totalScore;
							this.wrongCount = radioWrongCount + asertWrongCount;
							this.count = radioCount + asertCount;
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		padding-top: 80rpx;
		.head {
			display: flex;
			padding: 15rpx 0 0 20rpx;
			background-color: #F8F8F8;
			width: 750rpx;
			height: 80rpx;
			position: -webkit-sticky;
			position: sticky;
			top: 0rpx;
			z-index: 999;

			.backArrow {
				margin-top: 6rpx;
			}

			.title {
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}

		.contain {
			display: flex;
			flex-direction: column;
			margin: 0 6rpx;

			.examResult {
				display: flex;
				justify-content: space-between;
				min-width: 33%;

				.isPass {
					display: flex;
					flex-direction: column;
					width: 200rpx;
					height: 200rpx;
					background-color: #E51C2E;
					text-align: center;

					.examIcon {
						width: 100rpx;
						height: 100rpx;
						margin: 20rpx 0 0 45rpx;
					}

					.examWord {
						margin-top: 20rpx;
						font-size: 32rpx;
						color: #fff;
					}
				}

				.currentGrade {
					display: flex;
					flex-direction: column;
					margin-top: 20rpx;

					.getScore {
						font-size: 60rpx;
					}

					.full {
						margin-top: 40rpx;
						font-size: 30rpx;
						font-weight: bold;
					}
				}

				.tips {
					width: 200rpx;
					word-break: break-all;
					margin-top: 40rpx;
				}
			}

			.line {
				.underline {
					border: 2rpx solid #bbb !important;
				}
			}

			.examTable {
				margin-top: 30rpx;

				.thStyle {
					background-color: #8cada6;
					color: #fff;
				}
			}

			.questionAnswer {
				display: flex;
				flex-direction: column;
				margin-bottom: 30rpx;

				.answerCard {
					margin-top: 30rpx;
					height: 500rpx;
					border: 2rpx solid #bbb;
					border-radius: 20rpx;
					display: flex;
					flex-direction: column;

					.answerTitle {
						text-align: center;
						font-size: 36rpx;
						font-weight: bold;
						margin-top: 20rpx;
					}

					.answerTips {
						display: flex;
						justify-content: space-around;
						margin-top: 20rpx;

						.left {
							display: flex;

							.correct {
								width: 50rpx;
								height: 50rpx;
								background-color: #27B148;
								border-radius: 10rpx;
								margin-right: 20rpx;
							}

							.word {
								margin-top: 4rpx;
							}

							.error {
								width: 50rpx;
								height: 50rpx;
								background-color: #E51C2E;
								border-radius: 10rpx;
								margin-right: 20rpx;
							}
						}

					}

					.answerIndex {
						display: flex;
						width: 700rpx;
						flex-wrap: wrap;

						.answer {
							margin: 60rpx 0 0 38rpx;

							.answerCorrect {
								width: 100rpx;
								height: 100rpx;
								border-radius: 10rpx;
								text-align: center;
								padding-top: 30rpx;
								color: #fff;
							}
						}
					}

				}
			}
			.analysis {
				margin: 0 0 50rpx 0;
				border: 2rpx solid #bbb;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;
			
				.quetype {
					display: flex;
					justify-content: space-between;
					font-weight: bold;
					margin: 30rpx 20rpx 0rpx 20rpx;
				}
			
				.queName {
					margin: 30rpx 20rpx 40rpx 20rpx;
				}
			
				.queAnswer {
					padding-bottom: 40rpx;
					margin: 0rpx 10rpx;
					display: flex;
					flex-direction: column;
			
					.answerStyle {
						display: flex;
						.answerIcon {
							width: 60rpx;
							height: 60rpx;
							margin-left: 30rpx;
						}
						.word {
							margin:10rpx 0 0 20rpx ;
						}
					}
				}
			
				.correctAnswer {
					display: flex;
					margin: 10rpx 10rpx 20rpx 10rpx;
					justify-content: space-around;
			
					.selectStyle {
						color: #27B148;
						margin-left: 20rpx;
					}
			
					.selectStylea {
						color: #E51C2E;
						margin-left: 20rpx;
					}
				}
			
			}
		}
	}
</style>
