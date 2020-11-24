<template>
	<view class="qiun-columns">
		<view class="t-c f-14 header-title">
			<view>吉林省玉米价格行情(元/斤)</view>
			<view><u-icon v-if="typeFrom != 1" name="arrow-rightward" @tap="goQuotation" color="#666" size="36"></u-icon></view>
		</view>
		<view class="tips">说明：该数据来源为资源整合，本公司对于其准确性、真实性不负任何法律责任，仅供参考。（该价格玉米为14%水分）</view>
		<view class="qiun-charts">
			<canvas v-if="chartData" canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
			<view class="暂未查到数据" v-else>
				
			</view>
			
			</view>
		<view style="text-align: center;margin: 10rpx auto;">
			<u-tag text="7日"  style="width: 100rpx;"  mode="dark" shape="circle" :type="tagClick == '0' ? 'error' : 'info'" @click="getServerData('0')"></u-tag>
			<u-tag text="30日" style="margin-left: 30rpx;width: 100rpx;"  mode="dark" shape="circle" :type="tagClick == '1' ? 'error' : 'info'" @click="getServerData('1')"></u-tag>
		</view>
	</view>
</template>

<script>
import uCharts from '@/u-charts/u-charts.js';
import ApiPath from '@/api/ApiPath.js';
// import commCharts from '@/components/commCharts.vue';
var _self;
var canvaLineA = null;
export default {
	// components:{commCharts},
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
			chartData:false
		};
	},
	created() {
		_self = this;
		this.cWidth = uni.upx2px(660);
		this.cHeight = uni.upx2px(500);
		this.getServerData('0');
	},
	methods: {
		goQuotation() {
			console.log(1);
			uni.navigateTo({
				url: '/pages/grain/quotation?type=1'
			});
		},
		getServerData(val) {
			let self = this;
			if (val == '0') {
				this.tagClick = '0';
			}
			if (val == '1') {
				this.tagClick = '1';
			}
			let param = {
				type: val
			};

			uni.request({
				url: ApiPath.url.findGrainPricesByType,
				method: 'GET',
				data: param,
				success: res => {
					if (res.data.state == 0 && res.data.data.length) {
						self.chartData = true
						let LineA = {
							categories: [],
							series: []
						};
						let categories = [];
						let seriesData = [];
						let seriesData1 = [];
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
							seriesData.push(result[i].price || 0);
							seriesData1.push((parseFloat(result[i].price || 0) + 0.4).toFixed(2));
						}

						series[0].name = '最低价格';
						series[0].legendShape = 'line';
						series[0].pointShape = 'circle';
						series[0].show = true;
						series[0].type = 'line';
						series[0].color = '#1890ff';
						series[0].data = seriesData;
						// console.log(seriesData1);
						series[1].name = '最高价格';
						series[1].legendShape = 'line';
						series[1].pointShape = 'circle';
						series[1].show = true;
						series[1].type = 'line';
						series[1].color = '#ff3328';
						series[1].data = seriesData1;
						LineA.categories = categories;
						LineA.series = series;
						console.log(seriesData,seriesData1)
						// console.log(LineA)
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						// LineA.categories = ['09-25','09-26','09-27','09-28','09-25','09-26','09-27','09-28','09-25','09-26','09-27','09-28'];
						// LineA.series = [{'name':'玉米价格','data':[1,1.2,1.3,0.9,1,1.2,1.3,0.9,1,1.2,1.3,0.9],'legendShape': "line",'pointShape': "circle",'show': true,'type': "line",'color': "#1890ff"}];
						_self.showLineA('canvasLineA', LineA);
					}else{
						self.chartData = false
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
					splitNumber: 4,
					// disableGrid:true,
					min: 0,
					max: 1,
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
		}
	}
};
</script>

<style lang="scss">
.qiun-columns {
	margin: 20rpx;
	box-sizing: border-box;
	background-color: #ffffff;
	padding: 30rpx 20rpx 10rpx 20rpx;
	.header-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-weight: 500;
		font-size: 36rpx;
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
