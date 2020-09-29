<template>
	<view id="onlineTraining">
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					< </view> </u-col> <u-col span="11">
						<view class="title">在线培训</view>
			</u-col>
		</u-row>
		<u-row class="ot-row">
			<u-col class="ot-col" v-for="(item,key) in onlineTrainingList" :key="key" 
			:style="item.color">
				<u-row>
					<u-col span="8">
						<view class="ot-title">{{item.title}}</view>
						<view class="ot-c">当前已有{{item.total}}人在学习</view>
					</u-col>
					<u-col span="4">
						<view v-if="item.isJoin=='0'" class="ot-d" @click="linkTo(item.id)">立即加入</view>
						<view v-else class="ot-d" @click="linkTo(item.id)">已加入</view>
					</u-col>
				</u-row>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineTrainingList: [{
						id: '112343fdsdfdsfds',
						title: '经理人学习群',
						total: '635',
						color: 'background-color: lightblue',
						isJoin: '0'
					},
					{
						id: '112343fdsdfdsfds',
						title: '经销商学习群',
						total: '315',
						color: 'background-color: orange',
						isJoin: '1'
					}, {
						id: '112343fdsdfdsfds',
						title: '供应商学习群',
						total: '15',
						color: 'background-color: gray',
						isJoin: '0'
					}
				]
			}
		},
		methods: {
			linkTo(val) {
				alert('跳转对应考试页面' + val)
			},
			backTo() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#onlineTraining {
		background-color: #ffffff;

		.title {
			text-align: center;

		}

		.ot-row {
			padding-left: 14rpx;
			padding-right: 14rpx;
			padding-bottom: 14rpx;
		}

		.ot-col {
			border-radius: 6rpx;
			height: 160rpx;
			margin-top: 12rpx;

			.ot-title {
				margin-top: 56rpx;
			}

			.ot-c {
				margin-top: 10rpx;
				font-size: 10rpx;
			}

			.ot-d {
				text-align: right;
				margin-top: 16rpx;
			}
		}
	}
</style>
