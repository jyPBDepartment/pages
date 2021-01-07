<template>
	<view>
		<view class="search-top" v-if="typeFrom == 1">
			<view class="item" @click="showSelect(1)">
				<u-input input-align="center" style="z-index: -1;" v-model="province" placeholder="省份" type="select" />
				<u-picker mode="selector" v-model="showProvince" range-key="name" :default-selector="[0]" :range="provinceList" @confirm="selectedProvince"></u-picker>
			</view>
			<u-line length="50" color="#f2f2f2" direction="col"></u-line>
			<view class="item" @click="showSelect(2)">
				<u-input style="z-index: -1;" input-align="center" v-model="city" placeholder="地级市" type="select" />
				<u-picker mode="selector" @confirm="selectedCity" v-model="showCity" range-key="name" :default-selector="[0]" :range="cityList"></u-picker>
			</view>
			<u-line length="50" color="#f2f2f2" direction="col"></u-line>
			<view class="item" @click="showSelect(3)">
				<u-input style="z-index: -1;" input-align="center" range-key="name" v-model="district" placeholder="区/县" type="select" />
				<u-picker mode="selector" @confirm="selecteddistrict" v-model="showdistrict" range-key="name" :default-selector="[0]" :range="districtList"></u-picker>
			</view>
		</view>
		<view class="qiun-columns">
			<view class="top">
				<u-icon name="http://60.205.246.126/images/2021/01/07/1610010693496098.png" size="30"></u-icon>
				<text>玉米</text>
			</view>
			<view class="t-c f-14 header-title">
				<view v-if="typeFrom != 1">吉林省玉米价格行情(元/斤)</view>
				<view v-else class="title-tip">{{ RangStr }}玉米价格行情(元/斤)</view>
				<view class="more" v-if="typeFrom != 1" @tap="goQuotation">
					<text>更多</text>
					<u-icon name="arrow-right" size="30"></u-icon>
				</view>
			</view>
			<view class="tips">说明：该数据来源为资源整合，本公司对于其准确性、真实性不负任何法律责任，仅供参考。（该价格玉米为14%水分）</view>
			<view class="qiun-charts"><canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas></view>
			<view style="text-align: center;margin: 10rpx auto;">
				<u-tag text="7日" style="width: 100rpx;" mode="dark" shape="circle" :bg-color="tagClick == '0' ? '#19BE6B' : '#C4C4C4'" @click="tabSelect('0')"></u-tag>
				<u-tag text="30日" style="margin-left: 30rpx;width: 100rpx;" mode="dark" shape="circle" :bg-color="tagClick == '1' ? '#19BE6B' : '#C4C4C4'" @click="tabSelect('1')"></u-tag>
			</view>
		</view>
	</view>
</template>

