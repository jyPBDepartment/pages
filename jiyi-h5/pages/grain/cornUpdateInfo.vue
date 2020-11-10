<template>
	<view>
		<HeaderSearch :title="title" @searchCallback="search"></HeaderSearch>
		<view class="comm-form-container">
			<view class="item">
				<view class="title">标题</view>
				<view class="info"><u-input placeholder="输入内容(最多输入10字)" maxlength="10" :clearable="false" v-model="corn.name" /></view>
			</view>
			<view class="item">
				<view class="title">描述</view>
				<view class="info">
					<u-input
						type="textarea"
						placeholder="请输入描述正文（最多输入500字）"
						:maxlength="500"
						:autoHeight="false"
						:clearable="false"
						v-model="corn.descrip"
						height="200"
					/>
				</view>
			</view>
			<view class="item">
				<view class="title">设置封面</view>
				<view class="info">
					<u-upload
						:show-progress="false"
						:action="action"
						@on-choose-complete="onChoose"
						@on-remove="remove"
						@on-success="uploadSuccess"
						:lazy-load="true"
						:before-remove="beforeRemove"
						:max-size="5 * 1024 * 1024"
						:file-list="fileList"
						max-count="5"
						list-type="picture"
						:on-exceed="uploadExceed"
					></u-upload>
				</view>
			</view>
			<view class="item">
				<view class="title" style="width: 140rpx;">粮食种类</view>
				<view class="info" @click="sexShow = true">
					<u-input class="value" placeholder="请选择" v-model="transactionCategoryName" type="select" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>

			<view class="item">
				<view class="title" style="line-height: 62rpx; width: 140rpx;">价格</view>

				<view class="info">
					<u-radio-group :size="30" v-model="corn.isFace" @change="radioGroupChange1">
						<u-radio @change="radioChange1" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
					<view class="is-face" v-if="corn.isFace == '定价'">
						<u-input style="width: 180rpx;" placeholder="输入价格" height="60" border :clearable="false" v-model="corn.price" />
						<text>元/斤</text>
					</view>
				</view>
			</view>
			<view class="item">
				<view class="title">联系人</view>
				<view class="info"><u-input placeholder="请输入联系人" :clearable="false" v-model="corn.contactsUser" /></view>
			</view>
			<view class="item">
				<view class="title">联系电话</view>
				<view class="info"><u-input placeholder="请输入联系电话" :clearable="false" v-model="corn.contactsPhone" /></view>
			</view>
			<view class="item">
				<view class="title">区域</view>
				<view class="info" @click="regionaStatus = true"><u-input class="value" placeholder="请选择" v-model="corn.address" type="select" /></view>
			</view>
			<u-button style="margin:20rpx 0;" shape="circle" type="error" @click="updateMachine">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
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
			show: false,
			// 演示地址，请勿直接使用
			action: ApiPath.url.uploadImg,
			fileList: [],
			regionaStatus: false,
			transactionTypeName: '',
			transactionCategoryName: '',
			id: '',
			url: [],
			u: [],
			deleteItem: [],
			corn: {
				name: '',
				descrip: '',
				transactionTypeCode: '',
				transactionCategoryCode: '',
				price: '',
				contactsUser: '',
				contactsPhone: '',
				address: '',
				isFace: '面议',
				isFaceCode: '',
				createUser: '',
				createUserId: localStorage.getItem('userId'),
				identityCode: '', //身份编码
				status: ''
			},
			list: [
				{
					value: '0',
					name: '收购',
					disabled: false
				},
				{
					value: '1',
					name: '出售',
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
			actionSheetList: [
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
			title: ''
		};
	},
	onLoad(e) {
		// 1.农户 2.粮贩 3.粮库
		if (e.type == '1') {
			this.title = '粮食出售';
			this.transactionTypeCode = '1';
			this.identityCode = '1';
		} else {
			if (e.type == '2') {
				this.identityCode = '2';
			} else {
				this.identityCode = '3';
			}
			this.title = '粮食收购';
			this.transactionTypeCode = '0';
		}
		setTimeout(() => {
			this.$refs.region.getScreen();
		}, 1000);
		this.findMineId(e.id);
		this.id = e.id;
	},
	methods: {
		beforeRemove(index, list) {},
		remove(index, lists) {
			this.deleteItem.push(this.url[index]);
			for (let x = 0; x < this.u.length; x++) {
				if (this.u[x] == this.url[index]) {
					this.u.splice(x, 1);
				}
			}
			this.url.splice(index, 1);
		},
		uploadExceed(files, fileList) {
			this.$message.error('只能上传五张图片，如需修改请先删除图片！');
			return;
		},
		uploadSuccess(data, index, lists, name) {
			this.url.push(data.url);

			this.u.push(data.url);
			this.show = false;
		},
		onChoose(lists, name) {
			this.show = true;
		},
		radioChange(index) {
			// this.transactionTypeCode = this.list[index].value
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {},
		radioChange1(index) {},
		// 选中任一radio时，由radio-group触发
		radioGroupChange1(e) {},
		cancel() {
			this.regionaStatus = false;
		},
		//区域
		sure(data) {
			this.regionaStatus = false;
			let map = '';
			data.forEach(item => {
				// console.log('data', item);
				if (item != '' && item != '请选择') {
					if (map != '') {
						map = map + '/' + item;
					} else {
						map = item;
					}
				}
			});
			this.corn.address = map;
		},
		actionSheetCallback(index) {
			this.transactionCategoryName = this.actionSheetList[index].text;
			this.transactionCategoryCode = this.actionSheetList[index].value;
		},
		//发布方法
		updateMachine() {
			if (this.corn.name == '') {
				this.$refs.uToast.show({
					title: '请输入标题',
					type: 'error'
				});

				return false;
			}

			if (this.url == '') {
				this.$refs.uToast.show({
					title: '请上传图片',
					type: 'error'
				});

				return false;
			}

			if (this.corn.transactionCategoryCode == '') {
				this.$refs.uToast.show({
					title: '请选择粮食种类',
					type: 'error'
				});

				return false;
			}
			if (this.corn.isFace == '定价') {
				if (!/^\d+(\.\d{1})?$/.test(this.corn.price)) {
					this.$refs.uToast.show({
						title: '价格小数点后保留一位小数',
						type: 'error'
					});

					return false;
				}
			} else {
				this.corn.price = '0';
			}
			if (this.corn.contactsUser == '') {
				this.$refs.uToast.show({
					title: '请输入联系人',
					type: 'error'
				});

				return false;
			}

			if (this.corn.contactsPhone == '') {
				this.$refs.uToast.show({
					title: '请输入联系电话',
					type: 'error'
				});

				return false;
			}

			if (!/^1[345789]\d{9}$/.test(this.corn.contactsPhone)) {
				this.$refs.uToast.show({
					title: '请输入正确的联系电话',
					type: 'error'
				});

				return false;
			}

			if (this.corn.address == '') {
				this.$refs.uToast.show({
					title: '请选择区域',
					type: 'error'
				});

				return false;
			}

			//判断是否面议，并解析码值
			for (let j = 0; j < this.list1.length; j++) {
				if (this.list1[j].name == this.corn.isFace) {
					this.isFaceCode = this.list1[j].value;
					this.corn.isFace = this.list1[j].name;
				}
			}

			//传递多个图片
			let addItem = '';
			let add = [];
			for (let i = 0; i < this.u.length; i++) {
				add.push(this.u[i]);
			}
			addItem = add.join(',');
			let param = {
				id: this.id,
				name: this.corn.name,
				descrip: this.corn.descrip,
				url: this.u,
				transactionTypeCode: this.transactionTypeCode,
				transactionCategoryCode: this.transactionCategoryCode,
				price: this.corn.price,
				contactsUser: this.corn.contactsUser,
				contactsPhone: this.corn.contactsPhone,
				address: this.corn.address,
				isFace: this.isFaceCode,
				createUser: this.corn.createUser,
				createUserId: this.corn.createUserId,
				addItem: addItem,
				identityCode: this.corn.identityCode,
				status: this.corn.status,
				deleteItem: this.deleteItem
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.updateMachine, //请求接口路径
				success: res => {
					//成功返回结果方法

					if (res.data.state == 0) {
						uni.showToast({
							title: '修改信息成功,等待审核通过'
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
							title: '修改信息失败,联系管理或重新发布'
						});
					}
				}
			});
		},
		//修改前查询
		findMineId(val) {
			uni.request({
				method: 'GET',
				data: {
					id: val
				},
				url: ApiPath.url.findMineId,
				success: res => {
					if (res.data.state == 0) {
						let result = res.data.data;
						this.corn = result;

						for (let i = 0; i < this.actionSheetList.length; i++) {
							if (this.actionSheetList[i].value == result.transactionCategoryCode) {
								this.transactionCategoryName = this.actionSheetList[i].text;
								this.transactionCategoryCode = this.actionSheetList[i].value;
							}
						}

						if (result.isFace == '0') {
							this.corn.isFace = '面议';
						} else {
							this.corn.isFace = '定价';
							this.corn.price = result.price;
						}

						let url2 = [];
						let path = '';
						for (let i = 0; i < res.data.dataPic.length; i++) {
							url2.push({ url: res.data.dataPic[i]['picUrl'] });
							this.url.push(res.data.dataPic[i]['picUrl']);
							if (i == 0) {
								path = path + res.data.dataPic[i]['picUrl'];
							} else {
								path = path + ',' + res.data.dataPic[i]['picUrl'];
							}
						}
						this.fileList = url2;
					}
				},
				fail: err => {}
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

.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.rect {
	width: 120px;
	height: 120px;
	background-color: #fff;
}
</style>
