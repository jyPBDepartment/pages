<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
			<view class="backArrow" @click="backTo">
				<u-icon name="arrow-left" color="#333" size="32"></u-icon>
			</view>
			<view class="title">申领职业证书</view>
		</view>

		<!-- 前言 -->
		<view class="read">
			<textarea :value="value" class="readTextarea" />
			</view>
		<!-- 内容介绍 -->
		<view class="introduce">
			<text class="containTitle">
				颁发证书考核内容介绍
			</text>
			<view class="subject">
				<view class="left">
					<u-steps :list="numList" :current="currentIndex" direction="column" mode="dot" active-color="#ffaa7f" class="steps">
					</u-steps>
				</view>
				
				<view class="right">
					<!--认证名额  -->
					<view class="one">
						<view class="introduceTitle">
							认证名额申请成功
						</view>
						<view  class="introduceContain">
							你已成为组织中的一员，赶紧开始学习之旅吧！</view>	
					</view>
					
					<!--  能力测评-->
					<view class="one">
						<view class="introduceTitle">
							能力测评
						</view>
						<view class="line">
							<u-line class="underline" ></u-line>
						</view>
							
							<view id="exam" v-for="(item,key) in examList" :key="key">
						<view class="titleName" >
							<view class="choose">
								{{key+1}}、{{item.name}}
							</view>
							<view class="choose">（约{{item.answerTime}}分钟，不限考次）</view>
							<view :id="key">
								<button class="btn" @click="answer(item)">答题</button>
							</view>
						</view>
						<view class="sum">
							(共{{item.questionNum}}题)
						</view>
						</view>
						
					</view>
					<!-- 获得证书和头衔 -->
					<view class="one">
						<view class="introduceTitle">
							获得证书和头衔
						</view>
						<view class="identity" @click="mineCredential">
							<image src="http://60.205.246.126/images/2020/10/27/1603764777256292.png"  class="identImg"></image>
							<text class="identText">专业证书</text>
						</view>
					</view>
				
				</view>
			
			</view>
		</view>
		<u-modal v-model="show" @confirm="confirm"  :async-close="true" :content="grade=='0' ? '请先通过测评' :'恭喜你晋级成功，专业证书已经打印，请在我的证书中查看。'"></u-modal>
	</view>
</template>

<script>
	import ApiPath from '@/api/ApiPath.js'
	export default{
		data(){
			return{
				value:"农业经理人是指在农民专业合作社等农业经济合作组织中，从事农业生产组织、设备作业、技术支持、产品加工与销售等管理服务的人员。2020年3月3日，根据《中华人民共和国劳动法》有关规定，人力资源社会保障部、农业农村部共同制定了家畜繁殖员等8个国家职业技能标准，现予颁布施行。原相应国家职业技能标准同时废止。",
				numList: [
				{name:""},
				{name:""},
				{name:""},
				],
				pass:'0',
				grade:'0',
				show: false,
				currentIndex:'1',
				examList:[
					// {
					// 	exName:"新手上路"	,
					// 	exTime:"10",
					// 	exCount:"6"
					// },{
					// 	exName:"农技知识"	,
					// 	exTime:"15",
					// 	exCount:"8"
					// },
					// {
					// 	exName:"农技服务"	,
					// 	exTime:"20",
					// 	exCount:"6"
					// },{
					// 	exName:"团队协作"	,
					// 	exTime:"30",
					// 	exCount:"6"
					// }
				],
				index:null
				
			}
		},
		// 初始化加载页面
		onLoad(e) {
			this.initExamPaperInfo(e.id);// 初始化加载试卷列表信息	
		},
		methods:{
			initExamPaperInfo(val){
				uni.request({
					url: ApiPath.url.getExamListByVocationId,
					method: "GET",
					data: {
						vocationId:val
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
			backTo() {
				uni.navigateBack({
			
				})
			},
			answer(val){
			// 	document.getElementById(index).innerHTML="<button id='dis"+index+"' style='font-size: 12px;margin-top: 8px;' disabled>已通过</button>";
				
			// 	let count=0;
			// 	for(let i=0;i<this.examList.length;i++){
			// 		if(document.getElementById("dis"+i)!=null){
			// 			count=count+1;
			// 		}
			// 	}
			// if(count==this.examList.length){
			// 	this.currentIndex=2;
			// }else{
			// 	count=0;
			// }
				// .html("<button class='btnPass' disabled>已通过</button>");
				uni.navigateTo({
						url:"./judge?item="+JSON.stringify(val)
					})
			},
			mineCredential(){
				if(this.grade == '0'){
					this.show = true;
				}else{
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
						url:"../mine/mineCredentials"
					});
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head {
			display: flex;
			margin: 15rpx 0 0 20rpx;
			.backArrow {
				margin-top: 6rpx;
			}
			.title {
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}
		.read{
			margin-top: 20rpx;
			.readTextarea{
				width: 100%;
				height: 180rpx;
				background-color: #FFCCC7;
				font-size: 20rpx;
				color: #888888;
				text-indent: 50rpx;
				padding:20rpx 0 0 2rpx ;				
			}
		}
		.introduce{
			display: flex;
			flex-direction: column;
			padding: 20rpx 0 0 20rpx;
			background-color: #fff;
			.containTitle{
				font-size: 30rpx;
				font-weight: bold;
			}
			.subject{
				display: flex;
				margin-bottom: -72rpx;
				.left{
					margin-top: 40rpx;
				}
				
				.right{
					margin: 40rpx 0rpx 0rpx -50rpx;
					width: 666rpx;
					.one{
						background-color: #F2F2F7;
						border-radius: 20rpx;
						padding: 20rpx 10rpx 20rpx 20rpx;
						margin-bottom: 20rpx;
						.introduceTitle{
							font-size: 30rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}
						.introduceContain{
							font-size: 24rpx;
							font-weight: bold;
						}
						.line{
							margin-left: -20rpx;
							.underline{
								border: 2rpx solid #D1D1D3 !important;	
							}
						}
						.choose{
							font-size: 24rpx;
							font-weight: bold;
							margin-top: 20rpx;
						}
						.titleName{
							display: flex;
							justify-content: space-between;
								.btn{
									font-size: 20rpx;
									background-color: #fff;
									border-radius: 60rpx;
									border:2rpx solid red;
									width: 108rpx;
									
									margin-top: 14rpx;
								}
								.btnPass{
									font-size: 20rpx;
									margin-top: 14rpx;
								}
						}
						.sum{
							font-size: 22rpx;
							color: #b3b3b4;
							margin: -10rpx 0 0 40rpx;
						}
						.identity{
							display: flex;
							flex-direction: column;
							margin-left: 40rpx;
							.identImg{
								width: 80rpx;
								height: 80rpx;
								margin-bottom: 20rpx;
								padding-left: 20rpx;
							}
							.identText{
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
