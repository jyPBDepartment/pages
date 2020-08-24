<template>
	<view class="box g-flex g-f-column g-a-c">
		<u-icon :class="state == 0 && 'mirrorRotateVertical'" size="300" :color="color" :name="name"></u-icon>
		<p class="f-20" style="margin-top: 80rpx;">{{title}}</p>
		<p class="f-14" style="color:#888888;margin-top: 26rpx;">{{tips}}</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: null,
				title: '',
				tips: '',
				name: '',
				color: ''
			}
		},
		onLoad(e) {
			console.log(e)
			if (e.state) {
				this.state = e.state
				if (e.state == 0) {
					this.title = "预约失败"
					this.tips = '此预约已满员，正在返回原页面，请耐心等候'
					this.name = 'info-circle-fill'
					this.color = '#f46464'
				} else if (e.state == 1) {
					this.title = "预约成功"
					this.tips = '已经预约成功，正在跳转详情页，请耐心等候'
					this.name = 'checkmark-circle-fill'
					this.color = '#0cbc04'
				}
			}
		}
	}
</script>

<style lang="scss">
	.box {
		padding-top: 200rpx;
	}

	.mirrorRotateVertical {
		transform: rotateX(180deg);
		/* 垂直镜像翻转 */
	}
</style>
