<template>
	<view>
		我是一个分类 -- {{num}}
		<button type="primary" @click="addNum">++++++</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		computed: {
			num() {
				return this.$store.state.count.num
			}
		},
		methods: {
			addNum() {
				this.$store.commit('count/addNum', 1)
				// this.$store.commit('addNum', 1)
			}
		}
	}
</script>

<style lang="scss">

</style>
