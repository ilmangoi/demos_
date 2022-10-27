<template>
  <div class="functionalBar">
    <div class="search">
      <el-input placeholder="搜索权限" v-model="searchKeyword" class="input-with-select" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="addBtn">
      <automatic-btn
        type="primary"
        icon="el-icon-plus"
        size="medium"
        action="/role/addFilm"
        @click="setAddDialogVisibility(true)"
      >
        添加权限
      </automatic-btn>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('permission')

export default {
  computed: {
    ...mapState(['tableData', 'keyword']),
    searchKeyword: {
      get() {
        return this.keyword
      },
      set(val) {
        this.setKeyword(val)
      }
    }
  },
  watch: {
    keyword() {
      this.searchHandler(this.keyword, this)
    }
  },
  methods: {
    ...mapMutations(['setTableData', 'setAddDialogVisibility', 'setKeyword']),
    searchHandler: _.throttle((keyword, that) => {
      keyword = keyword.replace(/\s+/g, '') // 把关键字中的空格过滤掉
      that.searchKeyword = keyword
    }, 500)
  }
}
</script>

<style scoped lang="scss">
.functionalBar {
  margin-top: 20px;
  margin-bottom: 20px;
  user-select: none;
  display: flex;
  justify-content: left;
  align-items: center;
  .search {
    margin-left: 10px;
    .el-input {
      width: 400px;
    }
  }
  div {
    margin-left: 10px;
  }
}
</style>
