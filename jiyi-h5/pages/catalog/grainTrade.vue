<template>
	<view class="service">
		<!-- 搜索栏 -->
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<!-- 菜单展示栏 -->
		<view class="b-f">
			<u-dropdown ref="uDropdown" @open="open" @close="close">
				<u-dropdown-item title="区域">
					<view class="slot-content">
						<u-row align="top" class="b-t">
							<u-col span="4" style="background-color: #FFFFFF;">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag text="全区域" :type="allIndex == '1' ? 'error' : 'info'" @click="allProvince" class="my-tags" />
									<u-tag
										:text="item.label"
										:type="clickProvinceIndex == key ? 'error' : 'info'"
										v-for="(item, key) in provinceData"
										@click="getMap(item.label, 'pro', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
							<u-col span="4" style="border-left: 1px #f4f4f4 solid;background-color: #FFFFFF;" v-if="cityData.length">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag
										:text="item.label"
										:type="clickCityIndex == key ? 'error' : 'info'"
										v-for="(item, key) in cityData"
										@click="getMap(item.label, 'city', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
							<u-col span="4" style="border-left: 1px #f4f4f4 solid;background-color: #FFFFFF;" v-if="areaData.length">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag
										:text="item.label"
										:type="clickAreaIndex == key ? 'error' : 'info'"
										v-for="(item, key) in areaData"
										@click="getMap(item.label, 'area', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
						</u-row>
					</view>
				</u-dropdown-item>
				<u-dropdown-item title="身份" v-model="sfValue" :options="sfOptions"></u-dropdown-item>
				<u-dropdown-item title="筛选"></u-dropdown-item>
			</u-dropdown>
		</view>
		<u-line color="#f4f4f4"></u-line>
		<!-- 列表数据显示 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10">
				<view class="app-modular g-flex" @click="jump(item.id)" v-for="(item, index) in dataList" :key="index">
					<image class="app-img" :src="item.url" mode=""></image>
					<view class="app-info g-flex g-f-1 g-f-column g-j-s-b">
						<p class="title f-14">{{ item.name }}</p>
						<view v-if="item.address" class="g-flex f-12 g-a-c" style="color: rgba(128, 128, 128, 1)">
							<u-icon style="margin-right: 5rpx;" name="map-fill" color="#A6A6A6" size="36"></u-icon>
							{{ item.address }}
						</view>
						<view class="g-flex g-j-s-b f-14 g-a-c">
							<view class="g-flex g-a-c">
								<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 40rpx;height:40rpx;margin-right: 20rpx;"></image>
								<view class="word">{{ item.contactsUser }}</view>
							</view>
							<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">{{ item.createDate }}</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
		<uni-drawer ref="drawer" mode="right" :visible="true" :width="300" @close="drawerClose" @change="drawerChange">
			<view style="padding:20rpx">
				<view v-for="(item, index1) in screenList" :key="index1">
					<view class="f-16" style="line-height: 52rpx;margin-bottom: 20rpx;">{{ item.title }}</view>
					<view class="comm-drawer-categorys b-t">
						<view v-for="(item, index) in item.category" :key="index" :class="screenedIndex == index && ' screened'" @click="selected(index1, index)" class="item">
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
			<view class="drawer-bottom-btn">
				<u-button class="btn" size="medium" shape="circle" @click="recharge" plain>重置</u-button>
				<u-button class="btn" size="medium" shape="circle" @click="confirm(true)" type="error">确认</u-button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import MescrollMixin from '@/mescroll-uni/mescroll-mixins.js';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import provinceData from '../../components/regionalComponents/city-data/province.js';

