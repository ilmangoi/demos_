<template>
  <div>
    <div class="div1">
      <el-input placeholder="搜索查询影院" v-model="input" clearable class="inp"> </el-input>
      <el-button type="primary" icon="el-icon-search" class="bn2" @click="handlersousuo">搜索</el-button>
      <el-button type="primary" round class="bnn" @click="handlecinema">添加影院 </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="成立时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="负责人" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="影院名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.names }}</span>
        </template>
      </el-table-column>
      <el-table-column label="影院地址" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.addresses }}</span>
        </template>
      </el-table-column>
      <el-table-column label="影院电话" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div><el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination></div>
    <!-- <CinemaDialog :dialogVisible1="dialogVisible" /> -->

    <el-dialog title="添加表单" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="成立时间">
          <el-input v-model="form.date"></el-input>
        </el-form-item>
        <el-form-item label="ID">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="影院名称">
          <el-input v-model="form.names"></el-input>
        </el-form-item>
        <el-form-item label="影院地址">
          <el-input v-model="form.addresses"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handclcik1">取 消</el-button>
        <el-button type="primary" @click="handclcik">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import CinemaDialog from './CinemaDialog.vue'
export default {
  // components: {
  //   // CinemaDialog
  // },
  data() {
    return {
      form: {
        date: '',
        id: '',
        name: '',
        address: '',
        names: '',
        addresses: '',
        phone: ''
      },
      flag: true,
      dialogVisible: false,
      input: '',
      tableData: [
        {
          id: 1,
          date: '2016-07-02',
          name: '伦老板',
          address: '北京市朝阳区亚运村紫玉山庄15楼302',
          names: '心心影院',
          addresses: '北京市朝阳区15号',
          phone: 16877856655
        },
        {
          id: 2,
          date: '2021-09-21',
          name: '陈老板',
          address: '北京市朝阳区北京华侨城11楼603',
          names: '瑶瑶影院',
          addresses: '北京市昌平区沙河镇18号',
          phone: 13865423365
        },
        {
          id: 3,
          date: '2018-12-02',
          name: '马老板',
          address: '北京市顺义区丽斯花园64楼101号',
          names: '煌煌影院',
          addresses: '北京市海淀区68号',
          phone: 18564231145
        },
        {
          id: 4,
          date: '2010-07-13',
          name: '李老板',
          address: '北京市顺义区丽高王府8楼606号',
          names: '梦梦影院',
          addresses: '北京市昌平区1164号',
          phone: 17836580601
        },
        {
          id: 5,
          date: '2008-07-08',
          name: '王老板',
          address: '上海市普陀区金沙江路110号',
          names: '万达影院',
          addresses: '北京市丰台区110号',
          phone: 13655851115
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },

    handleEdit(index, row) {
      console.log(index, row)

      this.dialogVisible = true
      this.form = this.tableData[index]

      // this.form = {}
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    handlecinema() {
      this.form = {}
      this.dialogVisible = true
      // this.tableData.push(this.form)
    },
    handclcik() {
      this.dialogVisible = false
      if (
        this.form.date == null ||
        this.form.id == null ||
        this.form.name == null ||
        this.form.address == null ||
        this.form.names == null ||
        this.form.addresses == null ||
        this.form.phone == null
      )
        return

      this.tableData.push(this.form)
      this.form = {}
    },
    handclcik1() {
      this.dialogVisible = false
      this.form = {}
    },
    handlersousuo() {
      this.tableData.forEach((item, index) => {
        if (item.names == this.input) {
          this.form = this.tableData[index]
          this.dialogVisible = true
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.div1 {
  position: relative;
  width: 1200px;
  height: 50px;
  .inp {
    width: 200px;
    position: absolute;
    left: 100px;
  }
  .bn2 {
    position: absolute;
    left: 300px;
  }
  .bnn {
    position: absolute;
    left: 1100px;
  }
}
</style>
