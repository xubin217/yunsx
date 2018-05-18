<template>
	<div>
		<div class="subject" >
              <p>{{itemContent.title}}</p>
              <div class="select">
              	  <ul>
              	  	<li v-for="(item,index) in itemContent.elect"><b>【{{item.Letter}}】</b><span>{{item.options}}</span></li>
              	  </ul>
	               <b class="show"  @click = "subjectss">{{eie}}</b>
                  <div class="subsidiary" v-if = "subjects"  v-drag="greet" >
                  	  <div class="tit">
                  	  	 <p>这里是辅助资料名称</p>
                  	  </div>
                  	  <div class="caption">3月3日，副总经理吴涵申请借款3000元，用于购买办公用品，经批准，出纳以现金支付。</div>
                  	  <div class="sub_con">
                  	  	   <div class="sides">
	                          <ul class="slide-pages">
							      <li @click="goto(prevIndex)" ><i class="pres"></i></li>
							      <li>
							         <img class="imgs" 
							         :src="slides[nowIndex].src" 
							         @click="bigshow=!bigshow" 
	                         	  	 :class="{big: bigshow}"
	                         	  	  />
	                         	  	  <div class="num">{{nowIndex+1}}/{{slides.length}}</div>
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
export default{
	name:'topic',
	props:{
		itemContent:{
           type: Object,
           default: '没有数据'
		}
	},
	directives:{
	  drag:{
	  	bind:function (el, binding) {
            let oDiv = el; 
            let self = this; 
            oDiv.onmousedown = function (e) {
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;
                document.onmousemove = function (e) {
                    let l = e.clientX - disX;
                    let t = e.clientY - disY;
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    binding.value({x:e.pageX,y:e.pageY})
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                 };
            };
        }
	  }
	},
	data() {
        return{
        subjects:false,
        eie:'显示辅助资料',
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
        val: '123',
        style: {
            width: '100px',
            height: '100px',
            background: 'aqua',
            position: 'absolute',
            right: '30px',
            top: 0
        },
       nowIndex:0,
       bigshow:false
       }
    },
  computed: {
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
	      setTimeout(() => {
	        this.nowIndex = index
	      }, 10)
	    },
	    subjectss(){
	    	this.subjects = !this.subjects;
	    	if(this.subjects == true)
	    	 {
               this.eie = '隐藏' 
	    	 }else{
	    	   this.eie = '显示辅助资料'
	    	 }
	    },
      greet(val){
                this.val = val;
            }
	 },
}
</script>
<style scoped>
ul{
	list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
}
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
.imgs{
	cursor: pointer;
}
.on{
   border: 1px solid red;
}
.num{
	position: absolute;
	top: 13px;
	left: 19px;
	width:24px;
	height:24px; 
	background:rgba(0,0,0,0.6);
	width:19px;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 24px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
.el-carousel__item:nth-child(2n) {
 	background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
 	background-color: #d3dce6;
}
.slide-pages{
	height: 262px;
	width: 100%;
}
.subject{
	margin: 30px;
	position: relative;
}
.subject>p{
	width:70%;
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:rgba(21,30,38,1);
	line-height:28px;
	white-space: normal;
	word-break: break-all;
}
.select{
    
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
	top: 109px;
	left: -3%;
	cursor: pointer;
}
    .nexts{
	display: inline-block;
	width: 20px;
	height: 20px;
	background-image: url(../../share/img/icon_arrow_right.png);
	background-repeat: no-repeat;
	position: absolute;
	top: 109px;
	right: -3%;
	cursor: pointer;
	
}
.select>ul{
	-webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
	border-bottom: 1px dashed #A5B7C5;
	padding-bottom: 50px;
	margin-bottom: 25px;
}
.select>ul>li{
	margin: 15px 0px;
}
.select>ul>li>b{
    width:42px;
	height:24px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(21,30,38,1);
	line-height:24px;
}
.select>ul>li>span{
	display: inline-block;
	height:24px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(21,30,38,1);
	line-height:24px;
}
.subsidiary{
	width:500px;
	height:372px; 
	background:rgba(255,255,255,1);
	box-shadow: 0px 0px 6px 0px rgba(155,155,155,1);
	border-radius: 4px ; 
	position: absolute;
	top:0px;
	right:0px;
	z-index: 100;
/*     -webkit-transition: all .5s linear;
        -moz-transition: all .5s linear;
             transition: all .5s linear;*/

}
.tit{
    width:500px;
	height:30px; 
	background:rgba(0,33,64,1);
	border-radius: 4px 4px 0px 0px ; 
	display: flex;
}
.tit>p{
    width:162px;
	height:30px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,1);
	line-height:30px;
	margin-left: 14px;
}
.show{
	letter-spacing:3px;
	border-radius: 4px;
	display: inline-block;
	font-weight: 400;
	height:24px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,1);
	line-height:24px;
	margin-left: 57%;
	cursor: pointer;
	position: absolute;
	top: 4px;
    right: 9px;
    z-index: 100;
    padding: 0px 10px;
    background: rgba(0,33,64,1);
    z-index: 101;
}
.caption{
	width:90%;
	margin: auto;
	height:48px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(21,30,38,1);
	line-height:24px;
    margin-top: 15px;
    margin-bottom: 10px;	
}
.sub_con{
	width:488px;
	height:262px;
	margin: auto;
}
</style>