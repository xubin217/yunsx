<template>
  <div class="" style="height: 100%;">
    <div class="titleBox">
      <h3>{{tizu.tizuType}}{{tizu.tizuName}}</h3>
      <div class="studentMsg">
        <span>{{studentData.name}}</span>
        <span>得分：{{studentData.count}}</span>
        <span>得分详情</span>
      </div>
    </div>
    <div class="tizuContainer">
      <div class="tizuL" :class="menuCtrl?'issmall':''">
        <div class="tizuLMenuCtrl"  :class="menuCtrl?'':'active'" @click="menuCtrl=!menuCtrl">
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="cross">
            <span></span>
            <span></span>
          </div>
        </div>
        <div v-for="(value,key,index) in caseClassify" :key="index" class="teacTiZu">
          <p>{{key}}({{value.length}})</p>
          <el-radio-group v-model="activeId">
            <el-radio-button 
              v-for="(item,index) in value" 
              :key="index"
              :class="{dui:item.type[0],cuo:item.type[1],yiping:item.type[2],weiping:item.type[3]}"
              :label="item.id">
              {{item.id}}
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="tooltipBox">
          <p><span class="dui">答对</span><span class="cuo">答错</span></p>
          <p><span class="yiping">已评阅</span><span class="weiping">未评阅</span></p>
        </div>
      </div>
      <div class="tizuR" :class="menuCtrl?'isleft':''">
        <div class="ctrlBox">
          <span @click="daanjiexi">答案解析</span>
          <span @click="jisaunqi">计算器</span>
          <span @click="next" class="right">上一题</span>
          <span @click="prev">下一题</span>
        </div>
        <exercises :ques = "{unid:'',version:1}" style="padding:20px"></exercises>
        <div class="evaluateBox">
          <div v-if="tizu.timu[activeId-1].review[0]" class="dui">
            <p>答对，获得{{tizu.timu[activeId-1].review[0].point}}分</p>
          </div>
          <div v-if="tizu.timu[activeId-1].review[1]" class="cuo">
            <p>答错，获得{{tizu.timu[activeId-1].review[1].point}}分</p>
          </div>
          <div v-if="tizu.timu[activeId-1].review[2]" class="yiping">
            <p>教师评阅，获得{{tizu.timu[activeId-1].review[2].point}}分</p>
            <p>备注：{{tizu.timu[activeId-1].review[2].text}}</p>
          </div>
          <div v-if="tizu.timu[activeId-1].review[3]" class="weiping">
            <div>
              <span class="lefttips">教师打分</span><el-input v-model="score" type="number" size="small"></el-input><span class="righttips">该分值不可超过该题总分</span>
            </div>
            <div>
              <span class="lefttips">备注</span><el-input type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 6}" v-model="comment">
              </el-input>
            </div>
            <div><el-button type="primary" style="margin-left: 90px;">确认评价</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exercises from './exercises'