<script>
import uCharts from '@/u-charts/u-charts.js';
import ApiPath from '@/api/ApiPath.js';
var _self;
var canvaLineA = null;
export default {
	props: {
		typeFrom: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			tagClick: 0,
			type: '',
			city: '',
			province: '吉林省',
			district: '',
			cityId: '',
			provinceId: '',
			districtId: '',
			showCity: false,
			showProvince: false,
			showdistrict: false,
			cityList: [],
			provinceList: [],
			districtList: [],
			priceObj: {
				max: '',
				min: ''
			},
			tabValue: '1'
		};
	},
	created() {
		_self = this;
		this.cWidth = uni.upx2px(660);
		this.cHeight = uni.upx2px(500);
		canvaLineA = null;
		this.getCityList();
	},
	watch: {
		tagClick: {
			handler: function(vnew, old) {
				if (vnew != old) {
					this.getServerData(vnew);
				}
			},
			immediate: true
		}
	},
	computed: {
		RangStr: function() {
			let city = '';
			let district = '';
			if (this.city) {
				city = '/' + this.city;
			}
			if (this.district) {
				district = '/' + this.district;
			}
			return this.province + city + district;
		}
	},
	methods: {
		updateData() {
			this.getCityList();
		},
		tabSelect(val) {
			if (val == '0') {
				this.tagClick = '0';
			}
			if (val == '1') {
				this.tagClick = '1';
			}
		},
		goQuotation() {
			uni.navigateTo({
				url: '/pages/grain/quotation'
			});
		},
		getServerData(val) {
			let self = this;
			let param = {
				type: val,
				province: this.provinceId,
				city: this.cityId,
				district: this.districtId
			};

			uni.request({
				url: ApiPath.url.findGrainPricesByType,
				method: 'GET',
				data: param,
				success: res => {
					if (res.data.state == 0 && res.data.data.length) {
						let LineA = {
							categories: [],
							series: []
						};
						let categories = [];
						let seriesDataMax = [];
						let seriesDataMin = [];
						let series = [
							{
								name: '',
								legendShape: '',
								pointShape: '',
								show: '',
								type: '',
								color: '',
								data: []
							},
							{
								name: '',
								legendShape: '',
								pointShape: '',
								show: '',
								type: '',
								color: '',
								data: []
							}
						];
						let result = res.data.data;
						for (let i = 0; i < result.length; i++) {
							categories.push(result[i].priceDate.substring(5, 10));
							seriesDataMax.push(result[i].maxPrice);
							seriesDataMin.push(result[i].minPrice);
						}
						self.priceObj.min = result[result.length - 1].minPrice;
						self.priceObj.max = result[result.length - 1].maxPrice;
						series[0].name = '最高价格';
						series[0].legendShape = 'line';
						series[0].pointShape = 'circle';
						series[0].show = true;
						series[0].type = 'line';
						series[0].color = '#ff3328';
						series[0].data = seriesDataMax;

						series[1].name = '最低价格';
						series[1].legendShape = 'line';
						series[1].pointShape = 'circle';
						series[1].show = true;
						series[1].type = 'line';
						series[1].color = '#1890ff';
						series[1].data = seriesDataMin;
						LineA.categories = categories;
						LineA.series = series;

						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						// LineA.categories = ['09-25','09-26','09-27','09-28','09-25','09-26','09-27','09-28','09-25','09-26','09-27','09-28'];
						// LineA.series = [{'name':'玉米价格','data':[1,1.2,1.3,0.9,1,1.2,1.3,0.9,1,1.2,1.3,0.9],'legendShape': "line",'pointShape': "circle",'show': true,'type': "line",'color': "#1890ff"}];
						_self.showLineA('canvasLineA', LineA);
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		showLineA(canvasId, chartData) {
			let labelCount = this.tagClick === '0' ? 8 : 9;
			canvaLineA = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				fontSize: 11,
				legend: {
					show: true
				},
				dataLabel: false,
				dataPointShape: true,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				xAxis: {
					type: 'grid',
					gridColor: '#CCCCCC',
					gridType: 'solid',
					dashLength: 2,
					boundaryGap: 'justify',
					fontSize: 7,
					gridEval: 1,
					labelCount: 8
				},
				yAxis: {
					title: '元/斤',
					gridType: 'dash',
					gridColor: '#CCCCCC',
					dashLength: 4,
					splitNumber: 2,
					fontSize: 8,
					format: val => {
						if (val == 0) {
							return 0;
						} else {
							return val.toFixed(1);
						}
					}
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		},
		touchLineA(e) {
			canvaLineA.showToolTip(e, {
				format: function(item, category) {
					return category + '\n' + item.name + ':' + item.data;
				}
			});
		},
		getPrice() {
			return [this.priceObj.min, this.priceObj.max];
		},
		showSelect(val) {
			if (val == 1) {
				this.getCityList();
				this.showProvince = true;
			}
			if (val == 2) {
				this.showCity = true;
			}
			if (val == 3) {
				if (this.cityId) {
					this.showdistrict = true;
				}
			}
		},
		getCityList(id, type) {
			let self = this;
			let param = {
				parentId: id
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.grainPricesGetArea, //请求接口路径
				success: res => {
					let arr = res.data.data;

					if (type == 'city') {
						self.cityList = arr;
					} else if (type == 'district') {
						self.districtList = arr;
					} else {
						self.provinceList = arr;
						for (let i = 0; i < arr.length; i++) {
							if (arr[i].name == '吉林省') {
								self.provinceId = arr[i].id;
								self.getServerData('0');
								break;
							}
						}
						self.getCityList(self.provinceId, 'city');
					}
				},
				fail: err => {}
			});
		},
		selectedCity(index) {
			this.city = this.cityList[index[0]].name;
			this.cityId = this.cityList[index[0]].id;
			this.getCityList(this.cityList[index[0]].id, 'district');
			this.district = '';
			this.districtId = '';
			setTimeout(() => {
				this.getServerData('0');
			});
			this.$emit('cityChang', this.RangStr);
		},
		selectedProvince(index) {
			this.province = this.provinceList[index[0]].name;
			this.provinceId = this.provinceList[index[0]].id;

			this.district = '';
			this.city = '';
			this.districtId = '';
			this.cityId = '';
			this.getCityList(this.provinceList[index[0]].id, 'city');
			setTimeout(() => {
				this.getServerData('0');
			});
			this.$emit('cityChang', this.RangStr);
		},
		selecteddistrict(index) {
			this.district = this.districtList[index[0]].name;
			this.districtId = this.districtList[index[0]].id;
			setTimeout(() => {
				this.getServerData('0');
			});
			this.$emit('cityChang', this.RangStr);
		}
	}
};
</script>

<style lang="scss">
.search-top {
	display: flex;
	padding: 10rpx 0;
	border-bottom: 1rpx solid #f4f4f4;
	margin-bottom: -20rpx;
	align-items: center;
	.item {
		flex: 1;
		padding: 0 20rpx;
		margin-right: 2rpx;
	}
}
.qiun-columns {
	margin: 20rpx;
	box-sizing: border-box;
	background-color: #ffffff;
	padding: 20rpx 0;
	.top{
		color: rgba($color: #000000, $alpha: 0.6);
		line-height: 40rpx;
		display: flex;
		align-items: center;
		
	}

	.header-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-weight: 500;
		font-size: 36rpx;
		.title-tip {
			font-size: 28rpx;
		}
		.more {
			font-size: 28rpx;
			color: #5EB14E;
		}
	}
}

/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
.qiun-charts {
	width: 660upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts {
	width: 660upx;
	height: 500upx;
	background-color: #ffffff;
}

.tips {
	font-size: 20rpx;
	background-color: #f2f2f2;
	margin: 20rpx 0rpx;
	line-height: 35rpx;
	text-align: left;
	padding: 10rpx;
	border-radius: 10rpx;
	color: #e51c2e;
	background: $comm-border-color;
}
</style>
