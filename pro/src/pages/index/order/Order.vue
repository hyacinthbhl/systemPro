<template>
  <div class="main">
    <el-form ref="form" label-width="80px" size="mini">
      <el-form-item label="订单号">
        <el-input v-model="orderNo" placeholder="订单号" clearable></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="consignee" placeholder="收货人" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="phone" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="orderState" placeholder="订单状态">
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 时间选择器 -->
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" class="query_btn" @click="query_some">查询</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="160"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="200"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editorderinfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        :current-page="currentPage"
      ></el-pagination>
    </div>

    <!-- 订单详情弹框 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.orderNo"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.orderTime"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.consignee"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.deliverAddress"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.deliveryTime"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.remarks"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.orderAmount"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input autocomplete="off" :value="orderinfo.orderState"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑订单 -->
    <el-dialog title="修改订单信息" :visible.sync="editformflag">
      <el-form>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.orderNo" disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="下单时间" :label-width="formLabelWidth" aria-disabled="disabled">
          <el-input autocomplete="off" disabled="disabled" v-model="editmessage.orderTime"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.consignee"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.deliverAddress"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-input autocomplete="off" disabled="disabled" v-model="editmessage.deliveryTime"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.remarks"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editmessage.orderAmount"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="editmessage.orderState" placeholder="订单状态">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center>
        <el-button @click="editformflag = false">取 消</el-button>
        <el-button type="primary" @click="edit_btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入商品列表接口
import { API_get_order } from "@/api/apis";
import { API_edit_goods } from "@/api/apis";
export default {
  data() {
    return {
      // orderid: "",
      currentPage: 1, //当前页
      pageSize: 5, //显示多少条数据
      total: 0, //总数据条数
      tableData: [],
      orderNo: "", //订单号
      consignee: "", //收货人
      phone: "", //电话
      orderState: "", //订单状态
      date: "", //时间
      dialogFormVisible: false, //订单详情是否弹框
      // formLabelWidth:"120px",
      formLabelWidth: "200px",
      orderinfo: {}, //后台数据data
      editformflag: false, //修改信息弹框
      editmessage: {
        // neworderNo: "", //新订单号
        // neworderTime: "", //新订单时间
        // newphone: "", //新手机号
        // newperson: "", //新收货人
        // newaddress: "", //新收货地址
        // endtime: "", //送达时间
        // remarks: "", //备注
        // neworderprice: "", //新订单价格
        // neworderstate: "" //订单状态
      }
    };
  },
  methods: {
    // 页码发生变化时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_goods_list();
    },
    // 订单列表查询
    get_goods_list() {
      this.date = JSON.parse(JSON.stringify(this.date));
      API_get_order(
        this.currentPage,
        this.pageSize,
        this.orderNo,
        this.consignee,
        this.phone,
        this.orderState,
        this.date
      ).then(res => {
        this.tableData = res.data.data;
        // console.log(res.data.data)
        for (let obj of this.tableData) {
          obj.orderTime = new Date(obj.orderTime)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ");
          obj.deliveryTime = new Date(obj.orderTime)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ");
        }
        this.total = res.data.total;
        console.log(this.date);
      });
    },
    // 部分查询
    query_some() {
      this.get_goods_list();
    },
    //订单详情弹框
    handleClick(item) {
      this.dialogFormVisible = true;
      // console.log(id)
      // console.log(item.id)
      // this.id = item.id
      this.orderinfo = item;
    },
    // 修改订单信息弹框
    editorderinfo(obj) {
      console.log(obj);
      this.editformflag = true;
      this.editmessage = obj;
    },
    // 修改订单信息
    edit_btn() {
      API_edit_goods(
        this.editmessage.id,
        this.editmessage.orderNo,
        this.editmessage.orderTime,
        this.editmessage.phone,
        this.editmessage.consignee,
        this.editmessage.deliverAddress,
        this.editmessage.deliveryTime,
        this.editmessage.remarks,
        this.editmessage.orderAmount,
        this.editmessage.orderState
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: " 修改成功!",
            type: "success"
          });
          
          this.get_goods_list()
        }
         
      });
      this.editformflag = false
    }
  },
  created() {
    this.get_goods_list();
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 10px;
  background-color: #fff;
  .el-form {
    display: flex;
    justify-content: start;
  }
  .block {
    margin-left: 24px;
    .demonstration {
      color: #606266;
      margin-right: 16px;
    }
    .query_btn {
      margin-left: 20px;
    }
  }
  .el-table {
    margin-top: 40px;
  }
  .block {
    margin-top: 20px;
  }
}
</style>