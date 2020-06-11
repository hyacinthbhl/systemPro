<template>
  <div class="main">
    <div class="main_top">
      <p>添加账号</p>
    </div>

    <!-- 添加账号 -->
    <el-form label-width="100px">
      <el-form-item label="账号">
        <el-input type="text" style="width:220px" v-model="name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" style="width:220px" v-model="pwd" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="选择分组">
        <el-select v-model="usergroup" placeholder="请选择分组">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add_account">提交</el-button>
        <el-button @click="rest">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入添加用户Api
import { API_add_count } from "@/api/apis";
export default {
  data() {
    return {
      name: "",//用户名
      pwd: "",//密码
      usergroup: ""//用户分组
    };
  },
  methods: {
    // 重置按钮
    rest() {
      this.name = "";
      this.pwd = "";
      this.usergroup = "";
    },
    // 添加用户
    add_account() {
      API_add_count(this.name, this.pwd, this.usergroup).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功!",
            type: "success"
          });
          this.name = '';
          this.pwd = ''
          this.usergroup = ''
          this.$router.push('/index/acclist')
        } else {
          this.$message.error('添加失败，请稍后再试!');
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 20px;
  background-color: #fff;
  .main_top {
    padding-left: 20px;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .el-form {
    margin-top: 40px;
  }
}
</style>