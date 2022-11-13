<template>
	<view class="container">
		<view class="title">我是一个标题</view>
		<!-- 在vue模板中来环境判断 -->
		<!-- #ifdef MP -->
		<view>我是小程序</view>
		<!-- #endif -->
		<view class="film-item" v-for="(item,index) in films" :key="item.filmId">
			<image @click="goDetail(item.filmId)" :src="item.poster"></image>
			<!-- 不支持过滤器 -->
			<view>
				<!-- 声明式导航 -->
				<navigator :url="`/subpages/detail/detail?id=${item.filmId}`">{{substr(item.name)}}</navigator>
			</view>
		</view>
		<view class="go-top" :class="{active:showTopBtn}" @click="goTop"></view>
	</view>
</template>

<script>
	import {
		get
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				films: [],
				page: 1,
				showTopBtn: false
			}
		},
		// 发送网络请求 --- onLoad它在网页端是先执行，在小程序中是后执行
		// 注意在混合开发框架中，尽量用vue中生命周期，除vue中没有，才用本特有的
		// uni-app早期时，它不是全平台兼容，一般不用，但是现在它是全平台兼容
		onLoad(options) {
			console.log('onload');
		},
		// 发送网络请求
		async created() {
			// console.log('created');

			// let [err, ret] = await uni.request({
			// 	// #ifdef MP
			// 	url: 'https://api.iynn.cn/film/api/v1/getNowPlayingFilmList?cors=T&cityId=110100&pageNum=1&pageSize=10'
			// 	// #endif
			// 	// #ifdef H5
			// 	url: '/api/v1/getNowPlayingFilmList?cityId=110100&pageNum=1&pageSize=10'
			// 	// #endif
			// })
			this.loadData()
		},
		onPageScroll({
			scrollTop
		}) {
			// console.log(scrollTop);
			this.showTopBtn = scrollTop >= 100
		},
		// 滚动到底部时，触发
		onReachBottom() {
			this.loadData()
		},
		methods: {
			async loadData() {
				let page = this.page
				let [err, ret] = await get('/api/v1/getNowPlayingFilmList?cityId=110100&pageSize=10&pageNum=' + page)
				if (ret.data.data.films.length > 0) {
					if (page === 1) {
						this.films = ret.data.data.films
					} else {
						// 数据会一直追加,会有点的多
						this.films.push(...ret.data.data.films)
						// 截取
						this.films = this.films.slice(-21, -1)
					}
					this.page++
				} else {
					// 提示，没有更多数据
					uni.showToast({
						title: '没有更多的新数据了'
					})
				}
			},
			substr(str) {
				return str.slice(0, 6)
			},
			goDetail(id) {
				// 编程式导航
				uni.navigateTo({
					url: `/subpages/detail/detail?id=${id}`
				})
			},
			goTop() {
				// 用api方法
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;

		.go-top {
			width: 100rpx;
			height: 100rpx;
			background: red;
			position: fixed;
			bottom: 10rpx;
			right: 10rpx;
			z-index: 1;
			opacity: 0;

			&.active {
				opacity: 1;
			}
		}
	}

	.film-item {
		display: flex;
		margin-bottom: 20rpx;

		image {
			width: 300rpx;
			height: 300rpx;
		}
	}

	.title {
		// #ifdef MP
		color: red;
		// #endif
		// #ifndef MP
		color: green;
		// #endif
	}
</style>
