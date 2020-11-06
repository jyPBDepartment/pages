<template>
	<view>
		<HeaderSearch title="农机" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="item">
				<view class="title">标题</view>
				<view class="info"><u-input placeholder="输入内容" :clearable="false" v-model="value" /></view>
			</view>
			<view class="item">
				<view class="title" style="padding: 10rpx 0">描述</view>
				<view class="info"><u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :clearable="false" v-model="value" height="200" /></view>
			</view>
			<view class="item">
				<view class="title">土地图片</view>
				<view class="info"><u-upload width="167" ref="uUpload" :show-progress="false" :auto-upload="false"></u-upload></view>
			</view>
			<view class="item">
				<view class="title" style="line-height: 62rpx; width: 140rpx">交易类型</view>
				<view class="info">
					<u-radio-group v-model="value1" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item">
				<view class="title">机器类型</view>
				<view class="info">
					<u-input placeholder="请选择" v-model="value" type="select" @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="item">
				<view class="title">机器型号</view>
				<view class="info"><u-input placeholder="请输入机器型号" :clearable="false" v-model="value" /></view>
			</view>

			<view class="item">
				<view class="title" style="line-height: 62rpx; width: 140rpx">价格</view>
				<view class="info">
					<u-radio-group v-model="value2" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
					<u-input v-if="value2 == '定价'" style="width: 240rpx" height="60"  placeholder="输入价格" :clearable="false" v-model="value" />
				</view>
			</view>
			<view class="item">
				<view class="title">标签</view>
				<view class="info g-f-1 g-flex g-j-s-b" style="position: relative">
					<view class="tag f-12 g-flex g-a-c g-j-c" v-for="(item, index) in 4" :key="index">九新</view>
				</view>
			</view>
			<view class="item">
				<view class="title">联系人</view>
				<view class="info"><u-input placeholder="请输入联系人" :clearable="false" v-model="value" /></view>
			</view>
			<view class="item">
				<view class="title">联系电话</view>
				<view class="info"><u-input placeholder="请输入联系电话" :clearable="false" v-model="value" /></view>
			</view>
			<view class="item">
				<view class="title">区域</view>
				<view class="info">
					<u-input placeholder="请选择" v-model="map" type="select" @click="regionaStatus = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<u-button style="margin: 20rpx 0;" shape="circle" type="error">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
	</view>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import regionalComponents from '../../components/regionalComponents/regionalComponents.vue';
export default {
	components: {
		HeaderSearch,
		regionalComponents
	},
	data() {
		return {
			regionaStatus: false,
			map: '',
			value: '',
			value1: '购买',
			value2: '面议',
			list: [
				{
					name: '购买',
					disabled: false
				},
				{
					name: '出售',
					disabled: false
				},
				{
					name: '出租',
					disabled: false
				}
			],
			list1: [
				{
					name: '面议',
					disabled: false
				},
				{
					name: '定价',
					disabled: false
				}
			],
			sexShow: false,
			actionSheetList: [
				{
					text: '男'
				},
				{
					text: '女'
				},
				{
					text: '保密'
				}
			]
		};
	},
	onLoad() {
		setTimeout(() => {
			this.$refs.region.getScreen();
		}, 1000);
	},
	methods: {
		radioChange(e) {
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
						map = map + '/' + item;
					} else {
						map = item;
					}
				}
			});
			this.map = map;
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
</style>
