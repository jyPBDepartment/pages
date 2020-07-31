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
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="120px" @submit.native.prevent>
       <el-form-item label="菜单类型" prop="menuType">
         <template>
            <el-radio-group v-model="editForm.menuType" @change="selectType">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input type="text" v-model="editForm.name" placeholder="请输入名称"  style=" width:70%;" ></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" >
          <el-input-number v-model="editForm.sort" :step=5 style="width:70%;" step-strictly></el-input-number>
        </el-form-item>
        
        <el-form-item label="图标" prop="icon" v-if="iconShow" >
          <e-icon-picker v-model="editForm.icon" style="width:70%;"/>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId" v-if="parentShow" :required="parentShow">
          <selectTree
            :data="treeDataSelect"
            :defaultProps="{children:'children',label:'name',id:'id'}"
            :filterable="editForm.id"
            v-model="editForm.parentId"
            style="width:70%;">
        </selectTree>
        </el-form-item>
        <el-form-item label="菜单路由" prop="url" v-if="urlShow" :required="urlShow">
          <el-input type="text" v-model="editForm.url" placeholder="请输入菜单路由"  style=" width:70%;" ></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="perssions" v-if="perssionsShow" :required="perssionsShow">
          <el-input type="text" v-model="editForm.perssions" placeholder="请输入权限标识"  style=" width:70%;" ></el-input>
        </el-form-item>
       
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
     
      <el-button type="success" icon="el-icon-check" @click="saveNavigation()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
       <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import eIconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css';//基础样式
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式
import selectTree from "../../components/selectTree" ;//树形下拉选
import aes from "@/utils/aes.js";
Vue.use(eIconPicker, {FontAwesome: false, ElementUI: true});
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
    }
  },
  data() {
    
    return {
      icon:"",
      isShow:false,
      iconShow:true,
      urlShow:false,
      parentShow:false,
      perssionsShow:false,
      labelPosition:'right',
      //upload: ApiPath.url.uploadImg,
      fileList: [],
      editFormVisible: false, 
       editForm:{
        name:"",
        url:"",
        perssions:"",
        parentId:"",
        icon:"",
        menuType: 1,
        sort : 50,
        status: 0,
       } ,
       treeDataSelect:[],
       navigationOptions:[],
       localShow: this.show,
       //rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created(){
    this.findContext();
  },
  mounted() {
    
  },
  components: {selectTree},
  methods: {
    all(){
        // this.subId = this.name;
        this.editForm.subId  = this.editForm.name;
    },
selectType(result){
  //更改菜单类型，控制相应组件显隐
  if(result == 1){
    //目录
    this.iconShow = true;
    this.urlShow = false;
    this.parentShow = false;
    this.perssionsShow = false;
    this.editForm.url = "";
    this.editForm.perssions = "";
    this.editForm.parentId = "";
  }
  if(result == 2){
    //菜单
    this.iconShow = true;
    this.urlShow = true;
    this.parentShow = true;    
    this.perssionsShow = false;
    this.editForm.perssions = "";
  }
  if(result == 3){
    //按钮
    this.parentShow = true;    
    this.perssionsShow = true;
    this.iconShow = false;
    this.urlShow = false;
    this.editForm.url = "";
    this.editForm.icon = "";
  }
},
     //获取菜单树，下拉列表显示
    findContext: function() {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findMenuTreeByName, params)
        .then(res => {
          let code = res.status
          if (code == "0") {
            let parent = [];
            let children = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i]["level"] == 0) {
                parent.push(res.data[i]);      
              } else {
                children.push(res.data[i]);
              }
            }
           let child = [];
           //遍历顶层目录，挂载子菜单
           for (let j = 0; j < parent.length; j++) {
          
              for (let k = 0; k < children.length; k++) {
              
                if (parent[j]["id"] == children[k]["parent_id"]) {
                   child.push(children[k]);
                   
                }
                parent[j]["children"] = child;
                  
              }
              child = [];
            }
          //遍历children，挂载更次级菜单
              for (let j = 0; j < children.length; j++) {
          
              for (let k = 0; k < children.length; k++) {
              
                if (children[j]["id"] == children[k]["parent_id"]) {
                   child.push(children[k]);
                   
                }
                children[j]["children"] = child;
                  
              }
              child = [];
            }
            this.treeDataSelect = parent;
            
          } 
        })
        .catch(function(error) {
        });
    },
     uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file,fileList) {
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeClose() {
      this.close();
    },

    close() {
      this.$emit("close");
    },
    
  saveNavigation:function() {
      let params = {
          menuEntity: aes.encrypt(JSON.stringify(this.editForm) )
        };
      //校验必填项
      let valFlag = true;
      let menuFlag = this.editForm.menuType;
      
        api.testAxiosGet(ApiPath.url.saveMenu,params).then(res =>{
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
.el-button{
    
    border: none;
    
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
   
    margin: 4px 2px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s; 
    transition-duration: 0.4s;
} 

.el-button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
 
</style>
