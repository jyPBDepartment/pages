<template>
	<view class="service">
		<!-- 列表数据显示 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="comm-list-item" @tap.stop="jump(item.id)" v-for="(item, index) in dataList" :key="index">
				<image class="item-img" :src="item.url" mode=""></image>
				<view class="item-info">
					<view class="title">
						<text>{{ item.name }}</text>
						<view @click.stop="">
							<u-icon style="margin-right: 5rpx;z-index: 999;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="32"></u-icon>
						</view>
					</view>
					<view v-if="item.address" class="address g-flex g-a-c" style="color: rgba(128, 128, 128, 1)">
						<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334898551200.png" color="#9FA3A8" size="24"></u-icon>
						{{ item.address }}
					</view>
					<view class="contactsUser">
						<view class="g-flex g-a-c">
							<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 28rpx;height:28rpx;margin-right: 20rpx;"></image>
							<view class="word">{{ item.contactsUser }}</view>
						</view>
						<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">{{ item.createDate }}</view>
					</view>
					<view class="fun-btn"></view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';

export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	data() {
		return {
			transactionTypeCode: null,
			transactionCategoryCode: null,
			identityCode: '',
			mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的配置(可选, 绝大部分情况无需配置)
			downOption: {},
			// 上拉加载的配置(可选, 绝大部分情况无需配置)
			upOption: {
				page: {
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			// 列表数据
			dataList: [],
			type: '1',
			address: ''
		};
	},
	methods: {
		// 跳转详情页面
		jump(val) {
			uni.navigateTo({
				url: '../grain/space?id=' + val + '&isMain=0' + '&type=0'
			});
		},
		search(e) {
			this.searchName = this.removeSpaces(e);
			this.downCallback();
		},
		select(code) {
			this.identityCode = code;
			this.downCallback();
		},
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
			let url;
			if (this.searchName == '') url = Interface.url.findAgriType;
			if (this.searchName != '') url = Interface.url.findAgriInfo;
			this.request(page, url);
		},
		request(page, url) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条

			// 第1种: 请求具体接口
			uni.request({
				url: url,
				method: 'GET',
				data: {
					type: 1,
					name: this.searchName,
					page: pageNum,
					size: pageSize,
					transactionTypeCode: this.transactionTypeCode,
					transactionCategoryCode: this.transactionCategoryCode,
					identityCode: this.identityCode,
					address: this.address
				},
				success: res => {
					if (res.data.state == 0) {
						let curPageData = res.data.data.content.map(item => {
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
						let curPageLen = curPageData.length;
						//设置列表数据
						if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
						this.dataList = this.dataList.concat(curPageData); //追加新数据
						this.mescroll.endByPage(curPageLen, res.data.data.totalPages);
					}
					// 请求成功,隐藏加载状态
					this.mescroll.endSuccess();
				},
				fail: err => {
					// 请求失败,隐藏加载状态
					uni.showToast({
						title: '请求失败',
						duration: 2000
					});
					this.mescroll.endErr();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.service {
	overflow: hidden;
}
</style>
