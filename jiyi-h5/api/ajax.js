export function ajax(url, method, data, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url, //接口地址。
			method: method || "get", //请求的方式
			data: data || {}, //参数
			header: header,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}
