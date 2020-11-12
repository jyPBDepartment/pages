<template>
	<view class="content">
		<!-- 头部 -->
		<header-box title="学习记录" @backTo="backTo"></header-box>

		<!-- 懒加载 -->
		<mescroll-body style="margin-top: 80rpx;" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<!-- 列表详情 -->
			<view class="list" v-for="(item, index) in studyRecordList" :key="index" @click="studyRecordContentJump">
				<view class="listOne"><image class="listImg" :src="item.url"></image></view>
				<view class="listSen">
					<view class="listText">{{ item.word }}</view>
					<view class="bride">{{ item.sum }}人已学</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	data() {
		return {
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的配置(可选, 绝大部分情况无需配置)
			downOption: {},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},

			title: '',
			studyRecordList: [
				{ url: 'http://60.205.246.126/images/2020/10/12/1602481525521725.jpg', word: '人的欲望永无止尽 就像我一开始 只是想要知道你的名字', sum: '1314' },
				{
					url: 'http://60.205.246.126/images/2020/10/12/1602481589403089.jpg',
					word: '培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......',
					sum: '1314'
				},
				{ url: 'http://60.205.246.126/images/2020/10/12/1602481543327363.jpg', word: '刮奖刮出一个谢字就足够了。', sum: '1314' },
				{ url: 'http://60.205.246.126/images/2020/10/12/1602481589403089.jpg', word: '你眼里有全宇宙 胜过我见过的所有山川河流', sum: '1314' },
				{ url: 'http://60.205.246.126/images/2020/10/12/1602481564370430.jpg', word: '孺子含辛，隐忍不嗔。', sum: '1314' },
				{ url: 'http://60.205.246.126/images/2020/10/12/1602481589403089.jpg', word: '加油呀,你是比自己想象的要好得多的人。', sum: '1314' }
			],
			formInline: {
				page: 1,
				limit: 10,
				varLable: '',
				varName: '',
				currentPage: 1,
				pageSize: 10,
				total: 10
			},
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			}
		};
	},
	methods: {
		/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
		mescrollInit(mescroll) {
			this.mescroll = mescroll;
		},
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			this.mescroll.resetUpScroll();
		},
		/*上拉加载的回调*/
		upCallback(page) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
		},
		backTo() {
			uni.navigateBack(-1);
		},
		// 学习记录跳转详情页面
		studyRecordContentJump() {
			uni.navigateTo({
				url: './studyRecordContent'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;
	.head {
		display: flex;
		margin: 15rpx 0rpx 30rpx 20rpx;
		.backArrow {
			margin-top: 16rpx;
		}
		.title {
			margin-left: 250rpx;
			margin-top: 10rpx;
			font-size: 35rpx;
		}
	}
	.u-sticky {
		position: -webkit-sticky;
		position: sticky;
		top: 2rpx;
		z-index: 999;
	}
	.select {
		display: flex;
		height: 120rpx;
		background-color: #c9c9ce;
		margin-top: 20rpx;
		.input {
			width: 700rpx;
		}
		.uni-input-placeholder {
			margin-left: 200rpx;
		}
	}
	.list {
		display: flex;
		background-color: #fff;
		padding: 20rpx;
		border-bottom: 2rpx solid #f4f4f4;
		.listOne {
			.listImg {
				width: 220rpx;
				height: 160rpx;
			}
		}
		.listSen {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			width: 100%;
			padding-left: 20rpx;
			.listText {
				font-size: 28rpx;
			}
			.bride {
				font-size: 24rpx;
				color: #bfbfbf;
				text-align: right;
			}
		}
		.underline {
		}
	}
}
</style>
