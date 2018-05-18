<template>
  <div class="feight" style="min-height:100%;background:#F8F8F8;">
    <div class="componentBox">
      <p class="path">
        <router-link :to="{ name: 'Shixun'}">实训中心</router-link> &gt;
        <router-link :to="{ name: 'Course', query: { bookid: bookid, bookname: bookName }}">{{bookName}}</router-link> &gt;
        <router-link :to="{ name: 'allTrueCase', query: { bookid: bookid, bookname: bookName }}">全真案例</router-link> &gt;
        发布任务
      </p>
      <div class="headBox">
        <el-steps :active="active" finish-status="success" simple>
          <el-step title="选择知识点"></el-step>
          <el-step title="调整题型"></el-step>
          <el-step title="案例甄选"></el-step>
          <el-step title="任务信息"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <p v-if="showBox[0]"><span class="el-icon-info"></span>请在左边的树形列表中勾选题组所涉及的知识点。</p>
        <p v-if="showBox[1]"><span class="el-icon-info"></span>可在下表中调整题组所涉题型的数量及每个题型的单题分值。</p>
        <p v-if="showBox[2]"><span class="el-icon-info"></span>勾选您需要收纳在题组内的案例。</p>
        <p v-if="showBox[3]"><span class="el-icon-info"></span>可在下表中调整题组所涉题型的数量及每个题型的单题分值。</p>
        <p v-if="showBox[4]"><span class="el-icon-info"></span>收获创建成功的喜悦！</p>
      </div>
      <div v-if="showBox[0]" class="pointBox">
        <div class="leftContent">
          <p>
            <span class="hasLine">知识点</span>
            <el-input
              class="serch"
              placeholder="关键字搜索"
              v-model="filterText">
            </el-input>
          </p>
          <div class="treeBox">
            <el-tree
              class="tree"
              :props="defaultProps"
              :data="dataList"
              node-key="id"
              show-checkbox
              :default-checked-keys = "isChecArr"
              ref="tree"
              :filter-node-method="filterNode"
              :accordion = "isAccordion"
              @check-change="handleCheckChange">
            </el-tree>
          </div>
        </div>
        <div class="rightContent">
          <p><span class="hasLine">已选知识点</span></p>
          <div style="border-bottom: 1px solid #EEEEEE;min-height:400px;margin-top: 20px;">
            <div v-if="checkTree.length>0">
              <el-tag
                v-for="item in checkTree"
                :key="item.id"
                @close="handleClose(item.id)"
                closable>
                {{item.name}}
              </el-tag>
            </div>
          </div>
          <p class="all">
            <span class="el-icon-info"></span>
            已选择<span class="light">{{title.point}}</span>个知识点，
            您可以在下一个步骤调整具体的题型及数量
          </p>
          <div class="btnBox">
            <router-link :to="{ name: 'Course', query: { bookid: bookid, bookname: bookName }}">返回课程</router-link>
            <el-button @click="next" type="primary">下一步</el-button>
          </div>
        </div>
      </div>
      <div v-if="showBox[1]" class="contentBox">
        <p><span class="hasLine">已选题型及数量</span></p>
        <div style="border-bottom: 1px solid #EEEEEE;min-height:400px;margin-top: 20px;">
          <ul class="titleUl">
            <li class="titleHead">
              <span class="titleOne">题型</span>
              <span class="titleTwo">数量</span>
              <span class="titleThr">分值</span>
            </li>
            <li v-for="(item,index) in tixing" :key="index" class="titleList">
              <span class="titleOne">{{item.type}}</span>
              <span class="titleTwo">
                <el-input-number v-model="item.count" @change="handleChangeCount" :min="0" :max="item.max"></el-input-number>
                共{{item.max}}个
              </span>
              <span class="titleThr">
                <el-input-number v-model="item.weight" @change="handleChangePoint" :min="0"></el-input-number>
              </span>
            </li>
          </ul>
        </div>
        <p class="all">
          <span class="el-icon-info"></span>
          已选择<span class="light">{{title.point}}</span>个知识点，
          共计<span class="light">{{allCount}}</span>个案例，
          累计总分<span class="light">{{allPoint}}</span>分，创建完成后，您可以随时调整这些参数。
        </p>
        <div class="btnBox">
          <el-button @click="active--">上一步</el-button>
          <el-button @click="next" type="primary">下一步</el-button>
        </div>
      </div>
      <div v-if="showBox[2]" class="pointBox">
        <div class="leftContent">
          <p>
            <span class="hasLine">知识点</span>
            <el-input
              class="serch"
              placeholder="关键字搜索"
              clearable
              v-model="choooseText">
            </el-input>
          </p>
          <div class="chooseBox">
            <div v-for="(item,index) in choooseTree" :key="index" class="chooseList" @click="hasact(index,item.id)" :class="{'act': isact === index}">
              <span class="el-icon-tickets"></span>
              {{item.name}}
            </div>
          </div>
        </div>
        <div class="rightContent">
          <p><span class="hasLine">设置题组基本信息</span></p>
          <div class="choooseContent">
            <ul class="titleUlBox">
              <li>
                <span class="num">序号</span>
                <span class="name">案例名称</span>
                <span class="point">课程名称</span>
                <span class="type">题型</span>
                <span class="count">分值</span>
                <span class="oper">操作</span>
              </li>
              <li v-for="(item,index) in topicData" class="titltLi">
                <span class="num">{{(page-1)*10 +index+ 1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="point">{{item.point}}</span>
                <span class="type">{{item.type}}</span>
                <span class="count">{{item.count}}</span>
                <span class="oper"><el-checkbox v-model="item.chec"></el-checkbox></span>
              </li>
            </ul>
            <div style="text-align: right; margin-bottom:20px;position:absolute;left:0;bottom:0;width:100%">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size = "2"
                @current-change="changePage"
                :total="allPage">
              </el-pagination>
            </div>
          </div>
          <p class="all"><span class="el-icon-info"></span>
            已选择<span class="light">{{title.point}}</span>个知识点，
            共计<span class="light">{{allCount}}</span>个案例，
          </p>
          <div class="btnBox">
            <el-button @click="active--">上一步</el-button>
            <el-button @click="next" type="primary">下一步</el-button>
          </div>
        </div>
      </div>
      <div v-if="showBox[3]" class="contentBox">
        <p><span class="hasLine">设置任务基本信息</span></p>
        <div style="border-bottom: 1px solid #EEEEEE;min-height:400px;margin-top: 20px;">
          <div class="titleMsgBox">
            <p style="position: relative">
              <span class="leftSpan">任务名称</span>
              <el-input v-model="missName" placeholder="请输入内容" @keyup.native="missName = filte(missName)" clearable></el-input>
            </p>
            <div class="rela">
              <span class="leftSpan">开始时间</span>
              <el-date-picker
                v-model="begintime"
                :editable='false'
                type="datetime"
                @change = "changeBegintime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="rela" style="padding-top: 10px">
              <span class="leftSpan" style="margin-top: -2px">结束时间</span>
              <div class="slide">
                <span v-for="(item,index) in slideVal" :key="item" @click="getT(index)">
                  <input type="radio" name="chec" :id="item" v-model="pick" :value="slideVal[index]">
                  <label :for="item">{{item}}</label>
                </span>
              </div>
              <el-date-picker
                v-model="endtime"
                :editable='false'
                type="datetime"
                @change = "changeEndtime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="rela">
              <span class="leftSpan">参与班级</span>
              <div class="checkClas">
                <span v-for="(item,index) in hasClass" :key="index">
                  <input :id="item" type="checkbox" name="cls" :value="item" v-model="classNum">
                  <label :for="item">{{item.class}}</label>
                </span>
              </div>
              <p class="all">
                <span class="el-icon-info" style="margin-left: 0"></span>
                已选中<span class="light">{{classNum.length}}</span>个班级，
                共<span class="light">120</span>人
                </p>
            </div>
            <div class="rela">
              <span class="leftSpan">备&nbsp;注</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                resize="none"
                :autosize="{ minRows: 6, maxRows: 8}"
                @keyup.native="textarea = filte(textarea)"
                v-model="textarea">
              </el-input>
            </div>
          </div>
        </div>
        <p class="all"><span class="el-icon-info"></span>设置个性的名称和备注，以便更快速的找到目标题组。</p>
        <div class="btnBox">
          <el-button @click="active--">上一步</el-button>
          <el-button @click="next" type="primary">下一步</el-button>
        </div>
      </div>
      <div v-if="showBox[4]" class="contentBox">
        <div style="border-bottom: 1px solid #EEEEEE;min-height:500px;margin-top: 20px;">
          <div class="succBox">
            <h3>发布任务成功</h3>
            <p ref="times">5秒后跳转至全真案例</p>
            <div><router-link :to="{ name: 'allTrueCase', query: { bookid: bookid, bookname: bookName }}">返回案例</router-link></div>
          </div>
        </div>
        <p class="all"><span class="el-icon-info"></span>请关注已发布任务的状态了解任务进度</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pubMission',
  data () {
    return {
      isChecArr: [],
      bookName: '',
      bookid: 0,
      time: 5,
      active: 0,
      isAccordion: true,
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      checkTree: [],
      choooseTree: [],
      filterText: '',
      choooseText: '',
      dataList: [],
      title: {},
      topicData: [],
      tixing: [],
      missName: '',
      isact: 0,
      pick: "24小时",
      begintime: new Date(),
      endtime: new Date(new Date().getTime() + 24*60*60*1000),
      slideVal: ["自定义","24小时","12小时","6小时","3小时","1小时","半小时"],
      hasClass: [],
      classNum: [],
      textarea: '',
      timeCtrl: {},
      allChooseQuestion: [],
      pageChooseQuestion: [],
      page: 1,
      allPage: 0,
    }
  },
  mounted() {
    this.$store.commit("thirdrouterCtrl",false);
    if(this.$route.query.hasOwnProperty("bookid")){
      this.bookName = this.$route.query.bookname;
      this.bookid = this.$route.query.bookid;
    }else {
      window.location.href = '#/Teacher/Shixun';
    }
    this.getTree();
    this.getMyClass()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    choooseText(val) {
      if(val==""){
        this.choooseTree = this.checkTree
        return
      }
      let arr = [];
      for(let i=0; i<this.checkTree.length; i++){
        if(this.checkTree[i].name.match(val)) {
          arr.push(this.checkTree[i])
        }
      }
      if(arr.length==0) {
        this.choooseTree = this.checkTree
      }else {
        this.choooseTree = arr;
      }
    }
  },
  methods: {
    getMyClass() {
      // 得到老师课程关联班级
      this.$http.post(`${this.$store.state.location}/services/app/Course/GetCourseClasses`,
        {
          "id": this.bookid
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          let that = this;
          this.hasClass = [];
          for(let i in response.body.result.classes){
            this.hasClass.push({
              missionId: 0,
              class: response.body.result.classes[i].serialNumber,
              id: response.body.result.classes[i].id,
              serialNumber: response.body.result.classes[i].serialNumber,
              classesId: response.body.result.classes[i].departmentId,
            })
          }
          if(this.hasClass.length==0){
            this.$message.error('请先设置班级');
            window.location.href = `#/Teacher/Shixun/Course?bookid=${that.bookid}&bookname=${that.bookName}`;
          }
        },response=>{
          console.log('得到设置的班级信息error')
        })
    },
    filte(val) {
      return val.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'')
    },
    getTree() {
      this.$http.post(`${this.$store.state.location}/services/app/Course/GetKnowledgeTree`,
        {
          "courseId": this.bookid,
          "onlyIncludeChild": false
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.dataList = response.body.result;
        },response=>{
          console.log('知识点树获取error')
        })
    },
    getTypeCount() {
      let arr = [],str='';
      for(let i in this.checkTree) {
        arr.push(this.checkTree[i].id)
      };
      str = arr.join(',');
      this.$http.post(`${this.$store.state.location}/services/app/QuestionGroup/GetQuestionStyle`,
        arr,{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.tixing = [];
          for(let i in response.body.result) {
            this.tixing.push({
              "questionStyle": response.body.result[i].questionStyle,
              "type": response.body.result[i].styleName,
              "count": 0,
              "weight": response.body.result[i].weight,
              "max": response.body.result[i].count              
            })
          }
        },response=>{
          console.log('题型数量分值获取error')
        })
    },
    getChooseQuestion() {
      let arr = [];
      for(let i in this.checkTree) {
        arr.push(this.checkTree[i].id)
      }
      this.$http.post(`${this.$store.state.location}/services/app/QuestionGroup/GenerateRandomQuestionForKnowledge`,
        {
          "courseId": this.bookid,
          "styles": this.tixing,
          "knowledgeIds": arr
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.allChooseQuestion = [];
          for(let i in response.body.result) {
            let arr = [];
            for(let j in response.body.result[i].questions) {
              let weight = 0;
              for(let z in this.tixing) {
                if(this.tixing[z].questionStyle==response.body.result[i].questions[j].style) {
                  weight = this.tixing[z].weight
                }
              }
              arr.push({
                version: response.body.result[i].questions[j].version,
                uniqueId: response.body.result[i].questions[j].uniqueId,
                name: response.body.result[i].questions[j].title,
                point: this.bookName,
                style: response.body.result[i].questions[j].style,
                type: response.body.result[i].questions[j].styleName,
                count: weight,
                chec: true
              })
            }
            this.allChooseQuestion.push({
              knowledgeId: response.body.result[i].knowledgeId,
              questions: arr
            });
            this.page = 1;
            this.hasact(0,this.allChooseQuestion[0].knowledgeId)
          }
        },response=>{
          console.log('随机生成题目error')
        })
    },
    handleCheckChange(data, checked, indeterminate) {
      // 所有被选中的
      this.checkTree = this.$refs.tree.getCheckedNodes();
      this.title.point = this.checkTree.length
      this.choooseTree = this.checkTree;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleClose(item) {
      this.$refs.tree.setChecked(item,false,true);
      this.checkTree = this.$refs.tree.getCheckedNodes();
      this.choooseTree = this.checkTree;
    },
    handleChangeCount(val) {
      // 数量
    },
    handleChangePoint(val){
      // 分值
    },
    next() {
      if(this.active==0){
        if(this.checkTree.length==0){
          this.$message.error('请选择知识点');
          return
        }else {
          this.getTypeCount();
        }
      }else if(this.active==1) {
        if(this.allCount==0){
          this.$message.error('请添加题数');
          return
        }else if(this.allPoint==0){
          this.$message.error('请选择分数');
          return
        }else {
          this.getChooseQuestion()
        }
      }else if(this.active==3) {
        if(this.missName==""){
          this.$message.error('请填写任务名字');
          return
        }else if(this.classNum.length==0){
          this.$message.error('请选择班级');
          return
        }else {
          this.active--
          this.created();
        }
      }
      this.active++
    },
    changePage(val) {
      this.page = val;
      this.showData()
    },
    hasact(index,id) {
      this.isact = index;
      for(let i in this.allChooseQuestion) {
        if(id == this.allChooseQuestion[i].knowledgeId) {
          this.pageChooseQuestion = this.allChooseQuestion[i].questions;
          this.page = 1;
          this.showData()
        }
      }
    },
    showData() {
      this.topicData = [];  
      this.allPage = this.pageChooseQuestion.length;
      for(let i=2*(this.page-1); i<2*this.page; i++) {
        if(i==this.pageChooseQuestion.length) {
          break;
        }else {
          this.topicData.push(this.pageChooseQuestion[i])
        }
      }
    },
    created() {
      let arr = [];
      for(let i in this.allChooseQuestion) {
        for(let j in this.allChooseQuestion[i].questions){
          arr.push({
            "missionId": 0,
            "questionUniqueId": this.allChooseQuestion[i].questions[j].uniqueId,
            "questionVersion": this.allChooseQuestion[i].questions[j].version,
            "questionName": this.allChooseQuestion[i].questions[j].name,
            "questionStyle": this.allChooseQuestion[i].questions[j].style,
            "questionWeighting": this.allChooseQuestion[i].questions[j].count,
          })
        }
      }
      this.$http.post(`${this.$store.state.location}/services/app/Mission/Create`,
        {
          "title": this.missName,
          "startTime": this.begintime,
          "endTime": this.endtime,
          "remark": this.textarea,
          "classes": this.classNum,
          "students": [],
          "questions": arr
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          console.log(response.body)
        },response=>{
          console.log(response)
        })
    },
    changeBegintime() {
      let index = this.slideVal.indexOf(this.pick);
      this.getEndTime(index);
    },
    getEndTime(index) {
      let t = this.begintime.getTime();
      switch(index){
        case 0: break;
        case 1: 
          this.endtime = new Date(t + 24*60*60*1000); break;
        case 2: 
          this.endtime = new Date(t + 12*60*60*1000); break;
        case 3: 
          this.endtime = new Date(t +  6*60*60*1000); break;
        case 4: 
          this.endtime = new Date(t +  3*60*60*1000); break;
        case 5: 
          this.endtime = new Date(t +  1*60*60*1000); break;
        case 6: 
          this.endtime = new Date(t +    30*60*1000); break;
      }
    },
    timeOut() {
      let that = this;
      let $times = this.$refs.times;
      let interval = "";
      this.timeCtrl = {
        begin: function() {
          interval = window.setInterval(function() {
            if ((that.time--) <= 1) {
              $times.innerText = "正在跳转至任务页面...";
              window.clearInterval(interval);
              window.location.href = "#/Teacher/Renwu";
            }else {
              $times.innerText = that.time + "秒后跳转至任务页面"
            }
          }, 1000);
        },
        end: function() {
          interval!=""? window.clearInterval(interval): ""
        }        
      }
    },
    getT(val) {
      this.pick = this.slideVal[val];
      this.getEndTime(val);
    },
    changeEndtime() {
      this.pick = this.slideVal[0]
    },
  },
  computed: {
    showBox() {
      let arr = [false,false,false,false,false];
      arr[this.active] = true;
      return arr;
    },
    allPoint() {
      let point = 0;
      for(let i=0; i<this.tixing.length; i++){
        point+=(this.tixing[i].weight*this.tixing[i].count)
      }
      return point
    },
    allCount() {
      let count = 0;
      for(let i=0; i<this.tixing.length; i++){
        count+=this.tixing[i].count;
      }
      return count
    }
  },
  updated() {
    if(this.active==0){
      if(this.checkTree.length>0){
        this.$refs.tree.setCheckedNodes(this.checkTree);
      }
    }
    if(this.active==4){
      this.timeOut();
      this.timeCtrl.begin();
    }
  },
  destroyed() {
    this.$store.commit("thirdrouterCtrl",true);
    if(this.timeCtrl.hasOwnProperty("end")){
      this.timeCtrl.end()
    }
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
  .headBox {
    padding: 20px 0;
    background-color: white;
    border-radius: 4px;
  }
  .headBox p {
    color: #687178;
    font-size: 12px;
    padding: 20px 50px 0 50px;
  }
  .headBox p span {
    color: #1890FF;
    margin-right: 5px;
  }
  .pointBox {
    margin-top: 20px;
    position: relative;
    min-height: 600px;
  }
  .hasLine {
    color: #243847;
    position: relative;
    padding: 0 0 10px 0;
  }
  .hasLine::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #00B0FF;
    border-radius: 11px;
  }
  .leftContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 255px;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    font-size: 14px;
  }
  .leftContent .el-input {
    display: inline-block;
    width: 135px;
    font-size: 12px;
    margin-left: 30px;
  }
  .treeBox {
    margin-top: 10px;
    height: 530px;
    overflow: auto;
    position: relative;
  }
  .el-tree {
    width: 100%;
  }
  .rightContent {
    margin-left: 275px;
    padding: 20px;
    font-size: 14px;
    background-color: white;
    border-radius: 4px;  
  }
  .el-tag {
    margin: 0 20px 20px 0;
  }
  .all {
    color: #687178;
    margin-top: 5px
  }
  .all .el-icon-info {
    color: #1890FF;
    margin: 0 5px 0 20px;
  }
  .all .light {
    color: #00B0FF;
  }
  .btnBox {
    padding: 30px 70px 10px 0px;
    text-align: right;  
  }
  .btnBox button,.btnBox a {
    margin-left: 20px;
    height: 35px;
    line-height: 35px;
    width: 95px;
    padding: 0;
    display: inline-block;
  }
  .btnBox a {
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    border-radius: 4px;
    line-height: 34px;
  }
  .btnBox a:hover {
    color: #409EFF;
    background-color: #ECF5FF;
    border-color: #C6E2FF;
  }
  .contentBox {
    margin-top: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 4px;
    font-size: 14px;
  }
  .titleUl {
    padding: 0;
  }
  .titleHead {
    line-height: 54px;
    color: #000000;
    border-radius: 4px 4px 0px 0px;
    background-color: #FAFAFA;
  }
  .titleList {
    line-height: 54px;
    border-top: 1px solid #E8E8E8;
  }
  .titleUl .titleOne{
    width: 110px;
    text-align: center;
    margin-left: 85px;
    display: inline-block;
  }
  .titleUl .titleTwo{
    width: 220px;
    text-align: center;
    margin-left: 120px;
    display: inline-block;
  }
  .titleUl .titleThr{
    width: 155px;
    text-align: center;
    margin-left: 150px;
    display: inline-block;
  }
  .titleList .el-input-number {
    width: 155px;
  }
  .titleMsgBox {
    padding-top: 15px;
  }
  .titleMsgBox .rela {
    position: relative;
    margin-top: 20px;
    padding-left: 120px;
  }
  .titleMsgBox .leftSpan {
    font-size: 14px;
    position: absolute;
    left: 0;
    width: 85px;
    text-align: right;
    margin-right: 35px;
    color: #243847;
    line-height: 40px;
  }
  .titleMsgBox p .el-input, .titleMsgBox .rela .el-input {
    display: inline-block;
    width: 420px;
    line-height: 40px;
    color: #243847;
    margin-left: 120px;
  }
  .titleMsgBox .rela .el-input {
    margin-left: 0;
  }
  .rela .slide {
    width: 470px;
    height: 6px;
    margin: 16px 0;
    padding: 0 10px 0 5px;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }
  .rela .slide span {
    position: relative;
  }
  .rela .slide span input {
    position: absolute;
    top: -4px;
    left: 0;
    width: 15px;
    height: 15px;
    margin: 0;
    cursor: pointer;
    opacity: 0;
  }
  .rela .slide span input:checked+label {
    color: #409EFF;
  }
  .rela .slide span label {
    position: absolute;
    width: 50px;
    top: -30px;
    display: block;
    height: 45px;
    left: 0;
    width: 50px;
    cursor: pointer;
    text-align: center;
    margin-left: -20px;
  }
  .rela .slide span label::before {
    content: '';
    width: 6px;
    height: 6px;
    top: 30px;
    left: 20px;
    border-radius: 50%;
    position: absolute;
    background-color: white;
  }
  .rela .slide span input:checked+label::after {
    content: '';
    width: 15px;
    height: 15px;
    top: 25px;
    left: 15px;
    border-radius: 50%;
    border: 2px solid #409EFF;
    position: absolute;
    background-color: white;
  }
  .succBox {
    text-align: center;
    padding-top: 125px;
    background-image: url('../../share/img/icon_diago.png');
    background-repeat: no-repeat;
    background-position: center 20px;
  }
  .succBox h3 {
    font-size: 24px;
    color: rgba(0,0,0,0.85);
  }
  .succBox p {
    margin-top: 8px;
    font-size: 14px;
    color: rgba(0,0,0,0.43);
  }
  .succBox div {
    margin-top: 25px;
  }
  .succBox div a {
    width: 135px;
    height: 35px; 
    border-radius: 3px; 
    border: 1px solid #52C41A;
    display: inline-block;
    line-height: 34px;
    padding: 0;
    margin: 0 10px;
    color: #52C41A;
  }
  .succBox div a:hover {
    color: white;
    border: 1px solid #52C41A;
    background-color: #52C41A;
  }
  .choooseContent {
    position: relative;
    border-bottom: 1px solid #EEEEEE;
    min-height:350px;
    margin-top: 20px;
  }
  .chooseBox {
    height: 530px;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: 10px;
  }
  .titleUlBox {
    font-size: 12px;
    color: #42424E;
    padding: 0;
  }
  .titleUlBox li:first-child {
    background-color: #EFEFF4;
    margin-bottom: 5px;
  }
  .titltLi {
    background-color: #FBFBFB;
  }
  .titltLi:nth-child(2n) {
    background-color: #EFEFF4;
  }
  .titltLi:hover {
    background-color: #FEF1F1;
  }
  .titleUlBox li span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 40px;
    line-height: 40px;
  }
  .titleUlBox .num {
    display: inline-block;
    width: 55px;
    text-align: center;
  }
  .titleUlBox .name {
    display: inline-block;
    width: 280px;
    text-align: center;
  }
  .titltLi .name {
    text-align: left;
  }
  .titleUlBox .point {
    display: inline-block;
    width: 90px;
    text-align: center;
  }
  .titleUlBox .type {
    display: inline-block;
    width: 75px;
    text-align: center;
  }
  .titleUlBox .count {
    display: inline-block;
    width: 65px;
    text-align: center;
  }
  .titleUlBox .oper {
    display: inline-block;
    width: 55px;
    text-align: center;
    position: relative;
  }
  .titltLi .oper {
    cursor: pointer;
  }
  .chooseList {
    padding: 15px;
    font-size: 12px;
    color: #243847;
    border: 1px solid #E9EFF4;
    border-radius: 5px;
    margin-top: 5px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .chooseList:hover, .chooseList.act {
    background-color: #00B0FF;
    color: white;
  }
  .chooseList:hover span, .chooseList.act span {
    color: white;
  }
  .chooseList span {
    font-size: 18px;
    color: #4DA1FF;
    margin-right: 10px;
  }
  .checkClas {
    padding-top: 5px;
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
  .rela .el-textarea {
    display: inline-block;
    width: 428px;
    vertical-align: top;
    margin-bottom: 20px;
  }
</style>
