<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {};
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
</style>