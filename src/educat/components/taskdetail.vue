<template>
    <div>  
        <div class="task"v-if="showst.secondrouter">
          <div class="tea_tits">
    	        <el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item :to="{ path: '/Educat/Teaching' }">任教管理</el-breadcrumb-item>
				  <el-breadcrumb-item>任教详情</el-breadcrumb-item>
			    </el-breadcrumb>
    	   </div>
    	   <div class="task_top">
    	       <p>任教详情</p>
    	      <div calss="t_task">
    	       	  <ul class="t_task_t">
    	       	  	<li><b>教师名称:</b>:<span>{{termName}}</span></li>
    	       	  	<li><b>任教课程:</b><span>{{side}}</span></li>
    	       	  	<li><b>任教期间:</b><span>{{when}}</span></li>
    	       	  </ul>
    	       	  <ul class="t_task_t">
    	       	  	<li><b>任教学院:</b><span>{{collega}}</span></li>
    	       	  	<li><b>任教年级:</b><span>{{classs}}</span></li>
    	       	  	<li><b>任教班级:</b><span>{{tea}}</span></li>
    	       	  </ul>
    	      </div>
    	   </div>
    	   <div class="">
    	        <div class="task_tit">
    	           <b>实训详情</b>
    	           <span>共实训{{tot}}次</span>
    	        </div>
    	       <div class="cont_b">
    	       <template 
    	       	v-for="(item,index) in data_list"
    	        >
	    	        <div class="t_task_con">
	    	             <div class="t_task_index">
	    	                 <i></i>{{item.creationTime}}
	    	             </div>
	    	             <div class="details"@click="goto(index)">
	    	                  <div class="details_top">
	    	                  	  <p>{{item.name}}</p>
	    	                  	  <span @click="goto(index)" >查看详情</span>
	    	                  </div>
	    	                  <ul class="details_list">
	    	                  	 <li><b>开始时间:</b><span>{{item.fitime}}</span></li>
	    	                  	 <li><b>结束时间:</b><span>{{item.endtime}}</span></li>
	    	                  	 <li><b>参与班级:</b><span>{{item.tea_class}}</span></li>
	    	                  	 <li><b>总分值:</b><span>{{item.grade}}分</span></li>
	    	                  	 <li><b>备注:</b><span>{{item.comments}}</span></li>
	    	                  </ul>
	    	                  <!--<ul class="details_list">
	    	                  	 <li><b>总分值:</b><span>{{item.grade}}分</span></li>
	    	                  	 <li><b>备注:</b><span>{{item.comments}}</span></li>
	    	                  </ul>-->
	    	             </div>
	    	        </div>
    	        </template>
    	      </div>
    	   </div>
    	   	      <div class="block"style="margin-top:20px;text-align: center;">
			    <el-pagination
					@current-change="handleChange"
					:page-size="page"
					layout="total, prev, pager, next, jumper"
					:total="allData1">
			    </el-pagination>
		 </div>  
	      </div>
        <router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'taskdetail',
  // props:{
  // 	gridData:{}
  // },
  data () {
    return {
    taskdata:[],
    side:'',
    termName:'',
    when:'',
    collega:'',
    classs:'',
    tea:'',
    degree:'',
    dix:'0',
    num:'',
	point:'',
	str:'',
    data_list:[],
    tot:'',
    teacherid:0,
    courseid:0,
    page:2,
    allData1:1,
    currentPage: 1,
	}
  },
    computed: {
        showst() {
		    return this.$store.state
		}
    }, 
    mounted () {
    	this.$store.commit("firstrouterCtrl",false);
	    this.task();
	    this.curtea();
    },
 	methods:{
	  	goto(index){
          	this.$router.push({path:'/Educat/Teaching/taskdetail/examine',query: { id:this.taskdata[index].tenantId}});
	  	},
	  	curtea(){
		    this.$http.post(`${this.$store.state.location}services/app/Course/GetCourseTeacherAssociateById`,
		        {
					"id":this.$route.query.id
		        },{
		         	headers: {
						"Content-Type": "application/json"
						}
		        }).then(res=>{
		        	    this.curdata = res.body.result;
					  	this.side = this.curdata.course.title;
						this.termName = this.curdata.teacherName ;
						this.when = this.curdata.termName;
					    this.collega = this.curdata.departmentName;
					    this.classs = this.curdata.gradeName;
					    this.tea = this.curdata.classIds;
		        	    
		        },res=>{
				    	console.log('this.$http 的失败') 
		        })
	  	},
	  	task(){
	        this.$http.post(`${this.$store.state.location}/services/app/Mission/GetMissionsByCourseId`,
	        {
				  "teacherId":0,
				  "courseId": 0,
				  "courseTeacherAssociateId":this.$route.query.id,
				  "maxResultCount":this.page,
				  "skipCount": (this.currentPage-1)*this.page,
	        },{
	         	headers: {
					"Content-Type": "application/json"
					}
	        }).then(res=>{
	        	    this.allData1 = res.body.result.totalCount;
	        	    this.taskdata = res.body.result.items;
	        	    this.result();
	        },res=>{
			    	console.log('this.$http 的失败') 
	        })
	  	},
	  	result(){
	  		for (let i in this.taskdata) {
	  		 	this.data_list.push({
	  		 		"name":this.taskdata[i].tittle,
	  		 		"fitime":this.time(this.taskdata[i].startTime),
	  		 		"endtime":this.time(this.taskdata[i].endTime),
	  		 		"tea_class":'',
	  		 		"grade":0,
	  		 		"comments":this.taskdata[i].remark,
	  		 		"creationTime":this.time(this.taskdata[i].creationTime),
	  		 	}) 
	  		};
	        this.grade();
	        this.tot = this.taskdata.length;
	  	},
	  //时间
	  	time(time){
	  		for(let i in this.taskdata){
	  			if(time){
			        this.num = time.slice(0,10);
			        this.point = time.slice(11,-7);
			        this.str = this.num.concat(' '+this.point)
	                return  this.str
                }
	  		}
	  	},
	  	// 班级和总分值
	  	grade(){
	  		for (let i in this.taskdata) {
	  			for (let j in this.taskdata[i].classes) {
	  			    this.data_list[i].tea_class +=  this.taskdata[i].classes[j].serialNumber+'、';
	  			    this.data_list[i].grade += this.taskdata[i].questions[j].questionWeighting
	  			}
	  		}
	  	},
	  	handleChange(val) {
			this.currentPage = val;
			this.task();
	    },
  },
	destroyed() {
		this.$store.commit("firstrouterCtrl",true);
	},
 }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
	-webkit-padding-start: 0px;
}
.task{
/*    width: 1240px;*/
	border: 1px solid #E8E8E8;
	min-height: 705px;
	background-color: rgb(255,255,255);
}
.tea_tits{
    margin-top: 16px;
	margin-left: 25px;
}
.task_top{
	padding-left: 25px;
	margin-top: 25px;
	margin-bottom: 10px;
	border-bottom: 10px solid #f0f2f5;
}
.task_top>p{
	font-weight: 600;
}
.t_task_t{
	margin-bottom: 25px;
	display: flex;
}
.t_task_t>li{
	width:30%;
}
.t_task_t>li>b{
	display: inline-block;
	font-weight: 400;
	width:70px;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.85);
	line-height:22px
}
.t_task_t>li>span{
	display: inline-block;
	width:200px;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.65);
	line-height:22px;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.task_tit{
	height: 60px;
	line-height: 60px;
	margin-left: 25px;
	display: flex;
	position: relative;
	align-items: center;
	border-bottom:2px solid #f0f2f5;
    margin-right: 25px;
}
.task_tit>span{
	position: absolute;
	right: 0px;
	top: 0px;
	width:74px;
	height:24px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.65);
}
.task_tit>b{
	display: inline-block;
	width:64px;
	height:24px; 
	font-size:16px;
	font-family:PingFangSC-Medium;
	color:rgba(0,0,0,0.85);
	line-height:24px;
}
.t_task_con{
	border-left: 2px solid #F0F2F5;
	min-height: 200px;
	margin-left: 55px;  
	padding-top: 15px; 
	position: relative;
}
.t_task_index>i{
    display: inline-block;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: #157CF0;
    position: absolute;
    top: 22px;
    left: -6px;
}
.t_task_index{
	height:24px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.65);
	line-height:24px;
	margin-left: 15px;
}
.details{
	margin-top: 10px;
	background:rgba(255,255,255,1);
	border-radius: 2px ;
	border: 1px solid #D8D8D8; 
	margin-left: 15px;
	margin-right: 100px;
	cursor: pointer;
}
.details:hover{
	margin-top: 10px;
	background:rgba(255,255,255,1);
	border-radius: 2px ;
	border: 1px solid #00B0FF; 
	margin-left: 15px;
	margin-right: 100px;
	box-shadow: 0px 0px 6px #00B0FF;
}
.details_top{
	display: flex;
	align-items: center;
	position: relative;
}
.details_top>p{
	height:24px; 
	font-size:18px;
	font-family:PingFangSC-Medium;
	color:rgba(0,0,0,0.85);
	line-height:24px;
	margin-top: 25px;
	margin-left: 25px;
	font-weight: 600;
}
.details_top>span{
	height:24px; 
	font-size:18px;
	font-family:PingFangSC-Medium;
	color:rgba(0,0,0,0.85);
	line-height:24px;
	margin-top: 25px;
	margin-left: 25px;
	position: absolute;
	right: 0px;
	top: 0px;
	margin-right: 25px;
	width:56px;
	height:24px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(24,144,255,1);
	line-height:24px;
	cursor: pointer;
}
.details_list{
	display: flex;
	margin-left: 15px;
	flex-wrap: wrap;
}
.details_list>li>b{
	display: inline-block;
	width:70px;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.85);
	line-height:22px;
	font-weight: 400;
}
.details_list>li>span{
	display: inline-block;
	width:165px;
	height:22px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.65);
	line-height:22px;
}
.details_list>li{
	margin: 10px 10px;
}
.cont_b{
	margin-bottom: 50px;
}
</style>
