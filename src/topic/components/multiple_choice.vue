<template>
   <div style="height: 100%;">
    <div class="content_choi">
      <div class="content_top">
          <p>基础会计任务一</p>
          <span><i>倒计时</i><b>60 小时 26 分</b><i class="icom"></i></span>
      </div>
        <div  class="container">
          <div class="solids" :class="mode ? '':'s' " :style="mode ? 'width:0px':'width:230px'">
                <div class="btn":class="mode ? 'el-icon-d-arrow-left':'el-icon-d-arrow-right' " @click ="mode = !mode"></div>
                  <div class="genre" >
                    <div v-for="(value,key,index) in caseClassify" :key="index" class="teacTiZu">
                      <p>{{key}}({{value.length}})</p>
                      <el-radio-group v-model="activeId">
                        <el-radio-button v-for="item in value" :key="item" :label="item">{{item}}</el-radio-button>
                      </el-radio-group>
                    </div>
                      {{activeId}}
                 </div>
          </div>
             <div style="width:100%">
                  <div class="fun">
                      <span>划线</span>
                      <span>盖章</span>
                      <span>计算器</span>
                     <div class="place">
                          <span>上一题</span>
                          <span>下一题</span>
                          <p @click="dialogVisible = true">交卷</p>
                     </div>
                  </div>
                 <div style="padding-left: 20px;padding-top: 20px;">
                   <exercises :ques = "{unid:'',version:1}" ></exercises> 
                    <div class="g_bu" >
                        <div style="margin-top: 20px">
                           <el-checkbox-group v-model="checkboxGroup5" size="small">
                              <el-checkbox label="A" border size="medium"></el-checkbox>
                              <el-checkbox label="B" border size="medium"></el-checkbox>
                              <el-checkbox label="C" border size="medium"></el-checkbox>
                              <el-checkbox label="D" border size="medium"></el-checkbox>
                           </el-checkbox-group>
                           {{checkboxGroup5}}
                        </div>
                    </div>
                 </div>
              </div>
              <!-- 交卷的弹出框 -->
              <el-dialog
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span class="title_dialog"><i class="el-icon-question"></i>确认要交卷吗？</span>
                <div class="title_dialog_content">交卷之后将不能在修改答案，既结束本次练习。</div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
          </div>
      </div>    
   </div>
</template>

<script>
import exercises from '@/topic/components/exercises'
export default{
	name:'choice_question',
    data() {
      return {
        mode: true,
        activeId: 1,
        ins:0,
        number:0,
        radio8:'1',
        active: 0,
        dialogVisible:false,
        arr: [{caseType: 'danxuan',id:1},{caseType: 'danxuan',id:1}],
        checkboxGroup5: [],
        topic: {
        tizuId: 1,
        tizuName: '题组一',
        tizuType: '基础会计',
        timu: [
          {
            id: 1,
            caseType: '单选题',
          },{
            id: 2,
            caseType: '单选题',
          },{
            id: 3,
            caseType: '多选题',
          },{
            id: 4,
            caseType: '多选题',
          },{
            id: 5,
            caseType: '计算题',
          },{
            id: 6,
            caseType: '综合题',
          },
        ]
      },
      };
    },
    computed: {
      caseClassify() {
        let obj = {};
        let arr = this.topic.timu;
        for(let i = 0; i<arr.length; i++) {
          obj.hasOwnProperty(arr[i].caseType)? obj[arr[i].caseType].push(arr[i].id) : obj[arr[i].caseType] = [arr[i].id]
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
    handleClose(done) {
    this.$confirm('确认关闭？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
      },
    }
}
</script>
<style scoped>
.container{
  display:flex; 
  background-color:#F0F2F5;
  min-height: 100%;
}
.content_choi{
  height: 100%;
}
.teacTiZu span:hover{
  border:1px solid #157cf0;
}
.content_top{
  height:40px; 
  background:rgba(0,33,64,1);
  position: relative;
}
.teacTiZu{
width: 160px;
margin: 0 auto;
margin-top: 20px;

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
.tizuR {
  min-height: 100%;
  margin-left: 230px;
  transition: all linear .5s;
  -webkit-transition: all linear .5s;
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
.title_dialog{
  position: absolute;
  top: 35px;
  left: 43px;
  font-size:16px;
  font-family:PingFangSC-Medium;
  color:rgba(0,0,0,0.85);
  font-weight: 600;
  display: flex;
  align-items: center;
}
.title_dialog>i{
  display: inline-block;
  color: #FAAD14;
  font-size: 26px;
  margin-right: 20px;
}
.title_dialog_content{
  margin-left: 63px;
  color:rgba(0,0,0,0.65);
  font-size:14px;
  font-family:PingFangSC-Regular;
  margin-top: 20px;
}
.g_bu{
   margin-left: 30px;
}
.g_bu>button>span{
   color:rgba(104,113,120,1);
}
.g_bu>button{
  color: #D8D8D8;
}
.el-button.is-active, .g_bu>button:active{
   background-color:#7ED321;
   border-color: transparent;
   color: #fff;
}
.g_bu>button:focus{
   background-color:#7ED321;
   border-color: transparent;
   color: #fff;
}
.g_bu>button:hover{
   background-color:#7ED321;
   border-color: transparent;
   color: #fff;
}
.g_bu>button:hover{
   background-color:#7ED321;
   border-color: transparent;
   color: #fff;
}
.g_bu>.el-button--medium{
  padding: 10px 40px;
}
.content_top>span>i{
  display: inline-block;
  width:42px;
  height:20px;   
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  line-height:20px;
  font-style: normal;
  margin-left: 24px;
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
  left: 80px;
  font-weight: 400;
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
.solids{
  width: 230px;
  min-height: 100%;
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
  min-height: 100%;
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
  border-radius: 2px ; 
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
.place>p{
  border:1px solid #eee;
  text-align: center;
  width:80px;
  height:32px; 
  background:rgba(24,144,255,1);
  border-radius: 2px ; 
  line-height: 32px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(255,255,255,1);
  cursor: pointer;
}
.place>span{
  display: inline-block;
  width:80px;
  height:32px; 
  background:rgba(255,255,255,1);
  border-radius: 2px ; 
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
</style>