<template>
  <div id="main">
    <div class="login">
      <h2>XX管理系统登录</h2>
      <el-input class="input_name" placeholder="请输入用户名" v-model="name" clearable></el-input>
      <el-input class="input_password" placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <el-button class="login_btn" type="primary" @click="login">登录</el-button>

    </div>
  </div>
</template>

<script>
// 引入登录API接口
import { API_Login } from "@/api/apis";
export default {
  data() {
    return {
      name: "",//用户名
      pwd: "",// Mima
      loginflag: true//是否能再次发送请求标杆
    };
  },
  methods: {
    login() {
      // 判断登录按钮是否能发送请求 为true可以发送
      if(this.loginflag == false) return 
      if (this.loginflag) {    
        this.loginflag = false    
        API_Login(this.name, this.pwd).then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你，登录成功!",
              type: "success"
            });
            // console.log(res.data.id)
            localStorage.setItem('userid',res.data.id)
            localStorage.token = res.data.token
            localStorage.account = this.name
            localStorage.role = res.data.role
            setTimeout(() => {
              this.$router.push("/index/home");
            }, 1000);
          }else{
            this.$message.error('登录失败，用户名或密码错误!');
          }
          this.loginflag = false;
        });
        
      }
      // 三秒后才能发送第二次请求
      setTimeout(() => {
        this.loginflag = true;
      }, 3000);
    }
  }
};
</script>
    
<style lang="less">
@base: #2d3a4b;

#main {
  background-color: @base;
  width: 100%;
  height: 657px;
  .login {
    width: 320px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h2 {
      text-align: center;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
    .input_name {
      margin-top: 30px;
    }
    .input_password {
      margin-top: 30px;
    }
    .login_btn {
      margin-top: 30px;
      width: 320px;
      letter-spacing: 10px;
    }
  }
}
</style>