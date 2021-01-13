<template>
	<view class="rich-text-container">
		<HeaderSearch :title="title"></HeaderSearch>

		<!--  -->
		<view class="content">
			<view class="image-t"><image :src="url"></image></view>
			<view class="details-box">
				<view class="title">一、概述</view>
				<view class="html-content"><u-parse :html="demoHtml"></u-parse></view>
				<view class="filter-container">
					<view class="item" :class="tabIndex == 1 && 'select-tab'" @tap="clickTab(1)">危害</view>
					<view class="item" :class="tabIndex == 2 && 'select-tab'" @tap="clickTab(2)">传播途径/发病条件</view>
					<view class="item" :class="tabIndex == 3 && 'select-tab'" @tap="clickTab(3)">防治技术</view>
				</view>
				<view v-if="tabIndex == 1" class="html-content"><u-parse :html="demoHtml"></u-parse></view>
				<view v-if="tabIndex == 2" class="html-content"><u-parse :html="demoHtml"></u-parse></view>
				<view v-if="tabIndex == 3" class="html-content"><u-parse :html="demoHtml"></u-parse></view>
			</view>
			<view class="fun-btn p-40">
				<view class="item">
					<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
					<text>123</text>
				</view>
				<view class="item" @tap.stop="clickIcon(2)">
					<u-icon v-if="collection" style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334200305905.png" size="24"></u-icon>
					<u-icon v-else style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
					<text>111</text>
				</view>
				<view class="item" @tap.stop="clickIcon(1)">
					<u-icon v-if="thumbs" style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" size="24"></u-icon>
					<u-icon v-else style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>

					<text>21</text>
				</view>
				<view class="item" @tap.stop="clickIcon(1)">
					<u-icon v-if="thumbs" style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/13/1610507402974982.png" size="24"></u-icon>
					<u-icon v-else style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/13/1610507433084156.png" size="24"></u-icon>

					<text>123</text>
				</view>
			</view>
			<view class="dividing-line"></view>
			<view class="comment-box-c">
				<view class="top-box-c">
					<text>评论(25)</text>
					<text class="right" @tap="goCommentList">全部评论/去评论 ></text>
				</view>
				<u-line v-if="false" color="rgba(0, 0, 0, 0.1)" />
				<view class="content">
					<view class="header">
						<image class="image" src="../../static/img/tabbar/guanzhuactive.png"></image>
						<text class="users">zhoux</text>
					</view>

					<p class="words">111111111111111111111</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			demoHtml: '',
			selectIndex: 0,
			title: '',
			url: '',
			tabIndex: 1,
			collection:false,
			thumbs:false,
		};
	},
	onLoad(e) {
		// 根据id获取基础信息
		this.getInfoById(e.id);

		// this.demoHtml = '这里是富文本解析得内容'
	},
	methods: {
		clickIcon(val) {
			if(val==1){
				this.thumbs = !this.thumbs
			}
			if(val == 2){
				this.collection = !this.collection
			}
			
		},
		clickTab(val) {
			this.tabIndex = val;
		},
		getInfoById(val) {
			let param = {
				id: val
			};
			uni.request({
				method: 'GET',
				url: ApiPath.url.findCaseInfoById,
				data: param,
				success: res => {
					console.log(res.data);
					if (res.data.state == 0) {
						this.demoHtml = res.data.data.describetion;
						this.title = res.data.data.name;
						this.url = res.data.data.url;
					}
				},
				fail: () => {}
			});
		},
		search(e) {
			console.log(e);
		},
		isShow() {
			this.$refs.drawer.open();
		},
		select(index) {
			this.selectIndex = index;
		},
		goCommentList(){
			uni.navigateTo({
				url:'/pages/commentList/commentList'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.rich-text-container {
	.content {
		.image-t {
			width: 750rpx;
			height: 750rpx;
			> image {
				width: 750rpx;
				height: 750rpx;
			}
		}
		.details-box {
			.title {
				font-size: 42rpx;
				font-weight: 600;
				line-height: 60rpx;
				color: #5eb14e;
				opacity: 1;
				padding: 20rpx 40rpx;
			}
			.html-content {
				padding: 20rpx 40rpx;
			}
			.filter-container {
				margin: 20rpx auto;
				width: 708rpx;
				height: 88rpx;
				background: #f4f4f4;
				opacity: 1;
				border-radius: 30rpx;
				display: flex;
				.item {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-weight: 600;
					color: #000000;
					opacity: 1;
				}
				.item:first-child {
					flex: 0.5;
				}
				.item:last-child {
					flex: 0.5;
				}

				.select-tab {
					flex: 1;
					height: 88rpx;
					background: #5eb14e;
					opacity: 1;
					border-radius: 30rpx;
					color: #ffffff;
					opacity: 1;
				}
			}
		}
		.p-40 {
			padding: 20rpx 40rpx;
		}
		.comment-box-c {
			padding-bottom: 40rpx;
			.top-box-c {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				opacity: 1;
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 40rpx;
				.right {
					color: #5eb14e;
				}
			}
			.content {
				.header {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					opacity: 1;
					height: 80rpx;
					line-height: 80rpx;
					padding: 0 40rpx;
					.image {
						width: 48rpx;
						height: 48rpx;
						border-radius: 24rpx;
					}
					.users {
						flex: 1;
						padding-left: 20rpx;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 30rpx;
						color: #9fa3a8;
						opacity: 1;
					}
				}
				.words {
					padding: 0 40rpx 20rpx 40rpx;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 30rpx;
					color: #000000;
					opacity: 1;
				}
			}
		}
	}
}
</style>
