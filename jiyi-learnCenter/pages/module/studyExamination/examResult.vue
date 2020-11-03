<template>
	<view class="content">

		<!-- 头部 -->
		<view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon>
			</view>
			<view class="title">考试结果</view>
		</view>


		<view class="contain">
			<!-- 试题列表-->
			<view class="examResult">
				<view class="isPass" :style="examGrade>=80 ? 'background-color:#6ca984;' : 'background-color: #E51C2E;'">
					<image :src="examGrade>=80 ? 'http://60.205.246.126/images/2020/10/29/1603956788960268.png' : 'http://60.205.246.126/images/2020/10/29/1603956449935082.png'"
					 class="examIcon"></image>
					<text class="examWord">{{examGrade>=80 ? '通过' : '未通过'}}</text>
				</view>
				<view class="currentGrade">
					<view class="getScore">
						<b>{{examGrade}}</b>分
					</view>
					<view class="full">
						满分100分
					</view>
				</view>
				<view class="tips">
					{{examGrade>=80 ? '恭喜你通过考试！' : '不要紧，山野都有雾灯，再试一次吧(◕ᴗ◕✿)'}}
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
			<view class="analysis animate__animated animate__slideInRight" v-for="(titleItem,titleIndex) in examTableList" :key="titleIndex" v-if="titleItem.queIsCorrect=='2'" :style="titleItem.queType == '1' ? 'margin-bottom: 770rpx;' : 'margin-bottom: 420rpx;'">
				<view class="quetype">
					<text>错题解析：{{titleItem.queType == '1' ? '单选题' : '判断题'}}</text>
					<text>本题分值：{{titleItem.queScore}}分</text>
				</view>
				<view class="queName">
					<text>{{titleItem.queNum}}、{{titleItem.queName}}</text>
				</view>
				<!-- 错题答案 -->

				<view class="queAnswer" v-for="(item1,index1) in titleItem.queAnalysis" :key="index1">
					<view class="answerStyle" >
						<image :src="item1.isCorrect == '0' ? 'http://60.205.246.126/images/2020/10/30/1604029013343857.png' : 'http://60.205.246.126/images/2020/10/30/1604029038740080.png'"
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
						<text class="selectStylea" v-for="(item,index) in titleItem.queAnalysis" :key="index" v-if="item.isCorrect == '1'">{{item.queIndex}}</text>
					</view>
				</view>
			
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wrongCount: 0,
				count: 0,
				// jumpCount: 1,
				examGrade: "60",
				examTableInfo: [
					{type:'0',queNum:'5',wrongNum:'3',getGrade:'30'},
					{type:'1',queNum:'5',wrongNum:'3',getGrade:'30'}
				],
				examTableList: [{
						queType: "1", //选择题
						queNum: 1,
						queIsCorrect: '1', //正确
					},
					{
						queType: "1", //选择题
						queNum: 2,
						queScore: 5,
						queIsCorrect: '2', //不正确
						correctAnswers: "B",
						queName: '从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？',
						queAnalysis: [{
								queIndex: "A",
								isCorrect: "0",
								queSelectAnswer: "房产经理人"
							}, {
								queIndex: "B",
								isCorrect: "0",
								queSelectAnswer: "证券经纪人"
							}, {
								queIndex: "C",
								isCorrect: "1",
								queSelectAnswer: "农产品经理人"
							}, {
								queIndex: "D",
								isCorrect: "0",
								queSelectAnswer: "金融经理人"
							}

						]
					},
					{
						queType: "2", //判断题
						queNum: 3,
						queIsCorrect: '2', //不正确
						queScore: 5,
						correctAnswers: "A",
						queName: '从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？',
						queAnalysis: [{
								queIndex: "A",
								isCorrect: "0",
								queSelectAnswer: "房产经理人"
							}, {
								queIndex: "B",
								isCorrect: "1",
								queSelectAnswer: "证券经纪人"
							}

						]
					},
					{
						queType: "2", //判断题
						queNum: 4,
						queIsCorrect: '1', //正确
					},
					{
						queType: "2", //判断题
						queNum: 5,
						queIsCorrect: '2', //不正确
						queScore: 5,
						correctAnswers: "A",
						queName: '从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？',
						queAnalysis: [{
								queIndex: "A",
								isCorrect: "0",
								queSelectAnswer: "房产经理人"
							}, {
								queIndex: "B",
								isCorrect: "1",
								queSelectAnswer: "证券经纪人"
							}
					
						]
					},

				],
			}
		},
		onLoad() {
			// 从外部接口获取客户信息
			this.initQueResultCard();

		},
		methods: {
			
			backTo() {
				uni.navigateBack({

				})
			},
			initQueResultCard() {
				// this.examTableList

				//请求返回值
				let result = this.examTableList;

				//总题数设置
				let count = result.length;
				let radioCount = 0;
				let radioWrongCount = 0;
				let asertCount = 0;
				let asertWrongCount = 0;
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
				console.log("选择题总数：" + radioCount + "--错题数：" + radioWrongCount)
				console.log("判断题总数：" + asertCount + "--错题数：" + asertWrongCount)
				this.wrongCount = radioWrongCount + asertWrongCount;
				this.count = radioCount + asertCount;
				// for(let i=0;i<2;i++){
				// 	this.examTableInfo.push({
				// 		'name','选择题',
				// 		'count':radioCount,
				// 		'wrongCount':radioWrongCount
				// 	})
				// }

				// {
				// 	queType:"2",//判断题
				// 	queNum:1,
				// 	queIsCorrect:'2',//不正确
				// 	queName:'从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？',
				// 	queAnalysis:[
				// 		{
				// 			queIndex: "A",
				// 			isCorrect: "0",
				// 			queSelectAnswer: "房产经理人"
				// 		}, {
				// 			queIndex: "B",
				// 			isCorrect: "1",
				// 			queSelectAnswer: "证券经纪人"
				// 		}

				// 	]
				// },








			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {

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
				margin-top: 30rpx;
				// margin-bottom: 760rpx;
				height: 220rpx;
				border: 2rpx solid #bbb;
				border-radius: 20rpx;
				display: flex;
				flex-direction: column;

				.quetype {
					display: flex;
					justify-content: space-between;
					font-weight: bold;
					margin: 30rpx 20rpx 20rpx 20rpx;
				}

				.queName {
					margin: 50rpx 20rpx 40rpx 20rpx;
				}

				.queAnswer {
					padding-bottom: 140rpx;
					margin: 30rpx 10rpx 0rpx 10rpx;
					border: 2rpx solid #bbb;
					border-radius: 16rpx;
					display: flex;
					flex-direction: column;

					.answerStyle {
						display: flex;
						margin-top: 40rpx;

						.answerIcon {
							width: 60rpx;
							height: 60rpx;
							margin-left: 30rpx;
						}

						.word {
							margin-left: 20rpx;
							margin-top: 10rpx;
						}
					}
				}
				.correctAnswer {
					display: flex;
					margin: 40rpx 10rpx 100rpx 10rpx;
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
