<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="skyblue"
        router
        unique-opened
      >
        <img :src="require('../assets/imgs/logo.png')" class="logo" alt="">
        <h5 class="H5_title">憨憨外卖管理系统</h5>
        <div v-for="item in roletreeList" :key="item.index">
          <!-- 二级菜单 -->
          <el-submenu :index="item.index" v-if="item.children">
            <template slot="title">
              <i :class="item.iclass"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="childitem in item.children"
                :key="childitem.index"
                :index="childitem.index"
              >{{ childitem.title }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 一级菜单，无二级菜单 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.iclass"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 顶部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in hashList" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <span>
            <span style="margin-right:40px" @click="personal" class="personal">{{ account }}</span>
          </span>
          <!-- 头像 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="userid"
          >
            <img class="person_img" v-if="imgUrl" :src="imgUrl" />
          </el-upload>

          <!-- 上传头像弹框  -->
          <!-- <el-dialog title="上传头像" :visible.sync="dialogVisible" width="40%" center>
            <el-upload
              action="http://127.0.0.1:5000/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>-->
        </div>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
        <!-- <router-link to="/">aaaa</router-link> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入获取个人信息api
import { API_get_personal } from "@/api/apis";
// 引入token验证接口
import { API_token } from "@/api/apis";
export default {
  data() {
    return {
      // treelist:左侧导航所有数据
      // index：导航hash地址
      // iclass:导航前面图标
      // title:导航名字
      // children: 二级菜单数据
      treelist: [
        {
          index: "/index/home",
          iclass: "el-icon-menu",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          iclass: "el-icon-menu",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "shops",
          iclass: "el-icon-location",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            {
              index: "/index/goodslist",
              title: "商品列表"
            },
            {
              index: "/index/goodsadd",
              title: "商品添加"
            },
            {
              index: "/index/goodscate",
              title: "商品分类"
            }
          ]
        },
        {
          index: "/index/shops",
          iclass: "el-icon-menu",
          title: "店铺管理",
          role: ["super"]
        },
        {
          index: "account",
          iclass: "el-icon-location",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/index/acclist",
              title: "账号列表"
            },
            {
              index: "/index/accadd",
              title: "账号添加"
            },
            {
              index: "/index/updatepass",
              title: "修改密码"
            }
          ]
        },
        {
          index: "sale",
          iclass: "el-icon-menu",
          title: "销售统计",
          role: ["super"],
          children: [
            {
              index: "/index/goodsgather",
              title: "商品统计"
            },
            {
              index: "/index/ordergather",
              title: "订单统计"
            }
          ]
        }
      ],
      userid:{id:parseInt(localStorage.getItem("userid"))},
      //serveUrl:"http://127.0.0.1:5000/upload/imgs/goods_img/",//服务器路径
      path: "", //路由
      hashList: [], //路由数组
      imgUrl: "", //头像地址
      account: "",
      // dialogVisible: false, //上传头像弹框
      islogin: false, //判断是否登录
      imgflag: false, //判断头像是否显示
      id: parseInt(localStorage.getItem("userid")),
      role: "" //通过role判断用户权限
    };
  },
  methods: {
    // hash变化函数
    breadchange(path) {
      let arr = [];
      switch (path) {
        case "/index/home":
          arr = ["后台首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/goodslist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goodsadd":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/goodscate":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/shops":
          arr = ["店铺管理"];
          break;
        case "/index/acclist":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/accadd":
          arr = ["账号管理", "账号添加"];
          break;
        case "/index/updatepass":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/goodsgather":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/ordergather":
          arr = ["销售统计", "订单统计"];
          break;
        case "/index/personal":
          arr = ["个人中心"];
          break;
      }
      this.hashList = arr;
    },
    // 点击用户名跳到个人中心页面
    personal() {
      if (this.islogin) {
        this.$router.push("/index/personal");
      } else {
        this.$router.push("/");
      }
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      window.location.reload()
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  // 当数据变化时触发（hash）
  watch: {
    $route: {
      handler: function(val) {
        // 左侧激活效果
        this.path = val.path;
        // 顶部面包屑
        window.that.breadchange(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let path = this.$route.path;
    this.path = path;
    this.breadchange(path);
    // 将当前组件对象挂载到window上
    window.that = this;

    // 判断是否登录 token
    API_token(localStorage.token).then(res => {
      if (res.data.code == 0) {
        //已登录
        this.account = "欢迎回来  " + localStorage.account;
        this.islogin = true; //已登录标杆 通过标杆判断跳转到哪里
        this.imgflag = true;
        //
      } else {
        //没有登录
        this.account = "欢迎访问，请登录~~";
        this.islogin = false;
        this.imgflag = false;
      }

      // 进到页面给role权限
      this.role = localStorage.role;
    });

    // 通过id查询个人信息
    this.id = parseInt(localStorage.getItem("userid"));
    API_get_personal(this.id).then(res => {
      this.userinfo = res.data.accountInfo;
      this.imgUrl = res.data.accountInfo.imgUrl;
      // this.account = res.data.accountInfo.account;
      // console.log(window.userinfo)
    });
  },
  computed: {
    // 有返回值，在计算属性中写方法更合理
    roletreeList() {
      var newArr = this.treelist.filter(item => {
        // console.log(item.role)
        // console.log(this.role)
        return item.role.includes(this.role);
      });
      return newArr;
      // return this.treelist.filter(i => i.includes(this.role))
    }
  },
  components: {}
};
</script>

<style lang="less">
@base: #2d3a4b;

.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    .el-menu {
      border: 0;
      height: 100%;
      background-color: @base;
      color: #fff;
    }

    .H5_title {
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      margin-left: 30px;
    }
  }
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      .person_img {
        margin-right: 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .el-main {
    background-color: #eee;
  }
  .personal {
    cursor: pointer;
    color: #1495e7;
    &:hover {
      color: skyblue;
    }
  }
  .el-dialog {
    display: flex;
    flex-direction: column;
    .el-upload {
      position: relative;
      .el-icon-plus {
        left: 40%;
        top: 40%;
        position: absolute;
      }
    }
  }
}
.logo{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  left: 8px;
  top: 27px;
}

// .el-aside {

// }
</style>