<template>
	<view id="studyExamination">
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					< </view> </u-col> <u-col span="11">
						<view class="title">学习考试</view>
			</u-col>
		</u-row>
		<!--  背景图 -->
		<u-image width="100%" height="190rpx" :src="src"></u-image>
		<!--  考试列表 -->
		<u-row>
			<u-col span="5" v-for="(item,key) in studyExaminationList" :key="key" 
			class="se-col" :style="item.backgroundColor" @click="linkTo(item.levelCode)">
				<view class="se-text" :style="item.levelColor">{{item.levelName}}</view>
				<view style="text-align: center;margin-top: 12rpx;">{{item.title}}</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126:8001/images/2020/09/29/1601348332838540.png',
				studyExaminationList: [{
						levelCode:'0',
						levelName: '初级',
						title: '初级经理人考试',
						levelColor: 'background-color: orange',
						backgroundColor: 'background-color: #FCBD71'
					},
					{
						levelCode:'1',
						levelName: '中级',
						title: '中级经理人考试',
						levelColor: 'background-color: lightgreen',
						backgroundColor: 'background-color: #55ff7f'
					},
					{
						levelCode:'2',
						levelName: '高级',
						title: '高级经理人考试',
						levelColor: 'background-color: gray',
						backgroundColor: 'background-color: #aa55ff'
					},
				]
			}
		},
		methods:{
			linkTo(val){
				alert('跳转对应考试页面'+val)
			},
			backTo() {
				uni.navigateBack({
			
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#studyExamination {
		background-color: #ffffff;
		.title {
			text-align: center;
		}

		.se-col {
			// background-color: #FCBD71;
			height: 260rpx;
			margin-left: 36rpx !important;
			margin-top: 14rpx;
			border-radius: 12rpx;
			.se-text {
				width: 140rpx;
				height: 140rpx;
				text-align: center;
				// background-color: orange;
				border-radius: 12rpx;
				padding-top: 60rpx;
				margin-left: 74rpx;
				margin-top: 40rpx;
			}
		}
	}
</style>
