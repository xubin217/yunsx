<template>
  <div class="">
    <div class="man">
    	   <p>门户管理</p>
    	   <div class="man_tit">
    	   	    <ul>
    	   	    	 <li>照片</li>
    	   	    	 <li>类型</li>
    	   	    	 <li>尺寸规范</li>
    	   	    	 <li>上传时间</li>
    	   	    	 <li>操作</li>
    	   	    </ul>
    	   </div>
    	   <div class="man_cot">
    	       <ul v-for="(item,index) in data">
    	       	<li><img :src="item.img" alt="" /></li>
    	       	<li><span>{{item.genre}}</span></li>
    	       	<li><span>{{item.size}}</span></li>
    	       	<li><span>{{item.endtime}}</span></li>
    	       	<li><a href="#">{{item.comments}}</a></li>
    	       </ul>
    	   </div>
    	   <div class="man_bo">
    	       <p>上次传图片要求</p>
    	       <ul>
    	       	<li>1、上传图片保证格式为png、jpg格式</li>
    	       	<li>2、logo图片上传请保证格式必须为png格式。</li>
    	       	<li>3、尺寸规范要求，banner（1920*482px），logo（480*80px），注：px为像素单位。</li>
    	       	<li> 4、下列一提供设计模板，可以下载。</li>
    	       </ul>
    	   </div>
    	   <div class="man_bo_index"><a href="#">下载设计模板</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manaportal',
  data () {
    return {
    data:[
       {
       	img: require('../../share/img/img_minibanner_login@2x.png'),genre:'banner',size:'1920*482',endtime:'2018-02-02',comments:'更换照片' 
       },
       {
       	img: require('../../share/img/logo_Dark.png'),genre:'logo',size:'480*80',endtime:'2018-02-02',comments:'更换照片' 
       },
     ]
    }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.man{
	padding-left: 25px;
	background-color: white;
	padding-bottom: 60px;
}
.man>p{
	padding-top: 10px;
	margin-top: 4px;
	width:48px;
	height:20px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
	line-height:20px;
}
ul{
	    -webkit-padding-start: 0px;
}
.man_tit{
	margin-top: 25px;
	height:48px; 
	background:rgba(248,248,248,1);
	box-shadow: 0px -1px 0px 0px rgba(232,232,232,1);
	border-radius: 2px 2px 0px 0px ; 
}
.man_tit>ul{
	display: flex;
}
.man_tit>ul>li{
	width: 20%;
	height: 48px;
	line-height: 48px;
	padding-left: 30px;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
}
.man_cot>ul{
	display: flex;  
	height: 80px;
	border-bottom: 1px solid #E8E8E8;
	line-height: 80px;
}
.man_cot>ul>li{
	width: 20%;
	margin-left: 30px;
	display: flex;
	align-items: center;
}
.man_cot>ul>li>span{
	display: inline-block;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.45);
	line-height:22px;
}
.man_cot>ul>li>a{
	display: inline-block;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.45);
	line-height:22px;
   color:#157CF0 ;
   cursor: pointer;
}
.man_cot>ul>li>img{
	display: inline-block;
	width:100px;
	max-height: 48px;
	border-radius: 2px ;
}
.man_bo>p{
	height:20px; 
	font-size:18px;
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
	line-height:20px;
}
.man_bo>ul>li{
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.4);
	line-height:28px;
}
.man_bo_index>a{
	display: inline-block;
	margin-top: 20px;
	cursor: pointer;
	width:120px;
	height:40px; 
	background:rgba(255,255,255,1);
	border-radius: 2px ; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
	line-height:20px;
	border:1px solid #A5B7C5;
	line-height: 40px;
	text-align: center;
	margin-bottom: 50px;
}
.man_bo_index>a:hover{
	display: inline-block;
	background:#157cf0;
	color:#fff;
	border:1px solid #157cf0;
}
</style>