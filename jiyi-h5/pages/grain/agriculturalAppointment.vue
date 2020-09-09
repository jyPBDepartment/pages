<template>
	<view>
		<HeaderSearch @searchCallback="search" title="农服预约"></HeaderSearch>
		<view class="p-10">
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					日期
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-icon name="calendar" class="input-icon"></u-icon>
					<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="value"
					 border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					面积
				</view>
				<view class="info g-f-1" style="position: relative;">
					<span class="input-icon f-14" style="color: #a6a6a6;">亩</span>
					<u-input type="number" placeholder="输入内容" :clearable="false" :focus="true" v-model="area" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					干活地点
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="workArea" type="select" border @click="regionaStatus = true" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					农活价格
				</view>
				<view class="info g-f-1" style="position: relative;">
					<span class="input-icon f-14" style="color: #a6a6a6;">元/天</span>
					<u-input type="number" placeholder="输入内容" :clearable="false" :focus="true" v-model="workPrice" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" :focus="true" v-model="contactUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="number" maxlength="11" placeholder="输入内容" :clearable="false" :focus="true" v-model="contactPhone" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<span style="color: #FA3534;" >*</span>
				<view class="title f-14" >
					土地图片
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-upload :action="action" @on-choose-complete="onChoose" @on-success="uploadSuccess" :max-size="5 * 1024 * 1024"
					 :file-list="fileList" max-count="5"></u-upload>
				</view>
			</view>
			<u-button @click="appointment" style="margin: 40rpx;" shape="circle" type="error">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
	<u-calendar v-model="dateShow" mode="range" :min-date="currentDate" max-date="2050-01-01"  @change="change" active-bg-color="#42b983" btn-type="success">
		<view slot="tooltip">
			<view class=" t-c p-y-10" style="color: #2979FF">
				请选择时间
			</view>
		</view>
	</u-calendar>
	</view>
</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
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
				sexShow: false,
				value: '',
				action: ApiPath.url.uploadImg,
				fileList: [],
				area:'',
				workArea:'',
				workPrice:'',
				contactUser:'',
				contactPhone:'',
				beginDate: '',
				endTime: '',
				url:[],
				id:'',
			}
		},
		onLoad(e) {
			// 设置干活时间选择日历的最小开始时间
			this.currentDate = new Date().toISOString().slice(0,10)
			// alert(uni.date)
			setTimeout(() => {
				this.$refs.region.getScreen();
			}, 1000)
			this.transKeyWordId(e.id)
		},
		methods:{
			transKeyWordId(val) {
				this.id=val
			},
			//图片
			uploadSuccess(data, index, lists, name) {
				this.url.push(data.url) 
				this.show = false;
				
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
							map = map + '/' + item
						} else {
							map = item
						}
					}
				});
				this.workArea = map;
			},
			//日期选择
			change(e) {
				this.value = e.startDate + "至" + e.endDate;
				this.beginDate = e.startDate;
				this.endTime = e.endDate;
			},
			//跳转页面
			release(){
				uni.navigateTo({
					url:'../response?state=1'
				})
			},
			//预约接口
			appointment(){
				if (this.value == '') {
					uni.showToast({
						title: "请选择日期"
					})
					return false;
				}
				if (this.area == '') {
					uni.showToast({
						title: "请输入面积"
					})
					return false;
				}
				if(!/^\d+(\.\d{2})?$/.test(this.area)){
					uni.showToast({
						title: "面积小数点后保留两位小数"
					})
					return false;
				}
				if (this.workArea == '') {
					uni.showToast({
						title: "请输入干活地点"
					})
					return false;
				}
				if(this.workPrice =='')
				{
					uni.showToast({
						title: "请输入农活价格"
					})
					return false;
				}
				
				if(!/^\d+(\.\d{1})?$/.test(this.workPrice))
				{
					uni.showToast({
						title: "价格只允许一位小数"
					})
					return false;
				}
				if (this.contactUser == '') {
					uni.showToast({
						title: "请输入联系人"
					})
					return false;
				}
				if (this.contactPhone == '') {
					uni.showToast({
						title: "请输入联系电话"
					})
					return false;
				}
				if (this.contactPhone == '' || !/^1[345789]\d{9}$/.test(this.contactPhone)) {
					uni.showToast({
						title: "请输入正确的联系电话"
					})
					return false;
				}
				if(this.url =='')
				{
					uni.showToast({
						title: "请选择图片"
					})
					return false;
				}
			
			//传递多个图片
			let addItem = [];
			let add = [];
			for (let i = 0; i < this.url.length; i++) {
			     add.push(this.url[i]);
			 }
			 addItem = add.join(",");
			let param = {
				id:this.id,
				beginDate: this.beginDate,
				endDate: this.endTime,
				area:this.area,
				workArea:this.workArea,
				workPrice:this.workPrice,
				contactUser:this.contactUser,
				contactPhone:this.contactPhone,
				addItem:addItem,
			}
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.appointment, //请求接口路径
				success: (res) => { //成功返回结果方法
					uni.showToast({
						title: "发布信息成功"
					})
			
					//发布成功返回发布主页面
					setTimeout(function() {
						//跳转page目录用navigateTo，跳转tabbar用switchTab
						uni.switchTab({
							url: "../tabbar/service/index"
						})
					}, 2000)
			
				}
			})
			}
		}
	}
</script>

<style lang="scss">
	.input-icon {
		position: absolute;
		right: 10rpx;
		z-index: 9;
		top: 14rpx;
	}

	.title {
		width: 150rpx;
	}
</style>
