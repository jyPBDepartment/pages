<template>
	<view>
		<!-- search 组件监听到得参数search方法获取 -->
		<HeaderSearch disabled @searchCallback="search"></HeaderSearch>
		<FoodstuffPrice></FoodstuffPrice>
		<view class="p-x-10">
			<FuncIcon :btnList="btnList"></FuncIcon>
			<Overview :type="1" title="病虫害" :previewList="previewList"></Overview>
			<Overview :type="2" title="粮食收购" :previewList="previewList"></Overview>
			<Overview :type="3" title="农机" :previewList="previewList"></Overview>
			<Overview title="农服预约" :previewList="previewList"></Overview>
		</view>
	</view>
</template>

<script>
	import FuncIcon from '@/components/FuncIcon/FuncIcon.vue'
	import Overview from '@/components/Overview/Overview.vue'
	import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			FuncIcon,
			Overview,
			HeaderSearch,
			FoodstuffPrice
		},
		data() {
			return {
				btnList: [{
						to: "/pages/tabbar/service/index",
						src: '../../../static/logo.png',
						title: '农服',
						backgroundColor: '#55be95'
					},
					{
						to: "/pages/catalog/grainTrade",
						src: '../../../static/logo.png',
						title: '粮食买卖',
						backgroundColor: '#985b3c'
					},
					{
						to: "/pages/catalog/sellAgriculturalMachinery",
						src: '../../../static/logo.png',
						title: '农机',
						backgroundColor: '#52ace8'
					}, {
						to: '/pages/catalog/findDisease',
						src: '../../../static/logo.png',
						title: '看图识病',
						backgroundColor: '#f4c343'
					}

				],
				previewList: [{
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}, {
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}, {
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}]
			};
		},
		onLoad() {
			console.log(11)
		},
		methods: {
			//组件监听搜索内容方法
			search(e) {
				console.log(e)
			}
		}
	};
</script>

<style>
</style>
