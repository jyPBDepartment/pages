<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
     <slot>
      <el-form>
       <el-form-item label="用户编号">
           <el-input v-model="SalesForm.id" readonly></el-input>
       </el-form-item>
        <el-form-item label="姓名">
          <el-input type="text" v-model="SalesForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input type="text" v-model="SalesForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
         <el-form-item label="所属机构ID">
          <el-input type="text" v-model="SalesForm.organId" placeholder="请输入所属机构ID"></el-input>
        </el-form-item>
        
        <el-form-item label="备注">
          <el-input type="text" v-model="SalesForm.context" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input type="text" v-model="SalesForm.state" placeholder="请输入状态"></el-input>
        </el-form-item>
        
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="updateSales()" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close"  size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  inject:['reload'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    },
    transSalesId: {
      type: String
    }
  },
  data() {
    return {
      localShow: this.show,
        SalesForm: {

        name:"",
        phone:"",
        organId:"",
       
        context:"",
        state:"",
      
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transSalesId(val) {
        console.log("打印"+val)
      // alert(val)
      // let adminId = val;
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.salesFindById, params).then(res => {
        console.log(res.data);
        this.SalesForm = res.data;
      });
    }
  },
  
  methods: {
    updateSales: function() {
      
        let params={
            salesEntity:this.SalesForm
        }
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateSales, params).then(res => {
        this.$message.success(res.message);
        this.reload();
        this.close();

      });
     
    },
    close: function() {
      this.$emit("close");
    },
    beforeClose: function() {
      this.close();
    }
  }
};
</script>

<style>
</style>