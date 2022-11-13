<template>
	<view>
		<block v-if="film ===null">
			<loading></loading>
		</block>
		<block v-else>
			<view>{{film.name}}</view>
			<!--  小程序自带的富文本功能 -->
			<!-- <rich-text :nodes="film.body"></rich-text> -->
			<u-parse :content="film.body"></u-parse>
		</block>
	</view>
</template>

<script>
	import {
		get
	} from '@/utils/http.js'
	import loading from '@/components/loading.vue'
	// 富文本显示插件
	import uParse from './u-parse/u-parse.vue'

	export default {
		components: {
			loading,
			uParse
		},
		data() {
			return {
				film: null,
				id: 0
			};
		},
		// 低版本的uni-app它是不能用onLoad，建议用vue的生命周期方法来获取
		// onLoad(options) {
		// 	// console.log('onLoad', options);
		// },
		// 如果你点击了分享，则需要在此配置一下  分享给朋友，几乎所有的小程序都支持
		onShareAppMessage() {
			return {
				path: `/subpages/detail/detail?id=${this.id}`,
				imageUrl: 'http://img.1314000.cn/face.png',
				title: '一个关于冬瓜的故事'
			}
		},
		// 环境判断 分享到朋以圈，目前只有小程序支持
		// #ifdef MP-WEIXIN
		onShareTimeline() {
			return {
				query: `?id=${this.id}`,
				imageUrl: 'http://img.1314000.cn/face.png',
				title: '一个关于冬瓜的故事 -- 朋友圈'
			}
		},
		onAddToFavorites() {
			return {
				query: `?id=${this.id}`,
				imageUrl: 'http://img.1314000.cn/face.png',
				title: '一个关于冬瓜的故事 -- 收藏'
			}
		},
		// #endif
		async mounted() {
			// console.log('mounted', this.$mp.query);
			this.id = this.$mp.query.id
			let [err, ret] = await get('/api/v1/getFilmInfo?filmId=' + this.id)
			let data = ret.data.data.film
			data.body = `<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">
    一场秋雨过后，气温骤降，<span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(51, 51, 51); --tt-darkmode-color: #A3A3A3;">这就是所谓的“一场秋雨，一场寒”。天气变冷，</span>除了及时添加衣服之外，还要多吃一些滋补的食物，给身体储蓄能量。<span style="box-sizing: border-box; margin: 0px; padding: 0px; border: 0px; color: rgb(51, 51, 51); --tt-darkmode-color: #A3A3A3;">秋季的天气比较干燥，一碗暖心暖胃的汤菜，更适合这个季节。</span>
</p>
<p>
    <img src="https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/c914c9c326c44693b1166e9484e4b356~noop.image?_iz=58558&from=article.pc_detail&x-expires=1667550729&x-signature=ADEyxanBu%2BSJX%2FfYqIPb%2Fw3WnA0%3D" class="syl-page-img"/>
</p>
<p class="pgc-img-caption" style="box-sizing: border-box; margin-top: 20px; padding: 0px; border: 0px; margin-bottom: 0px !important;">
    <br/>
</p>
<p style="box-sizing: border-box; margin-top: 20px; margin-bottom: 20px; padding: 0px; border: 0px; color: rgb(34, 34, 34); font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 18px; text-align: justify; white-space: normal; background-color: rgb(255, 255, 255);">
    冬瓜排骨汤，是我家秋冬季节经常食用的一道汤菜。冬瓜是一种高钾低钠的蔬菜，食用价值非常高。它含有丰富的蛋白质、碳水化合物、维生素B、C以及钙、铁、磷等矿物质。排骨富含蛋白质和多种微量元素。
</p>`
			this.film = data
			// 动态修改当前标题
			uni.setNavigationBarTitle({
				title: this.film.name
			})
		}
	}
</script>

<style lang="scss">
	@import url("./u-parse/u-parse.css");
</style>
