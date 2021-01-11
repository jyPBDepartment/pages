no-data
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
@import 'uview-ui/index.scss';
/*每个页面公共css */
.my-skeleton-class {
	/*这是一个默认的样式，js自动添加到有 skeleton="true"  属性的标签中 ，
	      最好是放在全局，这样所有页面的组件就都能用到。*/
	background-image: unset;
	box-shadow: unset;
	border: #c0c0c0;
	border-radius: 0.25rem;
	animation: mybgcolor 1s linear 0s infinite normal;
}
@keyframes mybgcolor {
	0% {
		background-image: linear-gradient(to right, #c0c0c0, rgb(230, 230, 230), rgb(230, 230, 230));
	}
	50% {
		background-image: linear-gradient(to right, rgb(230, 230, 230), #c0c0c0, rgb(230, 230, 230));
	}
	100% {
		background-image: linear-gradient(to right, rgb(230, 230, 230), rgb(230, 230, 230), #c0c0c0);
	}
}
.my-class {
	/*这里写你想添加上去的样式，没有限制 是直接setAttir上去的，嘻嘻*/
}

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
	padding: 0 24rpx;
}

.p-y-10 {
	padding: 24rpx 0;
}

.p-10 {
	padding: 24rpx;
}

.m-y-10 {
	margin: 24rpx 0;
}

.m-x-10 {
	margin: 0 24rpx;
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
.f-b {
	font-weight: bold;
}
.t-c {
	text-align: center;
}
.f-10 {
	font-size: 20rpx;
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
	border-top: 1px solid #f4f4f4;
}

.c-f {
	color: #fff;
}

.b-f {
	background-color: #fff !important;
}
.comm-b-bottom {
	border-bottom: 1px solid #f4f4f4;
}
.shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.comm-container {
	margin: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.comm-border {
	border-radius: 10rpx;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.o-e {
	-webkit-line-clamp: 2;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
.o-e3 {
	-webkit-line-clamp: 3;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}

.app-modular {
	margin-top: 24rpx;
	padding-bottom: 24rpx;
	.app-img {
		width: 258rpx;
		height: 258rpx;
		margin-right: 24rpx;
		border-radius: 6rpx;
	}

	.app-info {
		.title {
			line-height: 46rpx;
			margin-bottom: 26rpx;
		}

		.tags {
			margin-top: 30rpx;
			margin-bottom: 20rpx;
			height: 40rpx;

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
			height: 60rpx;
		}

		.immediately {
			width: 164rpx;
			height: 60rpx;
			background: rgba(229, 28, 46, 1);
			border-radius: 10rpx;
		}
	}
}

.footer-btn-box {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
}

.comm-form-container {
	padding: 24rpx;
	.item {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		font-size: 32rpx;
		line-height: 60rpx;
		align-items: center;
		border-bottom: solid 2rpx $u-border-color;
		.title {
			width: 150rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1;
		}
		> text {
			color: #fa3534;
			font-weight: bold;
			padding-right: 10rpx;
		}
		.info {
			position: relative;
			line-height: 1.5;
			flex: 1;
			display: flex;
			> text {
				color: #a6a6a6;
				font-size: 28rpx;
			}
			.value {
				width: 90%;
				z-index: -1;
			}
			.input-icon {
				position: absolute;
				right: 0rpx;
				top: 16rpx;
				color: #999;
			}
			textarea {
				background-color: #f7f7f7;
				line-height: 60rpx;
				padding: 0 20rpx;
				border-radius: 10rpx;
			}
			.is-face {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 50rpx;
				padding: 5rpx;
				text {
					font-size: 28rpx;
					color: #999;
					margin-left: 10rpx;
				}
			}
		}
	}
}

.comm-drawer-categorys {
	display: flex;
	flex-wrap: wrap;
	// justify-content: space-between;
	align-items: center;

	.item {
		width: 30%;
		margin-right: 3.3%;
		text-align: center;
		line-height: 40rpx;
		margin-top: 20rpx;
		cursor: pointer;
		border-radius: 5px;
		background-color: #f4f4f4;
		color: #333;
		padding: 10rpx 0;
	}
}
.drawer-bottom-btn {
	position: absolute;
	bottom: 0rpx;
	left: 0;
	right: 0;
	padding: 20rpx;
	border-top: 1px solid $comm-border-color;
	display: flex;
	justify-content: space-around;
	.btn {
		width: 192rpx;
	}
}
.no-data {
	width: 100%;
	height: 300rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-top: 160rpx;
	> image {
		width: 300rpx;
		height: 300rpx;
	}
	text {
		font-size: 28rpx;
		color: #999;
	}
}

.comm-list-item {
	width: 686rpx;
	height: 230rpx;
	border: 1rpx solid #dfdfdf;
	opacity: 1;
	border-radius: 30rpx;
	margin: 0 auto 20rpx auto;
	display: flex;
	align-items: center;
	justify-content: center;
	.item-img {
		width: 206rpx;
		height: 190rpx;
		background: rgba(0, 0, 0, 0);
		opacity: 1;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}
	.item-info {
		flex: 1;
		padding: 0 20rpx;
		display: flex;
		height: 190rpx;
		flex-direction: column;
		justify-content: space-between;
		.title {
			font-size: 26rpx;
			font-weight: 600;
			line-height: 36rpx;
			color: #000000;
			opacity: 1;
		}
		.address {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
			color: #9fa3a8;
			opacity: 1;
		}
		.contactsUser {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
			color: #9fa3a8;
			opacity: 1;
			display: flex;
			justify-content: space-between;
		}
		.fun-btn {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 30rpx;
			color: #9fa3a8;
			opacity: 1;
			display: flex;
			justify-content: space-between;
			.item{
				display: flex;
				align-items: center;
				height: 30rpx;
			}
		}
	}
}
</style>
