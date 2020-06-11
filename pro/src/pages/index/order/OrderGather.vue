<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        v-model="time"
      ></el-date-picker>
      <el-button type="primary" @click="query_btn">查询</el-button>
    </div>
    <div id="orderEcharts"></div>
  </div>
</template>

<script>
import { API_ordertotal } from "@/api/apis";
export default {
  data() {
    return {
      time: "", //选择时间
      // "['2020-06-04 17:30:09','2020-06-04 17:35:19']"
      // data:
      orderTime: [], //后台返回订单时间
      orderAmount: [] //订单金额
    };
  },
  methods: {
    query_btn() {
     console.log(this.time)
    }
  },
  mounted() {
    let time = JSON.stringify(this.time);
    API_ordertotal(time).then(res => {
      res.data.data.forEach(item => {
        this.orderTime.push(
          new Date(item.orderTime)
            .toJSON()
            .substr(0, 19)
            .replace("T", " ")
        );
        this.orderAmount.push(item.orderAmount);
        // console.log(item.orderAmount)
      });
      // console.log(this.orderTime)
      // console.log(this.orderTime)
      let orderEcharts = this.$echarts.init(
        document.getElementById("orderEcharts")
      );
      orderEcharts.showLoading();
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["订单金额"]
        },
        xAxis: [
          {
            type: "category",
            data: this.orderTime,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "订单金额",
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "订单金额",
            type: "bar",
            data: this.orderAmount
          }
        ]
      };
      // console.log(res)
      orderEcharts.setOption(option);
      orderEcharts.hideLoading();
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
.block {
  .demonstration {
    margin-right: 20px;
    color: #ccc;
  }
  .el-button {
    margin-left: 20px;
  }
}
#orderEcharts {
  width: 100% !important;
  height: 400px !important;
  background-color: #fff;
  margin-top: 40px;
}
</style>