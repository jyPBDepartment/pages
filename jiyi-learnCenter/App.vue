<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	// 动画
	@import url("./node_modules/animate.css");
	
	/*每个页面公共css */
	*{
		font-family: PingFang SC;
	}
	.split-space{
		width: 750px;
		height: 20rpx;
		background: #F2F8FF;
		opacity: 1;
	}
	.card-box{
		background: #FFFFFF;
		box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.16);
		opacity: 1;
		border-radius: 8rpx;
	}
</style>
