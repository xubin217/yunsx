<template>
   <div> 	
      <div class="cot">
           <div class="g_set">
	          <div class="g_set_top">
	              <span>实训题型</span><b>基础会计&nbsp;&gt;&nbsp;错误更正&nbsp;&gt;&nbsp;划线</b>
	              <div class="l_top">
	                   <i></i>
	                   <b>关闭</b>
	              </div>
	          </div>
	          <div class="g_set_bo">
	                <div class="g_set_le">
	                      <div class="g_set_le_to">
	                          <i></i>
	                          <div class="g_inr">
	                              <b>{{choice[0].name}}</b>
	                              <p>请选择唯一个对应的答案。</p>
	                          </div>
	                      </div>
	                      <div class="g_inr_tit">
	                             {{choice[0].title}}
	                      </div> 
	                      <div class="g_inr_xz">
	                           <ul v-for="(item,index) in choice[0].elect"
	                           	:key="index">
	                           	<li><span>【{{item.Letter}}】</span>{{item.options}}</li>
	                           </ul>  
	                      </div>
	                      <div class="g_inr_bu"  v-if="act">
	                          <el-button type="success" size="medium" plain icon="el-icon-success">A</el-button>
	                          <el-button type="success" size="medium" plain icon="el-icon-success">B</el-button>
	                          <el-button type="success" size="medium" plain icon="el-icon-success">C</el-button>
	                          <el-button type="success" size="medium" plain icon="el-icon-success">D</el-button>
	                      </div>
	                      <div class="g_set_re" v-if="act">
	                           <div class="g_set_re_t">
	                                <span>答案解析</span>
	                                <div class="g_set_pre">
	                                     <b>上一题</b>
	                                     <b>下一题</b>
	                                </div>
	                           </div>
	                      </div>
	                      <div class="ts"></div>
	                      <div class="tss"></div>
	                      <div class="consult">
		                     <div class="consult_ti">
		                     	<i></i>
		                     	<b>参考答案：<span>【{{choice[0].answer[0].correct}}】</span></b>
		                     </div>
		                     <div class="consult_bot">
		                         <img src="" alt="" />
		                         <p>{{choice[0].answer[0].cot}}</p>
		                     </div>
	                     </div>
	                </div>
	                <div class="g_set_reig">
	                     <div class="g_set_reig_top">
	                          <img src="../../share/img/img_class_view_Enclosure Copy.png" />
	                          <div class="g_set_reig_p">
	                              <b>附件</b>
	                              <p>点击放大附件，通过缩略图切换</p>
	                          </div>
	                     </div>
	                     <div v-if="act_show" class="g_set_reig_ti">本题没有案例</div>
	                     <div v-if="act" class="g_set_reig_ti">
	                               {{choice[0].adjunct}}
	                     </div>
	                     <div class="g_set_img">
	                     	 <img class="show_img" v-if="act_show" :src="imgs"/>
	                     	 <div v-if="act">
		                         <img 
	                         	  	:src="ss" 
	                         	  	@click="bigshow=!bigshow" 
	                         	  	:class="{big: bigshow}" >
                         	 </div>
	                     </div>
	                     <div 
	                     	class="sides"
	                     	v-if="act" >
	                          <ul class="slide-pages">
							      <li @click="goto(prevIndex)"><i class="pres"></i></li>
							      <li v-for="(item, index) in slides"
							      @click="goto(index)"
							      >
							        <a :class="{on: index === nowIndex}"><img :src="item.src"/></a>
							      </li>
							      <li @click="goto(nextIndex)"><i class="nexts"></i></li>
							  </ul>
	                     </div>
	                </div>
	          </div>
	      </div>
      </div>
   </div>
</template>

