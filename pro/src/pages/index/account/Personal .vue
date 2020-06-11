<template>
  <div class="main">
    <div>
      <el-divider></el-divider>
      <span>管理员信息</span>
      <el-divider></el-divider>
      <span>管理员id：{{ uid }}</span>
      <el-divider></el-divider>
      <span>账号：{{ account }}</span>
      <el-divider></el-divider>
      <span>用户组：{{ usergroup }}</span>
      <el-divider></el-divider>
      <span>创建时间：{{ time }}</span>
      <el-divider></el-divider>
      <div>
        <div class="block">
          <span class="title">管理员头像:</span>
          <el-avatar shape="square" fit="fill" :size="100" :src="imgUrl"></el-avatar>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import { API_get_personal } from "@/api/apis";

export default {
  data() {
    return {
      id: 0,
      imgUrl: "", //头像地址
      account: "", //用户名
      usergroup: "", //用户组
      time: "", //创建时间
      uid: "" //管理员id
      //用户信息
    };
  },

  created() {
    this.uid = parseInt(localStorage.getItem("userid"));
    API_get_personal(this.uid).then(res => {
      new Date(res.data.accountInfo.ctime);
      // this.userinfo = res.data.userInfo
      // console.log(res.data.accountInfo);
      this.imgUrl = res.data.accountInfo.imgUrl;
      this.account = res.data.accountInfo.account;
      this.usergroup = res.data.accountInfo.userGroup;
      // this.time = date.toLocaleString()
      this.uid = res.data.accountInfo.id;
      this.time = new Date(res.data.accountInfo.ctime)
        .toJSON()
        .substr(0, 19)
        .replace("T", " ");
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
  span {
    margin-left: 40px;
  }
  .block {
    display: flex;
    img {
      align-self: flex-start;
    }
  }
}
</style>