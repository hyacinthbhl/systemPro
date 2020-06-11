<template>
  <div class="main">
    <p style="color:#ccc">商品添加</p>
    <hr />
    <el-form ref="form" style="padding:20px 0" label-width="80px" size="mini">
      <el-form-item label="商品名称">
        <el-input placeholder="商品名称" v-model="goodsname" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="catename" placeholder="商品分类">
          <el-option v-for="(item,index) in goodscate" :key="index" :value="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="goodsprice" :min="1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :show-file-list="imgflag"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          v-model="goodsdec"
          :rows="2"
          style="width:400px"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-button type="primary" style="margin-left:10px" @click="goods_add">添加商品</el-button>
    </el-form>
  </div>
</template>

<script>
// 添加商品接口
import { API_add_goods } from "@/api/apis";
// 所有商品分类接口
import { API_goods_cate } from "@/api/apis";
export default {
  data() {
    return {
      imgflag: true, //图片列表是否显示
      goodsprice: 1, //商品价格
      imgUrl: "", //商品图片地址
      goodscate: [], //商品分类数组
      goodsname: "", //商品名称
      catename: "", //商品分类名称
      goodsdec: "", //商品描述
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
      console.log(this.imgUrl);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    },
    // 点击添加商品功能
    goods_add() {
      API_add_goods(
        this.goodsname,
        this.catename,
        this.goodsprice,
        this.imgUrl,
        this.goodsdec
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加商品成功!",
            type: "success"
          });
          this.goodsprice = "";
          this.goodsname = "";
          this.catename = "";
          this.goodsdec = "";
          this.imgflag = false;
        } else {
          this.$message.error("添加商品失败，请核对后再试!");
        }
      });
    }
  },
  created() {
    // 所有商品分类接口
    API_goods_cate().then(res => {
      this.goodscate = res.data.categories;
      // console.log(res.data.categories);
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
}
.goods_price {
  color: #ccc;
}

.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>