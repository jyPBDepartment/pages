<template>
	<view>
		<HeaderSearch @searchCallback="search" title="农服预约"></HeaderSearch>
		<view class="form-container">
			<view class="item">
				
				<view class="title">日期</view>
				<view class="info" @tap.stop="showDatePicker">
					<u-input class="value" disabled type="text" placeholder="请选择时间" :clearable="false" v-model="value" />
					<u-icon name="calendar" class="input-icon"></u-icon>
				</view>
			</view>
			<view class="item">
				
				<view class="title">面积</view>
				<view class="info">
					<u-input class="value" type="number" placeholder="输入面积" :clearable="false" v-model="area" />
					<text class="input-icon">亩</text>
				</view>
			</view>
			<view class="item" >
				
				<view class="title">干活地点</view>
				<view class="info">
					<u-input placeholder="请选择干活地点" v-model="workArea" type="select" @click="regionaStatus = true" />
				</view>
			</view>
			<view class="item ">
				
				<view class="title">农活价格</view>
				<view class="info">
					<u-input class="value" type="number" placeholder="输入价格" :clearable="false" v-model="workPrice" />
					<text class="input-icon">元/天</text>
				</view>
			</view>
			<view class="item">
				
				<view class="title">联系人</view>
				<view class="info"><u-input class="value" placeholder="输入联系人姓名" :clearable="false" v-model="contactUser" /></view>
			</view>
			<view class="item">
				
				<view class="title">联系电话</view>
				<view class="info"><u-input class="value" type="number" maxlength="11" placeholder="输入联系电话" :clearable="false" v-model="contactPhone" /></view>
			</view>
			<view class="item">
				
				<view class="title">土地图片</view>
				<view class="info">
					<u-upload
						:action="action"
						:show-progress="false"
						@on-choose-complete="onChoose"
						@on-remove="remove"
						@on-success="uploadSuccess"
						:max-size="5 * 1024 * 1024"
						:file-list="fileList"
						max-count="5"
					></u-upload>
				</view>
			</view>
			<u-button class="footer-btn-box" @tap="appointment" style="margin: 24rpx 0;" shape="circle" type="error">预约</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
		<u-calendar v-model="dateShow" mode="range" :min-date="currentDate" max-date="2050-01-01" @change="change" active-bg-color="#42b983" btn-type="success">
			<view slot="tooltip"><view class="t-c p-y-10" style="color: #2979FF">请选择时间</view></view>
		</u-calendar>
		<u-mask :show="show" :mask-tap-able="maskAble"></u-mask>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
