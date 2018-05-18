<template>
   <div>
	   <div class="Basic">
           <div class="Basic_content">
            <div style="width:960px;margin:0 auto;">
              <div class="nav">
	   	    	 <el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/Student/trainingCenter'}">实训中心</el-breadcrumb-item>
				  <el-breadcrumb-item>{{eattr.listName}}</el-breadcrumb-item>
				</el-breadcrumb>
	   	    </div>
			 <div class="whiteBox booktop">
		        <img :src="bookAttr.src" height="180" width="224" class="bookimg">
		        <div class="book">
		          <h3>{{eattr.listName}}</h3>
		          <span class="upload">{{bookAttr.turnover}}</span>
		          <p>{{eattr.text}}</p>
		          <p class="ico">
		            <span class="one" @click="setDailog=true">
		              {{eattr.tea}}老师
		            </span>
		            <span class="three">{{bookAttr.topic}}题</span>
		          </p>
		        </div>
		      </div>
            </div>
	      </div>
	      <div style="background:rgba(250,250,250,1);">
	      	<div style="width:960px;margin:0 auto;">
	     	 <div class="Basic_index_bot">
	       		<detailscon></detailscon>
	         </div>
			      <router-view />
	         </div>
		   </div>
	     </div>
   </div>
</template>

<script>
import detailscon  from '@/student/components/courseTraining/detailscon'
export default{
  name:'Basic_Accounting',
	data(){
		return {
		    eattr:{
				listImg:'',
				listId:'',
				listName:'',
				text: '',
				tea :''
			},
		    bookAttr: {
	        	name: '',
		        turnover:'17年8月更新',
		        teacher:'',
		        src: require('../../share/img/image_class_cover.png'),
		        text: '',
		        topic: 1234
	        },
	         teac: {
		        classone: ["暂无"],
		        classtwo: "暂无",
	        },
	    }
	},
	mounted () {
	    this.$store.commit("firstrouterCtrl",false);
	    if(sessionStorage.hasOwnProperty("kcname")) {
	    	this.eattr.listName = sessionStorage.getItem("kcname")
	    }else {
	    	// window.location.href = '#/Student/trainingCenter';
	    };
	    this.details();
 	},
 	methods:{
 		details(){
		    this.$http.post(`${this.$store.state.location}services/app/Course/GetCourseTeacherAssociateById`,{
	                'id':this.$route.query.id
	            },{
	                headers: {
	                    "Content-Type": "application/json",
	            }
	            }).then(response=>{
	              this.detailsData = response.body.result;
	              this.detailslist();
	            },response=>{
	              console.log(  'error')
	           })
		    },
	    detailslist(){	    	
          this.eattr.listId = this.detailsData.course.title;
          this.eattr.listName =  this.detailsData.course.title;
          this.eattr.text = this.detailsData.course.introduction;
          this.eattr.tea = this.detailsData.teacherName;
        },
 	},
	computed: {
	      Basic(){
	      return this.$store.state
		},
	},
	components: {
		detailscon,
	},
	destroyed() {
	    this.$store.commit("firstrouterCtrl",true)
	},
}
</script>

