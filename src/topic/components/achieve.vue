<template>
   <div style="height: 100%;">
    <div class="content_choi">
      <div class="content_top">
          <p>基础会计任务一</p>
          <span><i>得分 : 80 分</i><b @click="centerDialogVisible = true">得分详情</b></span>
      </div>
        <div style="display:flex; background-color:#F0F2F5; height: 100%;">
          <div class="solids" :class="mode ? '':'s' " :style="mode ? 'width:0px':'width:230px'">
                <div class="btn":class="mode ? 'el-icon-d-arrow-left':'el-icon-d-arrow-right' " @click ="mode = !mode"></div>
                <div class="genre" >
                     <div v-for="(value,key,index) in caseClassify" :key="index" class="teacTiZu">
                      <p>{{key}}({{value.length}})</p>
                      <el-radio-group v-model="activeId">
                        <el-radio-button 
                          v-for="(item,index) in value" 
                          :key="index"
                          :class="{dui:item.type[0],cuo:item.type[1],yiping:item.type[2]}"
                          :label="item.id">
                          {{item.id}}
                        </el-radio-button>
                      </el-radio-group>
                    </div>
                  <div class="tooltipBox">
                    <p><span class="cuo">答错</span><span class="dui">答对</span><span class="yiping">老师评阅</span></p>
                  </div>
                </div>
          </div>
             <div style="width:100%">
                  <div class="fun">
                      <span @click="daanjiexi">答案解析</span>
                      <span @click="jisaunqi">计算器</span>
                     <div class="place">
                          <span>上一题</span>
                          <span>下一题</span>
                          <a href="javascipt:;">进入错题汇总练习</a>
                     </div>
                  </div>
               <!-- 题目内容组件 -->
                 <div  style="padding-left: 20px;padding-top: 20px;">
                   <exercises :ques = "{unid:'',version:1}" >
                    <div class="choose"> 你的选择答案：{{result}}</div>
                      <div class="g_bu" >
                          <span>A</span>
                          <span>B</span>
                          <span>C</span>
                          <span>D</span>
                      </div>
                   </exercises>
                   <div class="score">
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
                   </div>
                 </div>
              </div>
              <!-- 得分详情 -->
              <el-dialog
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <div  class="titi">得分 <span>80</span>分</div>
                <p @click="centerDialogVisible = false" class="cosl">关闭</p>
                <span>
                     <div class="dialog_con">
                         <div class="dialog_l">
                             <ul>
                               <li><span>系统阅卷得分</span><i>89分</i></li>
                               <li><span>系统阅卷得分</span><i>89分</i></li>
                               <li><span>系统阅卷得分</span><i>89分</i></li>
                             </ul>
                         </div>
                         <div class="dialog_r">
                             <ul>
                               <li><span>老师阅卷得分</span><i>0分</i></li>
                               <li><span>无需教师判分题型</span></li>
                             </ul>
                         </div>
                     </div>
                </span>
              </el-dialog>
          </div>
      </div>    
      <!-- 查看答案解析 -->
       <!-- 遮罩层 -->
              <!-- <div class="dia_s" :style = "zoom ? 'display:block': 'display:none'"@click.self = "zoom = false" > -->
                 <div class="dia"  :style = "zoom ? 'width:800px': 'width:0px'">
                  <div  class="sideRight">
                      <p @click = "zoom = !zoom">x</p>
                      <el-tabs type="border-card">
                        <el-tab-pane label="正确答案">【B】</el-tab-pane>
                        <el-tab-pane label="答案解析">答案解析</el-tab-pane>
                      </el-tabs>
                  </div>
               </div>
              <!-- </div> -->
   </div>
</template>

