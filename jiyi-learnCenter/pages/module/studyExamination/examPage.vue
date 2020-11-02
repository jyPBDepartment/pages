<template>
	<view class="content">
		<view v-for="(item,index) in examList" :key="index">
			<!-- 头部 -->
			<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view>
				<view class="title">{{item.examTypeName}}</view>
			</view>
			<!-- 倒计时+题序 -->
			<view class="second">
				<view>
					<u-count-down :timestamp="item.examTime*60" :show-border="true" font-size="35" color="#ffffff" border-color="#000000"
					 bg-color="#333" height="60" style="margin:10rpx 0 0 20rpx;" separator-color="#fff" @end="end"></u-count-down>
				</view>
				<view class="paging">
					{{index+jumpCount}}/{{item.examCount}}
				</view>
			</view>
			<view class="center" v-show="jumpCount==index1+1" v-for="(item1,index1) in item.questionList" :key="index1">
				<!-- 题目 -->
				<view class="question animate__animated animate__slideInRight ">
					<view class="quetype  ">
						<text>{{item1.queType == '0' ? '单选题' :'判断题'}}</text>
						<text>本题分值：{{item1.queScore}}分</text>
					</view>
					<view class="queName">
						<text>{{item1.queName}}
						</text>
						<view class="line">
							<u-line class="underline"></u-line>
						</view>
						<!-- 答案 -->
						<view class="queAnswer" v-for="(item2, index2) in item1.anwser" :key="index2">
							<view >
								<radio-group id="ansGroup" @change="radioChange">
									<label style="display: flex;">
										<view>
											<radio :value="item2.value" :checked="index2 === current" />
										</view>
										<view>{{item2.queIndex}}、{{item2.queSelectAnswer}}</view>
									</label>
								</radio-group>
							</view>
						</view>

					</view>


				</view>
				<!-- 按钮 -->
				<view class="next">
					<button v-if="jumpCount!=1" type="primary" @click="prefixQues(index1+1)" class="examBtn" style="background-color: #bbb;">上一题</button>
					<button v-if="jumpCount!=item.examCount" type="primary" @click="nextQues(index+1,index1+1)" class="examBtn">下一题</button>
					<button type="primary" v-if="jumpCount ==item.examCount" class="examBtn" @click="submit">交卷</button>
				</view>
			</view>
		</view>
		<u-modal v-model="show" :content="content" :zoom="true" show-cancel-button async-close @confirm="confirm" @cancel="cancel"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: '',
				jumpCount: 1,
				current: "",
				examList: [{
					examTypeName: '农业经理人资格证书',
					examCount: "8",
					examTime: 20,
					questionList: [{
							queName: "1、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
							queScore: 12,
							queType: 0, //选择题
							isCheck:"",
							anwser: [{
									queIndex: "A",
									value: "01",
									queSelectAnswer: "房产经理人"
								},
								{
									queIndex: "B",
									value: "02",
									queSelectAnswer: "证券经纪人"
								},
								{
									queIndex: "C",
									value: "03",
									queSelectAnswer: "农产品经理人"
								},
								{
									queIndex: "D",
									value: "04",
									queSelectAnswer: "金融经理人"
								}
							]

						},
						{
								queName: "2、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
								queScore: 12,
								queType: 0, //选择题
								isCheck:"",
								anwser: [{
										queIndex: "A",
										value: "01",
										queSelectAnswer: "房产经理人"
									},
									{
										queIndex: "B",
										value: "02",
										queSelectAnswer: "证券经纪人"
									},
									{
										queIndex: "C",
										value: "03",
										queSelectAnswer: "农产品经理人"
									},
									{
										queIndex: "D",
										value: "04",
										queSelectAnswer: "金融经理人"
									}
									
								]
						
							},
							{
									queName: "3、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
									queScore: 12,
									queType: 1, //选择题
									isCheck:"",
									anwser: [{
											queIndex: "A",
											value: "01",
											queSelectAnswer: "房产经理人"
										},
										{
											queIndex: "B",
											value: "02",
											queSelectAnswer: "证券经纪人"
										}
										
									]
							
								},
								{
										queName: "4、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
										queScore: 12,
										queType: 1, //选择题
										isCheck:"",
										anwser: [{
												queIndex: "A",
												value: "01",
												queSelectAnswer: "房产经理人"
											},
											{
												queIndex: "B",
												value: "02",
												queSelectAnswer: "证券经纪人"
											}
											
										]
								
									},
									{
											queName: "5、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
											queScore: 12,
											queType: 1, //选择题
											isCheck:"",
											anwser: [{
													queIndex: "A",
													value: "01",
													queSelectAnswer: "房产经理人"
												},
												{
													queIndex: "B",
													value: "02",
													queSelectAnswer: "证券经纪人"
												}
												
											]
									
										},
										{
												queName: "6、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
												queScore: 12,
												queType: 1, //选择题
												isCheck:"",
												anwser: [{
														queIndex: "A",
														value: "01",
														queSelectAnswer: "房产经理人"
													},
													{
														queIndex: "B",
														value: "02",
														queSelectAnswer: "证券经纪人"
													}
													
												]
										
											},
											{
													queName: "7、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
													queScore: 12,
													queType: 1, //选择题
													isCheck:"",
													anwser: [{
															queIndex: "A",
															value: "01",
															queSelectAnswer: "房产经理人"
														},
														{
															queIndex: "B",
															value: "02",
															queSelectAnswer: "证券经纪人"
														}
														
													]
											
												},
												{
														queName: "8、从事农业产品回收储运、销售一级代理、信息传递服务等中介活动而获取到佣金或利润的人员是？",
														queScore: 12,
														queType: 1, //选择题
														isCheck:"",
														anwser: [{
																queIndex: "A",
																value: "01",
																queSelectAnswer: "房产经理人"
															},
															{
																queIndex: "B",
																value: "02",
																queSelectAnswer: "证券经纪人"
															}
															
														]
												
													}

					]

				}],
			}
		},
		methods: {
			// 取消按钮
			cancel(){
				// uni.navigateBack({
				
				// })
				uni.navigateTo({
					url: "./examPage"
				})
			},
			// 确认按钮
			confirm(){
				uni.navigateTo({
					url: "./examResult"
				})
			},
			// 倒计时
			end() {
				uni.navigateTo({
					url: "./examResult"
				})
			},
			// 选中某个单选框时，由radio时触发

			radioChange: function(evt) {
				let ans = this.examList[0].questionList[0].anwser;
				for (let i = 0; i < ans.length; i++) {
					if (ans[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
		
			backTo() {
				uni.navigateBack({

				})
			},
			// 下一题
			nextQues(examNum,quesNum) {
				this.jumpCount = quesNum+1;
				if(this.current !== ""){
					this.examList[examNum-1].questionList[quesNum-1].isCheck="1";
				}else{
					this.examList[examNum-1].questionList[quesNum-1].isCheck="0";
					
				}
				this.current = "";
			},
			// 上一题
			prefixQues(val){
				this.jumpCount = val-1;
			},
			// 提交试卷
			submit(){
				this.nextQues("1",this.examList[0].examCount);
				this.show = true;
				let msg ="";
				for(let i =0;i<this.examList[0].questionList.length;i++){
					
					if(this.examList[0].questionList[i].isCheck == "0"){
						this.content="您有试题未答，是否提交试卷?";
						msg = msg + (i+1)+","; 
						
					}else{
						this.content="是否提前交卷？";
						
					}
					
				}
				// alert(msg)
				// alert("第"+msg.substring(0,msg.lastIndexOf(","))+"题为空");
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
			.examBtn{
				width: 750rpx;
			}
		}

	}
</style>
