<template>
  <div class="main">
    <div class="main_top">
      <p>修改密码</p>
    </div>

    <!-- 修改密码 -->
    <el-form :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldpass">
        <el-input
          type="password"
          @blur="old_pass_blur"
          style="width:300px"
          v-model="ruleForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input style="width:300px" type="password" v-model.number="ruleForm.newPass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          style="width:300px"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          @blur="checkNewPass"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="newPass_btn(id)">提交</el-button>
        <el-button @click="(ruleForm = {})">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入验证原密码API
import { API_old_pass } from "@/api/apis";
// 引入修改密码API
import { API_chage_pass } from "@/api/apis";
export default {
  data() {
    return {
      ruleForm: {
        oldPass: "", //旧密码
        checkPass: "", //验证密码
        newPass: "" //新密码
      },
      id: 0,
      oldpassflag: false, //旧密码验证通过
      checknewpass: false //两次密码一致验证
    };
  },
  methods: {
    // 失去焦点验证原密码
    old_pass_blur() {
      this.id = parseInt(localStorage.getItem("userid"));
      // console.log(this.id)
      API_old_pass(this.id, this.ruleForm.oldPass).then(res => {
        if (res.data.code == 0) {
          this.oldpassflag = true;
        } else {
          this.$message.error("与原密码不符，请重新输入!");
        }
      });
    },
    // 失去焦点验证两次密码是否一致
    checkNewPass() {
      if (this.ruleForm.newPass == this.ruleForm.checkPass) {
        this.checknewpass = true;
      } else {
        this.$message.error("两次密码不一致，请重新输入!");
        this.ruleForm.checkPass = "";
      }
    },
    // 确定发送请求，修改密码
    newPass_btn(id) {
      if (this.oldpassflag == true && this.checknewpass == true) {
        API_chage_pass(this.ruleForm.newPass, id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "修改密码成功..",
              type: "success"
            });
            localStorage.token = ""
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          }else{
            this.$message.error("修改密码失败，请稍后再试！！");
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding-bottom: 40px;
  background-color: #fff;
  .main_top {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .el-form {
    margin: 40px 0;
  }
}
</style>