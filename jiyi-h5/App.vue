<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch');

			// setTimeout(() => {
			// 	uni.setTabBarBadge({
			// 		index: 1,
			// 		text: '31'
			// 	});
			// 	uni.showTabBarRedDot({
			// 		index: 3
			// 	});
			// }, 1000);
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	.g-flex {
		display: flex;
	}

	.g-a-c {
		align-items: center;
	}

	.g-a-s {
		align-items: flex-start;
	}

	.g-a-e {
		align-items: flex-end;
	}

	.g-j-c {
		justify-content: center;
	}

	.g-j-s {
		justify-content: flex-start;
	}

	.g-j-e {
		justify-content: flex-end;
	}

	.g-j-s-b {
		justify-content: space-between;
	}

	.g-j-s-a {
		justify-content: space-around;
	}

	.g-f-1 {
		flex: 1;
	}

	.g-f-2 {
		flex: 2;
	}

	.g-f-3 {
		flex: 3;
	}

	.g-f-4 {
		flex: 4;
	}

	.g-f-5 {
		flex: 5;
	}

	.g-f-6 {
		flex: 6;
	}

	.g-f-7 {
		flex: 7;
	}

	.g-f-8 {
		flex: 8;
	}

	.p-x-10 {
		padding: 0 20rpx;
	}

	.p-y-10 {
		padding: 20rpx 0;
	}

	.g-f-row {
		flex-direction: row;
	}

	.g-f-warp {
		flex-wrap: wrap;
	}

	.g-f-column {
		flex-direction: column;
	}

	.m-c {
		margin: 0 auto;
	}

	.m-r-5 {
		margin-right: 10rpx;
	}

	.t-c {
		text-align: center;
	}

	.f-12 {
		font-size: 24rpx;
	}

	.f-14 {
		font-size: 28rpx;
	}

	.f-16 {
		font-size: 32rpx;
	}

	.f-18 {
		font-size: 36rpx;
	}

	.f-20 {
		font-size: 40rpx !important;
	}

	.b-t {
		border-top: 1px solid rgba(229, 229, 229, 1)
	}

	.c-f {
		color: #fff;
	}

	.b-f {
		background-color: #fff !important;
	}

	.shadow {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.o-e {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.app-modular {
		margin-top: 24rpx;

		.app-img {
			width: 258rpx;
			height: 258rpx;
			margin-right: 24rpx;
		}

		.app-info {
			.title {
				line-height: 46rpx;
				margin-bottom: 26rpx;
			}

			.tags {
				margin-top: 30rpx;
				margin-bottom: 20rpx;

				.tag {
					width: 120rpx;
					height: 40rpx;
					border-radius: 10rpx;
					border: 1px solid rgba(24, 144, 255, 1);
					color: rgba(24, 144, 255, 1);
				}
			}

			.app-number {
				color: rgba(229, 28, 46, 1);
				line-height: 60rpx;
			}

			.immediately {
				width: 164rpx;
				height: 60rpx;
				background: rgba(229, 28, 46, 1);
				border-radius: 10rpx;
			}
		}
	}
</style>
