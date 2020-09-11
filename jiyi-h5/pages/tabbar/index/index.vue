<template>
	<view>
		<!-- search 组件监听到得参数search方法获取 -->
		<HeaderSearch disabled @searchCallback="search"></HeaderSearch>
		<!-- <FoodstuffPrice></FoodstuffPrice> -->
		<view class="p-x-10">
			<view class="p-y-10 btn b-t">
				<view class="box" @click="jump(item, index)" v-for="(item, index) in btnList" :key="index">
					<view class="modular" :style="{'background-color':item.backgroundColor}">
						<image :src="item.url" mode=""></image>
					</view>
					<p>{{item.name}}</p>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">农服预约</view>
					<view class="f-14" @click="moreNf">更多</view>
					<u-icon class="f-14" @click="moreNf" name="arrow-right"></u-icon>
				</view>
				<view class="preview">
					<view v-if="!nfList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsNf(item.id)" v-for="(item, index) in nfList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-14 title">{{item.name}}</p>
						<p class="f-12 address">{{item.address}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">粮食买卖</view>
					<view class="f-14" @click="moreMm">更多</view>
					<u-icon class="f-14" @click="moreMm" name="arrow-right"></u-icon>
				</view>
				<view class="preview">
					<view v-if="!mmList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsMm(item.id)" v-for="(item, index) in mmList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-12 o-e" style="line-height: 32rpx;margin-top: 20rpx;">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">农机</view>
					<view class="f-14" @click="moreNj">更多</view>
					<u-icon class="f-14" @click="moreNj" name="arrow-right"></u-icon>
				</view>
				<view class="preview">
					<view v-if="!NjList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsNj(item.id)" v-for="(item, index) in NjList" :key="index">
						<view class="img">
							<view class="tag f-12 t-c">{{item.transactionTypeCode}}</view>
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-12 o-e" style="line-height: 32rpx;margin-top: 20rpx;">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">病虫害</view>
					<view class="f-14" @click="moreCh">更多</view>
					<u-icon class="f-14" @click="moreCh" name="arrow-right"></u-icon>
				</view>
				<view class="preview">
					<view v-if="!ChList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsCh(item.id)" v-for="(item, index) in ChList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-14 title g-j-c">{{item.name}}</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Interface from '@/api/ApiPath.js'
	import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	import MD5 from '../../../utils/md5.js'
	export default {
		components: {
			HeaderSearch,
			FoodstuffPrice
		},
		data() {
			return {
				btnList: [],
				nfList: [],
				mmList: [],
				NjList: [],
				ChList: []
			};
		},
		onLoad(e) {
			// 从外部接口获取客户信息
			this.initCustomerInfo(e);
			// 初始化加载模块信息	
			this.initModuleInfo();
			// 初始化加载农服预约信息
			this.initAgriInfo();
			// 初始化加载粮食买卖信息
			this.initGrainInfo();
			// 初始化加载农机信息
			this.initAgriMachineInfo();
			// 初始化加载病虫害信息
			this.initCaseInfo();
		},
		methods: {
			// 从外部接口获取客户信息
			initCustomerInfo(e) {
				// alert("从app获取用户id=" + e.U + " sessionId=" + e.SI)
				Interface.common.userId = e.U; //缓存用户id
				Interface.common.sessionId = e.SI; //缓存sessionId
				let s = e.U +"+"+ e.SI+"+" + Interface.md5.key;
				let sign = MD5(s).toUpperCase()
				let param = {
					"PTN": "P101999",
					"U": e.U,
					"SI": e.SI,
					"S": sign
				}
				uni.request({
					method: 'POST',
					url: Interface.extendUrl.findCustmerInfo,
					data: param,
					success: (res) => {
						// alert(JSON.stringify(res))
						let code = res.data.RETURNRESULT.RESULT;
						let message = res.data.RETURNRESULT.RETCODE;
						if(code=="1"){
							// alert("成功返回")
							// 昵称
							Interface.common.nc = res.data.RETURNRESULT.NN;
							// alert("昵称："+Interface.common.nc)
						}
						if(code=="-1"){
							// alert("失败")
						}
						if(code=="0"){
							// alert("处理中")
						}
						if(code=="2"){
							// alert("异常")
						}
					}
				})
			},
			// 初始化加载模块信息
			initModuleInfo() {
				uni.request({
					url: Interface.url.findModuleOn,
					method: "GET",
					data: {},
					success: (res) => {
						if (res.data.state == 0) {
							this.btnList = res.data.data.map(item => {
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
						}
					},
					fail: (err) => {}
				});
			},
			// 初始化农服预约信息
			initAgriInfo() {
				uni.request({
					url: Interface.url.findNewInfo,
					method: "GET",
					data: {
						type: 0
					},
					success: (res) => {
						if (res.data.state == 0) {
							this.nfList = res.data.data.map(item => {
								if (item.address.indexOf("内蒙古") > -1) {
									item.address = "内蒙古";
								} else {
									let address = item.address.split('/');
									item.address = address[1] + "." + address[2];
								}
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
						}
					},
					fail: (err) => {}
				});
			},
			// 初始化加载粮食买卖信息
			initGrainInfo() {
				uni.request({
					url: Interface.url.findNewInfo,
					method: "GET",
					data: {
						type: 1
					},
					success: (res) => {
						if (res.data.state == 0) {
							this.mmList = res.data.data.map(item => {
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
						}
					},
					fail: (err) => {}
				});
			},
			// 初始化加载农机信息
			initAgriMachineInfo() {
				uni.request({
					url: Interface.url.findNewInfo,
					method: "GET",
					data: {
						type: 2
					},
					success: (res) => {
						if (res.data.state == 0) {
							this.NjList = res.data.data.map(item => {
								if (item.transactionTypeCode == 0) {
									item.transactionTypeCode = '收购'
								} else if (item.transactionTypeCode == 1) {
									item.transactionTypeCode = '出售'
								} else if (item.transactionTypeCode == 2) {
									item.transactionTypeCode = '出租'
								} else if (item.transactionTypeCode == 3) {
									item.transactionTypeCode = '播种'
								} else if (item.transactionTypeCode == 4) {
									item.transactionTypeCode = '植保'
								} else if (item.transactionTypeCode == 5) {
									item.transactionTypeCode = '收割'
								}
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
						}
					},
					fail: (err) => {}
				});
			},
			// 初始化加载病虫害信息
			initCaseInfo() {
				uni.request({
					url: Interface.url.findLatestCaseInfo,
					method: "GET",
					data: {},
					success: (res) => {
						if (res.data.state == 0) {
							this.ChList = res.data.data.map(item => {
								if (item.url != '') {
									item.url = item.url.split(',')[0]
								}
								return item
							})
						}
					},
					fail: (err) => {}
				});
			},
			//组件监听搜索内容方法
			search(e) {
				console.log(e)
			},
			/**
			 * 模块功能跳转
			 * 根据不同模块路径跳转相关主页
			 * */
			jump(item, index) {
				if (item.tabMode != 0) {
					uni.navigateTo({
						url: item.routeUrl
					});
				} else {
					uni.switchTab({
						url: item.routeUrl
					});
				}
			},
			moreNf() {
				uni.switchTab({
					url: '/pages/tabbar/service/index'
				});
			},
			moreMm() {
				uni.navigateTo({
					url: '/pages/catalog/grainTrade'
				})
			},
			moreNj() {
				uni.navigateTo({
					url: '/pages/catalog/sellAgriculturalMachinery'
				})
			},
			moreCh() {
				uni.navigateTo({
					url: '/pages/catalog/findDisease'
				})
			},
			// 农服详情跳转
			detailsNf(val) {
				uni.navigateTo({
					url: '/pages/grain/paddy?id=' + val
				})
			},
			// 粮食买卖详情跳转
			detailsMm(val) {
				uni.navigateTo({
					url: '/pages/grain/space?id=' + val + '&isShow=0'
				})
			},
			// 农机详情跳转
			detailsNj(val) {
				uni.navigateTo({
					url: '/pages/grain/spaceCancel?id=' + val
				})
			},
			// 病虫害详情跳转
			detailsCh(val) {
				uni.navigateTo({
					url: '/pages/grain/richText?id=' + val
				})
			},
		}
	};
</script>

<style lang="scss">
	.btn {
		display: flex;
		flex-wrap: wrap;

		.box {
			flex: 1;
			min-width: 20%;
			max-width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;

			.modular {
				border-radius: 28rpx;
				overflow: hidden;
				width: 100rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 100%;
					height: 100%;
				}
			}

			p {
				font-size: 22rpx;
				text-align: center;
				line-height: 56rpx;
			}
		}
	}

	.appointment {
		line-height: 82rpx;

		.title {
			display: flex;
		}
	}

	.preview {
		display: flex;
		flex-wrap: wrap;

		.buju {
			width: 210rpx;
			padding-bottom: 20rpx;
			padding-left: 10rpx;
			padding-right: 16rpx;

			.img {
				width: 210rpx;
				height: 174rpx;
				position: relative;
				overflow: hidden;
				position: relative;

				.tag {
					position: absolute;
					z-index: 9;
					border-radius: 5rpx;
					color: #fff;
					top: 2rpx;
					left: 2rpx;
					background: #ff0000;
					width: 72rpx;
					line-height: 50rpx;

				}

				.preview-img {
					width: 100%;
					height: 100%;
				}

				.number {
					position: absolute;
					bottom: 0;
					right: 30rpx;

					image {
						width: 28rpx;
						height: 28rpx;
					}
				}
			}

			.title {
				line-height: 32rpx;
				margin-top: 20rpx;
			}

			.address {
				line-height: 42rpx;
			}
		}
	}
</style>
