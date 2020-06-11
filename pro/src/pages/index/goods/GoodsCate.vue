<template>
  <div class="main">
    <div class="main_top" style="border-bottom:1px solid #ccc">
      <p>商品分类</p>
      <el-button type="primary" class="add_btn" @click=" dialogFormVisible = true">添加分类</el-button>
    </div>
    <!-- 商品分类表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" width="260">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="300">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            disabled
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del_cate(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类谈话框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="分类名称" width="100">
          <!-- <template slot-scope="scope"> -->
          <el-input v-model="name" autocomplete="off" style="width:400px"></el-input>
          <!-- </template> -->
        </el-form-item>
        <el-form-item label="是否启用" width="300">
          <!-- <template slot-scope="scope"> -->
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <!-- </template> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goods_add_cate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改商品分类弹出框 -->
    <el-dialog title="修改商品分类" :visible.sync="update_form">
      <el-form>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="update_name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" width="300" style="margin-left:50px">
          <!-- <template slot-scope="scope"> -->
            <el-switch v-model="update_flag" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          <!-- </template> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="update_form = false">取 消</el-button>
        <el-button type="primary" @click="update_btn(goodsid)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// 引入分类列表
import { API_get_cate } from "@/api/apis";
// 引入添加分类接口
import { API_add_cate } from "@/api/apis";
// 引入删除商品分类接口
import { API_del_cate } from "@/api/apis";
// 引入修改商品分类接口
import { API_update_cate } from "@/api/apis"
export default {
  data() {
    return {
      name: "", //添加分类分类名称
      update_name:"",//编辑分类名称
      value: false, //添加分类是否启用状态
      update_flag: false, // 编辑分类是否启用状态
      dialogTableVisible: false, //
      dialogFormVisible: false, //添加分类是否弹框
      update_form: false, //修改商品分类是否弹框
      currentPage: 1, //当前页
      total: 0, //总条数
      pageSize: 5, //每页条数
      tableData: [], //所有数据表
      // form: {
      //   // value: true,
      //   name: "",
      //   region: "",
      //   date1: "",
      //   date2: "",
      //   delivery: false,
      //   type: [],
      //   resource: "",
      //   desc: ""
      // },
      formLabelWidth: "120px"
    };
  },
  methods: {
    // 页面跳转数据绑定
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.get_cate();
    },
    // 添加分类
    goods_add_cate() {
      API_add_cate(this.name, this.value).then(res => {
        // console.log(this.value);
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加分类成功!",
            type: "success"
          })   
          this.dialogFormVisible = false       
          this.get_cate()
        } else {
          // console.log(this.form.value);
          this.$message.error("添加失败，请稍后再试!");
        }
      });
      // console.log(this.dialogFormVisible)
    },
    // 查询分类列表函数
    get_cate() {
      API_get_cate(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(res);
        for (let item of res.data.data) {
          if (item.state == 1) {
            item.state = true;
          } else {
            item.state = false;
          }
          // console.log(item.state)
        }
        // console.log(res.data.data);
      });
    },
    // 删除分类
    del_cate(goodsid) {
      API_del_cate(goodsid).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功!",
            type: "success"
          });
          this.get_cate();
        }
      });
    },
    // 修改分类弹出框
    handleEdit(goodsid) {
      this.update_form = true;
      // console.log()
      this.goodsid = goodsid
    },
    // 编辑分类功能
    update_btn(goodid){
      API_update_cate(goodid,this.update_name,this.update_flag).then((res)=>{
        if(res.data.code == 0){
          this.get_cate()
        }else{
          this.$message.error('编辑失败，请稍后再试');
        }
      })
      this.update_form = false
      // console.log(goodid)
    }
  },
  created() {
    this.get_cate();
  }
};
</script>

<style lang="less" scoped>
.clearfix:after {
  content: "";
  height: 0;
  display: block;
  clear: both;
}
.main {
  background-color: #fff;
  .main_top {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    .add_btn {
      height: 40px;
      width: 100px;
      align-self: flex-end;
    }
  }
  .block {
    margin-top: 20px;
  }
}
</style>