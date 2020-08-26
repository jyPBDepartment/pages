<template>
	<view>
		<HeaderSearch title="农服发布" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c" style="border-bottom: 1rpx solid #999;">
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" v-model="name" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10" style="border-bottom: 1rpx solid #999;">
				<view class="title f-14" style="padding: 10rpx 0;">
					描述
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :clearable="false" v-model="descrip" height="200" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<view class="title f-14" style="width: 140rpx;">
					设置封面图
				</view>
				<!-- :action="action" -->
			<view class="info g-f-1" style="position: relative;">
				<!-- <image src="../../static/img/tabbar/addactive.png" mode=""></image> -->
				<u-upload :action="action" @on-choose-complete="onChoose" @on-success="uploadSuccess" :max-size="5 * 1024 * 1024"
				 :file-list="fileList" max-count="1"></u-upload>
			</view>
			</view>

		<view class="g-flex p-y-10 g-a-c">
						<view class="title f-14" style="width: 140rpx;">
							干活时间
						</view>
						<view class="info g-f-1" style="position: relative;">
							<u-icon name="calendar" class="input-icon"></u-icon>
							<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="value"
							 border height="64" />
						</view>
					</view>
		
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					农作物类型
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<view class=" info g-f-1" style="position: relative;">
						<u-input placeholder="请选择" v-model="transactionCategoryName" type="select" border @click="sexShow = true" />
						<u-action-sheet :list="agriType" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
					</view>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					农机台数
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入农机台数" :clearable="false" :focus="true" v-model="machineNum" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					农活价格
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="isFace" @change="radioGroupChange">
						<u-radio @change="radioChange(index)" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
				<u-input v-if="isFace == '定价'" style="width: 240rpx;" placeholder="输入价格" border="" :clearable="false" v-model="agriPrice"
				 height="64" />
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					农活方式
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="farmingMode" @change="radioGroupChange">
						<u-radio @change="radioChange1(index)" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系人" :clearable="false" :focus="true" v-model="contactsUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系电话" :clearable="false" :focus="true" v-model="contactsPhone" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					区域
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="workArea" type="select" border @click="regionaStatus = true" />
					<!-- <u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet> -->
				</view>
			</view>
			<u-button style="margin: 40rpx;" shape="circle" type="error" @click="deploy">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
		<u-calendar v-model="dateShow" mode="range" @change="change">
			<view slot="tooltip">
				<view class=" t-c p-y-10" style="color: #2979FF">
					请选择时间
				</view>
			</view>
		</u-calendar>
	</view>

</template>

<script>
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	import regionalComponents from '../../components/regionalComponents/regionalComponents.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			HeaderSearch,
			regionalComponents
		},
		data() {
			return {
				regionaStatus: false,
				dateShow: false,
				action: ApiPath.url.uploadImg,
				fileList: [
					// {
					// 	// url: '',
					// }
				],
				name: '',
				descrip: '',
				transactionCategoryCode: '',
				transactionCategoryName: '',
				machineNum: '',
				isFace: "面议",
				isFaceCode: "",
				agriPrice: '',
				farmingMode: '整活',
				farmingModeCode: '',
				contactsUser: '',
				contactsPhone: '',
				workArea: '',
				beginDate: '',
				endTime: '',
				url:'',
				value:'',
				list: [{
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
				list1: [{
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
				agriType: [{
						value: '0',
						text: '玉米'
					},
					{
						value: '1',
						text: '农机'
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
			};
		},
		onLoad() {
			setTimeout(() => {
				this.$refs.region.getScreen();
			}, 1000)
		},
		methods: {
			uploadSuccess(data, index, lists, name) {
				this.url = data.url;
				this.show = false;
				// alert(JSON.stringify(data))
			},
			onChoose(lists, name) {
				this.show = true;
			},
			change(e) {
				this.value=e.startDate+"至"+e.endDate;
				this.beginDate=e.startDate;
				this.endTime=e.endDate;
			},
			actionSheetCallback(index) {
				this.transactionCategoryName = this.agriType[index].text;
				this.transactionCategoryCode = this.agriType[index].value;
			},
			radioChange(index) {
				// console.log(e);
			},
			radioChange1(index) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
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
							map = map + '/' + item
						} else {
							map = item
						}
					}
				});
				this.workArea = map;
			},
			//发布方法
			deploy() {				
				if (this.name == '') {
					uni.showToast({
						title: "请输入标题"
					})
					return false;
				}

				if (this.descrip == '') {
					uni.showToast({
						title: "请输入描述信息"
					})
					return false;
				}
				if (this.value == '') {
					uni.showToast({
						title: "请选择干活时间"
					})
					return false;
				}

				if (this.transactionCategoryCode == '') {
					uni.showToast({
						title: "请选择农作物类型"
					})
					return false;
				}
				if (this.machineNum == '') {
					uni.showToast({
						title: "请输入农机台数"
					})
					return false;
				}

				if (this.contactsUser == '') {
					uni.showToast({
						title: "请输入联系人"
					})
					return false;
				}

				if (this.contactsPhone == '') {
					uni.showToast({
						title: "请输入联系电话"
					})
					return false;
				}
				if (this.workArea == '') {
					uni.showToast({
						title: "请选择干活区域"
					})
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
				// alert(this.beginDate)
				let param = {
					name: this.name,
					descrip: this.descrip,
					transactionCategoryCode: this.transactionCategoryCode,
					machineNum: this.machineNum,
					isFace: this.isFaceCode,
					agriPrice: this.agriPrice,
					farmingMode: this.farmingMode,
					contactsUser: this.contactsUser,
					contactsPhone: this.contactsPhone,
					workArea: this.workArea,
					url:this.url,
					beginDate:this.beginDate,
					endDate:this.endTime,				
				}				
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.deploy, //请求接口路径
					success: (res) => { //成功返回结果方法
						uni.showToast({
							title: "发布信息成功"
						})

						//发布成功返回发布主页面
						setTimeout(function() {
							//跳转page目录用navigateTo，跳转tabbar用switchTab
							uni.switchTab({
								url: "../tabbar/release/index"
							})
						}, 2000)

					}
				})
			}
		}
	}
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
