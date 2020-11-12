<template>
	<view>
		<HeaderSearch :title="title" @searchCallback="search"></HeaderSearch>
		<view class="comm-form-container">
			<view class="item">
				<view class="title">标题</view>
				<view class="info"><u-input placeholder="输入内容(最多输入10字)" maxlength="10" :clearable="false" v-model="name" /></view>
			</view>
			<view class="item">
				<view class="title">描述</view>
				<view class="info">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :maxlength="500" :clearable="false" v-model="descrip" height="200" />
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
						:max-size="5 * 1024 * 1024"
						:file-list="fileList"
						max-count="5"
					></u-upload>
				</view>
			</view>
			<view v-if="identityCode == '2'" class="item">
				<view class="title">类型</view>
				<view class="info">
					<u-radio-group :size="30" v-model="transactionTypeName" @change="radioGroupChange">
						<u-radio @change="radioChange(index)" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item">
				<view class="title">粮食种类</view>
				<view class="info" @click="sexShow = true">
					<u-input class="value" placeholder="请选择" v-model="transactionCategoryName" type="select" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="item">
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
				<view class="title">联系人</view>
				<view class="info"><u-input placeholder="请输入联系人" :clearable="false" v-model="contactsUser" /></view>
			</view>
			<view class="item">
				<view class="title">联系电话</view>
				<view class="info"><u-input :maxlength="11" placeholder="请输入联系电话" :clearable="false" v-model="contactsPhone" /></view>
			</view>
			<view class="item">
				<view class="title">区域</view>
				<view class="info" @click="regionaStatus = true"><u-input class="value" placeholder="请选择" v-model="address" type="select" /></view>
			</view>
			<u-button style="margin:20rpx 0;" shape="circle" type="error" @click="deploy">发布</u-button>
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
			name: '',
			descrip: '',
			transactionTypeCode: '',
			transactionTypeName: '收购',
			transactionCategoryCode: '',
			price: '',
			contactsUser: '',
			contactsPhone: '',
			address: '',
			isFace: '面议',
			isFaceCode: '',
			createUser: '',
			createUserId: localStorage.getItem('userId'),
			transactionCategoryName: '',
			identityCode: '', //身份编码
			url: [],
			u: [],
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
				this.title = '粮食买卖';
			} else {
				this.identityCode = '3';
				this.title = '粮食收购';
				this.transactionTypeCode = '0';
			}
		}
		if (typeof e.id === 'undefined') {
			this.findInfoById(e.id);
		}
		setTimeout(() => {
			this.$refs.region.getScreen();
		}, 1000);
	},
	methods: {
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
		radioChange(index) {
			this.transactionTypeCode = this.list[index].value;
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {},
		radioChange1(index) {},
		// 选中任一radio时，由radio-group触发
		radioGroupChange1(e) {},
		cancel() {
			this.regionaStatus = false;
		},
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
		actionSheetCallback(index) {
			this.transactionCategoryName = this.actionSheetList[index].text;
			this.transactionCategoryCode = this.actionSheetList[index].value;
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
					title: '请上传图片',
					type: 'error'
				});

				return false;
			}

			// if(this.identityCode=="2"){
			if (this.transactionCategoryCode == '') {
				this.$refs.uToast.show({
					title: '请选择粮食种类',
					type: 'error'
				});

				return false;
			}
			// }

			if (this.isFace == '定价') {
				if (!/^\d+(\.\d{2})?$/.test(this.price)) {
					this.$refs.uToast.show({
						title: '价格小数点后保留两位小数',
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

			if (!/^1[345789]\d{9}$/.test(this.contactsPhone)) {
				this.$refs.uToast.show({
					title: '请输入正确的联系电话',
					type: 'error'
				});

				return false;
			}

			if (this.address == '') {
				this.$refs.uToast.show({
					title: '请选择区域',
					type: 'error'
				});

				return false;
			}

			//如果身份是粮贩，判断类型，并解析码值
			if (this.identityCode == '2') {
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name == this.transactionTypeName) {
						this.transactionTypeCode = this.list[i].value;
						this.transactionTypeName = this.list[i].name;
					}
				}
			}

			//判断是否面议，并解析码值
			for (let j = 0; j < this.list1.length; j++) {
				if (this.list1[j].name == this.isFace) {
					this.isFaceCode = this.list1[j].value;
					this.isFace = this.list1[j].name;
				}
			}

			//传递多个图片
			let addItem = [];
			let add = [];
			for (let i = 0; i < this.u.length; i++) {
				add.push(this.u[i]);
			}
			addItem = add.join(',');
			// alert("粮食>>发布人id"+ApiPath.common.userId)
			let param = {
				name: this.name,
				descrip: this.descrip,
				url: this.u,
				transactionTypeCode: this.transactionTypeCode,
				transactionCategoryCode: this.transactionCategoryCode,
				price: this.price,
				contactsUser: this.contactsUser,
				contactsPhone: this.contactsPhone,
				address: this.address,
				isFace: this.isFaceCode,
				createUser: this.createUser,
				createUserId: this.createUserId,
				addItem: addItem,
				identityCode: this.identityCode
			};

			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.deploy, //请求接口路径
				success: res => {
					//成功返回结果方法
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
							title: '发布信息失败,联系管理或重新发布'
						});
					}
				}
			});
		},
		findInfoById(val) {
			uni.request({
				method: 'GET',
				data: {
					id: val
				},
				url: ApiPath.url.findMineId,
				success: res => {
					if (res.data.state == 0) {
						console.log(res);
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
