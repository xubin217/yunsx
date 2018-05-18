<template>
   <div>
      <div class="content_choi">
        <div class="content_top">
            <p>基础会计任务一</p>
            <span><i>倒计时</i><b>60 小时 26 分</b><i class="icom"></i></span>
        </div>
         <div style="display:flex; background-color:#F0F2F5;">
            <div class="solids" :class="mode ? '':'s' " :style="mode ? 'width:0px':'width:230px'">
                  <div class="btn":class="mode ? 'el-icon-d-arrow-left':'el-icon-d-arrow-right' " @click ="mode = !mode"></div>
                  <div class="genre" >
                  <!--     <ul v-for="(item,index) in productList" :key="index">
                          <p>{{item.title}}(20)</p>
                          <li v-for="(itemlist,index) in item.list.length"><a @click = "aa(index)"  :class="{'activelist':ins === index}">{{itemlist}}</a></li>
                      </ul> -->
                      <ul v-for="(item,index,) in choice":key="index">
                         <P>{{item.name}}</P>
                         <li ><a @click = "aa(index)"  :class="{'activelist':ins === index}">{{index+1}}</a></li>
                      </ul>
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
                            <p>交卷</p>
                       </div>
                   </div>
                   <div>
                        <topic :itemContent = "choice[number]" ></topic> 
                       <div class="g_bu" >
                          <el-button type="success" size="medium" plain icon="el-icon-success">A</el-button>
                          <el-button type="success" size="medium" plain icon="el-icon-success">B</el-button>
                          <el-button type="success" size="medium" plain icon="el-icon-success">C</el-button>
                          <el-button type="success" size="medium" plain icon="el-icon-success">D</el-button>
                      </div>
                   </div>
               </div>
           </div>
      </div>    
   </div>
</template>

<script>
import topic from '@/student/components/topic'
export default{
	name:'choice_question',
    data() {
      return {
        mode: true,
        ins:0,
        number:0,
        choice:[
          {
            name:'单选题',
            title:'下列各种情况中会导致企业折价发行债券的是下列各种情况中会导致企业折价发行债券的是，下列各种情况中会导致企业折价发行债券的是( )。',
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
          {
            name:'单选题',
            title:'111。',
            elect:[
              {
                Letter:'A',
                options:'闺女'
              },
              {
               Letter:'B',
               options:'ccc'
              },
              {
                Letter:'C',
                options:'11'
              },
              {
                Letter:'D',
                options:'以上都不对'
              }
            ],
          },
       ],
        active: 0,
      };
    },
    computed: {
    },
    components: {
      topic,
    },
    methods:{
    aa(index) {
      this.number=index  
      this.ins = index
      }
    }
}
</script>


<style scoped>
.content_choi{
    padding-top: 100px;
    margin: auto;
    padding-bottom: 50px;
    max-width: 1366px;
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
    height: 500px;
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
.place>p:hover{
   

}
</style>