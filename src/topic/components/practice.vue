<template>
   <div>
    <div class="content_choi">
      <div class="content_top">
          <p class="titles">基础会计任务一</p>
          <p class="title_con">
          <b @click="descend">全真案例</b> 
          <span>案例数量：(1/{{allData}})</span></p>
      </div>
        <div style="display:flex; background-color:#F0F2F5;">
             <div style="width:100%">
                  <div class="fun">
                      <el-button plain disabled>答案解析</el-button>
                      <span @click="jisaunqi">计算器</span>
                     <div class="place">
                          <span @click = "pre">上一题</span>
                          <span @click = "next">下一题</span>
                          <p @click="dialogVisible = true">提交</p>
                     </div>
                  </div>
                 <div  style="padding-left: 20px;padding-top: 20px;">
                   <exercises :ques = "{unid:knowledgeid,version:versionId}" ></exercises> 
                    <div class="g_bu">
                      <div style="margin-top: 60px"  v-for="(item,index) in topic.answer" :key="index">
                          <el-radio @change="radiochange" v-model="radio" :label="item.content" border size="medium">{{String.fromCharCode(index+65)}}</el-radio>  
                      </div>
                    <div class="g_bu"  v-if="isshow" >
                        <div style="margin-top: 60px">
                            <el-radio v-model="radio" label="A" border size="medium">A</el-radio>
                            <el-radio v-model="radio" label="B" border size="medium">B</el-radio>
                            <el-radio v-model="radio" label="C" border size="medium">C</el-radio>
                            <el-radio v-model="radio" label="D" border size="medium">D</el-radio>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
          </div>
      </div>   
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
</template>

<script>
import exercises from '@/topic/components/exercises'
export default{
	name:'practice',
    data() {
      return {
        mode: true,
        ins:0,
        versionId:1,
        number:0,
        active: 0,
        radio:'',
        isshow:true,
        dialogVisible:false,
        detailsData:'',
        allData:'',
        topic: {
          question: '',
          answer: [],
          auxiliaryData: [
                {
                  text: '3月3日，副总经理吴涵申请借款3000元，用于购买办公用品，经批准，出纳以现金支付。',
                  src: '#'
                }],
          elect:[],
        },
      };
    },
    computed: {
      styleid(){
        return this.$route.query.styleid
      }, 
      tot(){
        return this.$route.query.tot
      },
      knowledgeid(){
        return this.$route.query.knowledge
      }
    },
    components: {
       exercises,
    },
    mounted(){
      this.versionId = this.$route.query.versionId;
       this.topicid = this.$route.query.topicid
       this.practicelist();
    },
    methods:{
    practicelist(){
      this.$http.post(`${this.$store.state.location}/services/app/Question/GetQuestionsByKnowledge`,
          {
              "knowledgeId": this.topicid,
              "maxResultCount":10,
              "skipCount":0,
          },{
            headers: {
              "Content-Type": "application/json",
            }
          }).then(response=>{
              this.practicelist = response.body.result.items;
              this.allData = response.body.result.totalCount;
              console.log(this.practicelist)
          },response=>{
              console.log('题目获取error')
          })
    },
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
    pre(){
      console.log(this.practicelist.length)
      let index = 0;
      for(let i=0; i<this.practicelist.length; i++) {
        if(this.activeId==this.practicelist[i].id) {
          if(i==this.practicelist.length-1) {
            index = i 
          }else {
            index = i+1
          }
        }
      }
      this.activeId = this.practicelist[index].id
    },
    next(){
      console.log(this.practicelist.length)
       let index = 0
        for(let i=0; i<this.practicelist.length; i++) {
          if(this.activeId==this.practicelist[i].id) {
            if(i==0) {
              index = i
            }else {
              index = i-1
            }
          }
        }
        this.activeId = this.practicelist[index].id
    },
    descend(){
        this.$router.push({path:'/Student/trainingCenter/Basic_Accounting',query: { id:this.styleid}});
    },
    radiochange(){
         console.log("这是单选框的点击事件")
    },
    knowledge_list(){
       
    },
    jisaunqi() {

    },
    }
}
</script>
<style scoped>
.content_choi{
    margin: auto;
    padding-bottom: 50px;
}
.content_top{
    height:80px; 
    background:rgba(0,33,64,1);
    position: relative;
}
.content_top>.titles{
    padding-top: 14px;
    padding-left:17px;
    font-size:18px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
}
.title_con{
    padding-top: 10px;
    padding-left:17px;
    height:20px; 
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,0.6);
}
.title_con>b{
  color: #fff;
  margin-right: 50px;
  font-weight: 400;
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
.g_bu{
    margin-left: 30px;
    margin-bottom: 50px;
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
.g_bu>.el-button--medium{
    padding: 10px 40px;
}
.fun>button{
  width:80px;
  height:32px; 
  padding: 0px;
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
    width: 200px;
    min-height: 500px;
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
    line-height: 54px;
    position: relative;
    padding-left: 18px;
}
.fun>span{
    display: inline-block;
    width:80px;
    height:32px; 
    background:rgba(255,255,255,1);
    border:1px solid #eee;
    text-align: center;
    line-height: 32px;
    margin: 0px 7px;
    cursor: pointer;
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(0,21,41,1);
    border-radius: 4px;
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
    line-height: 32px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    cursor: pointer;
    border-radius: 4px;
}
.place>span{
    display: inline-block;
    width:80px;
    height:32px; 
    background:rgba(255,255,255,1);
    border:1px solid #eee;
    text-align: center;
    line-height: 32px;
    margin: 0px 7px;
    cursor: pointer;
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(0,21,41,1);
    border-radius: 4px;
}
.place>span:hover{
    background:rgba(24,144,255,1);
    color: #fff;
}
</style>