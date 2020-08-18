<template>
	<view>
		<!-- search 组件监听到得参数search方法获取 -->
		<HeaderSearch @searchCallback="search"></HeaderSearch>
		<FoodstuffPrice></FoodstuffPrice>
		<view class="p-x-10">
			<FuncIcon :btnList="btnList"></FuncIcon>
			<Overview title="农服预约" :previewList="previewList"></Overview>
			<Overview :type="1" title="病虫害" :previewList="previewList"></Overview>
		</view>
	</view>
</template>

<script>
	import FuncIcon from '../../../components/FuncIcon/FuncIcon.vue'
	import Overview from '../../../components/Overview/Overview.vue'
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
						src: '../../../static/logo.png',
						title: '水稻植保',
						backgroundColor: '#f4c343'
					},
					{
						src: '../../../static/logo.png',
						title: '看图识病',
						backgroundColor: '#985b3c'
					},
					{
						src: '../../../static/logo.png',
						title: '粮食收购',
						backgroundColor: '#52ace8'
					},
					{
						src: '../../../static/logo.png',
						title: '出售农机',
						backgroundColor: '#55be95'
					},
					{
						src: '../../../static/logo.png',
						title: '出租农机',
						backgroundColor: '#f38433'
					},
					{
						src: '../../../static/logo.png',
						title: '全部',
						backgroundColor: '#55be95'
					}

				],
				previewList:[
					{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},{
						src:'../../../static/logo.png',
						number:280,
						title:'水稻植保',
						address:'长春市·榆树市'
					},
				]
			};
		},
		onLoad() {
			console.log(11)
		},
		methods: {
			//组件监听搜索内容方法
			search(e){
				console.log(e)
			}
		}
	};
</script>

<style>
</style>
