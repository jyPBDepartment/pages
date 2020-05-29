<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="45%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="100px">
       
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="editForm.name"  placeholder="请输入姓名" style=" width:60%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="editForm.phone" placeholder="请输入手机号码 " style=" width:60%;"></el-input>
        </el-form-item>
         <el-form-item label="所属机构ID" prop="organId" >
            <el-select v-model="editForm.organId" placeholder="请输入所属机构ID" style=" width:60%;">
              <el-option
                v-for="item in organOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        
        </el-form-item>
        <el-form-item label="备注" prop="context">
          <el-input  type="textarea" v-model="editForm.context" placeholder="请输入备注" style=" width:60%;"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
        <el-button type="success" icon="el-icon-check" @click="saveSales()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      labelPosition: "right",
      editForm: {
        name: "",
        phone: "",
        organId: "",
        context: ""
      },
      localShow: this.show,
      organOptions: [],

      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "建议输入11位手机号码", trigger: "blur" }
        ],
        organId: [
          { required: true, message: "请输入所属机构ID", trigger: "blur" }
        ],
        context: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {},
  mounted() {
    this.findContext();
  },
  methods: {
    //联表查询
    findContext: function() {
      let params = {
        
      };
      api
        .testAxiosGet(ApiPath.url.findAllOrgan, params)
        .then(res => {
          if (res.status == "0") {
            
            for (let i = 0; i < res.data.length; i++) {
              this.organOptions.push({
                value: res.data[i]["name"],
                label: res.data[i]["name"]
              });
            }
          }
        })
        .catch(function(error) {
         
        });
    },

    //添加业务员方法
    saveSales: function() {
      let params = {
        name: this.editForm.name,
        phone: this.editForm.phone,
        organId: this.editForm.organId,
        context: this.editForm.context
      };
      api.testAxiosGet(ApiPath.url.saveSales, params).then(res => {
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

<style scoped>
.el-form {
  padding-left: 100px;
}
</style>
