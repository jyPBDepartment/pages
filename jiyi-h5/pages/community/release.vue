<template>
	<view>
		<HeaderSearch title="发帖" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c b-b">
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入标题" :clearable="false" v-model="value" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c b-b">
				<view class="title f-14" style="line-height: 62rpx;">
					类别
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="value1" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10">
				<view class="title f-14" style="padding: 10rpx 0;">
					内容
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入内容正文（最多输入500字）" :clearable="false" v-model="value" height="200" />
				</view>
			</view>
			<u-button class="btn" shape="circle" type="error">发布</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: '种子',
				list: [{
						name: '种子',
						disabled: false
					},
					{
						name: '无人机',
						disabled: false
					},
					{
						name: '收割机',
						disabled: false
					},
					{
						name: '插秧机',
						disabled: false
					},
					{
						name: '水稻种植',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
			}
		},
		methods: {
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
		}
	}
</script>

<style lang="scss">
	.title {
		width: 140rpx;
		color: #505050;
	}

	.b-b {
		border-bottom: 1rpx solid #999;
	}

	.btn {
		position: absolute;
		bottom: 40rpx;
		width: calc(100% - 80rpx);
		left: 40rpx;
	}
</style>