export default {
  name: 'teacMarking',
  data () {
    return {
      studentData: {
        id: 1,
        name: '狗剩',
        count: 78,
      },
      tizu: {
        tizuId: 1,
        tizuName: '题组一',
        tizuType: '基础会计',
        timu: [
          {
            id: 1,
            caseType: '单选题',
            review: [{point: 8, text: ''},0,0,0]
          },{
            id: 2,
            caseType: '单选题',
            review: [0,{point: 3, text: ''},0,0]
          },{
            id: 3,
            caseType: '多选题',
            review: [{point: 8, text: ''},0,0,0]
          },{
            id: 4,
            caseType: '多选题',
            review: [{point: 8, text: ''},0,0,0]
          },{
            id: 5,
            caseType: '计算题',
            review: [0,{point: 7, text: ''},0,0]
          },{
            id: 6,
            caseType: '综合题',
            review: [0,0,{point: 8, text: '写的很好'},0]
          },{
            id: 7,
            caseType: '综合题',
            review: [0,0,0,{}]
          },
        ]
      },
      activeId: 1,
      menuCtrl: false,
      score: '',
      comment: '',
    }
  },
  components: {
    exercises
  },
  methods: {
    daanjiexi() {

    },
    jisaunqi() {

    },
    next() {

    },
    prev() {

    },
  },
  computed: {
    caseClassify() {
      let obj = {};
      let arr = this.tizu.timu;
      let clas = '';
      for(let i = 0; i<arr.length; i++) {
        obj.hasOwnProperty(arr[i].caseType)? obj[arr[i].caseType].push({id: arr[i].id,type: arr[i].review}) : obj[arr[i].caseType] = [{id: arr[i].id,type: arr[i].review}];
      }
      return obj;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titleBox {
    padding: 10px 25px;
    background-color: #002140;
    color: white;
    position: relative;
  }
  .titleBox h3 {
    font-size: 16px;
    font-weight: 100;
  }
  .studentMsg {
    width: 260px;
    height: 33px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -130px;
    line-height: 33px;
    font-size: 14px;
    color: white;
    background-color: #1A3753;
    text-align: center;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    --moz-border-radius-bottomright: 50px;
    --moz-border-radius-bottomleft: 50px;
  }
  .studentMsg span:nth-child(2) {
    margin: 0 20px;
  }
  .ctrlBox {
    background-color: white;
    position: relative;
    padding: 10px 20px 10px 75px;
  }
  .ctrlBox span {
    width: 80px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    border: 1px solid #EEEEEE;
    font-size: 12px;
    cursor: pointer;
    transition: all linear .3s;
    margin-right: 10px;
  }
  .ctrlBox span:hover {
    border-color: #C6E2FF;
    background-color: #ECF5FF;
    color: #409EFF;
  }
  .ctrlBox .right {
    margin-left: 150px;
  }
  .tizuContainer {
    position: relative;
    min-height: 100%;
  }
  .tizuL {
    background: white;
    padding: 20px;
    position: absolute;
    width: 230px;
    min-height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    box-shadow: 2px 0 2px #EEEEEE;
    --webkit-box-shadow: 2px 0 2px #EEEEEE;
    transition: all linear .5s;
    --webkit-transition: all linear .5s;
  }
  .issmall {
    left: -230px;
  }
  .tizuL .teacTiZu p {
    margin-top: 25px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #001529;
  }
  .tizuL .teacTiZu:first-child p {
    margin-top: 0;
  }
  .tizuL .teacTiZu .el-radio-button {
    margin: 0 8px 8px 0;
  }
  .tizuR {
    min-height: 100%;
    position: relative;
    margin-left: 230px;
    transition: all linear .5s;
    --webkit-transition: all linear .5s;
  }
  .isleft {
    margin-left: 0;
  }
  .tizuLMenuCtrl {
    position: absolute;
    top: 15px;
    right: -28px;
    cursor: pointer;
    width: 28px;
    background: white;
    height: 28px;
    line-height: 28px;
    box-shadow: 2px 2px 2px #EEEEEE, 2px -2px 2px #EEEEEE;
  }
  .hamburger,.cross {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .hamburger span {
    display: block;
    width: 18px;
    height: 2px;
    margin-bottom: 3px;
    overflow: hidden;
    position: relative;
  }
  .hamburger span:last-child {
    margin: 0;
  }
  .hamburger span::before,.hamburger span::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(15,15,15);
    transform: translateX(-200%);
    transition: transform ease 300ms;
  }
  .hamburger span::after {
    transform: translateX(0);
  }
  .hamburger span:nth-child(2)::before,.hamburger span:nth-child(2)::after {
    transition-delay: 75ms;
  }
  .hamburger span:last-child::before,.hamburger span:last-child::after {
    transition-delay: 150ms;
  }
  .tizuLMenuCtrl:hover .hamburger span::before {
    transform: translateX(0);
  }
  .tizuLMenuCtrl:hover .hamburger span::after {
    transform: translateX(200%);
  }
  .tizuLMenuCtrl.active .hamburger span::before {
    transform: translateX(100%);
  }
  .tizuLMenuCtrl.active .hamburger span::after {
    transform: translateX(200%);
  }
  .cross span {
    display: block;
    width: 18px;
    height: 2px;
    background-color: rgb(15,15,15);
    transform: translateY(50%) rotate(45deg) scaleX(0);
    transition: transform ease 200ms;
  }
  .cross span:last-child{
    transform: translateY(-50%) rotate(-45deg) scaleX(0);
  }
  .tizuLMenuCtrl.active .cross span {
    transition-delay: 450ms;
    transform: translateY(50%) rotate(45deg) scaleX(1);
  }
  .tizuLMenuCtrl.active .cross span:last-child {
    transform: translateY(-50%) rotate(-45deg) scaleX(1);
  }
  .tooltipBox {
    margin: 20px 0 20px 0;
    font-size: 12px;
    color: #001529;
  }
  .tooltipBox p {
    margin-bottom: 8px;
    display: flex;
    display: -webkit-flex;
  }
  .tooltipBox p span {
    flex-grow: 1;
    width: 0;
    margin-left: 18px;
    position: relative;
  }
  .tooltipBox p span::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: -18px;
    top: 2px;
    border-radius: 2px;
  }
  .tooltipBox p .dui::after {
    background-color: #78D895;
  }
  .tooltipBox p .cuo::after {
    background-color: #FF7078;
  }
  .tooltipBox p .yiping::after {
    background-color: #FCC049;
  }
  .tooltipBox p .weiping::after {
    background-color: #29C0C0;
  }
  .evaluateBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 20px;
    background: #FFFCF5;
    font-size: 14px;
  }
  .evaluateBox .dui {
    color: #78D895;
  }
  .evaluateBox .cuo {
    color: #FF7078;
  }
  .evaluateBox .yiping {
    color: #FCC049;
  }
  .evaluateBox .weiping {
    color: #29C0C0;
  }
  .evaluateBox .weiping div {
    position: relative;
    margin-bottom: 10px;
  }
  .evaluateBox .weiping div .lefttips {
    position: absolute;
    left: 0;
    line-height: 28px;
    display: inline-block;
    width: 90px;
  }
  .evaluateBox .weiping div .righttips {
    position: relative;
    font-size: 12px;
    color: #9B9B9B;
    margin-left: 40px;
  }
  .evaluateBox .weiping div .righttips::after {
    content: '*';
    position: absolute;
    left: -10px;
    color: #D0021B;
    top: 0;
  }
  .evaluateBox .weiping .el-input {
    margin-left: 90px;
    display: inline-block;
    width: 100px;
  }
  .evaluateBox .weiping .el-textarea {
    margin-left: 90px;
    display: inline-block;
    width: 500px;
  }
</style>