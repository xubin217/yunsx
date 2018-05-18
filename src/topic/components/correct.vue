<template>
   <div>
    <div class="content_choi">
      <div class="content_top">
          <p>基础会计任务一</p>
      </div>
        <div style="display:flex; background-color:#F0F2F5;">
             <div style="width:100%">
                  <div class="fun">
                      <span @click="daanjiexi">答案解析</span>
                      <span @click="jisaunqi">计算器</span>
                     <div class="place">
                          <span>上一题</span>
                          <span>下一题</span>
                          <p>提交</p>
                     </div>
                  </div>
                 <div  style="padding-left: 20px;padding-top: 20px;">
                   <exercises :ques="{unid:'',version:1}" ></exercises> 
                    <div class="g_bu"  v-if="isshow" >
                        <el-button  size="medium" plain icon="el-icon-success">A</el-button>
                        <el-button  size="medium" plain icon="el-icon-success">B</el-button>
                        <el-button  size="medium" plain icon="el-icon-success">C</el-button>
                        <el-button  size="medium" plain icon="el-icon-success">D</el-button>
                    </div>
                 </div>
              </div>
          </div>
      </div>    
   </div>
</template>

<script>
import exercises from '@/topic/components/exercises'
export default{
	name:'correct',
    data() {
      return {
        mode: true,
        ins:0,
        number:0,
        active: 0,
        isshow:false,
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
      };
    },
    computed: {

    },
    components: {
      exercises,
    },
    methods:{
    aa(index) {
      this.number = index  
      this.ins = index
      },
    chakandaan() {

    },
    daanjiexi() {

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
}
.g_bu>button>span{
   color:rgba(104,113,120,1);
}
.g_bu>button{
   color: #D8D8D8;
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