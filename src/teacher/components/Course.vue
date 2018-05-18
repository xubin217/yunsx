<template>
  <div class="" style="min-height:100%;background:#F8F8F8;">
    <div v-if="course.secondrouter">
      <div class="componentBox">
        <p class="path"><router-link :to="{ name: 'Shixun'}">实训中心</router-link> &gt; {{bookAttr.name}}</p>
        <div class="whiteBox booktop">
          <img :src="bookAttr.src" height="180" width="120" class="bookimg">
          <router-link :to="{ name: 'allTrueCase', query: { bookid: bookAttr.id, bookname: bookAttr.name }}" class="anli">全真案例</router-link>
          <div class="book">
            <h3>{{bookAttr.name}}</h3>
            <p>{{bookAttr.text}}</p>
            <p class="ico">
              <span class="one" @click="setDailog=true">
                任教班级: 
                <span v-for="(item,index) in teac.classone" :key="index">{{item}} </span>
              </span>
              <span class="two" @click="setDailog=true">任教期间: {{teac.classtwo}}</span>
              <span class="three">{{bookAttr.topic}}题</span>
            </p>
          </div>
        </div>
      </div>
      <div class="feight">
        <div class="componentBox">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="kechengTab">
            <el-tab-pane label="我的题组" name="first">
              <span slot="label" class="icon1">我的题组</span>
              <div class="tabCard" :class="{ topicLass: this.topicList.length==0 }">
                <div class="cardTitle">
                  <span class="careName">我的题组 <span> (共{{topicList.length}}个)</span></span>
                  <!-- <span class="addName" @click="newDailog=true">新建题组</span><span class="addBtn el-icon-circle-plus"></span> -->
                  <router-link rel="span" class="addName" :to="{ name: 'addProblem', query: { bookid: bookAttr.id, bookname: bookAttr.name }}">新建题组</router-link rel="span"><span class="addBtn el-icon-circle-plus"></span>
                </div>
                <div v-if="this.topicList.length>0">
                  <div v-for="(item,index) in topicList" :key="index" class="tizuBox">
                    <div class="ctrlBox">
                      <p>
                        <router-link :to="{ name: 'teacTiZu', query: { questionid: item.questionId }}" target="_blank">逐题预览</router-link>
                      </p>
                      <p>
                        <router-link  :to="{ name: 'editProblem', query: { bookid: bookAttr.id, bookname: bookAttr.name, questionid: item.questionId }}">编辑题组</router-link>
                      </p>
                      <p><router-link to="">发布任务</router-link></p>
                      <div><span @click="deletList(item.questionId)">删除</span><span>下载</span></div>
                    </div>
                    <div class="borR">
                      <h3>{{item.title}}<span>{{item.time}}</span></h3>
                      <p>基本信息： 已选择<span>{{item.point}}</span>个知识点，共<span>{{item.case}}</span>个案例，总分值<span>{{item.count}}</span>分</p>
                      <span v-if="item.classification.length>3" class="line"></span>
                      <span v-if="item.classification.length>6" class="line line2"></span>
                      <div class="list">
                        <div class="abso abso1" v-if="item.classification.length>0"><span>题型</span><span>数量</span><span>计分</span></div>
                        <div class="abso abso2" v-if="item.classification.length>1"><span>题型</span><span>数量</span><span>计分</span></div>
                        <div class="abso abso3" v-if="item.classification.length>2"><span>题型</span><span>数量</span><span>计分</span></div>
                        <div class="border" v-for="(i,index) in item.classification" :key="index">
                          <span>{{i.clas}}</span>
                          <span class="light">{{i.quantity}}</span>
                          <span>{{i.score}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实训计划" name="second">
              <span slot="label" class="icon2">实训计划</span>
              <div class="tabCard" :class="{ topicLass: this.planList.length==0 }">
                <div class="cardTitle">
                  <span class="careName">实训计划</span>
                  <span class="addName">新建计划</span><span class="addBtn el-icon-circle-plus"></span>
                </div>
                <div v-if="this.planList.length>0">
                  <div v-for="(item,index) in planList" :key="index" class="tizuBox planBox">
                    <div class="planTop">
                      <img :src="item.img" width="80" height="80">
                      <h3>{{item.name}}</h3>
                      <p>{{item.text}}</p>
                    </div>
                    <div class="planBot">
                      <i class="el-icon-time"></i>
                      <span>{{item.time}}</span>
                      <i class="el-icon-tickets"></i>
                      <span>{{item.clas}}</span>
                      <div class="planCtrl">
                        <i class="el-icon-delete"></i>
                        <span @click="deletPlan(item)">删除</span>
                        <span class="shu">|</span>
                        <i class="el-icon-download"></i>
                        <span>下载({{item.downloadCount}})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
    <!--         <el-tab-pane label="实训总结" name="third">
              <span slot="label" class="icon3">实训总结</span>
              <div class="tabCard">
                <div class="cardTitle">实训总结</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程资料" name="fourth">
              <span slot="label" class="icon4">课程资料</span>
              <div class="tabCard">
                <div class="cardTitle">课程资料</div>
              </div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 教师设置弹窗 -->
    <el-dialog :visible.sync="setDailog" width="600px">
      <span class="setTitle">设置任教班级及期间</span>
      <div class="setBox"><span>任教时间：</span>{{setTime}}</div>
      <div class="setBox">
        <span>任教班级：</span>
        <el-select v-model="setValue1" placeholder="选择院系">
          <el-option
            v-for="item in setOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="setValue2" placeholder="选择年级">
          <el-option
            v-for="item in setOptionsA"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="setBox">
        <span>选择班级：</span>
        <div id="checkClas" class="checkClas">
          <span v-for="(item,index) in hasClass" :key="index">
            <input :id="index" type="checkbox" name="cls" :disabled="item.chec" :value="item.id" :label="item.class" v-model="classNum">
            <label v-if="!item.chec" :for="index">{{item.class}}</label>
            <el-tooltip v-else effect="dark" :content="item.teac+str" placement="top-start">
              <label :for="index">{{item.class}}</label>
            </el-tooltip>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDailog=false">取 消</el-button>
        <el-button type="primary" @click="setDailogT">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新建题组弹窗 -->
    <el-dialog :visible.sync="newDailog" width="700px">
      <span class="setTitle">新建题组</span>
      <div class="newBox">
        <div class="newOne">
          <router-link :to='{ name: 'addProblemSet', query: { bookid: bookAttr.name }}'>
            <el-button type="primary" @click="newDailog=false">快速选择案例</el-button>
          </router-link>
          <p>通过对知识点的选择，随机生成一定数量的案例保存为题组，给学生发布练习任务</p>
        </div>
        <span class="line"></span>
        <div class="newTwo">
          <router-link :to='{ name: 'addProblem', query: { bookid: bookAttr.name }}'>
            <el-button type="primary" @click="newDailog=false">快速选择案例</el-button>
          </router-link>
          <p>手动挑选每一个具体的案例，交将其保存为题组，给学生发布练习任务</p>
        </div>
      </div>
    </el-dialog>

    <router-view />
  </div>
</template>

<script>
import Bus from '../../Bus/Bus'
export default {
  name: 'Course',
  data () {
    return {
      str: "老师已经选择",
      setTime: "",
      classNum: [],
      setClass: [],
      setOptions: [],
      setOptionsA: [],
      setValue1: '',
      setValue2: '',
      setDailog: false,
      newDailog: false,
      id: 0,
      bookAttr: {},
      teac: {
        classone: ["暂无"],
        classtwo: '暂无'
      },
      activeName: 'first',
      topicList: [],
      planList: [
        {
          name: '第一课笔记',
          text: '第一课笔记的内容，包括:什么是会计？会计的岗位职责。',
          img: '#',
          downloadCount: 10,
          time: '2018-03-22',
          clas: '1701班 1703班'
        }
      ],
      questionList: []
    }
  },
  mounted() {
    Bus.$on('render', () => {
      this.getQuestionList();
    });
    this.$store.commit("firstrouterCtrl",false);
    if(this.$route.query.hasOwnProperty("bookid")){
      this.id = parseInt(this.$route.query.bookid);
    }else {
      window.location.href = '#/Teacher/Shixun';
    }
    this.getBook()
    this.getQuestionList();
    this.getClassData();
    this.getMyClass();
  },
  watch: {
    questionList() {
      this.topicList = [];
      for(let i in this.questionList) {
        let obj = {
              count: 0,
              case: 0
            }, 
            objArr = [];
        for(let j in this.questionList[i].questionStyleWeights) {
          obj.count += this.questionList[i].questionStyleWeights[j].count * this.questionList[i].questionStyleWeights[j].weight;
          obj.case += this.questionList[i].questionStyleWeights[j].count;
          objArr.push({
            clas: this.questionList[i].questionStyleWeights[j].styleName,
            quantity: this.questionList[i].questionStyleWeights[j].count,
            score: this.questionList[i].questionStyleWeights[j].weight           
          })
        }
        this.topicList.push({
          questionId: this.questionList[i].id,
          case: obj.case,
          classification: objArr,
          count: obj.count,
          point: this.questionList[i].knowledgeCount,
          time: this.questionList[i].creationTime.split("T")[0],
          title: this.questionList[i].title,
        })
      }
    },
  },
  methods: {
    getBook() {
      this.$http.post(`${this.$store.state.location}/services/app/Course/Get`,
        {
          "includeKnowledgeTree": false,
          "id": this.id
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          let obj = response.body.result;
          this.bookAttr = {};
          this.bookAttr = {
            name: obj.title,
            id: obj.id,
            src: require('../../share/img/image_class_cover.png'),
            text: obj.introduction,
            topic: 3281
          }
        },response=>{
          console.log('error')
        });
    },
    getMyClass() {
      // 得到老师课程关联班级
      this.$http.post(`${this.$store.state.location}/services/app/Course/GetCourseClasses`,
        {
          "id": this.id
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          // console.log(response.body.result)
          let arr = [];
          for(let i in response.body.result.classes){
            arr.push(response.body.result.classes[i].serialNumber)
          }
          if(arr.length==0){
            arr.push("暂无")
          }
          this.teac.classone = arr;
          if(response.body.result.termName==''){
            this.teac.classtwo = "暂无"
          }else{
            this.teac.classtwo = response.body.result.termName;
          }
        },response=>{
          console.log('得到设置的班级信息error')
        })
    },
    getClassData() {
      // 获得任教时间
      this.$http.post(`${this.$store.state.location}/services/app/Term/GetCurrentTerm`,
        {},{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          // console.log(response.body.result)
          this.setTime = response.body.result.termName
        },response=>{
          console.log('获取任教时间error')
        });
      // 获得院系
      this.$http.post(`${this.$store.state.location}/services/app/Teacher/GetDepartments`,
        {},{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.setOptions = [];
          for(let i in response.body.result){
            this.setOptions.push({
              value: response.body.result[i].id,
              label: response.body.result[i].name
            })
          }
        },response=>{
          console.log('获得院系error')
        });
      // 获得年级
      this.$http.post(`${this.$store.state.location}/services/app/Teacher/GetGrades`,
        {},{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          // console.log(response.body.result);
          this.setOptionsA = [];
          for(let i in response.body.result){
            this.setOptionsA.push({
              value: response.body.result[i],
              label: response.body.result[i] + '级'
            })
          }
        },response=>{
          console.log('获得年级error')
        });
      // 获得班级
      this.$http.post(`${this.$store.state.location}/services/app/Teacher/GetClasseses`,
        {
          "departmentId": 0,
          "entryYear": ""
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          // console.log(response.body);
          this.setClass = [];
          for(let i in response.body.result){
            this.setClass.push({
              class: response.body.result[i].serialNumber,
              xibie: response.body.result[i].departmentId,
              nianji: '2017',
              chec: false,
              teac: '',
              id: response.body.result[i].id
            })
          }
        },response=>{
          console.log('获得班级error')
        });
    },
    handleClick(tab, event) {
      
    },
    setDailogT() {
      this.setDailog = false;
      // 设置老师课程关联班级
      this.$http.post(`${this.$store.state.location}/services/app/Course/SetCourseClassesAndTerm`,
        {
          "courseId": this.id,
          "classesIds": this.classNum,
          "termId": 1
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.getMyClass()
        },response=>{
          console.log('删除题组error')
        })
    },
    deletList(item) {
      this.$confirm('确认删除？')
        .then(_ => {
          this.$http.post(`${this.$store.state.location}/services/app/QuestionGroup/Delete`,
            {
              "id": item
            },{
              headers: {
                "Content-Type": "application/json",
              }
            }).then(response=>{
              this.getQuestionList()
            },response=>{
              console.log('删除题组error')
            })
        })
        .catch(_ => {});
    },
    deletPlan(item) {
      this.$confirm('确认删除？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      console.log(item)
    },
    getQuestionList() {
      // 获取题组列表
      this.$http.post(`${this.$store.state.location}/services/app/QuestionGroup/GetQuestionGroupList`,
        {
          "courseId": this.id ,
          "maxResultCount": 10,
          "skipCount": 0
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.questionList = response.body.result.items;
        },response=>{
          console.log('error')
        }) 
    },
  },
  computed: {
    course() {
      return this.$store.state
    },
    hasClass() {
      let arr = [];
      for(let i in this.setClass){
        if(this.setClass[i].xibie==this.setValue1&&this.setClass[i].nianji==this.setValue2){
          arr.push(this.setClass[i])
        }
      }
      return arr;
    }
  },
  destroyed() {
    this.$store.commit("firstrouterCtrl",true);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.path {
  color: #687178;
  font-size: 16px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.whiteBox {
  background: white;
  border-radius: 6px;
  padding: 20px;
  position: relative;
}
.booktop {
  background-image: url('../../share/img/img_class_goto.png');
  background-repeat: no-repeat;
  background-position: 780px 20px;
}
.bookimg {
  position: absolute;
  top: 20px;
  left: 20px;
}
.anli {
  position: absolute;
  right: 40px;
  bottom: 25px;
  width: 120px;
  height: 40px; 
  background-color: rgba(0,176,255,1);
  background-repeat: no-repeat;
  background-position: 14px 9px;
  background-image: url('../../share/img/icon_class_mouse.png');
  border-radius: 7px;
  color: rgba(255,255,255,1);
  line-height: 40px;
  text-indent: 50px;
  font-size: 14px;
}
.anli:hover {
  background-color: #F99090;
}
.book {
  height: 180px;
  margin-left: 140px;
  margin-right: 200px;
  position: relative;
  padding-right: 20px;
  padding: 20px 20px 0 0;
  border-right: 1px solid #EEEEEE;
}
.book h3 {
  font-size: 16px;
  color: rgba(66,66,78,1);
  line-height: 20px;
  margin-bottom: 15px;
}
.book p {
  font-size: 12px;
  color: rgba(104,113,120,1);
  line-height: 20px;
}
.book .ico {
  position: absolute;
  bottom: 0px;
  font-size: 14px;
  color: rgba(36,56,71,1);
  line-height: 20px;
  display: block;
  width: 100%;
  padding-right: 120px;
}
.book .ico>span {
  padding-left: 35px;
  line-height: 25px;
  margin-right: 5px;
  height: 25px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 7px 3px;
}
.book .ico .one {
  cursor: pointer;
  background-image: url('../../share/img/icon_setclass_normal.png');
}
.book .ico .one:hover {
  background-image: url('../../share/img/icon_setclass_normalcopy.png');
  color: #F99090;
}
.book .ico .two {
  cursor: pointer;
  background-image: url('../../share/img/icon_class_classdata_normalcopy.png');
}
.book .ico .two:hover {
  background-image: url('../../share/img/icon_class_classdata_normalcopy2.png');
  color: #F99090;
}
.book .ico .three {
  position: absolute;
  right: 25px;
  top: 0;
  background-image: url('../../share/img/icon_class_count_normal.png');
}
.el-tabs__item span {
  font-size: 12px;
  color: #A5B7C5;
  width: 90px;
  height: 35px;
  line-height: 35px;
  text-align: right;
  padding-right: 10px;
  display: block;
  background-position: 5px 8px;
  background-repeat: no-repeat;
}
.el-tabs__item.is-active span {
  color: #323C47;
  background-color: white;
}
.el-tabs__item .icon1 {
  background-image: url('../../share/img/icon_class_tab_1_normal.png');
}
.el-tabs__item .icon1:hover, .el-tabs__item.is-active .icon1 {
  background-image: url('../../share/img/icon_class_hover.png');
}
.el-tabs__item .icon2 {
  background-image: url('../../share/img/icon_class_tab_2_normal.png');
}
.el-tabs__item .icon2:hover, .el-tabs__item.is-active .icon2 {
  background-image: url('../../share/img/icon_class_tab_2_hover.png');
}
.el-tabs__item .icon3 {
  background-image: url('../../share/img/icon_class_tab_3_normal.png');
}
.el-tabs__item .icon3:hover, .el-tabs__item.is-active .icon3 {
  background-image: url('../../share/img/icon_class_tab_3_hover.png');
}
.el-tabs__item .icon4 {
  background-image: url('../../share/img/icon_class_tab_4_normal.png');
}
.el-tabs__item .icon4:hover, .el-tabs__item.is-active .icon4 {
  background-image: url('../../share/img/icon_class_tab_4_hover.png');
}
.tabCard {
  background-color: white;
  padding: 25px 40px 25px 20px;
  min-height: 420px;
  background-repeat: no-repeat;
  background-position: center;
}
.topicLass {
  background-image: url('../../share/img/img_unress.png');
}
.cardTitle {
  position: relative;
  margin-bottom: 25px;
}
.careName {
  font-size: 14px;
  color: #243847;
  line-height: 20px;
  padding-bottom: 5px;
  margin-left: 20px;
  border-bottom: 5px solid #00B0FF;
}
.careName span {
  font-size: 12px;
  color: rgba(165,183,197,1);
  line-height: 12px;
}
.addBtn {
  position: absolute;
  right: 60px;
  font-size: 28px;
  color: #00B0FF;
  cursor: pointer;
}
.addName {
  position: absolute;
  right: 0;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  font-size: 11px;
  color: rgba(36,56,71,1);
  cursor: pointer;
  padding-left: 40px;
  z-index: 2;
}
.addName:hover {
  color: #F77676;
}
.addName:hover+span {
  color: #F77676;
}
.tizuBox {
  padding: 20px;
  border: 1px solid #E9EFF4;
  border-radius: 6px;
  position: relative;
  margin-bottom: 25px;
}
.tizuBox .borR {
  margin-right: 160px;
  padding-right: 20px;
  min-height: 185px;
  max-height: 215px;
  position: relative;
  border-right: 1px solid #EEEEEE;
}
.tizuBox .ctrlBox {
  position: absolute;
  right: 10px;
  font-size: 12px;
}
.ctrlBox a,.ctrlBox span {
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: 12px 5px;
}
.ctrlBox a:hover,.ctrlBox span:hover {
  color: #F77676;
}
.ctrlBox p {
  text-align: center;
  margin: 8px 0 16px 0;
}
.ctrlBox p a {
  margin: 0 auto;
  width: 110px;
  line-height: 30px;
  display: block;
  text-indent: 18px;
  border-radius: 2px;
  border: 1px solid #00B0FF;
  color: rgba(0,176,255,1);
  background-image: url('../../share/img/icon_recyclecopy4.png');
}
.ctrlBox p a:hover {
  background-image: url('../../share/img/icon_recyclecopy10.png');
}
.ctrlBox p:first-child a {
  background-image: url('../../share/img/icon_recyclecopy3.png');
}
.ctrlBox p:last-child a {
  background-image: url('../../share/img/icon_recyclecopy5.png');
}
.ctrlBox p:first-child a:hover {
  background-image: url('../../share/img/icon_recyclecopy9.png');
}
.ctrlBox p:last-child a:hover {
  background-image: url('../../share/img/icon_recyclecopy11.png');
}
.ctrlBox p a:hover {
  color: #F77676;
  border-color: #F77676;
}
.ctrlBox div span {
  color: #A5B7C5;
  padding-left: 35px;
  line-height: 40px;
  width: 80px;
  display: inline-block;
  background-position: 7px 10px;
  background-image: url('../../share/img/icon_recyclecopy2.png');
}
.ctrlBox div span:hover {
  background-image: url('../../share/img/icon_recyclecopy8.png');
}
.ctrlBox div span:first-child {
  background-image: url('../../share/img/icon_recyclecopy.png');
}
.ctrlBox div span:first-child:hover {
  background-image: url('../../share/img/icon_recyclecopy7.png');
}
.borR h3 {
  color: #00B0FF;
  font-size: 14px;
  position: relative;
  font-weight: normal;
}
.borR p {
  line-height: 24px;
  background-color: rgba(247, 118, 118, 0.1);
  margin-top: 10px;
  text-indent: 20px;
  font-size: 12px;
  color: #687178;
}
.borR p span {
  color: #00B0FF;
}
.borR h3 span {
  position: absolute;
  color: #989898;
  font-size: 12px;
  right: 0;
}
.borR .line {
  position: absolute;
  width: 1px;
  background: #EEEEEE;
  top: 70px;
  bottom: 20px;
  left: 212px;
}
.borR .line2 {
  left: 441px;
}
.list {
  columns: 100px 3;
  -moz-columns: 100px 3;
  -webkit-columns: 100px 3;
  position: relative;
  padding-top: 45px;
  font-size: 12px;
}
.abso {
  position: absolute;
  line-height: 25px;
  top: 16px;
}
.abso1 {
  left: 0
}
.abso3 {
  right: 25px
}
.abso span {
  color: rgba(165,183,197,1);
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 2px;
  display: inline-block;
  width: 65px;
  text-align: center;
}
.border {
  clear: both;
}
.border span {
  width: 65px;
  text-align: center;
  color: #687178;
  line-height: 30px;
  height: 29px;
  border-bottom: 1px solid #EEEEEE;
  float: left;
}
.border .light {
  color: #00B0FF;
}
/* 设置教师任教 */
.setTitle {
  position: absolute;
  top: 15px;
  left: 25px;
  font-size: 14px;
  color: #687178;
  line-height: 25px;
  border-bottom: 4px solid #00B0FF;
  font-size: 12px;
}
.setBox {
  margin: 0 30px 0 25px;
  padding: 10px 0 15px 0;
  border-bottom: 1px solid #EEEEEE;
  position: relative;
}
.setBox>span {
  color: #A5B7C5;
  margin-right: 11px;
}
.el-select {
  width: 140px;
}
.el-select:last-child {
  margin-left: 20px;
}
.checkClas {
  margin-left: 85px;
  margin-top: -25px;
  min-height: 40px;
}
.checkClas>span {
  display: inline-block;
  position: relative;
}
.checkClas>span input {
  position: absolute;
  top: 5px;
  left: 15px;
  display: block;
  cursor: pointer;
  z-index: -1;
  opacity: 0;
}
.checkClas>span label {
  width: 95px;
  padding: 0 15px;
  line-height: 28px;
  border-radius: 3px;
  display: block;
  font-size: 12px;
  color: #A5B7C5;
  text-align: right;
  border: 1px solid #A5B7C5;
  margin-bottom: 10px;
  margin-right: 10px;
  background-color: white;
  cursor: pointer;
  background-image: url('../../share/img/CombinedShapeB.png');
  background-repeat: no-repeat;
  background-position: 15px 5px;
}
.checkClas>span input:checked+label {
  background-color: #7ED321;
  color: white;
  border: 1px solid #7ED321;
  background-image: url('../../share/img/CombinedShapeW.png');
}
.checkClas>span input:disabled+label {
  background-color: #D8D8D8;
  color: white;
  border: 1px solid #D8D8D8;
  cursor: default;
  background-image: url('../../share/img/CombinedShapeE.png');
}
.dialog-footer {
  width: 100%;
  display: block;
  text-align: center;
}
.dialog-footer .el-button {
  font-size: 12px;
  padding: 10px 30px;
}
.dialog-footer .el-button--default {
  border: 1px solid #A5B7C5;
  color: #A5B7C5;
  background-color: white;
  margin-right: 35px;
}
.dialog-footer .el-button--default:hover {
  color: white;
  background-color: #A5B7C5;
}
.dialog-footer .el-button--primary {
  border: 1px solid #00B0FF;
  color: white;
  background-color: #00B0FF;
}
/*新建题组弹窗*/
.newBox {
  padding: 50px 30px;
  position: relative;
}
.newBox>div {
  width: 240px;
  vertical-align: top;
  display: inline-block;
  padding-top: 160px;
  text-align: left;
  opacity: 0.7;
  background-repeat: no-repeat;
  background-image: url('../../share/img/img_class_goto_left.png');
}
.newBox>div:hover {
  opacity: 1;
}
.newBox .line {
  position: absolute;
  top: 0;
  left: 0;
}
.newBox .newOne {
  margin-left: 25px;
}
.newBox .newTwo {
  margin-left: 66px;
}
.newBox>div .el-button {
  display: block;
  width: 145px;
  text-indent: 25px;
  background-color: #00B0FF;
  background-repeat: no-repeat;
  background-position: 10px 8px;
  background-image: url('../../share/img/icon_class_mouse.png');
  margin: 20px auto;
}
.newBox>div p {
  font-size: 12px;
  color: #A5B7C5;
  text-indent: 20px;
}
/*计划*/
.planBox {
  padding-bottom: 0px;
}
.planTop {
  position: relative;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #E9E9E9;
}
.planTop img {
  position: absolute;
  left: 0;
  top: 0;
}
.planTop h3 {
  color: rgba(0, 0, 0, .65);
  font-size: 16px;
  line-height: 48px;
  margin-left: 100px;
}
.planTop p {
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  line-height: 22px;
  margin: 0px 0 10px 100px;
}
.planBot {
  position: relative;
  line-height: 35px;
  color: rgba(0, 0, 0, .45);
  font-size: 14px;
}
.planBot i {
  margin-right: 1px;
}
.planBot span {
  margin-right: 20px;
}
.planBot .planCtrl {
  position: absolute;
  right: 0;
  color: #00B0FF;
  top: 0;
}
.planBot .planCtrl span {
  margin: 0;
  cursor: pointer;
}
.planBot .planCtrl i {
  cursor: pointer;
}
.planBot .planCtrl .shu {
  margin: 0 10px;
  color: rgba(0, 0, 0, .45);
}
</style>