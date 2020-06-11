<template>
  <div>
    <div class="top">
      <div class="top_article first">
        <img height="60px" :src="require('../../assets/imgs/order.png')" alt />
        <div>
          <p class="article">总订单</p>
          <p>{{ totalOrder }}</p>
        </div>
      </div>
      <div class="top_article">
        <img :src="require('../../assets/imgs/order.png')" alt />
        <div>
          <p class="article">总销售额</p>
          <p>{{ totalAmount }}</p>
        </div>
      </div>
      <div class="top_article">
        <img :src="require('../../assets/imgs/order.png')" alt />
        <div>
          <p class="article">今日订单</p>
          <p>{{ todayOrder }}</p>
        </div>
      </div>
      <div class="top_article">
        <img :src="require('../../assets/imgs/order.png')" alt />
        <div>
          <p class="article">今日销售额</p>
          <p>{{ totayAmount }}</p>
        </div>
      </div>
    </div>

    <!-- echarts -->
    <div id="myChart" :style="{width: '100%', height: '460px'}"></div>
  </div>
</template>

<script>
import { API_order_totalData } from "@/api/apis";
export default {
  data(){
    return{
        todayOrder:0,//今日订单
        totalAmount:0,//总销售额
        totalOrder:0,//总订单
        totayAmount:0//今日销售额
    }
  },
  mounted() {
    API_order_totalData().then(res => {
      console.log(res);
      let { amountData , xData ,orderData ,todayOrder ,totalAmount ,totalOrder ,totayAmount} = res.data
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      this.todayOrder = todayOrder
      this.totalAmount = totalAmount
      this.totalOrder = totalOrder
      this.totayAmount = totayAmount
      let option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["销售额", "订单"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: orderData
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: amountData
          },
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;

  .top_article {
    height: 90px;
    display: flex;
    justify-content: space-around;
    width: 340px;
    margin-left: 20px;
    background-color: #fff;

    img {
      align-self: center;
    }
    .article {
      color: #ccc;
    }
  }
  .first {
    margin-left: 0px;
  }
}
#myChart {
  width: 100% !important;
  height: 400px !important;
  background-color: #fff;
  margin-top: 40px;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
</style>