<script>
import exercises from '@/topic/components/exercises'
export default{
	name:'achieve',
    data() {
      return {
        centerDialogVisible: false,
        zoom:false,
        result:'A',
        mode: true,
        ins:0,
        number:0,
        active: 0,
        topic: {
          id: 1,
          caseType: '单选题',
          classType: '基础会计',
          classify: '错账更正 > 划线更正法概念 > 适用范围和操作要求',
          caseCount: 16,
          question: '下列各种情况中会导致企业折价发行债券的是下列各种情况中会导致企业折价发行债券的是，下列各种情况中会导致企业折价发行债券的是( )。',
          answer: ["债券的票面利率大于市场利率。","债券的票面利率等于市场利率","债券的票面利率小于市场利率","以上都不对"],
          auxiliaryData: [
                {
                  text: '3月3日，副总经理吴涵申请借款3000元，用于购买办公用品，经批准，出纳以现金支付。',
                  src: '#'
                },{
                  text: '3月3日，副总经理吴涵申请借款3000元，用于购买办公用品，经批准，出纳以现金支付。',
                  src: '#'
                  } 
                ],
              elect:[
                {
                  Letter:'A',
                  options:'债券的票面利率大于市场利率债券的票面利率'
                },
                {
                 Letter:'B',
                 options:'债券的票面利率等于市场利率'
                },
                {
                  Letter:'C',
                  options:'债券的票面利率小于市场利率'
                },
                {
                  Letter:'D',
                  options:'以上都不对'
                }
          ],
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
              review: [0,{point: 7, text: ''},0,0]
            },
          ]
        },
        activeId: 1,
      };
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
    },
    components: {
      exercises,
    },
    methods:{
    aa(index) {
      this.number = index  
      this.ins = index
      },
    daanjiexi() {
      this.zoom = !this.zoom
    },
    jisaunqi() {

    },
  }
}
</script>
<style scoped>
.content_choi{
  height: 100%;
}
.g_bu>.classan{
  background:rgba(165,183,197,1);
  color: #fff;
}
.content_top{
  height:40px; 
  background:rgba(0,33,64,1);
  position: relative;
}
.content_top>p{
  display: inline-block;
  width:229px;
  height:40px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height:40px;
  margin-left: 24px;
}
.teacTiZu p {
  margin-top: 25px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #001529;
}
.teacTiZu:first-child p {
  margin-top: 0;
}
.teacTiZu .el-radio-button {
  margin: 0 8px 8px 0;
}
.content_top>span{
  display: inline-block;
  width:271px;
  height:32px; 
  background:rgba(255,255,255,0.1);
  border-radius: 0px 0px 24px 24px ; 
  position: absolute;
  top: 0px;
  left: 40%;
}
.tooltipBox {
  margin: 10px;
  font-size: 12px;
  color: #001529;
  overflow: hidden;
}
.tooltipBox p {
  margin-top: 40px;
  margin-bottom: 8px;
  display: flex;
  width: 160px;s
  display: -webkit-flex;
}
.tooltipBox p span {
  flex-grow: 1;
  width: -1px;
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
.tooltipBox p .yiping::after {
  background-color: #FCC049;
}
.tooltipBox p .weiping::after {
  background-color: #29C0C0;
}
.choose{
  margin-bottom: 20px;
  margin-top: 43px;
  margin-left: 4px;
}
.dia_s{
  position: fixed;
  top: 0px;
  right: 0px;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 10000;
  left: 0px;
  bottom: 0px;
}
.teacTiZu{
    width: 160px;
    margin: 0 auto;
    margin-top: 20px;
}
.dui {
    color: #78D895;
  }
.cuo {
    color: #FF7078;
  }
.yiping {
    color: #FCC049;
  }
.g_bu>span{
  display: inline-block;
  width:100px;
  height:36px; 
  width:100px;
  height:36px; 
  background:rgba(253,253,253,1);
  border-radius: 3px ; 
  color:rgba(104,113,120,1);
  text-align: center;
  line-height: 36px; 
  margin: 0px 5px;
}
.score{
  height:41px; 
  background:rgba(255,255,255,0.8);
  line-height:41px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(139,87,42,1);
  margin: 30px 0px;
  padding-left: 10px;
}
.g_bu>.el-button--medium{
  padding: 10px 40px;
}
.titi{
 font-size:14px;
font-family:PingFangSC-Regular;
color:rgba(74,74,74,1);
line-height:20px;
position: absolute;
top: 15px;
left: 40%;
}
.titi>span{
display: inline-block;
width:62px;
height:50px; 
font-size:36px;
font-family:PingFangSC-Regular;
color:rgba(24,144,255,1);
line-height:50px;
}
.dialog_l{
width: 50%;
border-right:1px dashed #E6E6E6;
min-height: 284px;
}
.content_top>span>i{
  display: inline-block;
  width:100px;
  height:20px;   
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height:20px;
  font-style: normal;
  margin-left: 44px;
  padding-top: 7px;
}
.content_top>span>b{
  width:90px;
  height:20px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height:20px;
  margin-left: 17px;
  position: absolute;
  top: 7px;
  right: 7px;
  font-weight: 400;
  cursor: pointer;
}
.dialog_l>ul>li>i{
font-style: normal;
margin-left: 20%;
}
.dialog_l>ul>li{
padding-left:30px;
}
.dialog_l>ul>li:nth-child(1){
padding-top:20px;
}
.dialog_l>ul>li{
padding-top:14px;
}
.dialog_r{
width: 50%;
min-height: 284px;
}
.dialog_r>ul>li>i{
font-style: normal;
margin-left: 20%;
}
.dialog_r>ul>li{
padding-left:30px;
}
.dialog_r>ul>li:nth-child(1){
padding-top:20px;
}
.dialog_r>ul>li{
padding-top:14px;
}
.content_top>span>.icom{
  display: inline-block;
  width:14px;
  height:9px; 
  background:rgba(255,255,255,1);
  position: absolute;
  top: 11px;
  right: 27px;
}
.dialog_con{
  height:284px; 
  background:rgba(240,242,245,1);
  margin-top: 40px;
  display: flex;
}
.solids{
  width: 200px;
  height: 100%;
  border:1px solid #ddd;
  position: relative;
   -webkit-transition: all .5s linear;
      -moz-transition: all .5s linear;
           transition: all .5s linear;
  background-color: #fff;
}
.s{
 box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
}
.btn{
 position: absolute;
 top: 10px;
 right: -28px ;
 width:28px;
 height:28px;
 border:1px solid #ddd;
 border-left-color: #fff;
 z-index: 10;
 text-align: center;
 line-height: 28px;
 background-color: #fff;
 color: #157cf0;
 box-shadow: 5px 0px 6px -4px rgba(0, 0, 0, 0.2);
 cursor: pointer;
}
ul{
  list-style-type: disc;
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 0px;
}
.genre{
  overflow: hidden;
}
.cosl{
position: absolute;
top: 7px;
right:12px;
cursor: pointer;
width:24px;
height:17px; 
font-size:12px;
font-family:PingFangSC-Regular;
color:rgba(155,155,155,1);
line-height:17px;
}
.cosl:hover{
color: rgba(24,144,255,1);
}
.genre>ul>li>p{
 width:104px;
 height:20px; 
 font-size:14px;
 font-family:PingFangSC-Regular;
 color:rgba(0,21,41,1);
 line-height:20px;
}
.genre>ul{
  width: 178px;
  padding-top: 24px;
  margin: auto;
}
.genre>ul>li>.activelist{
  background-color: rgb(217,234,255);
}
.genre>ul>li>a{
  display: inline-block;
  width:24px;
  height:24px; 
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(0,21,41,1);
  line-height:17px;
  text-align: center;
  background-color:rgb(242,242,242); 
  line-height: 24px;
  cursor: pointer;
  margin: 0px 4px;
  border:1px solid #fff;
  border-radius: 5px;
}
.genre>ul>li>a:hover{
 display: inline-block;
 border:1px solid rgb(50,156,254);
}
.genre>ul>li{
  display: inline-block;
  margin-top: 15px;
}
.fun{
  width:100%;
  height:54px; 
  background:rgba(255,255,255,1);
  padding-left: 100px;
  line-height: 54px;
  position: relative;
}
.fun>span{
  display: inline-block;
  width:80px;
  height:32px; 
  background:rgba(255,255,255,1);
  border-radius: 4px; 
  border:1px solid #eee;
  text-align: center;
  line-height: 32px;
  margin: 0px 7px;
  cursor: pointer;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(0,21,41,1);
}
.fun>span:hover{
  background:rgba(24,144,255,1);
  color: #fff;

}
.place{
  width: 300px;
  height: 32px;
  line-height: 32px;
  position: absolute;
  top: 11px;
  right: 64px;
  display: flex;
}
.place>a{
  display: inline-block;
  text-align: center;
  width:115px;
  height:32px; 
  line-height: 32px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(24,144,255,1);
  cursor: pointer;
  margin-left: 30px;
}
.place>span{
  display: inline-block;
  width:80px;
  height:32px; 
  background:rgba(255,255,255,1);
  border-radius: 4px ; 
  border:1px solid #eee;
  text-align: center;
  line-height: 32px;
  margin: 0px 7px;
  cursor: pointer;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(0,21,41,1);
}
.place>span:hover{
    background:rgba(24,144,255,1);
    color: #fff;
}
.sideRight{
  width:880px;
  background:rgba(255,255,255,1);
  margin-left: 30px;
  height: 100%;
}
.dia{
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10001;
  -webkit-transition: all .5s linear;
  -moz-transition: all .5s linear;
       transition: all .5s linear;
       height: 100%;
}
.sideRight>P{
  width:30px;
  height:30px; 
  background:rgba(255,255,255,1);
  font-size: 23px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  top: 1px;
  left: 1px;
  color: #979797;
  cursor: pointer;
  z-index: 1000;
  -webkit-box-shadow: 0px 2px 0px 0px rgba(0,0,0,0.08);
  box-shadow: 0px -1px 0px 0px rgba(0,0,0,0.08);

}
.sideRight>.el-tabs{
   min-height:100%; 
}
</style>