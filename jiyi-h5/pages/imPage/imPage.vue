<template>
	<view><web-view :src="imUrl"></web-view></view>
</template>

<script>
import ApiPath from '../../api/ApiPath.js';
export default {
	onLoad(data) {
		this.imUrl = `${ApiPath.imUrl}p2p-${data.sid}?uid=${data.uid}&token=${data.token}`;
		console.log(123, this.imUrl);
	},
	data() {
		return {
			imUrl: ''
		};
	}
};
</script>

<style lang="scss"></style>
