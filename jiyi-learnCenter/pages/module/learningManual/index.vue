<template>
	<view id="learningManual">
		<u-row style="background-color: #ffffff;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					< </view> </u-col> <u-col span="11">
						<view class="title">学习手册</view>
			</u-col>
		</u-row>
		<!--  背景图 -->
		<u-image width="100%" height="190rpx" :src="src"></u-image>
		
		<u-row class="rm-row" v-for="(item,key) in manualList" :key="key">
			<u-col span="4">
				<u-image width="auto" height="160rpx" :src="item.url"></u-image>
			</u-col>
			<u-col span="8">
				<view class="rm-font">{{item.title}}</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://60.205.246.126:8001/images/2020/09/29/1601348332838540.png',
				manualList:[
					{
						url:'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
						title:'初级经理人学习手册'
					},
					{
						url:'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
						title:'中级经理人学习手册'
					},
					{
						url:'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
						title:'高级经理人学习手册'
					},
					{
						url:'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
						title:'供应商学习手册'
					},
					{
						url:'http://60.205.246.126:8001/images/2020/09/29/1601345831839353.png',
						title:'经销商学习手册'
					}
				]
			}
		},
		methods: {
			backTo() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#learningManual {
		background-color: #ffffff;

		.title {
			text-align: center;
		}
		
		.rm-row{
			margin-top: 12rpx;
			background-color: #f2f2f2;
			height: 180rpx;
			border-radius:18rpx;
		}
	}
</style>
