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
      <el-form
        :model="authForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-tree
            ref="tree"
            :data="treeData"
            show-checkbox
            node-key="id"
            :default-checked-keys="checkedData"
            :props="defaultProps">
        </el-tree>
      </el-form>
        
    </slot>

    <!-- 按钮区 -->
    <span slot="footer">
      <el-button :disabled="saveFlag" type="primary" icon="el-icon-check" @click="saveRoles()">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import aes from "@/utils/aes.js";
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
    },
    transAuthId: {
      type: String
    }
  },
  data() {
    return {
      saveFlag:false,
      labelPosition: "right",
      authForm: {
      },
      treeData:[],
      checkedData:[],
      limitIdOptions: [],
      localShow: this.show,
      defaultProps: {
          children: 'children',
          label: 'name'
      }
    };
  },
  created(){
    this.findContext();
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //获取该角色下已授权菜单，设置菜单树状态
    transAuthId(val) {
        let params = {
        roleId: val
        };
        let checkedList = [];
        let helfList = [];
        let list = this.treeData;
        //根据Id查询用户信息
        api.testAxiosGet(ApiPath.url.findRelaByRoleId, params).then(res => {
            //折叠所有节点
            for (let i = 0; i < list.length; i++) {
                this.$refs.tree.store.nodesMap[list[i].id].expanded = false
            }
            //遍历后台返回数据，当前角色下所授权的菜单信息
            for (let i = 0; i < res.data.length; i++) {
                checkedList.push(res.data[i].menu.id);
                //设置子节点展开
                this.$refs.tree.store.getNode(res.data[i].menu.id).expanded = true;
            }
            //设置节点选中
            this.$refs.tree.setCheckedKeys (checkedList,false);
            helfList = this.$refs.tree.getHalfCheckedKeys();
            //设置父节点展开
            helfList.forEach(element => {
               this.$refs.tree.store.getNode(element).expanded = true;
            });
        });
    }
  },
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //新增保存
    saveRoles: function() {
      this.saveFlag = true;
      if(this.authForm.name!=""){
        let params = {
          roleId: this.transAuthId,
          idArr: aes.encrypt(JSON.stringify(this.$refs.tree.getCheckedKeys()))
        };
        api.testAxiosGet(ApiPath.url.saveRelaFromRole, params).then(res => {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }).catch(function(error) {this.saveFlag = false;});
     }else{
       this.$alert('角色名称、权限名称不能为空！', '提示', {confirmButtonText: '确定',});
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
            this.treeData = parent;
           //(JSON.stringify(this.treeData));
          } 
        })
        .catch(function(error) {
        });
    }


  }
};
</script>

<style>
.el-form {
  padding-left: 100px;
}
.el-button{
  border: none;
}
.el-checkbox__inner{
    width: 16px;
    height: 16px;
}
.el-tree-node__label{
    font-size:16px;
}
</style>