<script>
  export default {
    data() {
      return {
       bigshow:false,
       nowIndex:0,
       act_show:false,
       act:true,
       imgs:require('../../share/img/img_unress.png'),
       slides: [
        {
          src: require('../../share/img/Bitmap.png'),
          title: 'xxx1',
        },
        {
          src: require('../../share/img/Bitmap.png'),
          title: 'xxx2',
        },
        {
          src: require('../../share/img/Bitmap.png'),
          title: 'xxx3',
        },
        {
          src: require('../../share/img/Bitmap.png'),
          title: 'xxx4',
        }
       ],
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
          	answer:[
          	   { 
          	   	correct:'B',
          	    cot:'下列各种情况中会导致企业折价发行债券的是下列各种情况中会导致企业折价发行债券的是，下列各种情况中会导致企业折价发行债券的票面利率小于市场利率。'
          	   },
          	],
          	adjunct:'下列各种情况中会导致企业折价发行债券的是下列各种情况中会导致企业折价发行债券的是，下列各种情况中会导致企业折价发行债券的票面利率小于市场利率。'
          }
       ]
      }
    },
	  computed: {
	  	ss(){
	  		if(this.slides.length > 0 ){
	  			return this.thiss = this.slides[this.nowIndex].src
	  		}
	  		else{
	  		
	  		}
	  	},
	    prevIndex () {
	     if (this.nowIndex === 0) {
	        return this.slides.length - 1
	      }
	      else {
	        return this.nowIndex - 1
	      } 
	    },
	    nextIndex () {
	      if (this.nowIndex === this.slides.length - 1) {
          return 0
	      }
	      else {
	        return this.nowIndex + 1
	      }
	    }
	  },
	methods: {
	    goto (index) {
	      this.isShow = false
	      setTimeout(() => {
	        this.isShow = true
	        this.nowIndex = index
	      }, 10)
	    },
	  },
	   mounted(){
    	if(this.slides == ''){
    		this.act  = false,
    		this.act_show  = true
    	}else{
    		this.slides = this.slides
    	}
    }
	}
