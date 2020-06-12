<template>
  <div class="main">
    <div class="main_top">
      <p>店铺管理</p>
      <el-button type="primary" class="shop_save" @click="shop_save">保存</el-button>
    </div>
    <el-form ref="form" style="padding:20px 0" label-width="80px" size="mini">
      <el-form-item label="店铺名称">
        <el-input placeholder="店铺名称" v-model="name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input
          type="textarea"
          v-model="bulletin"
          :rows="8"
          style="width:300px"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="successperson"
        >
          <img v-if="avatar" :src="avatar" class="avatar" style="width:150px" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input placeholder="配送费" v-model="deliveryPrice" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input placeholder="配送时间" v-model="deliveryTime" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input placeholder="配送描述" v-model="description" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-input placeholder="店铺评分" v-model="score" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="销量">
        <el-input placeholder="销量" v-model="sellCount" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="active">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品5折购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <template>
          <div class="block">
            <el-date-picker
              v-model="shoptime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_get_shops } from "@/api/apis";
import { API_edit_shops } from "@/api/apis";
export default {
  data() {
    return {
      imgurl: "http://127.0.0.1:5000/upload/shop/",
      avatar: "", //店铺头像
      // imgUrl: "", //上传头像路径
      id: "", //店铺id
      bulletin: "", //店铺公告
      name: "", //店铺名称
      deliveryPrice: "", //配送费
      deliveryTime: "", //配送时间
      description: "", //描述
      score: "", //评分
      sellCount: "", //销量
      active: [], //活动
      // imglist: [], //商品图片
      checkAll: false,
      isIndeterminate: true,
      shoptime: [], //营业时间
      fileList: [], //图片列表
      pics: [],//上传图片列表
    };
  },
  methods: {
    // 查询店铺信息函数
    get_shops_list() {
      API_get_shops().then(res => {
        this.id = res.data.data.id;
        // console.log(res);
        this.avatar = res.data.data.avatar;
        // console.log(this.avatar);
        // console.log(res.data.data)
        this.bulletin = res.data.data.bulletin;
        this.name = res.data.data.name;
        this.deliveryPrice = res.data.data.deliveryPrice;
        this.deliveryTime = res.data.data.deliveryTime;
        this.description = res.data.data.description;
        this.score = res.data.data.score;
        this.sellCount = res.data.data.sellCount;
        this.active = res.data.data.supports;
        this.shoptime = res.data.data.date;
        this.pics = res.data.data.pics;
        this.fileList = res.data.data.pics.map(item => {
          return { url: this.imgurl + item };
        });
        // console.log(this.pics)
      });
    },
    // 头像上传成功之后的函数
    successperson(res,file) {
      this.avatar = this.imgurl + URL.createObjectURL(file.raw);
      this.avatar = this.imgurl + res.imgUrl;
    },
    // 店铺图片上传成功之后的函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.pics.push(res.imgUrl);
      // console.log(this.fileList);
    },
    // 删除店铺图片成功的函数
    handleRemove(file) {
      // console.log((file.url.lastIndexOf('/')).substring())
      // this.pics.splice(this.pics.indexf(url),1)
      let index = file.url.lastIndexOf("/");
      let url = file.url.substring(index + 1, file.url.length);
      this.pics.splice(this.pics.indexOf(url), 1);
      // this.pics.splice()
      // console.log(file)
    },
    // 修改店铺信息保存
    shop_save(){
      this.active = JSON.stringify(this.active)
      this.pics = JSON.stringify(this.pics)
      this.shoptime = JSON.stringify(this.shoptime)
      API_edit_shops(this.id,this.name,this.bulletin,this.avatar,this.deliveryPrice,this.deliveryTime,this.description,this.score,this.sellCount,this.active,this.shoptime,this.pics).then(res=>{
        if(res.data.code == 0){
          this.get_shops_list()
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    this.get_shops_list()
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;

  .main_top {
    padding: 0 20px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    p {
      margin-left: 10px;
    }
    .shop_save {
      height: 40px;
      align-self: flex-end;
    }
  }
}
.shop_img {
  width: 200px;
  border-radius: 10px;
}
.el-checkbox-group {
  width: 400px;
}
// .el-checkbox {
//   width: 400px;
// }
</style>