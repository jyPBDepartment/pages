<template>
	<view>
		<HeaderSearch title="农服" @searchCallback="search"></HeaderSearch>
		<view class="comm-form-container">
			<view class="item">
				<view class="required">*</view>
				<view class="title">标题</view>
				<view class="info"><u-input placeholder="输入内容(最多输入10字)" :clearable="false" v-model="name" maxlength="10" /></view>
			</view>
			<view class="item">
				<view class="required"></view>
				<view class="title">描述</view>
				<view class="info">
					<u-input type="textarea" placeholder="请输入描述正文(最多输入500字)" maxlength="500" :autoHeight="false" :clearable="false" v-model="descrip" height="200" />
				</view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">农服图片</view>
				<view class="info">
					<u-upload
						width="168"
						height="168"
						:action="action"
						:show-progress="false"
						@on-choose-complete="onChoose"
						@on-remove="remove"
						@on-success="uploadSuccess"
						:file-list="fileList"
						max-count="5"
					></u-upload>
				</view>
			</view>

			<view class="item">
				<view class="required">*</view>
				<view class="title">干活时间</view>
				<view class="info" @click="dateClick">
					<u-input class="value" disabled placeholder="请选择时间区段" :clearable="false" v-model="value" />
					<u-icon name="calendar" class="input-icon"></u-icon>
				</view>
			</view>

			<view class="item">
				<view class="required">*</view>
				<view class="title">劳务类型</view>
				<view class="info" @click="sexShow1 = true">
					<u-input class="value" placeholder="请选择" v-model="transactionTypeName" type="select" />
					<u-action-sheet :list="agriCategory" v-model="sexShow1" @click="actionSheetCallback1"></u-action-sheet>
				</view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">作物类型</view>
				<view class="info" @click="sexShow = true">
					<u-input class="value" placeholder="请选择" v-model="transactionCategoryName" type="select" />
					<u-action-sheet :list="agriType" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>

			<view class="item">
				<view class="required">*</view>
				<view class="title">农机台数</view>
				<view class="info"><u-input type="number" placeholder="请输入农机台数" :clearable="false" v-model="machineNum" maxlength="10" /></view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">价格</view>
				<view class="info">
					<u-radio-group v-model="isFace" :size="30" @change="radioGroupChange1">
						<u-radio @change="radioChange1" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
					<view class="is-face" v-if="isFace == '定价'">
						<u-input style="width: 180rpx;" placeholder="输入价格" height="60" border :clearable="false" v-model="price" />
						<text>元/天</text>
					</view>
				</view>
			</view>

			<view class="item">
				<view class="required">*</view>
				<view class="title">农活方式</view>
				<view class="info">
					<u-radio-group v-model="farmingMode" :size="30" @change="radioGroupChange">
						<u-radio @change="radioChange(index)" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">联系人</view>
				<view class="info"><u-input placeholder="请输入联系人" :clearable="false" v-model="contactsUser" /></view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">联系电话</view>
				<view class="info"><u-input type="number" maxlength="11" placeholder="请输入联系电话,仅限数字" :clearable="false" v-model="contactsPhone" /></view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title">区域</view>
				<view class="info" @click="regionaStatus = true"><u-input class="value" placeholder="请选择" v-model="address" type="select" /></view>
			</view>
			<u-button style="margin:20rpx 0rpx;" shape="circle" type="error" @click="deploy">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
		<u-calendar
			:closeable="maskAble"
			:mask-close-able="maskAble"
			v-model="dateShow"
			active-bg-color="orange"
			:start-text="startText"
			:end-text="endText"
			mode="range"
			:min-date="currentDate"
			max-date="2050-01-01"
			@change="change"
		>
			<view slot="tooltip"><view class=" t-c p-y-10" style="color: #2979FF">请选择时间区段</view></view>
		</u-calendar>
		<u-mask :show="show" :mask-click-able="maskAble" :zoom="true" :duration="500"></u-mask>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
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
			startText: '开始日期',
			endText: '结束日期',
			show: false,
			currentDate: '',
			regionaStatus: false,
			dateShow: false,
			action: ApiPath.url.uploadImg,
			fileList: [],
			name: '',
			descrip: '',
			transactionTypeName: '',
			transactionTypeCode: '',
			transactionCategoryCode: '',
			transactionCategoryName: '',
			machineNum: '',
			isFace: '面议',
			isFaceCode: '',
			price: '',
			farmingMode: '整活',
			farmingModeCode: '',
			contactsUser: '',
			contactsPhone: '',
			address: '',
			beginDate: '',
			endTime: '',
			url: [],
			u: [],
			value: '',
			createUser: '',
			createUserId: localStorage.getItem('userId'),
			accId: localStorage.getItem('accId'),
			list: [
				{
					value: '0',
					name: '整活',
					disabled: false
				},
				{
					value: '1',
					name: '零活',
					disabled: false
				}
			],
			list1: [
				{
					value: '0',
					name: '面议',
					disabled: false
				},
				{
					value: '1',
					name: '定价',
					disabled: false
				}
			],
			sexShow: false,
			sexShow1: false,
			agriCategory: [
				{
					value: '3',
					text: '播种'
				},
				{
					value: '4',
					text: '植保'
				},
				{
					value: '5',
					text: '收割'
				}
			],
			agriType: [
				{
					value: '0',
					text: '玉米'
				},
				{
					value: '2',
					text: '水稻'
				},
				{
					value: '3',
					text: '高粱'
				},
				{
					value: '4',
					text: '黄豆'
				}
			],

			maskAble: false
		};
	},
	onLoad() {
		// alert(localStorage.getItem("userId"))
		// 设置干活时间选择日历的最小开始时间
		this.currentDate = new Date().toISOString().slice(0, 10);
		setTimeout(() => {
			this.$refs.region.getScreen();
		}, 1000);
	},
	onReady() {},
	watch: {
		dateShow: function() {
			if (!this.dateShow) {
				if (this.beginDate == '' && this.endTime == '') {
					this.$refs.uToast.show({
						title: '请选择时间区段',
						type: 'error'
					});
					this.dateShow = true;
				}
			}
		}
	},
	methods: {
		dateClick() {
			this.dateShow = true;
		},
		remove(index, lists) {
			this.url.splice(index, 1);
		},
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
		//日期
		change(e) {
			this.value = e.startDate + '至' + e.endDate;
			this.beginDate = e.startDate;
			this.endTime = e.endDate;
		},
		//农作物类别
		actionSheetCallback(index) {
			this.transactionCategoryName = this.agriType[index].text;
			this.transactionCategoryCode = this.agriType[index].value;
		},
		//农作物类型
		actionSheetCallback1(index) {
			this.transactionTypeName = this.agriCategory[index].text;
			this.transactionTypeCode = this.agriCategory[index].value;
		},
		radioChange(index) {},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {},
		radioChange1(index) {},
		radioGroupChange1(e) {},
		cancel() {
			this.regionaStatus = false;
		},
		//区域
		sure(data) {
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
			this.address = map;
		},
		//发布方法
		deploy() {
			if (this.name == '') {
				this.$refs.uToast.show({
					title: '请输入标题',
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

			if (this.value == '') {
				this.$refs.uToast.show({
					title: '请选择干活时间',
					type: 'error'
				});

				return false;
			}
			if (this.transactionTypeCode == '') {
				this.$refs.uToast.show({
					title: '请选择劳务类型',
					type: 'error'
				});

				return false;
			}
			if (this.transactionCategoryCode == '') {
				this.$refs.uToast.show({
					title: '请选择作物类型',
					type: 'error'
				});

				return false;
			}
			if (this.machineNum == '') {
				this.$refs.uToast.show({
					title: '请输入农机台数',
					type: 'error'
				});

				return false;
			}
			if (this.isFace == '定价') {
				if (!/^\d+(\.\d{2})?$/.test(this.price)) {
					this.$refs.uToast.show({
						title: '价格只允许两位小数',
						type: 'error'
					});

					return false;
				}
			} else {
				this.price = '0';
			}

			if (this.contactsUser == '') {
				this.$refs.uToast.show({
					title: '请输入联系人',
					type: 'error'
				});

				return false;
			}
			if (this.contactsPhone == '') {
				this.$refs.uToast.show({
					title: '请输入联系电话',
					type: 'error'
				});
				return false;
			}
			if (this.contactsPhone == '' || !/^1[345789]\d{9}$/.test(this.contactsPhone)) {
				this.$refs.uToast.show({
					title: '请输入正确的联系电话',
					type: 'error'
				});

				return false;
			}
			if (this.address == '') {
				this.$refs.uToast.show({
					title: '请选择干活区域',
					type: 'error'
				});

				return false;
			}

			//判断农活方式，并解析码值
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].name == this.farmingMode) {
					this.farmingModeCode = this.list[i].name;
					this.farmingMode = this.list[i].value;
				}
			}
			//判断是否面议，并解析码值
			for (let j = 0; j < this.list1.length; j++) {
				if (this.list1[j].name == this.isFace) {
					this.isFaceCode = this.list1[j].value;
					this.isFace = this.list1[j].name;
				}
			}
			this.show = true;
			//传递多个图片
			let addItem = '';
			let add = [];
			for (let i = 0; i < this.u.length; i++) {
				add.push(this.u[i]);
			}
			addItem = add.join(',');
			// alert("农服>>发布人id"+ApiPath.common.userId)
			this.show = true;
			let param = {
				name: this.name,
				descrip: this.descrip,
				transactionTypeCode: this.transactionTypeCode,
				transactionCategoryCode: this.transactionCategoryCode,
				machineNum: this.machineNum,
				isFace: this.isFaceCode,
				price: this.price,
				farmingMode: this.farmingMode,
				contactsUser: this.contactsUser,
				contactsPhone: this.contactsPhone,
				address: this.address,
				url: this.u,
				beginDate: this.beginDate,
				endDate: this.endTime,
				createUser: this.createUser,
				createUserId: this.createUserId,
				addItem: addItem,
				accId: this.accId
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.deploy, //请求接口路径
				success: res => {
					//成功返回结果方法
					this.show = false;
					if (res.data.state == 0) {
						uni.showToast({
							title: '发布信息成功,等待审核通过'
						});

						//发布成功返回发布主页面
						setTimeout(function() {
							//跳转page目录用navigateTo，跳转tabbar用switchTab
							uni.switchTab({
								url: '../tabbar/release/index'
							});
						}, 2000);
					} else {
						uni.showToast({
							title: '发布信息失败,联系管理或重新发布！'
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

<style lang="scss">
.title {
	width: 90rpx;
	color: #505050;
}

.img {
	width: 100%;
	height: 320rpx;
	background: #d9d9d9;

	image {
		width: 100rpx;
		height: 100rpx;
	}
}

.tag {
	width: 118rpx;
	height: 38rpx;
	border: 1px solid #7948ea;
	color: #7948ea;
	border-radius: 10rpx;
}

.input-icon {
	position: absolute;
	right: 10rpx;
	z-index: 9;
	top: 14rpx;
}
</style>
