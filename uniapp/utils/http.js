const http = (url, method = 'GET', data = {}) => {
	// 环境判断
	// #ifdef MP
	url = 'https://api.iynn.cn/film' + url
	// #endif
	return uni.request({
		url,
		method,
		data
	})
}
export const get = url => http(url)