import regionalComponents from '../../components/regionalComponents/regionalComponents.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch,
		regionalComponents
	},
	data() {
		return {
			currentDate: '',
			regionaStatus: false,
			dateShow: false,
			sexShow: false,
			value: '',
			action: ApiPath.url.uploadImg,
			fileList: [],
			area: '',
			workArea: '',
			workPrice: '',
			contactUser: '',
			contactPhone: '',
			beginDate: '',
			endTime: '',
			url: [],
			u: '',
			agrId: '',
			show: false,
			maskAble: false
		};
	},
	onLoad(e) {
		// 设置干活时间选择日历的最小开始时间
		this.currentDate = new Date().toISOString().slice(0, 10);
		// alert(uni.date)
		setTimeout(() => {
			this.$refs.region.getScreen();
		}, 1000);
		this.transKeyWordId(e.id);
	},
	methods: {
		showDatePicker() {
			console.log(11111);
			this.dateShow = true;
		},
		remove(index, lists) {
			this.url.splice(index, 1);
		},
		transKeyWordId(val) {
			this.agrId = val;
		},
		//图片
		uploadSuccess(data, index, lists, name) {
			this.$refs.uToast.show({
				title: '上传成功',
				type: 'success'
			});
			this.url.push(data.url);
			this.show = false;
			this.u = this.url;
		},
		onChoose(lists, name) {
			this.show = true;
		},
		//干活地点
		cancel() {
			this.regionaStatus = false;
		},
		sure(data) {
			console.log(data);
			this.regionaStatus = false;
			let map = '';
			data.forEach(item => {
				console.log('data', item);
				if (item != '' && item != '请选择') {
					if (map != '') {
						map = map + '/' + item;
					} else {
						map = item;
					}
				}
			});
			this.workArea = map;
		},
		//日期选择
		change(e) {
			this.value = e.startDate + '至' + e.endDate;
			this.beginDate = e.startDate;
			this.endTime = e.endDate;
		},
		//跳转页面
		release() {
			uni.navigateTo({
				url: '../response?state=1'
			});
		},
		//预约接口
		appointment() {
			if (this.value == '') {
				this.$refs.uToast.show({
					title: '请选择日期',
					type: 'error'
				});
				return false;
			}
			if (this.area == '') {
				this.$refs.uToast.show({
					title: '请输入面积',
					type: 'error'
				});
				return false;
			}
			if (!/^\d+(\.\d{2})?$/.test(this.area)) {
				this.$refs.uToast.show({
					title: '面积小数点后保留两位小数',
					type: 'error'
				});
				return false;
			}
			if (this.workArea == '') {
				this.$refs.uToast.show({
					title: '请输入干活地点',
					type: 'error'
				});
				return false;
			}
			if (this.workPrice == '') {
				this.$refs.uToast.show({
					title: '请输入农活价格',
					type: 'error'
				});
				return false;
			}

			if (!/^\d+(\.\d{1})?$/.test(this.workPrice)) {
				this.$refs.uToast.show({
					title: '价格只允许一位小数',
					type: 'error'
				});
				return false;
			}
			if (this.contactUser == '') {
				this.$refs.uToast.show({
					title: '请输入联系人',
					type: 'error'
				});
				return false;
			}
			if (this.contactPhone == '') {
				this.$refs.uToast.show({
					title: '请输入联系电话',
					type: 'error'
				});
				return false;
			}
			if (this.contactPhone == '' || !/^1[345789]\d{9}$/.test(this.contactPhone)) {
				this.$refs.uToast.show({
					title: '请输入正确的联系电话',
					type: 'error'
				});
				return false;
			}
			if (this.url == '') {
				this.$refs.uToast.show({
					title: '请选择图片',
					type: 'error'
				});
				return false;
			}
			this.show = true;
			//传递多个图片
			let addItem = [];
			let add = [];
			for (let i = 0; i < this.u.length; i++) {
				add.push(this.u[i]);
			}
			addItem = add.join(',');
			let param = {
				agrId: this.agrId,
				beginDate: this.beginDate,
				endDate: this.endTime,
				area: this.area,
				workArea: this.workArea,
				workPrice: this.workPrice,
				contactUser: this.contactUser,
				contactPhone: this.contactPhone,
				addItem: addItem,
				operateUserId: localStorage.getItem('userId')
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.appointment, //请求接口路径
				success: res => {
					//成功返回结果方法
					this.show = false;
					if (res.data.state == 0) {
						uni.showToast({
							title: '发布信息成功'
						});

						//发布成功返回发布主页面
						setTimeout(function() {
							//跳转page目录用navigateTo，跳转tabbar用switchTab
							uni.switchTab({
								url: '../tabbar/service/index'
							});
						}, 2000);
					} else {
						uni.showToast({
							title: '发布信息失败，请联系管理员或重新发布'
						});
					}
				},
				fail: err => {
					this.show = false;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.form-container {
	padding: 24rpx;
	.item {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		font-size: 32rpx;
		line-height: 60rpx;
		align-items: center;
		border-bottom: solid 2rpx $u-border-color;
		.title {
			width: 150rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1;
		}
		> text {
			color: #fa3534;
			font-weight: bold;
			padding-right: 10rpx;
		}
		.info {
			position: relative;
			z-index: 1;
			line-height: 1.5;
			flex: 1;
			display: flex;
			> text {
				color: #a6a6a6;
				font-size: 28rpx;
			}
			.value {
				width: 90%;
			}
			.input-icon {
				position: absolute;
				right: 10rpx;
				z-index: 9;
				top: 16rpx;
				color: #999;
			}
		}
	}
}

</style>
