<template>
  <div class="main">
    <!-- 商品列表 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" width="100" height="100" />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="props">
          <img :src="props.row.imgUrl" width="100" height="100" />
        </template>
      </el-table-column>
      <img src alt />
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" @click="goods_edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del_goods(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑商品弹框 -->

    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
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
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            v-model="goodsdec"
            :rows="4"
            style="width:400px"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit_btn(goodsid)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- {{ total}} -->
    </div>
  </div>
</template>

<script>
// 引入查看商品列表接口
import { API_get_goodslist } from "@/api/apis";
// 引入删除商品接口
import { API_del_goods } from "@/api/apis";
// 引入查询所有分类接口
import { API_goods_cate } from "@/api/apis";
// 引入添加商品接口
import { API_goods_edit } from "@/api/apis";
export default {
  data() {
    return {
      imgurl: "http://127.0.0.1:5000/upload/imgs/goods_img/", //服务器地址
      currentPage: 1, //当前页
      pageSize: 5, //每页条数
      total: 10, //总数据条数
      tableData: [], //总数据表格数组
      dialogFormVisible: false, //编辑商品弹框     

      dialogImageUrl: "",
      dialogVisible: false,

      goodsid:'',//当前商品id
      goodsprice: 1, //商品价格
      imgUrl: "", //商品图片地址
      goodscate: [], //商品分类数组
      goodsname: "", //商品名称
      catename: "", //商品分类名称
      goodsdec: "", //商品描述
      newImgUrl:''//新图片地址
    };
  },
  methods: {
    // 图片上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.newImgUrl = res.imgUrl;
    },
    // 图片上传之前的函数
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
    // 当前页发生变化时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.get_goods_list();
    },
    // 查询商品列表函数
    get_goods_list() {
      API_get_goodslist(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(this.total);
        for (let obj of res.data.data) {
          this.imgUrl = obj.imgUrl;
          obj.imgUrl = this.imgurl + obj.imgUrl;
        }
        console.log(res)
      });
    },
    // 删除商品
    del_goods(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_del_goods(id).then(res => {
          console.log(res);
        });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.get_goods_list();
      });
      console.log(id);
    },
    // 编辑商品弹框
    goods_edit(goods) {
      // 发送查询分类接口
      API_goods_cate().then(res => {
        // console.log(res.data.categories)
        this.goodscate = res.data.categories;
      });
      this.dialogFormVisible = true;
      this.goodsname = goods.name;
      this.catename = goods.category;
      this.goodsprice = goods.price;
      this.imgUrl = goods.imgUrl;
      this.goodsdec = goods.goodsDesc;
      this.goodsid = goods.id
      // console.log(goods)
    },
    // 点击确定修改商品信息
    edit_btn(goodsid){
      // console.log(goodsid)
      API_goods_edit(this.goodsname,this.catename,this.goodsprice,this.newImgUrl,this.goodsdec,goodsid).then(()=>{
        this.dialogFormVisible = false
        this.get_goods_list()
      })
    }
  },
  created() {
    this.get_goods_list();
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
  .block {
    margin-top: 40px;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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