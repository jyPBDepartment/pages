/**
* 分页组件
*/ 
<template>
  <el-pagination
    class="page-box"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="childMsg.currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="childMsg.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="childMsg.total"
  ></el-pagination>
</template>
<script>
export default {
  name: "Pagination",
  props: ["childMsg"],
  data() {
    return {
      pageparm: {
        currentPage: this.childMsg.currentPage,
        pageSize: this.childMsg.pageSize
      }
    };
  },
  created() {},
  methods: {
    handleSizeChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.pageparm.pageSize = val;
      this.$emit("callFather", this.pageparm);
    },
    handleCurrentChange(val) {
      /**
       * 子传父
       * 参数1 父元素方法
       * 参数2 数据
       */
      this.pageparm.currentPage = val;
      this.$emit("callFather", this.pageparm);
    },
    /**
     *  父传子，重置分页组件的pageSize
     *  参数pageSize -- 每页显示条数
     */
    initPaginationSize(pageSize){
      this.pageparm.pageSize = pageSize;
    }
  }
};
</script>

<style>
.page-box {
  margin: 10px auto;
}
</style> 