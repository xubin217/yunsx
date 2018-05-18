<template>
  <div class="feight">
    <div v-if="allcase.allcase">
      <p class="path">
        <router-link :to="{ name: 'Shixun'}">实训中心</router-link> &gt;
        <router-link :to="{ name: 'Course', query: { bookid: bookid, bookname: bookName }}">{{bookName}}</router-link> &gt;
        全真案例
      </p>
      <div class="contentBox">
        <div class="contentLeft">
          <p>
            <span class="hasLine">知识点</span>
            <el-input
              class="serch"
              placeholder="关键字搜索"
              v-model="filterText">
            </el-input>
          </p>
          <div class="scrollL">
            <div v-for="(item,index) in pointList" :key="index" class="chooseList" @click="hasact(index)" :class="{'act': isact === index}">
              <span class="el-icon-tickets"></span>{{item.name}}
            </div>
          </div>
        </div>
        <div class="contentRight">
          <p style="position: relative">
            <span class="hasLine">《{{bookName}}》全真案例</span>
            <router-link :to="{ name: 'pubMission', query: { bookid: bookid, bookname: bookName }}" class="pubmis"><span class="el-icon-circle-plus"></span>发布任务</router-link>
          </p>
          <div class="err">
            <span>错账更正 &gt;</span>
            <p>
              <el-tag
                v-for="(tag,index) in errorPoint"
                :key="index"
                closable
                @close="handleClose(tag)"
                type="info">
                {{tag}}
              </el-tag>
            </p>
          </div>
          <div class="screen">
            <span class="scrType">知识点：</span>
            <p>
              <span v-for="(item,index) in titlePoint" :key="index">{{item}}</span>
            </p>
          </div>
          <div class="screen">
            <span class="scrType">题&nbsp;型：</span>
            <p>
              <span v-for="(item,index) in titleType" :key="index" @click="chec">{{item}}</span>
            </p>
          </div>
          <div class="choooseContent">
            <ul class="titleUlBox">
              <li>
                <span class="num">序号</span>
                <span class="name">案例名称</span>
                <span class="type">题型</span>
                <span class="count">练习次数</span>
              </li>
              <li v-for="(item,index) in topicData" class="titltLi">
                <span class="num">{{index+1}}</span>
                <span class="name">{{item.name}}</span>
                <span class="type">{{item.type}}</span>
                <span class="count">{{item.count}}</span>
              </li>
            </ul>
            <div style="text-align: right; margin-bottom:20px;">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="changePage"
                :total="50">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'allTrueCase1',
  data () {
    return {
      bookName: '',
      bookid: 0,
      filterText: '',
      isact: 0,
      topicData: [
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
        {
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用正确的方法AAbb',
          point: '基础会计',
          type: '单选题',
          count: 2,
          chec: false
        },
      ],
      pointList: [
        {
          id: 0,
          name: '知识点A'
        },{
          id: 1,
          name: '知识点B'
        },{
          id: 2,
          name: '知识点C'
        },{
          id: 3,
          name: '知识点D'
        },{
          id: 4,
          name: '知识点E'
        },
      ],
      errorPoint: ['划线更正法概念、适用范围和操作要求','红字更正法概念、适用范围和操作要求'],
      titlePoint: ['划线更正法概念、适用范围和操作要求','红字更正法概念、适用范围和操作要求',
                  '补充登记法概念、适用范围和操作要求','补充登记法概念、适用范围和操作要求'],
      titleType: ['单选题(132)','多选题(132)','判断题(46)','不限定题(13)','填表题(10)','制表题(32)','综合题(134)'],
    }
  },
  mounted() {
    this.$store.commit("courseshow",false);
    if(this.$route.query.hasOwnProperty("bookid")){
      this.bookName = this.$route.query.bookname;
      this.bookid = this.$route.query.bookid
    }else {
      window.location.href = '#/Teacher/Shixun';
    }
  },
  computed: {
    allcase() {
      return this.$store.state
    },
  },
  methods: {
    hasact(val) {
      this.isact = val;
    },
    handleClose(tag) {
      this.errorPoint.splice(this.errorPoint.indexOf(tag), 1);
    },
    changePage(){

    },
    chec(){},
  },
  destroyed() {
    this.$store.commit("courseshow",true)
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
  .contentBox {
    position: relative;
  }
  .contentLeft {
    position: absolute;
    top: 0;
    left: 0;
    width: 255px;
    height: 720px;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    font-size: 14px;
  }
  .contentLeft .el-input {
    display: inline-block;
    width: 135px;
    font-size: 12px;
    margin-left: 30px;
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
  .pubmis {
    position: absolute;
    right: 0;
    color: #243847;
    font-size: 12px;
    cursor: pointer;
    line-height: 28px;
    padding-left: 35px;
  }
  .pubmis:hover {
    color: #F77676;
  }
  .pubmis span {
    font-size: 28px;
    color: #00B0FF;
    position: absolute;
    left: 0px;
  }
  .pubmis:hover span {
    color: #F77676;
  }
  .scrollL {
    height: 650px;
    overflow-x: hidden;
    overflow-y: auto;
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
  .contentRight {
    margin-left: 275px;
    padding: 20px;
    font-size: 14px;
    background-color: white;
    border-radius: 4px;
    height: 770px; 
  }
  .err {
    position: relative;
    margin-top: 20px;
    min-height: 40px;
    line-height: 35px;
  }
  .err>span {
    color: #6E768F;
    font-size: 18px;
    position: absolute;
  }
  .err p {
    margin-left: 100px;
  }
  .err p span {
    margin-right: 10px;
  }
  .screen {
    position: relative;
    margin-top: 8px;
    min-height: 25px;
    line-height: 22px;
    font-size: 12px;
  }
  .screen:first-child { 
    margin-top: 20px;
  }
  .screen .scrType {
    position: absolute;
    color: #00B0FF;
    width: 55px;
    text-align: right;
  }
  .screen p {
    margin-left: 60px;
  }
  .screen p span {
    margin-right: 8px;
    cursor: pointer;
  }
  .screen p span:hover {
    color: #00B0FF;
  }
  .choooseContent {
    position: relative;
    min-height:350px;
    margin-top: 20px;
  }
  .chooseBox {
    height: 530px;
    overflow-x: hidden;
    overflow-y: auto;
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
    width: 430px;
    text-align: center;
  }
  .titltLi .name {
    text-align: left;
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
</style>
