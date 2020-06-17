<template>
  <div class="Home">
    <img
      class="top_img"
      src="../assets/introduce_banner_jrwm.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <Fast title="申请加入吉易慧农合作伙伴" background="#F0EEED">
      <div class="questionnaire">
        <div class="topic" v-for="(item, index) in topicList" :key="index">
          <div class="title">
            <span class="number">{{ item.num }}</span>
            {{ item.title }}
            <span class="important" v-show="item.mandatory">*</span>
          </div>
          <div class="answer" v-if="item.num != '09' && item.num != '10'">
            <el-checkbox-group
              v-model="item.checkedCities"
              :min="item.min"
              :max="item.max"
              v-if="item.max !== 1"
            >
              <div v-for="(option, index1) in item.answer" :key="index1">
                <el-checkbox :label="option.id" :key="index1">{{option.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
            <el-radio-group v-model="item.checkedCities" :min="item.min" :max="item.max" v-else>
              <el-radio
                v-for="(option, index4) in item.answer"
                :label="option.id"
                :key="index4"
              >{{option.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="answers" v-else>
            <div class="box" v-for="(items, index2) in item.answers" :key="index2">
              <div class="type">{{ items.title }}</div>
              <el-radio-group v-model="items.checkedCities">
                <el-radio
                  v-for="(option, index3) in items.list"
                  :key="index3"
                  :label="option.id"
                >{{ option.name }}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="info">
          <!-- <el-row class="box" v-for="(item, index) in Input" :key="index">
            <el-col class="title" :span="8" :offset="1">
              {{ item.title }}
              <div>
                <span v-show="item.mandatory">*</span>
              </div>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-input
                :type=" index == 5 ? 'textarea' : ''"
                :rows=" index == 5 && 5"
                v-model="item.content"
                :placeholder="index == 5 ? '500字以内' : item.title"
              ></el-input>
            </el-col>
          </el-row> -->
          <el-form>
            <el-form-item></el-form-item>
          </el-form>
          <el-row>
            <el-col :span="8" :offset="10">
              <el-button type="primary" @click="save">提交申请</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Callcontact from "../components/Callcontact/Callcontact";
import aes from "@/util/aes";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  components: {
    Fast,
    Callcontact
  },
  data() {
    return {
      editForm: {
        questionAnswer: ""
      },
      bannerHeight: 0,
      Input: [
        {
          title: "联系人姓名",
          content: "",
          mandatory: true
        },
        {
          title: "联系人职务详情",
          content: "",
          mandatory: true
        },
        {
          title: "联系人手机",
          content: "",
          mandatory: true
        },
        {
          title: "联系人邮箱",
          content: "",
          mandatory: true
        },
        {
          title: "公司名称",
          content: "",
          mandatory: false
        },
        {
          title: "合作期望",
          content: "",
          mandatory: false
        },
        {
          title: "推荐人姓名",
          content: "",
          mandatory: false
        }
      ],
      topicList: [
        {
          num: "01",
          title: "您是否有店铺经营经验（限选2）",
          min: 0,
          max: 2,
          mandatory: true,
          answer: [
            { id: "A", name: "有其他网店经营经验" },
            { id: "B", name: "有实体门店经营经验" },
            { id: "C", name: "没有任何开店经验" }
          ],
          checkedCities: []
        },
        {
          num: "02",
          title: "您属于以下哪一类（限选2）",
          min: 0,
          max: 2,
          mandatory: true,
          answer: [
            { id: "A", name: "农资类商品生产者/代理者/经营者" },
            { id: "B", name: "种植大户/农机大户/养殖大户" },
            { id: "C", name: "家庭农场主/农业合作社管理者" },
            { id: "D", name: "农技推广人员/农技服务人员" },
            { id: "E", name: "村屯里有职称的人（村书记、大队书记等）" },
            { id: "F", name: "具有一定组织/领头能力的农民" },
            { id: "G", name: "其他" }
          ],
          checkedCities: []
        },
        {
          num: "03",
          title: "您的经营模式",
          min: 0,
          max: 1,
          mandatory: true,
          answer: [
            { id: "A", name: "主营批发，少量零售" },
            { id: "B", name: "主营零售" },
            { id: "C", name: "其他" }
          ],
          checkedCities: []
        },
        {
          num: "04",
          title: "您是否已经准备好商品或有货源渠道",
          min: 0,
          max: 1,
          mandatory: false,
          answer: [
            { id: "A", name: "农资类商品生产者/代理者/经营者" },
            { id: "B", name: "种植大户/农机大户/养殖大户" }
          ],
          checkedCities: []
        },
        {
          num: "05",
          title: "您的企业/店铺类型是怎样的",
          min: 0,
          max: 1,
          mandatory: false,
          answer: [
            { id: "A", name: "合资" },
            { id: "B", name: "国有" },
            { id: "C", name: "集体所有制" },
            { id: "D", name: "股份制" },
            { id: "E", name: "有限责任" },
            { id: "F", name: "全民所有制" },
            { id: "G", name: "独资" },
            { id: "H", name: "私营" },
            { id: "I", name: "个体户" },
            { id: "J", name: "其他" }
          ],
          checkedCities: []
        },
        {
          num: "06",
          title: "您的销售覆盖区域",
          min: 0,
          max: 1,
          mandatory: false,
          answer: [
            { id: "A", name: "省级及以下" },
            { id: "B", name: "市级及以下" },
            { id: "C", name: "县级及以下" },
            { id: "D", name: "村屯级" }
          ],
          checkedCities: []
        },
        {
          num: "07",
          title: "您计划经营什么类别",
          min: 0,
          max: 1,
          mandatory: false,
          answer: [
            { id: "A", name: "种子/化肥/农药" },
            { id: "B", name: "农机/农具" },
            { id: "C", name: "种苗/花卉/菜籽" },
            { id: "D", name: "蔬菜/瓜果" },
            { id: "E", name: "牛/羊/猪/禽类" },
            { id: "F", name: "土地托管" },
            { id: "G", name: "粮食收/储/销售" },
            { id: "H", name: "私营" }
          ],
          checkedCities: []
        },
        {
          num: "08",
          title: "您希望平台给您什么帮助（限选3）",
          min: 0,
          max: 3,
          mandatory: false,
          answer: [
            { id: "A", name: "需要平台帮助找更好的货源" },
            { id: "B", name: "需要推广店铺" },
            { id: "C", name: "获得更多的商机" },
            { id: "D", name: "运营技巧的培训" },
            { id: "E", name: "了解平台入驻规则" },
            { id: "F", name: "线上、线下服务指导" },
            { id: "G", name: "提供农技服务支持" }
          ],
          checkedCities: []
        },
        {
          num: "09",
          title: "(选填)您的每年的销量",
          min: 0,
          max: 1,
          mandatory: false,
          answers: [
            {
              title: "种子",
              checkedCities: [],
              list: [
                { id: "A", name: "100万袋" },
                { id: "B", name: "10万袋以上" },
                { id: "C", name: "5—10万袋" },
                { id: "D", name: "1-5万袋" },
                { id: "E", name: "1万袋以下" }
              ]
            },
            {
              title: "农药",
              checkedCities: [],
              list: [
                { id: "A", name: "1万垧以上" },
                { id: "B", name: "5000—1万垧地" },
                { id: "C", name: "2000—3000垧地" },
                { id: "D", name: "1000—2000垧地" },
                { id: "E", name: "1000垧地以下" }
              ]
            },
            {
              title: "化肥",
              checkedCities: [],
              list: [
                { id: "A", name: "10万吨以上" },
                { id: "B", name: "5—10万吨" },
                { id: "C", name: "1-5万吨" },
                { id: "D", name: "5000—1万吨" },
                { id: "E", name: "5000吨以下" }
              ]
            }
          ],
          checkedCities: []
        },
        {
          num: "10",
          title: "(选填)您每年的采购量",
          min: 0,
          max: 1,
          mandatory: false,
          answers: [
            {
              title: "种子",
              checkedCities: [],
              list: [
                { id: "A", name: "100万袋" },
                { id: "B", name: "10万袋以上" },
                { id: "C", name: "5—10万袋" },
                { id: "D", name: "1-5万袋" },
                { id: "E", name: "1万袋以下" }
              ]
            },
            {
              title: "农药",
              checkedCities: [],
              list: [
                { id: "A", name: "1万垧以上" },
                { id: "B", name: "5000—1万垧地" },
                { id: "C", name: "2000—3000垧地" },
                { id: "D", name: "1000—2000垧地" },
                { id: "E", name: "1000垧地以下" }
              ]
            },
            {
              title: "化肥",
              checkedCities: [],
              list: [
                { id: "A", name: "10万吨以上" },
                { id: "B", name: "5—10万吨" },
                { id: "C", name: "1-5万吨" },
                { id: "D", name: "5000—1万吨" },
                { id: "E", name: "5000吨以下" }
              ]
            }
          ],
          checkedCities: []
        },
        {
          num: "11",
          title: "(选填)您的种植面积",
          min: 0,
          max: 1,
          mandatory: false,
          answer: [
            { id: "A", name: "501垧以上" },
            { id: "B", name: "101-500垧" },
            { id: "C", name: "11-100垧" },
            { id: "D", name: "1-10垧" },
            { id: "E", name: "1垧地以下" }
          ],
          checkedCities: []
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.screenChanges(), false);
  },
  created() {
    this.screenChanges();
  },
  methods: {
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    },
    save: function() {
      //1.验证
      if (
        this.topicList[0]["checkedCities"].length > 0 &&
        this.topicList[1]["checkedCities"].length > 0 &&
        this.topicList[2]["checkedCities"].length > 0
      ) {
        //2.整合数据
        //params  **Entity
        let paramList = [];
        for (let i = 0; i < this.topicList.length; i++) {
          if (typeof this.topicList[i]["answers"] != "undefined") {
            for (let j = 0; j < this.topicList[i]["answers"].length; j++) {
              if (i == 8) {
                if (j == 0) {
                  paramList.push({
                    num: i + 1,
                    value: "[{"+this.topicList[i]["answers"][j]["checkedCities"]+"}]"
                  });
                }
              }
              if (i == 9) {
                if (j == 1) {
                  paramList.push({
                    num: i + 1,
                    value: "[{"+this.topicList[i]["answers"][j]["checkedCities"]+"}]"
                  });
                }
              }
            }
          } else {
            if (i == 10) {
              paramList.push({
                num: i + 1,
                value: "[{"+this.topicList[i]["checkedCities"]+"}]"
              });
            } else {
              paramList.push({
                num: i + 1,
                value: "[{"+this.topicList[i]["checkedCities"]+"}]"
              });
            }
          }
        }
        this.editForm.questionAnswer = aes.encrypt(JSON.stringify(paramList));

        console.log(aes.decrypt(aes.encrypt(JSON.stringify(paramList))))
        //评分+表单数据
        let params = {
          questionEntity: this.editForm
        };
        api
          .testAxiosGet(ApiPath.url.saveQuestion, params)
          .then(res => {
            if (res.status == "0") {
              this.$message.success(res.tips);
            }
            if (res.status == "1") {
              this.$message.success(res.tips);
            }
            if (res.status == "2") {
              this.$message.success(res.tips);
            }
          })
          .catch(function(error) {

            console.log(error)
          });
        //editForm
      } else {
        alert("选项不能为空");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.top_img {
  width: 100%;
}

.questionnaire {
  padding: 50px 100px;
  width: 800px;
  background: #fff;
  margin: 50px auto;
  text-align: left;
  .topic {
    padding-bottom: 20px;
    &:nth-child(5) {
      .answer {
        .el-radio {
          width: 40% !important;
        }
      }
    }
    .title {
      font-size: 20px;
      .number {
        font-weight: bolder;
        font-size: 20px;
      }
      .important {
        color: #dd2232;
        font-weight: bolder;
      }
    }
    .answer {
      margin-top: 15px;

      .el-checkbox {
        width: 100%;
        padding: 15px 0 15px 30px;
        &:hover {
          background: rgba(40, 99, 243, 0.1);
          border-radius: 5px;
        }
        .el-checkbox__label {
          font-size: 16px;
        }
      }
    }
    .answers {
      display: flex;
      justify-content: center;
      .box {
        flex: 1;
        display: block;
        .type {
          text-align: left;
          font-size: 18px;
          font-weight: bolder;
          padding: 20px 55px;
        }
      }
    }
  }
  .el-radio {
    width: 90%;
    padding: 15px 0 15px 30px;
    &:hover {
      background: rgba(40, 99, 243, 0.1);
      border-radius: 5px;
    }
    .el-radio__label {
      font-size: 16px;
    }
  }
}
.info {
  .box {
    margin: 20px 0;
    .title {
      text-align: right;
      line-height: 40px;
      font-size: 16px;
      div {
        float: right;
        width: 20px;
        height: 40px;
        span {
          color: #dd2232;
          font-weight: bolder;
          margin: 0 5px;
        }
      }
    }
  }
  .el-button--primary {
    width: 100%;
  }
}
</style>