</script>
<style>
.big{
  transform: scale(2);
  position: fixed;
  margin: auto;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 10;
  position: fixed;
}
.g_set_bo{
	margin-bottom: 15px;
	display: flex;
}
.cot{
	width: 100%;
	height: 100%;
	background-color:rgb(240,242,245);
}
.g_set{
	 padding-top: 80px;
	 margin: auto;
	 width: 960px;
}
.g_set_top{
	width:960px;
	height:78px; 
	background:rgba(255,255,255,1);
	border-radius: 6px ;
	line-height: 78px;
	position: relative;
	margin-bottom: 20px;
}
.g_set_top>span{
    width:56px;
	height:20px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(36,56,71,1);
	line-height:20px;
	margin-left: 40px;
	font-weight: 600;
}
.g_set_top>span::after{
    content: '';
    position: absolute;
    top:55px;
    left: 40px;
    width: 56px;
    height: 5px;
    background-color: #157CF0;
    border-radius: 6px;
}
.g_set_top>b{
   font-weight: 400;
   display: inline-block;
	height:20px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(110,118,143,1);
	line-height:20px;
	margin-left: 25px;
}
.l_top{
	  float: right;
	  width: 100px;
	  height: 40px;
	  line-height: 40px;
	  display: flex;
	  align-items: center;
	  margin-top: 20px;
	  cursor: pointer;
}
.g_set_top>.l_top>i{
   display: inline-block;
   width: 30px;
   height: 30px;
   background-image: url(../../share/img/close.png);
   background-repeat: no-repeat;
}
.g_set_top>.l_top>b{
	width:37px;
	height:25px; 
	font-size:18px;
	font-family:PingFangSC-Regular;
	color:rgba(110,118,143,1);
	line-height:21px;
	font-weight: 400;
	margin-left: 6px;
}
.g_set_le{
	width:470px;
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
}
.g_set_le_to{
	display: flex;
	align-items: center;
	width: 90%;
	margin: auto;
	padding-top: 25px;
	padding-bottom: 25px;
	border-bottom: 1px solid #EEEEEE;
}
.g_set_le_to>i{
	display: inline-block;
	width:47px;
	height:47px; 
	background-image:url(../../share/img/Icon_baseCopy.png);
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 10px;
	
}
.g_inr>p{
	width:144px;
	height:20px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(152,152,152,1);
	line-height:20px;
}
.g_inr>b{
	display: inline-block;
	width:48px;
	height:20px; 
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:rgba(50,60,71,1);
	line-height:20px;
}
.g_inr_tit{
    width:430px;
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(66,66,78,1);
	line-height:24px;
	text-indent: 20px;
    margin: auto;
    word-break: break-all;
    border-bottom: 1px solid #DDDDDD;
    margin: 15px auto;
    padding-bottom: 15px;
}
ul{
	-webkit-padding-start: 0px;
}
.g_inr_xz{
	width: 90%;
	margin: auto;
	border-bottom: 1px solid #DDDDDD;
}
.g_inr_xz>ul>li>span{
	width:38px;
	height:20px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,176,255,1);
	line-height:20px;
}
.g_inr_xz>ul>li{
	margin: 14PX 0PX;
	display: flex;
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(66,66,78,1);
	line-height:20px;
}
.g_inr_bu{
	width: 90%;
	margin: auto;
	margin-top: 20px;
	margin-bottom: 20px;
}
.g_inr_bu .el-button--medium 
{
    padding: 10px 30px;
    font-size: 14px;
    border-radius: 4px;
}
.g_set_re{
	width:470px;
	height:60px; 
	background:rgba(248,248,248,1);
}
.g_set_re_t{
	width: 90%;
	margin: auto;
	height: 60px;
	margin-bottom: 25px;
	display: flex;
	align-items: center;
}
.g_set_pre{
	margin-left: 32%;
}
.g_set_re_t>span{
	display: inline-block;
	width:56px;
	height:20px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(247,118,118,1);
	line-height:20px;
}
.g_set_pre>b{
	display: inline-block;
	font-weight: 400;
	width:94px;
	height:34px; 
	background:rgba(255,255,255,1);
	border-radius: 3px ; 
	text-align: center;
	line-height: 34px;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(110,118,143,1);
	cursor: pointer;
	margin-right: 16px;
}
.g_set_pre>b:hover{
	background:rgba(0,176,255,1);
	border-radius: 3px ; 
	color: white;
}
.ts{
	width: 100%;
	height: 30px;
	background-color: white;
	border-radius: 6px;
}
.tss{
	width: 100%;
	height: 15px;
	background-color: rgb(248,248,248);
   	margin-bottom: 20px;
}
.consult{
	margin-top: 15px;
	width:470px;
	height:165px; 
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	margin-bottom: 10px;
}
.consult_ti{
	width: 90%;
	margin: auto;
	height: 57px;
	line-height: 57px;
	border-bottom:1px solid #DDDDDD;
	display: flex;
	align-items: center;
}
.consult_ti>i{
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url(../../share/img/icon_view.png);
	background-position: center;
	background-repeat: no-repeat;
}
.consult>.consult_ti>b{
	display: inline-block;
	width:90%;
	height:22px; 
	font-size:16px;
	margin: 0 auto;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,1);
	line-height:22px;
}
 .consult>.consult_ti>b>span{
	display: inline-block;
	color:rgba(126,211,33,1);
}
.consult_bot{
    display: flex;
    align-items: center;
    width: 90%;
    margin:0  auto;
    margin-top: 15px;
}
.consult_bot>img{
	display: inline-block;
	width:44px;
	height:53px; 
	margin-right: 33px;
	background-image: url(../../share/img/img_light.png);
	background-position: center;
	background-repeat: no-repeat;
}
.consult_bot>p{
	width:353px;
	height:72px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(66,66,78,1);
	line-height:24px;
	text-indent: 20px;
	word-break: break-all;
}
.g_set_reig{
	width:470px;
	height:465px; 
	background:rgba(255,255,255,1);
	border-radius: 6px ;
	margin-left: 20px;
}
.g_set_reig_top{
	width: 90%;
	margin: auto;
	display: flex;
	margin-top: 25px;
	margin-bottom: 25px;
}
.g_set_reig_top>img{
	display: inline-block;
	width:42px;
	height:42px; 
	border-radius: 4px ; 
	margin-right: 10px;
}
.g_set_reig_p>b{
	width:32px;
	height:20px; 
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:rgba(50,60,71,1);
	line-height:20px;
}
.g_set_reig_p>p{
	width:168px;
	height:20px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(152,152,152,1);
	line-height:20px;
}
.g_set_reig_ti{
	width: 90%;
	margin: auto;
	width:418px;
	/*height:70px;*/ 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(152,152,152,1);
	line-height:20px;
	border-bottom: 1px solid #E8E8E8;
	padding-bottom: 10px;
}
.g_set_img{
	border:1px solid  rgb(231,231,231);
	width:430px;
	height:210px; 
	margin: auto;
	margin-top: 10px;
	display: flex;
	justify-content: center;
}
.g_set_img>img{
	z-index: 100;
	cursor: pointer;
}
.sides{
	height: 50px;
	width: 90%;
	margin: auto;
	margin-top: 15px;
	position: relative;
}
.pres{
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url(../../share/img/icon_arrow_left.png);
	background-repeat: no-repeat;
	position: absolute;
	top: 30%;
	left: 2%;
	cursor: pointer;
}
.nexts{
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url(../../share/img/icon_arrow_right.png);
	background-repeat: no-repeat;
	position: absolute;
	top: 30%;
	right: 2%;
	cursor: pointer;
	
}
.sides> ul{
	width: 80%;
	height: 50px;
	margin: auto;
	display: flex;
	align-items: center;
}
.sides> ul>li img{
    display: inline-block;
	width: 41px;
	height: 41px;
}
.on{
	display: inline-block;
	width: 43px;
	height: 43px;
	border: 1px solid #157CF0;
}
.sides> ul>li{
    margin: 0px 5px;
}
</style>