export default {
	mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
	components: {
		HeaderSearch
	},
	data() {
		return {
			allIndex: '1',
			clickAreaIndex: null,
			clickCityIndex: null,
			clickProvinceIndex: null,
			provinceType: 'info',
			sfValue: '',
			sfOptions: [
				{
					label: '全部',
					value: ''
				},
				{
					label: '农户',
					value: 1
				},
				{
					label: '粮贩',
					value: 2
				},
				{
					label: '粮库',
					value: 3
				}
			],
			condition: [
				{
					name: '全部',
					code: null
				},
				{
					name: '农户',
					code: 1
				},
				{
					name: '粮贩',
					code: 2
				},
				{
					name: '粮库',
					code: 3
				},
				{
					name: '筛选',
					code: null
				}
			],
			screenList: [
				{
					title: '农作物类别',
					category: [
						{
							code: 0,
							name: '玉米'
						},
						{
							code: 2,
							name: '水稻'
						},
						{
							code: 3,
							name: '高粱'
						},
						{
							code: 4,
							name: '黄豆'
						}
					]
				}
			],
			screenList1: [
				{
					title: '省份',
					category: [
						{
							code: 0,
							name: '吉林省'
						},
						{
							code: 1,
							name: '黑龙江省'
						},
						{
							code: 2,
							name: '辽宁省'
						},
						{
							code: 3,
							name: '内蒙古'
						}
					]
				}
			],
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
			address: '',
			regionaStatus: true,
			provinceData: '',
			cityData: '',
			areaData: '',
			drop: '',
			screenedIndex: null,
			screened: ''
		};
	},
	onLoad() {},
	methods: {
		drawerChange(e) {
			if (!e) {
				let params = '';
				if (this.screenedIndex != null) {
					for (let i = 0; i < this.screenList[0].category.length; i++) {
						if (i == this.screenedIndex) {
							params = this.screenList[0].category[i].code;
						}
					}
					this.transactionCategoryCode = params;
				} else {
					this.screenedIndex = null;
					this.screened = null;
					this.transactionCategoryCode = params;
				}
				this.$refs.uDropdown.close();
				this.$refs.uDropdown.highlight(2);
				this.downCallback();
			}
		},
		drawerClose() {},
		recharge() {
			this.screenedIndex = null;
			this.screened = null;
			this.transactionCategoryCode = '';
			this.downCallback();
			// this.$refs.drawer.close();
		},
		confirm(e) {
			let params = '';
			for (let i = 0; i < this.screenList[0].category.length; i++) {
				if (i == this.screenedIndex) {
					params = this.screenList[0].category[i].code;
				}
			}

			this.transactionCategoryCode = params;
			this.$refs.drawer.close();
			this.$refs.uDropdown.close();
			this.$refs.uDropdown.highlight(2);
		},
		selected(index1, index) {
			this.screenedIndex = index;
		},
		allProvince() {
			this.allIndex = 1;
			this.address = '';
			this.clickProvinceIndex = null;
			this.clickCityIndex = null;
			this.clickAreaIndex = null;
			this.$refs.uDropdown.close();
		},
		change() {},
		//高德获取地区信息
		getMap(name, type, index) {
			//name选择名称 type类型
			let that = this;
			uni.request({
				url: 'http://restapi.amap.com/v3/config/district', //仅为示例，并非真实接口地址。
				data: {
					key: 'ce6323f12466857e448d60dc495cd269',
					keywords: name,
					subdistrict: 1
				},
				success: res => {
					let arr = res.data.districts[0].districts;
					let data = [];
					arr.forEach(item => {
						data.push({
							label: item.name
						});
					});
					if (type == 'pro') {
						if (this.clickProvinceIndex != index) {
							this.clickCityIndex = null;
							this.clickAreaIndex = null;
						}
						this.clickProvinceIndex = index;
						that.cityData = []; // 市的所有數據
						that.cityData = data;
					} else if (type == 'city') {
						if (this.clickCityIndex != index) {
							this.clickAreaIndex = null;
						}
						this.clickCityIndex = index;
						that.areaData = []; // 区的所有数据
						that.areaData = data;
					} else if (type == 'area') {
						this.clickAreaIndex = index;
						// that.streetsData = []; // 街道的所有数据
						// that.streetsData = data;

						let province = '';
						let city = '';
						let area = '';
						// 组合城市数据
						for (let i = 0; i < this.provinceData.length; i++) {
							if (i == this.clickProvinceIndex) {
								province = this.provinceData[i].label;
							}
						}

						for (let i = 0; i < this.cityData.length; i++) {
							if (i == this.clickCityIndex) {
								city = this.cityData[i].label;
							}
						}

						for (let i = 0; i < this.areaData.length; i++) {
							if (i == this.clickAreaIndex) {
								area = this.areaData[i].label;
							}
						}

						this.address = province + '/' + city + '/' + area;

						this.$refs.uDropdown.close();
					}

					that.allIndex = '0';
				}
			});
		},
		open(index) {
			// 点击筛选时
			if (index == 2) {
				this.$refs.drawer.open();
			}
			this.$refs.uDropdown.highlight();
			let result = [];
			for (let i = 0; i < provinceData.length; i++) {
				if (provinceData[i].label == '内蒙古自治区' || provinceData[i].label == '辽宁省' || provinceData[i].label == '吉林省' || provinceData[i].label == '黑龙江省') {
					result.push(provinceData[i]);
				}
			}
			this.provinceData = result;
		},
		close(index) {
			this.$refs.uDropdown.highlight(index);
			this.identityCode = this.sfValue;

			this.downCallback();
		},
		closeDropdown() {
			this.$refs.uDropdown.close();
		},
		removeSpaces(string) {
			return string.replace(/\s*/g, '');
		},
		// 跳转详情页面
		jump(val) {
			uni.navigateTo({
				url: '../grain/space?id=' + val + '&isShow=0'+'&type=0'
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
		// screened(e) {
		// 	this.address = "";
		// 	this.transactionCategoryCode = "";
		// 	if (e !== null) {
		// 		if (e.indexOf(",") > -1) { //如果包含，,说明是选择多组条件
		// 			let val = e.split(",");
		// 			this.transactionCategoryCode = val[0];
		// 			this.address = val[1];
		// 		} else {
		// 			this.transactionCategoryCode = e;
		// 		}
		// 	}
		// 	this.downCallback()
		// },
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
.my-scroll-view {
	height: 500rpx;
	padding: 10rpx 20rpx 20rpx 20rpx;
	.my-tags {
		text-align: center;
		width: auto;
		margin-bottom: 20rpx;
		margin-right: 20px;
		position: relative;
	}
	.my-tags:first-child {
		margin-top: 20rpx;
	}
}
.service {
	overflow: hidden;
}
.app-modular {
	padding-bottom: 20rpx;
	border-bottom: 1px solid rgba(229, 229, 229, 1);
}

.tagGrain {
	width: 140rpx;
	line-height: 40rpx;
	border-radius: 13rpx;
	border: 1px solid rgba(255, 87, 51, 1);
	color: rgba(255, 87, 51, 1);
	font-weight: bold;
	text-align: center;
}

.app-number-grain {
	color: #333;
	line-height: 60rpx;
}

.word {
	font-size: 22rpx;
	font-weight: 500;
}

.screen {
	height: 84rpx;
	color: #808080;
	border-bottom: 1px solid #808080;

	.sort {
		height: 34rpx;
	}
}

.screened {
	// width: 30rpx;
	background-color: #e51c2e !important;
	color: #fff !important;
}

.screen-select {
	color: #e51c2e;
	font-weight: bold;
}

.st {
	justify-content: space-between !important;
}
</style>
