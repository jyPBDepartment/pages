<template>
	<view>
		<web-view :src="imUrl"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(data) {
			console.log(data)
			this.imUrl = `http://192.168.1.108:2001/webdemo/h5/index.html#/chat/p2p-${data.sid}?uid=${data.uid}&token=${data.token}`
		
			console.log(123,this.imUrl)
		},
		data() {
			return {
				imUrl:'http://192.168.1.108:2001/webdemo/h5/index.html#/chat/p2p-73jl000048?uid=73jl000006&token=73jl000006',
			};
		}
	}
</script>

<style lang="scss">

</style>
