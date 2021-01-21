<template>
	<view class="service">
		<!-- 搜索栏 -->
		<HeaderSearch @searchCallback="search"></HeaderSearch>

		<view class="screen-bg">
			<u-dropdown ref="uDropdown" @open="open" @close="uDropdownClose" :close-on-click-mask="false">
				<u-dropdown-item title="区域">
					<view class="slot-content-g">
						<u-row align="top" class="b-t">
							<u-col span="4" style="background-color: #FFFFFF;">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag text="全区域" :type="allIndex == '1' ? 'success' : 'info'" @click="allProvince" class="my-tags" />
									<u-tag
										:text="item.label"
										:type="clickProvinceIndex == key ? 'success' : 'info'"
										v-for="(item, key) in provinceData"
										@click="getMap(item.label, 'pro', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
							<u-col span="4" style="border-left: 1px #f4f4f4 solid;background-color: #FFFFFF;">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag
										:text="item.label"
										:type="clickCityIndex == key ? 'success' : 'info'"
										v-for="(item, key) in cityData"
										@click="getMap(item.label, 'city', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
							<u-col span="4" style="border-left: 1px #f4f4f4 solid;background-color: #FFFFFF;">
								<scroll-view scroll-y="true" class="my-scroll-view">
									<u-tag
										:text="item.label"
										:type="clickAreaIndex == key ? 'success' : 'info'"
										v-for="(item, key) in areaData"
										@click="getMap(item.label, 'area', key)"
										:key="key"
										class="my-tags"
									/>
								</scroll-view>
							</u-col>
						</u-row>
						<view class="area-select-bottom">
							<u-button type="info" size="medium" style="margin-right: 80rpx;" @click="sureSelectArea(false)">取消</u-button>
							<u-button type="success" size="medium" @click="sureSelectArea(true)">确认</u-button>
						</view>
					</view>
				</u-dropdown-item>
				<u-dropdown-item title="身份" v-model="sfValue" :options="sfOptions"></u-dropdown-item>
				<u-dropdown-item title="筛选"></u-dropdown-item>
			</u-dropdown>
		</view>
		<u-line color="#f4f4f4"></u-line>
		<FilterCom @selectTab="selectTab"></FilterCom>

		<!-- 菜单展示栏 -->

		<!-- 列表数据显示 -->
		<view class="comm-list-item" @tap.stop="jump(item.id)" v-for="(item, index) in dataList" :key="index">
			<image class="item-img" :src="item.url" mode=""></image>
			<view class="item-info">
				<p class="title">{{ item.name }}</p>
				<view v-if="item.address" class="address g-flex g-a-c" style="color: rgba(128, 128, 128, 1)">
					<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334898551200.png" size="24"></u-icon>
					{{ item.address }}
				</view>
				<view class="contactsUser">
					<view class="g-flex g-a-c">
						<image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 28rpx;height:28rpx;margin-right: 20rpx;"></image>
						<view class="word">{{ item.contactsUser }}</view>
					</view>
					<view style="color: rgba(128, 128, 128, 1);font-size: 12px;">{{ item.updateDate ? formatTime(item.updateDate) : '' }}</view>
				</view>
				<view class="fun-btn">
					<view class="item">
						<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
						<text>{{ item.viewNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(item, 1, index)">
						<u-icon v-if="item.curCollention == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334200305905.png" size="24"></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
						<text>{{ item.collectionNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(item, 2, index)">
						<u-icon v-if="item.curPraise == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" size="24"></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>
						<text>{{ item.praiseNum }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="no-data" v-if="noData">
			<image src="http://www.mescroll.com/img/mescroll-empty.png?v=1"></image>
			<text>暂无数据</text>
		</view>
		<u-loadmore v-if="dataList.length > 0" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadmore" />

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
				<u-button class="btn" size="medium" shape="circle" @click="confirm(true)" type="success">确认</u-button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import provinceData from '../../components/regionalComponents/city-data/province.js';

export default {
	components: {
		HeaderSearch
	},
	onReachBottom() {
		if (this.nomore) {
			return false;
		}
		this.status = 'loading';
		this.page = ++this.page;
		this.request();
	},
	onShow() {
		this.request(true);
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
			// 列表数据
			dataList: [],
			status: 'loadmore',
			iconType: 'flower',
			loadText: {
				loadmore: '点我加载更多',
				loading: '客官别急马上就来~',
				nomore: '我是有底线的~~~'
			},
			page: 1,
			nomore: false,
			noData: false,
			type: '1',
			address: '',
			regionaStatus: true,
			provinceData: '',
			cityData: '',
			areaData: '',
			drop: '',
			screenedIndex: null,
			screened: '',
			collection: true,
			thumbs: true,
			sortIndex: 2 //1最火2最新3精品4热议5好评
		};
	},
	onLoad() {},
	methods: {
		formatTime(datetime) {
			var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear(),
				month = ('0' + (date.getMonth() + 1)).slice(-2),
				sdate = ('0' + date.getDate()).slice(-2),
				hour = ('0' + date.getHours()).slice(-2),
				minute = ('0' + date.getMinutes()).slice(-2),
				second = ('0' + date.getSeconds()).slice(-2);
			// 拼接
			var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute;
			// 返回
			return result;
		},
		loadmore() {
			this.status = 'loading';
			this.page = ++this.page;
			this.request();
		},
		clickIcon(item, val, i) {
			if (val == 1) {
				//收藏点击
				this.setCollection(item, i);
			}
			if (val == 2) {
				// 点赞
				this.setPraiseThumbs(item, i);
			}
		},
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				action: item.curCollention ? 0 : 1,
				agrId: item.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(Interface.url.grainTradingSetCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.curCollention == 1) {
							this.dataList[i].collectionNum = parseInt(this.dataList[i].collectionNum) - 1;
							this.dataList[i].curCollention = 0;
						} else {
							this.dataList[i].collectionNum = parseInt(this.dataList[i].collectionNum) + 1;
							this.dataList[i].curCollention = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.dataList.splice(0, 0);
					}
				})
				.catch(err => {});
		},
		// 点赞
		setPraiseThumbs(item, i) {
			let self = this;
			let params = {
				action: item.curPraise ? 0 : 1,
				agrId: item.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(Interface.url.grainTradingSetPraise, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (item.curPraise == 1) {
							this.dataList[i].praiseNum = parseInt(this.dataList[i].praiseNum) - 1;
							this.dataList[i].curPraise = 0;
						} else {
							this.dataList[i].praiseNum = parseInt(this.dataList[i].praiseNum) + 1;
							this.dataList[i].curPraise = 1;
						}
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
						this.dataList.splice(0, 0);
					}
				})
				.catch(err => {});
		},

		selectTab(val) {
			console.log(val);
			this.sortIndex = val;
			this.downCallback();
		},
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
				// this.downCallback();
			}
		},
		drawerClose() {},
		recharge() {
			this.screenedIndex = null;
			this.screened = null;
			this.transactionCategoryCode = '';
			this.downCallback();
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
			this.downCallback();
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
			// this.$refs.uDropdown.close();
		},
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
					let province = '';
					let city = '';
					let area = '';

					if (type == 'pro') {
						if (this.clickProvinceIndex != index) {
							this.clickCityIndex = null;
							this.clickAreaIndex = null;
						}
						this.clickProvinceIndex = index;
						that.cityData = []; // 市的所有數據
						that.cityData = data;

						// 组合城市数据
						for (let i = 0; i < this.provinceData.length; i++) {
							if (i == this.clickProvinceIndex) {
								province = this.provinceData[i].label;
							}
						}

						this.address = province;
					} else if (type == 'city') {
						if (this.clickCityIndex != index) {
							this.clickAreaIndex = null;
						}
						this.clickCityIndex = index;
						that.areaData = []; // 区的所有数据
						that.areaData = data;

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
						this.address = province + '/' + city;
					} else if (type == 'area') {
						this.clickAreaIndex = index;
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
					}

					that.allIndex = '0';
				}
			});
		},
		sureSelectArea(flag) {
			if (flag) {
				this.$refs.uDropdown.close();
			} else {
				this.address = '';
				this.clickAreaIndex = null;
				this.clickCityIndex = null;
				this.clickProvinceIndex = null;
				this.allIndex = 1;
				this.cityData = [];
				this.areaData = [];
				this.$refs.uDropdown.close();
			}
			this.downCallback();
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
		uDropdownClose(index) {
			this.$refs.uDropdown.highlight(index);
			this.identityCode = this.sfValue;
			if (index == 1) {
				this.downCallback();
			}
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
		/*下拉刷新的回调, 有三种处理方式:*/
		downCallback() {
			this.page = 1;
			this.request(true);
		},

		request(action) {
			let self = this;
			if (action) {
				this.dataList = [];
			}
			// 第1种: 请求具体接口
			uni.request({
				url: Interface.url.agriculturalFindAgriInfo,
				method: 'GET',
				data: {
					type: 1,
					name: this.searchName,
					page: this.page,
					size: 10,
					transactionTypeCode: this.transactionTypeCode,
					transactionCategoryCode: this.transactionCategoryCode,
					identityCode: this.identityCode,
					address: this.address,
					userId: getApp().globalData.userId,
					sort: this.sortIndex
				},
				success: res => {
					if (res.data.state == 0) {
						if (res.data.data.content.length < 10) {
							self.nomore = true;
							self.status = 'nomore';
							self.dataList = self.dataList.concat(res.data.data.content);
							if (self.dataList.length == 0) {
								self.noData = true;
							} else {
								self.noData = false;
							}
						} else {
							setTimeout(() => {
								self.nomore = false;
								self.status = 'loadmore';
								self.dataList = self.dataList.concat(res.data.data.content);
								if (self.dataList.length == 0) {
									self.noData = true;
								} else {
									self.noData = false;
								}
							}, 200);
						}
					}
				},
				fail: err => {
					// 请求失败,隐藏加载状态
					uni.showToast({
						title: '请求失败',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.slot-content-g {
	background-color: #ffffff;
}
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
	overflow: auto;
	height: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
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
	background-color: #5eb14e !important;
	color: #fff !important;
}

.screen-select {
	color: #5eb14e;
	font-weight: bold;
}

.st {
	justify-content: space-between !important;
}

.area-select-bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30rpx;
	border-top: 1rpx solid #f4f4f4;
}
</style>
