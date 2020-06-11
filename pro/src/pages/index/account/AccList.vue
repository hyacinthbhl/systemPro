<template>
  <div class="main">
    <div class="acc_list">账号列表</div>
    <!-- 账号列表表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column label="账号" width="200">
        <template slot-scope="scope" prop="account">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column prop="name" label="用户组" width="220">
        <template slot-scope="scope">{{ scope.row.userGroup }}</template>
      </el-table-column>
      <el-table-column prop="address" label="创建时间" show-overflow-tooltip width="300px">
        <template slot-scope="scope">{{ new Date(scope.row.ctime)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ")
        }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="edit_click(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del_click(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <!-- 编辑用户信息框 -->
    <el-dialog title="修改账号信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="oldacc" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select placeholder="请选择用户组" v-model="usergroup">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="edit_user(userdata.id)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 按钮 -->
    <div class="del_btn" style="margin-top: 20px">
      <el-button type="danger" @click="delAll_click">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
// 引入账号列表API
import { API_acc_list } from "@/api/apis";
// 引入删除单个账号API
import { API_del_single } from "@/api/apis";
// 引入批量删除接口API
import { API_del_all } from "@/api/apis";
// 引入修改账户信息API
import { API_edit_account } from "@/api/apis"
export default {
  data() {
    return {
      oldacc:"",//用户名
      usergroup:"",//用户组
      formLabelWidth: "120px",//
      // dialogTableVisible: false,
      dialogFormVisible: false,//编辑框的显示隐藏
      total: 0,//数据总条数
      currentPage: 1,//当前页
      pageSize: 6,//一页显示条数
      tableData: [],//表格数据
      multipleSelection: 0,
      delAll: []//选中多条数据id
    };
  },
  created() {
    this.select();
  },

  methods: {
    // 获取账号列表函数
    select() {
      API_acc_list(this.currentPage, this.pageSize).then(res => {
        // console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 当页面选项发生变化时
    handleSelectionChange(val) {
      this.delAll = [];
      for (let obj of val) {
        this.delAll.push(obj.id);
      }
    },
    // 当前页面发生变化时，再次调用查询接口渲染
    handleCurrentChange(val) {
      // console.log(val)
      // console.log(this.currentPage)
      this.currentPage = val;
      this.select();
    },
    // 删除当前
    del_click(userid) {
      API_del_single(userid).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功!!!",
            type: "success"
          });
          this.select();
        }
      });
      // this.tableData.splice(userid)
    },
    // 批量删除
    delAll_click() {
      // console.log(1)
      var delstr = JSON.stringify(this.delAll);
      API_del_all(delstr).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功!",
            type: "success"
          });
          this.select();
        }
      });
    },
    // 显示编辑信息框
    edit_click(alldata) {//当前编辑的数据
      this.dialogFormVisible = true
      // console.log(alldata)
      this.userdata = alldata//将当前数据挂载到this上
      this.oldacc = alldata.account
      this.oldusergroup = alldata.usergroup
    },
    // 确认编辑，发送请求
    edit_user(uid){
      API_edit_account(uid,this.oldacc,this.usergroup).then((res)=>{
        if(res.data.code == 0){
          this.dialogFormVisible = false
          this.select()
        }else{
          this.$message.error('编辑失败，稍后再试!!');
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
  padding-bottom: 20px;
  .el-table {
    padding-left: 20px;
  }
  .acc_list {
    padding-left: 20px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  .del_btn {
    margin: 20px 20px;
  }
  .block {
    margin-left: 20px;
  }
}
</style>