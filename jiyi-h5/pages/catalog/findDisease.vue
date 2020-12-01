<template>
	<view>
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<Screen @screened="screened" @select="select" :screenList="screenList" :condition="condition"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="find-disease-container">
				<view class="comm-border list-item-l" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
					<image :src="item.url" mode=""></image>
					<p class="f-14 o-e">{{ item.name }}</p>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';
import Screen from '@/components/Screen/screen.vue';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		Screen,
		HeaderSearch
	},
	data() {
		return {
			condition: [
				{
					name: '全部',
					code: null
				}
			],
			screenList: [
				{
					title: '类别',
					category: []
				}
			],
			dipTypeCode: null,
			cropsTypeCode: null,
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
			dataList: []
		};
	},
	onLoad() {
		uni.request({
			url: Interface.url.getDipList,
			method: 'GET',
			data: {},
			success: res => {
				if (res.data.state == 0) {
					let data = res.data.data.map(item => {
						item.code = item.id;
						return item;
					});
					this.screenList[0].category = data;
				}
			}
		});
		uni.request({
			url: Interface.url.getCaseList,
			method: 'GET',
			data: {},
			success: res => {
				if (res.data.state == 0) {
					let data = res.data.data.map(item => {
						item.code = item.id;
						return item;
					});
					data.forEach(item => this.condition.push(item));
				}
				this.condition.push({
					name: '筛选',
					code: null
				});
			}
		});
	},
	methods: {
		removeSpaces(string) {
			return string.replace(/\s*/g, '');
		},
		// 跳转病虫害详情
		jump(val) {
			uni.navigateTo({
				url: '../grain/richText?id=' + val
			});
		},
		search(e) {
			this.searchName = this.removeSpaces(e);
			this.downCallback();
		},
		select(code) {
			this.cropsTypeCode = code;
			this.downCallback();
		},
		screened(code) {
			this.dipTypeCode = code;
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
			this.request(page, Interface.url.findCasePage);
		},
		request(page, url) {
			let pageNum = page.num; // 页码, 默认从1开始
			let pageSize = page.size; // 页长, 默认每页10条
			// 第1种: 请求具体接口
			uni.request({
				url: url,
				method: 'GET',
				data: {
					name: this.searchName,
					page: pageNum,
					size: pageSize,
					dipTypeCode: this.dipTypeCode,
					cropsTypeCode: this.cropsTypeCode
				},
				success: res => {
					console.log(res.data);
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
					this.mescroll.endErr();
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.find-disease-container{
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 30rpx;
		.list-item-l {
			width: 345rpx;
			margin-bottom: 30rpx;
			margin-left: 20rpx;
			padding: 16rpx 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			> image {
				width: 320rpx;
				height: 320rpx;
				border-radius: 8rpx;
			}
			p {
				width: 100%;
				height: 80rpx;
				line-height: 40rpx;
				text-align: left;
				padding: 10rpx 16rpx;
				box-sizing: border-box;
			}
		}
	}

</style>
