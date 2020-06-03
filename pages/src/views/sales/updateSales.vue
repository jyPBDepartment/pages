<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
     <slot>
      <el-form :rules="rules" ref="SalesForm" :model="SalesForm" label-width="100px">
       
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="SalesForm.name" placeholder="请输入姓名" style=" width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="SalesForm.phone" placeholder="请输入手机号码" style=" width:70%;"></el-input>
        </el-form-item>
           <el-form-item label="所属机构ID" prop="organId" >
            <el-select v-model="SalesForm.organId" placeholder="请输入所属机构ID" style=" width:70%;">
              <el-option
                v-for="item in organOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="SalesForm.context" placeholder="请输入备注" style=" width:70%;"></el-input>
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
      },
      organOptions: [],
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "建议输入11位手机号码", trigger: "blur" }
        ],
        organId: [
          { required: true, message: "请输入所属机构ID", trigger: "blur" }
        ]
      
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transSalesId(val) {
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
   mounted() {
    this.findContext();
  },
  methods: {
      //联表查询
    findContext: function() {
      let params = {
      organId  :this.SalesForm.organId
      };
      api
        .testAxiosGet(ApiPath.url.findAllOrgan, params)
        .then(res => {
          if (res.status == "0") {
            
            for (let i = 0; i < res.data.length; i++) {
              this.organOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"]
              });
            }
          }
        })
        .catch(function(error) {
         
        });
    },

//修改用户信息
    updateSales: function() {
      
        let params={
            salesEntity:this.SalesForm
        }
      
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

<style scoped>
.el-form{
   padding-left: 115px;
}

</style>