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
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="120px" style="margin-left:-105px" @submit.native.prevent>
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
          <el-input type="text" v-model="editForm.name" placeholder="请输入名称"  style=" width:90%;" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort" >
          <el-input-number v-model="editForm.sort" :step=5 style="width:90%;" step-strictly></el-input-number>
        </el-form-item>
        
        <el-form-item label="图标" prop="icon" v-if="iconShow" >
          <e-icon-picker v-model="editForm.icon" style="width:90%;"/>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId" v-if="parentShow" :required="parentShow">
          <selectTree
            :data="treeDataSelect"
            :defaultProps="{children:'children',label:'name',id:'id'}"
            :filterable="editForm.id"
            v-model="editForm.parentId"
            style="width:90%;">
        </selectTree>
        </el-form-item>
        <el-form-item label="路由地址" prop="url" v-if="urlShow" :required="urlFlag" >
          <el-input type="text" v-model="editForm.url" placeholder="请输入路由地址" maxlength="64" style=" width:90%;" ></el-input>
        </el-form-item>
        <el-form-item label="是否独立目录" prop="only" v-if="onlyShow" :required="onlyShow" >
          <el-radio-group v-model="editForm.only">
              <el-radio label="Y">是</el-radio>
              <el-radio label="N">否</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="权限标识" prop="perssions" v-if="perssionsShow"  maxlength="64" :required="perssionsShow">
          <el-input type="text" v-model="editForm.perssions" placeholder="请输入权限标识"  style=" width:90%;" ></el-input>
        </el-form-item>
       
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button :disabled="saveFlag" icon="el-icon-check"  @click="saveNavigation()" type="primary">保存</el-button>
       <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
      saveFlag:false,
      iconShow:true,
      urlShow:true,
      onlyShow:true,
      urlFlag:false,
      parentShow:false,
      perssionsShow:false,
      labelPosition:'right',
      //upload: ApiPath.url.uploadImg,
      fileList: [],
      editFormVisible: false, 
       editForm:{
        name:"",
        url:"",
        only : "N",
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
        name: [{ required: true, message: '请输入名称', trigger: 'blur'}],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur'}],
        menuType:[{ required: true, message: '请选择菜单类型', trigger: 'blur'}],
        icon:[{ required: true, message: '请选择图标', trigger: 'blur'}],
        url:[{ required: true, message: '请输入路由地址', trigger: 'blur'}]
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
    this.urlShow = true;
    this.onlyShow = true;
    this.urlFlag = false;
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
    this.onlyShow = false;
    this.urlFlag = true;
    this.parentShow = true;    
    this.perssionsShow = false;
    this.editForm.perssions = "";
    this.editForm.only = "N";
  }
  if(result == 3){
    //按钮
    this.parentShow = true;    
    this.perssionsShow = true;
    this.iconShow = false;
    this.urlShow = false;
    this.onlyShow = false;
    this.urlFlag = false;
    this.editForm.url = "";
    this.editForm.icon = "";
    this.editForm.onlyShow = "";
    this.editForm.only = "N";
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
      if(this.editForm.name == ""){
          this.$alert('名称不能为空！', '提示', {confirmButtonText: '确定',});
          return;
      }
      let menuFlag = this.editForm.menuType;
      if(menuFlag == 1){
        //目录 
        if(this.editForm.icon == ""){
          this.$alert('目录图标不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
        if(this.editForm.only == "Y" && this.editForm.url == ""){
          this.$alert('独立目录URL不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
      }
      if(menuFlag == 2){
        //菜单 
        if(this.editForm.icon == ""){
          this.$alert('菜单图标不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
        if(this.editForm.url == ""){
          this.$alert('菜单路由不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
        if(this.editForm.parentId == ""){
          this.$alert('父菜单不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
      }
      if(menuFlag == 3){
        //按钮
        if(this.editForm.parentId == ""){
          this.$alert('父菜单不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
        if(this.editForm.perssions == ""){
          this.$alert('权限标识不能为空！', '提示', {confirmButtonText: '确定',});
          return;
        }
      }
        this.saveFlag = true;
        api.testAxiosGet(ApiPath.url.saveMenu,params).then(res =>{
               this.$message.success(res.message);
               this.reload();
               this.close();
               }).catch(function(error) {this.saveFlag = false;});
     
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
