<template>
	<view class="comm-reply-container" @click.stop>
		<view class="publish">
			<u-checkbox-group><u-checkbox v-model="checked" active-color="#5EB14E"><text style="color:#9FA3A8">匿名发布</text> </u-checkbox></u-checkbox-group>
		</view>
		<view class="input-box">
			<u-input
				class="input"
				focus
				:customStyle="customStyle"
				:fixed="true"
				v-model="value"
				type="textarea"
				:clearable="false"
				:border="false"
				:height="100"
				:maxlength="500"
				:auto-height="true"
			/>
			<u-icon class="btn-reply" @click="reply" name="http://60.205.246.126/images/2021/01/12/1610432408185176.png" size="40"></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: false,
			value: '',
			customStyle: {
				width: '626rpx',
				background: '#FFFFFF',
				'border-radius': '16rpx',
				padding: '20rpx',
				'box-sizing': 'border-box'
			},
			show: false,
			content: `
			空山新雨后<br>
			天气晚来秋
			`
		};
	},
	methods: {
		open() {
			this.show = true;
		},
		reply() {
			if (this.value) {
				this.$emit('reply', this.value, this.checked);
			}else{
				uni.showToast({
					title:'请输入内容在发布',
					icon:'none'
				})
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.comm-reply-container {
	position: fixed;
	z-index: 999;
	bottom: 0;
	left: 0;
	right: 0;
	background: #ffffff;
	.publish {
		line-height: 60rpx;
		padding: 20rpx;
	}
	.input-box {
		width: 100%;
		background: #f2f2f2;
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
		.btn-reply {
			margin-left: 20rpx;
		}
	}
}
</style>
