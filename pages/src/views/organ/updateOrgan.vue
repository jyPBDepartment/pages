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
           <el-input v-model="OrganForm.id" readonly></el-input>
       </el-form-item>
        <el-form-item label="机构名称">
          <el-input type="text" v-model="OrganForm.name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="上级机构编号">
          <el-input type="text" v-model="OrganForm.superId" placeholder="请输入上级机构编号"></el-input>
        </el-form-item>
        
       
        <el-form-item label="备注">
          <el-input type="text" v-model="OrganForm.context" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input type="text" v-model="OrganForm.state" placeholder="请输入状态"></el-input>
        </el-form-item>
        
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px" @click="updateOrgan()">保存</el-button>
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
    transOrganId: {
      type: String
    }
  },
  data() {
    return {
      localShow: this.show,
     OrganForm: {        
        name:"",
        superId:"",  
        context:"",
        state:""
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transOrganId(val) {
        console.log("打印"+val)
      // alert(val)
      // let adminId = val;
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.organFindById, params).then(res => {
        console.log(res.data);
        this.OrganForm = res.data;
      });
    }
  },
  
  methods: {
    updateOrgan: function() {
      
        let params={
            organEntity:this.OrganForm
        }
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateOrgan, params).then(res => {
       this.$message.success(res.message);
        // this.OrganForm = res.data;
        this.close();
      this.reload();
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