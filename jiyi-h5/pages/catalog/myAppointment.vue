<template>
	<view>
		<HeaderSearch title="我的预约" @searchCallback="search"></HeaderSearch>
		<Screen :listIndex="listIndex" @select="select" :condition="condition"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10">
				<view @click="jump(item)" class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in list" :key="index">
					<view class="image"><image class="app-img" :src="item.url" style="width: 200rpx;height: 200rpx;"></image></view>
					<view class="info g-f-1">
						<view class="title f-14 g-flex">
							<view class="o-e" style="width: 320rpx;height: 80rpx;">{{ item.agriName }}</view>
							<view class="f-16 price">￥ {{ item.workPrice }}元/亩</view>
						</view>
						<view class="other g-a-c g-flex g-j-s-b">
							面积：{{ item.area }}亩
							<view class="g-j-e">{{ item.beginDate }}至{{ item.endDate }}</view>
						</view>
						<view class="other g-a-c g-flex g-j-s-b">{{ item.workArea }}</view>
						<view class="reason" v-if="item.status == 3">商家取消理由：{{ item.reason }}</view>
						<view class="reason" v-if="item.status == 2">
							<u-button class="btn" type="error" shape="circle" @click="call(item.contactPhone)" size="mini">联系商家</u-button>
						</view>
						<view class="reason" v-if="item.status == 1"><u-button class="btn" type="error" shape="circle" @click="finish(item.id)" size="mini">已完成</u-button></view>
					</view>
				</view>
			</view>
			<!-- <u-modal v-model="show" :show-title="false" show-cancel-button content="是否确认完成？" @click="finish"></u-modal> -->
		</mescroll-body>
	</view>
</template>

<script>
let list = [];
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';
import Screen from '@/components/Screen/screen.vue';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		Screen,
		HeaderSearch
	},
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
			show: false,
			userId: localStorage.getItem('userId'),
			user: '',
			workPrice: '',
			area: '',
			beginDate: '',
			endDate: '',
			workArea: '',
			status: '',
			contactPhone: '',
			id: '',
			condition: [
				{
					code: '',
					name: '全部'
				},
				{
					code: 0,
					name: '待确认'
				},
				{
					code: 1,
					name: '已确认'
				},
				{
					code: 2,
					name: '已完成'
				},
				{
					code: 3,
					name: '已取消'
				}
			],
			list: [],
			listIndex: 0,
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
	onLoad() {},
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
			uni.request({
				url: ApiPath.url.findMyFarm,
				method: 'GET',
				data: {
					status: this.status,
					userId: this.userId,
					user: this.user,
					page: pageNum,
					size: pageSize
				},
				success: res => {
					if (res.data.state == 0) {
						let curPageData = res.data.data.content;
						let curPageLen = curPageData.length;
						//设置列表数据
						if (page.num == 1) this.list = []; //如果是第一页需手动置空列表
						this.list = this.list.concat(curPageData); //追加新数据
						this.mescroll.endByPage(curPageLen, res.data.data.totalPages);
					}
					// 请求成功,隐藏加载状态
					this.mescroll.endSuccess();
				},
				fail: err => {
					// 请求失败,隐藏加载状态
					this.mescroll.endErr();
				}
			});
		},
		jump(item) {
			let url;
			switch (item.status) {
				case '0':
					url = '../grain/paddyCancel?id=' + item.id;
					break;
				case '1':
					url = '../grain/paddyContact?id=' + item.id;
					break;
				case '2':
					url = '../grain/paddyContact?id=' + item.id;
					break;
				case '3':
					url = '../grain/paddyAgain?id=' + item.id;
					break;
				default:
			}
			uni.navigateTo({
				url: url
			});
		},
		select(code) {
			this.status = code;
			this.downCallback();
		},
		call(contactPhone) {
			uni.makePhoneCall({
				phoneNumber: contactPhone //仅为示例
			});
		},
		finish(val) {
			let param = {
				id: val,
				status: this.status
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.finish,
				success: res => {
					if (res.data.state == 0) {
						uni.showToast({
							title: '确认完成'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.box {
	color: #808080;

	.image {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		color: #fff;
	}

	.orange {
		background-color: #ff8d1a;
	}

	.green {
		background-color: #43cf7c;
	}

	.red {
		background-color: #e51c2e;
	}

	.blue {
		background-color: #1890ff;
	}

	.info {
		.title {
			color: #333;

			.price {
				width: 180rpx;
				text-align: right;
				margin-left: -20rpx;
			}
		}

		.other {
			height: 50rpx;
		}
	}

	.reason {
		text-align: right;
		color: #e51c2e;
		margin-left: -194px;
		margin-top: 10rpx;

		.btn {
			width: 222rpx;
			height: 60rpx;
		}
	}
}

.box-border {
	border-bottom: 1rpx solid #e5e5e5;
}
</style>
