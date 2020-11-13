<template>
	<view class="content">
		<view>
			<!-- 头部 -->
			<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view>
				<view class="title">{{examTypeName}}</view>
			</view>
			<!-- 倒计时+题序 -->
			<view class="second">
				<view>
					<u-count-down :timestamp="examTime*60" :show-border="true" font-size="35" color="#ffffff" border-color="#000000"
					 bg-color="#333" height="60" style="margin:10rpx 0 0 20rpx;" separator-color="#fff" @end="end"></u-count-down>
				</view>
				<view class="paging">
					{{jumpCount}}/{{examCount}}
				</view>
			</view>
			<view class="center" v-show="jumpCount==index1+1" v-for="(item1,index1) in examList" :key="index1">
				<!-- 题目 -->
				<view class="question animate__animated animate__slideInRight ">
					<view class="quetype  ">
						<text>{{item1.quType == 0 ? '单选题' :'判断题'}}</text>
						<text>本题分值：{{item1.score}}分</text>
					</view>
					<view class="queName">
						<text>{{item1.quContent}}
						</text>
						<view class="line">
							<u-line class="underline"></u-line>
						</view>
						<!-- 答案 -->
						<view class="queAnswer" v-for="(item2, index2) in item1.optionList" :key="index2">
							<view>
								<radio-group id="ansGroup" @change="radioChange">
									<label style="display: flex;">
										<view>
											<radio :value="item2.id" :checked="index2 === current" />
										</view>
										<view>{{item2.title}}、{{item2.content}}</view>
									</label>
								</radio-group>
							</view>
						</view>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="next">
					<button v-if="jumpCount!=1" type="primary" @click="prefixQues(index1+1)" class="examBtn">上一题</button>
					<button v-if="jumpCount!=examCount" type="primary" @click="nextQues(index1+1)" :style="jumpCount==1 ? 'width: 772rpx;' : 'width:386rpx'">下一题</button>
					<button type="primary" v-if="jumpCount ==examCount" class="examBtn" @click="submit">交卷</button>
				</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :zoom="true" show-cancel-button async-close @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default {
		data() {
			return {
				show: false,
				content: '',
				jumpCount: 1,
				examCount: "",
				examTime: "",
				examTypeName: "",
				current: null,
				resultList: [],
				examList: [],
				vocationId: '',
				passScore:"",
				totalScore:""
			}
		},
		// 初始化加载页面
		onLoad(e) {
			let val = JSON.parse(e.param)
			this.examTime = val.time; //考试时间
			this.examCount = val.count; //考试题数
			this.examTypeName = val.name; //考试名称
			this.vocationId = val._id; //职业类别Id
			this.id = val.id; //试卷Id
			this.passScore = val.passScore;
			this.totalScore = val.totalScore;
			this.initQuestionInfo(val.id); // 初始化加载试题列表信息	
		},
		methods: {
			initQuestionInfo(val) {
				uni.request({
					url: ApiPath.url.getQuestionListByExamId,
					method: "GET",
					data: {
						examId: val
					},
					success: (res) => {
						if (res.data.code == 200) {
							this.examList = res.data.data
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
			// 取消按钮
			cancel() {
				this.show= false;
			},
			// 正式提交试卷
			confirm() {
				let userId = localStorage.getItem("userId");

				let param = {
					userId: userId,
					studyExamationId: this.vocationId,
					examId: this.id,
					answerList: this.resultList,
					passScore:this.passScore,
					totalScore:this.totalScore
				}
				// console.log(JSON.stringify(param))
				this.examTime = null;
				uni.navigateTo({
					url: "./examResult?param=" + JSON.stringify(param)
				})
			},
			// 倒计时自动提交
			end() {
				let userId = localStorage.getItem("userId");
				
				let param = {
					userId: userId,
					studyExamationId: this.vocationId,
					examId: this.id,
					answerList: this.resultList,
					passScore:this.passScore,
					totalScore:this.totalScore
				}
				uni.navigateTo({
					url: "./examResult?param=" + JSON.stringify(param)
				})
			},
			// 选中某个单选框时，由radio时触发

			radioChange: function(evt) {
				let ans = this.examList[this.jumpCount - 1].optionList;
				for (let i = 0; i < ans.length; i++) {
					if (ans[i].id == evt.target.value) {
						this.current = i;
						this.resultList.splice(this.jumpCount - 1, 1);
						this.resultList.push({
							serialNumber:this.jumpCount,
							queId: ans[i].id,
							answerId: ans[i].quId,
							answerCode: ans[i].title
						})
						break;
					}
				}
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {},
			// 返回上一页
			backTo() {
				uni.navigateBack({

				})
			},
			// 下一题
			nextQues(quesNum) {
				this.jumpCount = quesNum + 1;
				this.nextQuesJudge(quesNum);
			},
			// 判断选题
			nextQuesJudge(judgeChoose) {
				this.current = null;
				if (this.resultList.length > 0) {
					let ans = this.examList[judgeChoose].optionList;
					for (let i = 0; i < this.resultList.length; i++) {
						for (let j = 0; j < ans.length; j++) {
							if (ans[j].id == this.resultList[i].queId) {
								this.current = j
							}
						}
					}
				}
			},
			// 上一题
			prefixQues(val) {
				if (this.resultList.length > 0) {
					let ans = this.examList[this.jumpCount - 2].optionList;
					for (let i = 0; i < this.resultList.length; i++) {
						for (let j = 0; j < ans.length; j++) {
							if (ans[j].id == this.resultList[i].queId) {
								this.current = j
							}
						}
					}
				}

				this.jumpCount = val - 1;
			},
			// 提交试卷验证
			submit() {
				if (this.resultList.length > 0) {
					if (this.resultList.length < this.examCount) {
						this.show = true;
						this.content = "您有试题未答，是否提交试卷?";
					} else {
						this.show = true;
						this.content = "是否提交试卷?";
					}
				} else {
					this.show = true;
					this.content = "请重新答题，或者退出考试！";
				}
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

			.backArrow {
				margin-top: 6rpx;
			}

			.title {
				margin-left: 200rpx;
				font-size: 32rpx;
			}
		}

		.second {
			display: flex;
			background-color: #007AFF;
			height: 80rpx;

			.paging {
				font-size: 28rpx;
				font-weight: bold;
				color: #fff;
				margin: 20rpx 0 0 160rpx;
			}
		}

		.question {
			display: flex;
			flex-direction: column;
			margin: 20rpx;

			.quetype {
				display: flex;
				justify-content: space-between;
				font-weight: bold;
			}

			.queName {
				margin-top: 20rpx;

				.line {
					margin: 40rpx -20rpx;

					.underline {
						border-color: #bbb !important;
					}
				}
			}

			.queAnswer {
				display: flex;
				border: 2rpx solid #bbb !important;
				height: 150rpx;
				padding: 50rpx 0rpx 0rpx 20rpx;
				margin-bottom: 30rpx;
				border-radius: 15rpx;
			}
		}

		.next {
			display: flex;
			margin: 128rpx -20rpx 0 -20rpx;
			position: fixed;
			top: 556px;

			.examBtn {
				width: 386rpx;
			}
		}

	}
</style>
