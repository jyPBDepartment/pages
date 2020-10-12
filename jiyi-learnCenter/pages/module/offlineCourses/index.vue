<template>
	<view id="offlineCourses">
		<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					<u-icon name="arrow-left"></u-icon>
				</view>
			</u-col>
			<u-col span="11">
				<view class="title">线下课程</view>
			</u-col>
		</u-row>
		<u-row class="oc-row">
			<u-col class="oc-col" v-for="(item,key) in offlineCoursesList" :key="key" :style="item.color" @click="linkTo(item.id)">
				<u-row>
					<u-col @click="linkTo(item.id)">
						<view class="oc-title">{{item.title}}</view>
						<view class="oc-c">{{item.subTitle}}</view>
						<view class="oc-d">开课时间：{{item.statrtDate}}</view>
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
				offlineCoursesList: [{
						id: '112343fdsdfdsfds',
						title: '现代职业农业经理人',
						subTitle: '职业生涯',
						color: 'background-color: lightblue',
						// isJoin: '0',
						statrtDate:'2020-10-10'
					},
					{
						id: '112343fdsdfdsfds',
						title: '经销商',
						subTitle: '服务知识、农业知识',
						color: 'background-color: gray',
						// isJoin: '0',
						statrtDate:'2020-10-16'
					}
				]
			}
		},
		methods: {
			linkTo(val) {
				uni.navigateTo({
					url: '../offlineCourses/offlineDetails?id=' + val
				})
			},
			backTo() {
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#offlineCourses {
		.title {
			text-align: center;
		}

		.oc-row {
			// padding-left: 14rpx;
			// padding-right: 14rpx;
			padding-bottom: 14rpx;
		}

		.oc-col {
			border-radius: 6rpx;
			height: 160rpx;
			margin-top: 12rpx;

			.oc-title {
				margin-top: 24rpx;
				text-align: center;
				
			}

			.oc-c {
				margin-top: 6rpx;
				text-align: center;
				font-size: 10rpx;
			}
			
			.oc-d{
				margin-top: 6rpx;
				text-align: center;
				// font-size: 10rpx;
			}

		}
	}
</style>
