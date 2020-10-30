<template>
  <div class="account-container">
    <el-form :inline="true" class="user-search">
      <el-form-item label="账户名称">
        <el-input
          size="small"
          v-model="name"
          placeholder="输入账户名称"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          size="small"
          v-model="phone"
          placeholder="输入手机号码"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="账户状态" prop="auditStatus">
        <el-select v-model="auditStatus" style="width: 100%" size="small">
          <el-option
            v-for="item in auditStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="search('manual')"
          class="height"
          >查询</el-button
        >
        <el-button
          size="small"
          type="danger"
          icon="el-icon-refresh"
          @click="resetForm('search')"
          >重置</el-button
        >
      </el-form-item>
      <br />
      <el-row>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="addAccountInfos()"
          >添加</el-button
        >
      </el-row>
      <br />
    </el-form>

    <div>table</div>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      name: "",
      nickName: "",
      phone: "",
      auditStatus: "",
      auditStatusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.account-container {
  .search-box {
  }
}
</style>