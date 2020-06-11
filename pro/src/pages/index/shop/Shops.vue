<template>
  <div class="main">
    <div class="main_top">
      <p>店铺管理</p>
      <el-button type="primary" class="shop_save">保存</el-button>
    </div>
    <el-form ref="form" style="padding:20px 0" label-width="80px" size="mini">
      <el-form-item label="店铺名称">
        <el-input placeholder="店铺名称" v-model="name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="bulletin" :rows="8" style="width:300px" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <div class="block">
          <el-image class="shop_img" :src="avatar"></el-image>
        </div>
      </el-form-item>
      <el-form-item label="店铺图片">
    
         <el-image v-for="(item,index) in imglist" :key="index" :src="item" style="margin-left:20px"></el-image>
      
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="handleAvatarSuccess"
          style="margin-left:20px"
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
        <el-checkbox-group v-model="active" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in active" :label="city" :key="city">{{city}}</el-checkbox>
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

      <!-- <el-form-item label="商品名称">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" :rows="2" style="width:400px" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-button type="primary" style="margin-left:10px">添加商品</el-button>-->
    </el-form>
  </div>
</template>

<script>
import { API_get_shops } from "@/api/apis";
export default {
  data() {
    return {
      imgurl:'http://127.0.0.1:5000/upload/shop/',
      avatar:'',//店铺头像
      bulletin:'',//店铺公告
      name:'',//店铺名称
       deliveryPrice:'',//配送费
       deliveryTime:'',//配送时间
       description:'',//描述
       score:'',//评分
       sellCount:'',//销量
      active:[],//活动
      imglist:[],//商品图片
      checkAll: false,     
      isIndeterminate: true,
      shoptime: [],//营业时间
      fileList:[],//上传图片列表

    };
  },
  methods: {
    // 图片上传成功之后的函数
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imglist = []
        this.fileList.push(res.imgUrl)
        console.log(this.fileList)
      },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.active : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    API_get_shops().then(res => {
      console.log(res);
      this.avatar =  this.imgurl + res.data.data.avatar
      console.log(this.avatar)
      // console.log(res.data.data)
      this.bulletin = res.data.data.bulletin
      this.name = res.data.data.name
      this.deliveryPrice = res.data.data.deliveryPrice
      this.deliveryTime = res.data.data.deliveryTime
      this.description = res.data.data.description
      this.score = res.data.data.score
      this.sellCount = res.data.data.sellCount
      this.active = res.data.data.supports
      this.shoptime = res.data.data.date
      // console.log(res.data.data.pics)
      // this.imglist = res.data.data.pics
      res.data.data.pics.forEach(item => {
          item = this.imgurl + item 
          console.log(item)
          this.imglist.push(item)          
      });
      
      // for(let obj of res.data.data.pics){
      //   obj = obj+this.imgurl
      // }
      // this.imglist = res.data.data.pics
    // bulletin: "尊敬的客官，六一攻略：
    // ↵①6月1日当天在评价区分享童年趣事赠6元无门槛红包
    // ↵②下单时在订单备注处填写【六一儿童节快乐】随机赠送“回忆杀爆款玩具”，数量有限，送完即止。
    // ↵提前预祝大小宝宝节日开心。"
    // date: (2) ["1970-01-01 08:00:00", "1970-01-01 22:30:00"]
    // deliveryPrice: 4
    // deliveryTime: 38
    // description: "蜂鸟专送"
    // id: 1
    // minPrice: 20
    // name: "乡村基(高新金融店)"
    // pics: (4) ["1590480883773.webp", "1590480886706.webp", "1590480889717.webp", "1590482092433.webp"]
    // score: 4.5
    // sellCount: 100
    // supports: (2) ["单人精彩套餐", "VC无限橙果汁全场8折"]
    
    });
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