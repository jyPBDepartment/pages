<template>
  <div id="login">
    <div class="title">
      <img src="../../static/title.png" />
    </div>
    <div class="content">
      <img src="../../static/background.png" />
    </div>

    <div class="login-form">
      <div class="f">用户名密码登录</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-position="labelPosition"
        style="margin-top:21px;"
        class="form1"
      >
        <el-form-item prop="name" style="margin-left:20px;margin-bottom: 0px;">
          <el-row>
            <el-col :span="4">
              <img class="i" src="../../static/loginUser.png" />
            </el-col>
            <el-col :span="17">
              <el-input
                style="height:42px"
                v-model="ruleForm.name"
                type="text"
                auto-complete="off"
                placeholder="请输入用户名"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="password" style="margin-left:20px;margin-top:4px; margin-bottom: 0px;">
          <el-row>
            <el-col :span="4">
              <img class="i" src="../../static/passwd.png" />
            </el-col>
            <el-col :span="17">
              <el-input
                style="height:42px"
                v-model="ruleForm.password"
                type="password"
                auto-complete="off"
                placeholder="请输入登录密码"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          prop="verificationCode"
          style="margin-left:36px;margin-top:10px;margin-left:20px;"
        >
          <el-row>
            <el-col :span="12">
              <el-input class="l" v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="bottom" @click="createCode()" size="mini">{{checkCode}}</div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="b"
            @click="submitForm('ruleForm')"
            @keyup.enter="submitForm('ruleForm')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="link">
      <el-row>
        <el-col :span="3">
          <a title="测试11">关于我们</a>
        </el-col>
        <el-col :span="3">
          <a title="测试22">联系我们</a>
        </el-col>
        <el-col :span="3">
          <a title="测试33">经销商店铺</a>
        </el-col>
        <el-col :span="3">
          <a title="测试22">经销商掌柜</a>
        </el-col>
        <el-col :span="3">
          <a title="测试22">供应商店铺</a>
        </el-col>
        <el-col :span="3">
          <a title="测试22">平台咨询</a>
        </el-col>
        <el-col :span="3">
          <a title="测试22">APP下载</a>
        </el-col>
      </el-row>
      <div class="rights">Copyright © 2012-2020 All Rights Reserved 备案号：吉ICP备19004431号</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  name: "login",
  data() {
    return {
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //username和password默认为空
        id: "",
        auditStatus: "",
        name: "",
        password: "",
        code: "",
        randomStr: "",
        codeimg: "",
      },
      verificationCode: "",
      checkCode: "",
      yCode: "",
      checked: true,
      labelPosition: "right",
      //rules前端验证
      rules: {
        name: [{ required: true, message: " ", trigger: "blur" }],
        password: [{ required: true, message: " ", trigger: "blur" }],
      },
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    //按钮回车键点击事件绑定
    this.keyupEnter();
    this.createCode();
  },
  mounted() {
    this.getCookie();
  },
  // 里面的函数只有调用才会执行
  methods: {
    keyupEnter() {
      document.onkeydown = (e) => {
        let body = document.getElementsByTagName("body")[0];
        if (
          e.keyCode === 13 &&
          e.target.baseURI.match("/") &&
          e.target === body
        ) {
          this.submitForm("ruleForm");
        }
      };
    },
    //登录
    submitForm(formName) {
      const self = this;
      if (self.checked == true) {
        //传入账号名，密码，和保存天数
        self.setCookie(self.ruleForm.name, self.ruleForm.password, 7);
      } else {
        //清空Cookie
        self.clearCookie();
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            id: this.ruleForm.id,
            auditStatus: this.ruleForm.auditStatus,
            name: this.ruleForm.name,
            password: this.ruleForm.password,
          };

          api
            .testAxiosGet(ApiPath.url.login, params)
            .then((res) => {
              let code = res.status;
              if (code == "0") {
                if (this.ruleForm.code == this.checkCode) {
                  this.$message.success(res.message);
                  // 测试通道，不为空直接登录
                  setTimeout(() => {
                    this.$store.commit("login", this.ruleForm.name);
                    this.$router.push({ path: "/charts/statistics" });
                  }, 1000);
                } else {
                  this.$alert("验证码输入错误请重新输入！", "提示", {
                    confirmButtonText: "确定",
                  });
                }
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(function (err) {
              this.$message.error("登录失败");
            });
        } else {
          this.$message.error("请输入用户名,密码,验证码！");
          return false;
        }
      });
    },
    //  验证码
    createCode() {
      //先清空验证码的输入
      this.yCode = "";
      this.checkCode = "";
      this.verificationCode = "";
      //验证码的长度
      var codeLength = 6;
      //随机数
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J"
      );
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 62);
        //根据索引取得随机数加到code上
        this.yCode += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.yCode;
    },
    // 忘记密码 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
  },
};
</script>

<style scoped >
#login {
  /* width: 100%;  height: 100%; */
  width: 1366px;
  height: 700px;

  text-align: center;
}
/* .login-wrap { */
/* box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 89px;
  margin-top: 89px;
  background-image: url(../../static/background.png);
  background-color: #112346;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
  lang="less" */
/* } */

.title {
   /*// position: relative;
  // left: 0;
  // top: 0;
  // position: absolute;
 
  // margin-top: 14px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(../../static/title.png);
  margin-left: 360px;
  background-position: left top; */
   /* margin-left: -40%; */
   margin-left: -1032px;
   margin-top: 4px;

}
.content {
  position: absolute;
  box-sizing: border-box;
  margin-top: 15px;

  /* // background-image: url(../../static/background.png);
  // background-repeat: no-repeat;
  // background-position: left top;
  // background-size: 100%; */
}
 .img {
    /* // margin-top: 14px;
    // min-width: 1528px;
    // height: 480px; */

    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
.login-form {
  position: absolute;
  /* // width: 350px;
  // height: 325px; */

  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  background: #ffffff;
  /* // z-index: 999; */
  margin-left: 1191px;
  /* background-position: left top;  */
  margin-top: 165px;
}
.i {
  width: 42px;
  height: 42px;
}
.l {
  width: 145px;
  height: 42px;
  background: #ffffff;
  /* border: 1px solid #f1eeee; */
}
.bottom {
  width: 137px;
  /* height: 42px; */
  border: 0px solid #f1eeee;
  text-align: center;
  background-color: #d8d0d0;
}
.f {
  margin-top: 31px;
  /* // margin-left: 20px; */
  height: 13px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.b {
  width: 300px;
  height: 42px;
  background: #c21828;
  font-size: 16px;
  /* // margin-left: 20px; */
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
}

.form1 {
  width: 350px;
  height:260px;
  
}
.el-form-item__content > .el-form-item__error {
    font-size: 10px !important;
    margin-top: -14px !important;
    margin-left: 60px !important;
  }
.link {
  /* // position: absolute; */
  margin-left: 441px;
  margin-top: 713px;
  /* // margin:0 auto; */
  width: 1054px;
  height: 120px;
  /* // border:1px solid #000;
  // background-color: #ddd; */

  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  /* position: fixed; */
  /* bottom: 0; */
}
.rights {
  margin-left: 180px;
  margin-top: 12px;
  width: 555px;
  height: 18px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  margin-bottom: -100px;
}
</style>