<template>
	<view>
		<HeaderSearch title="农服详情修改" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c" style="border-bottom: 1rpx solid #999;">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容(最多输入10字)" :clearable="false" v-model="agr.name" maxlength="10" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10" style="border-bottom: 1rpx solid #999;">
				<span style="color: #fff;">*</span>
				<view class="title f-14" style="padding: 10rpx 0;">
					描述
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" maxlength="500" :clearable="false" v-model="agr.descrip"
					 height="200" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					农服图片
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-upload :action="action" @on-choose-complete="onChoose" @on-remove="remove" @on-success="uploadSuccess" list-type="picture" :on-exceed="uploadExceed" :lazy-load="true"
 :before-remove="beforeRemove" :max-size="5 * 1024 * 1024" :file-list="fileList" max-count="5">
					 <u-loading slot="loading">图片正在加载中。。。</u-loading>
					 </u-upload>
				</view>
			</view>

			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
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
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					劳务类型
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<view class=" info g-f-1" style="position: relative;">
						<u-input placeholder="请选择" v-model="transactionTypeName" type="select" border @click="sexShow1 = true" />
						<u-action-sheet :list="agriCategory" v-model="sexShow1" @click="actionSheetCallback1"></u-action-sheet>
					</view>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					作物类型
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<view class=" info g-f-1" style="position: relative;">
						<u-input placeholder="请选择" v-model="transactionCategoryName" type="select" border @click="sexShow = true" />
						<u-action-sheet :list="agriType" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
					</view>
				</view>
			</view>

			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					农机台数
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入农机台数" :clearable="false" :focus="true" v-model="agr.machineNum" border height="64" maxlength="10" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					价格
				</view>
				<u-row :gutter="6">
					<u-col>
						<view class="info g-f-1" style="position: relative;margin-bottom: 10rpx;">
							<u-radio-group v-model="agr.isFace" @change="radioGroupChange1">
								<u-radio @change="radioChange1" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
									{{item.name}}
								</u-radio>
							</u-radio-group>
						</view>
					</u-col>
					<u-col>
						<view v-if="agr.isFace == '定价'">
							<u-input style="width: 220rpx;" placeholder="输入价格" border="" v-model="agr.price" height="64" />
							<view style="font-size:13px;margin-top: -52rpx;margin-left: 150rpx;color: #cdc4d7;">元/天</view>
						</view>
					</u-col>
				</u-row>
			
			
			</view>

			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					农活方式
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="agr.farmingMode" @change="radioGroupChange">
						<u-radio @change="radioChange(index)" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系人" :clearable="false" :focus="true" v-model="agr.contactsUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="number" maxlength="11" placeholder="请输入联系电话,仅限数字" :clearable="false" :focus="true" v-model="agr.contactsPhone"
					 border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					区域
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="agr.address" type="select" border @click="regionaStatus = true" />
				</view>
			</view>
			<u-button style="margin: 40rpx;" shape="circle" type="error" @click="updateMachine">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
		<u-calendar v-model="dateShow" mode="range" :min-date="currentDate" max-date="2050-01-01" @change="change" active-bg-color="#42b983" btn-type="success">
			<view slot="tooltip">
				<view class=" t-c p-y-10" style="color: #2979FF">
					请选择时间
				</view>
			</view>
		</u-calendar>
		<u-mask :show="show" :mask-click-able="maskAble" :zoom="true" :duration="500"></u-mask>
		<u-toast ref="uToast" />
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
				currentDate: "",
				regionaStatus: false,
				dateShow: false,
				action: ApiPath.url.uploadImg,
				fileList: [],
				transactionTypeName: '',
				transactionCategoryName: '',
				isFaceCode: "",
				farmingModeCode: '',
				beginDate: '',
				endTime: '',
				value: '',
				id:'',
				url: [],
				u:[],
				deleteItem:[],
				agr:{
					name: '',
					descrip: '',
					
					transactionTypeCode: '',
					transactionCategoryCode: '',
				
					machineNum: '',
					isFace: "面议",
					
					price: '',
					farmingMode: "整活",
					
					contactsUser: '',
					contactsPhone: '',
					address: '',
					days:'',
					status:'',
					createUser: "",
					createUserId: localStorage.getItem("userId"),
				},
				
				
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
				sexShow1: false,
				agriCategory: [{
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
				agriType: [{
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
				show: false,
				maskAble: false
			};
		},
		onLoad(e) {
			// 设置干活时间选择日历的最小开始时间
			this.currentDate = new Date().toISOString().slice(0, 10)
			setTimeout(() => {
				this.$refs.region.getScreen();
			}, 1000)
			this.findMineId(e.id);
			this.id=e.id;
		},
		onReady() {

		},
		methods: {
			beforeRemove(index, list) {},
			remove(index, lists) {
				
				this.deleteItem.push(this.url[index]);
				for(let x=0;x<this.u.length;x++){
					if(this.u[x] == this.url[index]){
						this.u.splice(x,1);
					}
				}
				this.url.splice(index, 1);
			},
			uploadSuccess(data, index, lists, name) {
				this.url.push(data.url);
				this.u.push(data.url);
				this.show = false;
			},
			uploadExceed(files, fileList) {
			    this.$message.error("只能上传五张图片，如需修改请先删除图片！");
			    return;
			},
			onChoose(lists, name) {
				this.show = true;
			},
			//日期
			change(e) {
				this.value = e.startDate + "至" + e.endDate;
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
					if (item != '' && item != '请选择') {
						if (map != '') {
							map = map + '/' + item
						} else {
							map = item
						}
					}
				});
				this.agr.address = map;
			},
			//修改前查询
			findMineId(val) {				
				uni.request({
					method: "GET",
					data: {
						"id": val
					},
					url: ApiPath.url.findMineId,
					success: (res) => {
					
						if(res.data.state == 0){
							let result = res.data.data;
							this.agr = result;
							for(let i =0 ; i<this.agriCategory.length;i++){
								if(this.agriCategory[i].value == result.transactionTypeCode){
									this.transactionTypeName  = this.agriCategory[i].text;
									this.transactionTypeCode = this.agriCategory[i].value;
								}
							}
							
							for(let i =0 ; i<this.agriType.length;i++){
								if(this.agriType[i].value == result.transactionCategoryCode){
									this.transactionCategoryName  = this.agriType[i].text;
									this.transactionCategoryCode = this.agriType[i].value;
								}
							}
							this.value = result.beginDate +"至"+ result.endDate
							this.beginDate = result.beginDate 
							this.endTime = result.endDate 
							if(result.isFace == "0"){
								this.agr.isFace ='面议';
							}else{
								this.agr.isFace ='定价';
								this.agr.price =result.price;								
							}
							if(result.farmingMode == "0"){
								this.agr.farmingMode ='整活';
							}else{
								this.agr.farmingMode ='零活';						
							}
							
							let url2 = [];
							let path = "";
							for(let i=0;i<res.data.dataPic.length;i++){
								url2.push({'url':res.data.dataPic[i]['picUrl']});
								this.url.push(res.data.dataPic[i]['picUrl']);
								if(i==0){
									path=path+res.data.dataPic[i]['picUrl'];
								}else {
									path=path+","+res.data.dataPic[i]['picUrl'];
								}
							}
							this.fileList=url2;
							//this.u = path
							
						}
					},
					fail: (err) => {
			
					}
				})
			},
			//修改方法
			updateMachine() {
				if (this.agr.name == '') {
					this.$refs.uToast.show({
						title: '请输入标题',
						type: 'error',
					})
					
					return false;
				}
				if (this.url == '') {
					this.$refs.uToast.show({
						title: '请选择图片',
						type: 'error',
					})
					
					return false;
				}

				if (this.value == '') {
					this.$refs.uToast.show({
						title: '请选择干活时间',
						type: 'error',
					})
					
					return false;
				}
				if (this.agr.transactionTypeCode == '') {
					this.$refs.uToast.show({
						title: '请选择劳务类型',
						type: 'error',
					})
				
					return false;
				}
				if (this.agr.transactionCategoryCode == '') {
					this.$refs.uToast.show({
						title: '请选择作物类型',
						type: 'error',
					})
					
					return false;
				}
				if (this.agr.machineNum == '') {
					this.$refs.uToast.show({
						title: '请输入农机台数',
						type: 'error',
					})
				
					return false;
				}
				if(this.agr.isFace=="定价"){
					if (!/^\d+(\.\d{1})?$/.test(this.agr.price)) {
						this.$refs.uToast.show({
							title: '价格只允许一位小数',
							type: 'error',
						})
						
						return false;
					}
				}else{
					this.agr.price ="0"
				}
				
				if (this.agr.contactsUser == '') {
					this.$refs.uToast.show({
						title: '请输入联系人',
						type: 'error',
					})
					
					return false;
				}
				if (this.agr.contactsPhone == '') {
					this.$refs.uToast.show({
						title: '请输入联系电话',
						type: 'error',
					})
					
					return false;
				}
				if (this.agr.contactsPhone == '' || !/^1[345789]\d{9}$/.test(this.agr.contactsPhone)) {
					this.$refs.uToast.show({
						title: '请输入正确的联系电话',
						type: 'error',
					})
					
					return false;
				}
				if (this.agr.address == '') {
					this.$refs.uToast.show({
						title: '请选择干活区域',
						type: 'error',
					})
					
					return false;
				}

				//判断农活方式，并解析码值
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name == this.agr.farmingMode) {
						this.farmingModeCode = this.list[i].name;
						this.agr.farmingMode = this.list[i].value;
					}
				}
				//判断是否面议，并解析码值
				for (let j = 0; j < this.list1.length; j++) {
					if (this.list1[j].name == this.agr.isFace) {
						this.isFaceCode = this.list1[j].value;
						this.agr.isFace = this.list1[j].name;
					}
				}
				// this.show = true;
				//传递多个图片
				let addItem = "";
				let add = [];
			
				for (let i = 0; i < this.u.length; i++) {
					add.push(this.u[i]);
				}
				addItem = add.join(",");
				// alert("农服>>发布人id"+ApiPath.common.userId)
				this.show = true;
				let param = {
					name: this.agr.name,
					descrip: this.agr.descrip,
					transactionTypeCode: this.transactionTypeCode,
					transactionCategoryCode: this.transactionCategoryCode,
					machineNum: this.agr.machineNum,
					isFace: this.isFaceCode,
					price: this.agr.price,
					farmingMode: this.agr.farmingMode,
					contactsUser: this.agr.contactsUser,
					contactsPhone: this.agr.contactsPhone,
					address: this.agr.address,
					url: this.u,
					beginDate: this.beginDate,
					endDate: this.endTime,
					createUser: this.agr.createUser,
					createUserId: this.agr.createUserId,
					addItem: addItem,
					id:this.id,
					status:this.agr.status,
					days:this.agr.days,
					deleteItem:this.deleteItem,
					
				}
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.updateMachine, //请求接口路径
					success: (res) => { //成功返回结果方法
					
						this.show = false
						if (res.data.state == 0) {
							uni.showToast({
								title: "修改信息成功,等待审核通过"
							})

							//发布成功返回发布主页面
							setTimeout(function() {
								//跳转page目录用navigateTo，跳转tabbar用switchTab
								uni.switchTab({
									url: "../tabbar/release/index"
								})
							}, 2000)
						} else {
							uni.showToast({
								title: "修改信息失败,联系管理或重新发布"
							})
						}
					},
					// fail: (err) => {
					// 	this.show = false;
					// }
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