<style scoped>
.nav{
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.45);
	line-height:22px;
	padding: 21px 0px;
}
.Basic_content{
    border-bottom: 2px solid #FAFAFA;
    background:rgba(255,255,255,1);
    margin-bottom: 50px;
}
.nav .el-breadcrumb__inner, .el-breadcrumb__inner a{
	display: inline-block; 
	color:rgba(0,0,0,0.45);
}
.upload{
    width:90px;
	height:20px; 
	background:rgba(0,0,0,0.2);
	border-radius: 8px ;
	position: absolute;
	top: 0px;
	right: 25px;
	font-size:12px;
	font-family:HelveticaNeue;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 20px;
}
.Basic>p{	
	font-size: 16px;
	margin-bottom: 20px;
	margin-top: 30px;
}
.Basic>p b{
	color: #666;	
	font-size: 16px;
	font-weight: 400;
	padding: 0 10px;
}
.Basic{
	min-height: 700px;
	margin: auto;
	background-color: white;
}
.Basic_index_top{
	width: 1000px;
    height: 205px;
    border: 1px solid #eee;
    display: flex;
    position: relative;
    background:rgba(255,255,255,1);
    border-radius: 6px ; 
    box-shadow: 0px 2px 9px rgba(0,0,0,0.03);
}
.whiteBox {
  background: white;
  border-radius: 6px;
  position: relative;
  display: flex;
}
.book {
  height: 180px;
  margin-left: 20px;
  position: relative;
  padding-right: 20px;
  padding: 0px 20px 0 0;
  margin-bottom: 50px;
  width: 100%;
}
.book h3 {
  font-size: 16px;
  color: rgba(66,66,78,1);
  line-height: 20px;
  margin-bottom: 15px;
}
.book p {
  font-size: 12px;
  color: rgba(104,113,120,1);
  line-height: 20px;
  /*width: 960px;*/
  width: 100%;
  height:20px;
}
.book .ico {
  position: absolute;
  bottom: 0px;
  font-size: 14px;
  color: rgba(36,56,71,1);
  line-height: 20px;
  display: block;
  width: 100%;
  padding-right: 120px;
}
.book .ico>span {
  padding-left: 35px;
  line-height: 25px;
  margin-right: 5px;
  height: 25px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 7px 3px;
  color:rgba(0,0,0,0.45);
}
.book .ico .one {
  background-image: url('../../share/img/icon_class_classdata_normalcopy.png');
  color: #00B0FF;
  font-size:14px;
  font-family:PingFangSC-Regular;
  line-height:27px;
}
.book .ico .three {
  position: absolute;
  right: 25px;
  top: 0;
  background-image: url('../../share/img/icon_class_count_normal.png');
}
.anli {
  position: absolute;
  right: 37px;
  bottom: 48px;
  width: 120px;
  height: 40px; 
  background-color: rgba(0,176,255,1);
  background-repeat: no-repeat;
  background-position: 14px 9px;
  background-image: url('../../share/img/icon_class_mouse.png');
  border-radius: 7px;
  color: rgba(255,255,255,1);
  line-height: 40px;
  text-indent: 50px;
  font-size: 14px;
}
.anli:hover {
  background-color: #F99090;
}
.Basic_index_top>a{
	display: inline-block;
	width: 120px;
    height: 160px;
    line-height: 160px;
    margin-left: 30px;
    overflow: hidden;
    margin-top: 20px;
}
.Basic_index_top_rig{
	width: 766px;
	height: 160px;
	margin-left: 20px;
    margin-top: 20px;
}
.Basic_index_top>span{
    position: absolute;
    left: 30px;
    top: 140px;
    width: 120px;
    height: 40px;
    line-height: 40px;
    background: inherit;
    background-color: rgba(242, 242, 242, 0.6);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    text-align: center;
}
.Basic_index_top_rig>p{
	width:50%;
	height:20px; 
	font-size:16px;
	font-family:PingFangSC-Medium;
	color:rgba(66,66,78,1);
	line-height:20px;
	margin-bottom: 20px;
}
.Basic_index_top_rig>span{
	display: inline-block;
	width: 750px;
	height: 100px;
	text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
    color: #797979;
    line-height: 22px;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
	line-height:20px;
}
.Basic_index_top_rig>b{
	display: inline-block;
	font-weight: 400;
	display: flex;
    align-items: center;
}
.Basic_index_top_rig>b>i{
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../share/img/icon_setclass_normal@2x.png);
	margin-right:11px ;
}
.Basic_index_top_rig>b>i:hover{
	background: url(../../share/img/icon_setclass_normal_copy@2x.png);	 
}
.Basic_index_bot{
	
}
</style>