<template>
	<div>
	  <div class="mission" v-if='examine.thirdrouter'>
	        <div class="tea_t">
    	        <el-breadcrumb separator-class="el-icon-arrow-right">
				  <el-breadcrumb-item :to="{ path: '/Educat/Teaching' }">任教管理</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/Educat/Teaching/taskdetail' }">任教详情</el-breadcrumb-item>
				  <el-breadcrumb-item>实训详情</el-breadcrumb-item>
			    </el-breadcrumb>
    	    </div>
    	    <div class="task_top">
    	       <p>{{name}}</p>
    	      <div calss="t_task">
    	       	  <ul class="t_task_t">
    	       	  	<li><b>开始时间:</b>:<span>{{fitime}}</span></li>
    	       	  	<li><b>结束时间:</b><span>{{endtime}}</span></li>
    	       	  	<li><b>参与班级:</b><span>{{tea_class}}</span></li>
    	       	  </ul>
    	       	  <ul class="t_task_t">
    	       	  	<li><b>分值:</b><span>{{grade}}分</span></li>
    	       	  	<li><b>备注:</b><span>{{comments}}</span></li>
    	       	  </ul>
    	      </div>
    	    </div>
    	    <div class="title">
	    	   	<i class="el-icon-info"></i>
	    	   	<span>已评阅：24 人、未评阅：30 人</span>
    	    </div>
    	    <div class="tea_table">
    	   	 <div class="tea_table_top">
    	   	     <ul>
    	   	     	<li
    	   	     	v-for="(itemdata,index) in data" 
    	   	     	:key="index">
			          {{itemdata}}</li>
    	   	     </ul>
    	   	</div>
    	   	<div class="tea_tables">
    	       <table>
			    <tbody class="tabod">
			       <tr 
			       	v-for="(itemgridData,index) in gridData"
			       	:key="index"
			       	>
			        <td 
			        v-for="(item,index) in itemgridData">
			        {{item}}
			        </td>
			      </tr>
			    </tbody>
			  </table>
			</div>
			 <div class="bot">
    	       <span>下载表单</span>
    	     </div>
			 <div class="block"style="padding:20px 0px;">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="Page"
			      :page-sizes="[100, 200, 300, 400]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="400">
			    </el-pagination>
			</div>
    	   </div>
	  </div>
	</div>
</template>

<script>
export default{
	name :'examine',
	data(){
		return{ 
		data:["姓名","学号","班级","得分","排名","阅卷情况"],
		gridData: [
	      { id:'01',name: '基础会计', teacher: '张三',when:'2017-2018年第二学期1', college: '会计学院',classs:'2016级'}
       ],
        Page: 4,
        name:'',
        fitime:'',
        endtime:'',
        tea_class:'',
		grade:'',
		comments:'',
     }
	},
	computed:{
		examine(){
			return this.$store.state
		}
	},
	mounted(){
        this.$store.commit("secondrouterCtrl",false);
        this.httpexam();
	},
    methods:{
    httpexam(){
	   this.$http.post(`${this.$store.state.location}/services/app/Mission/GetMissionsByCourseId`,
	    {
			  "teacherId":0,
			  "courseId": 0,
			  "courseTeacherAssociateId":this.$route.query.id,
			  "maxResultCount":10,
			  "skipCount":0,
	    },{
	     	headers: {
				"Content-Type": "application/json"
				}
	    }).then(res=>{
	    	this.taskdata = res.body.result.items;
	    	for (let i in this.taskdata) {
			  	this.fitime = this.getData(this.taskdata[i].startTime);
				this.endtime =  this.getData(this.taskdata[i].endTime) ;
				this.tea_class = '';
			    this.grade = 0;
			    this.comments = this.taskdata[i].remark;
			    this.grades();
			};
	    },res=>{
		    	console.log('this.$http 的失败') 
	    })
	},
    	// 班级和总分值
  	grades(){
  		for (let i in this.taskdata) {
  			for (let j in this.taskdata[i].classes) {
  			    this.tea_class +=  this.taskdata[i].classes[j].serialNumber+'、';
  			    this.grade += this.taskdata[i].questions[i].questionWeighting
  			}
  		}
  	},
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
	},
    handleCurrentChange(val) {
	    console.log(`当前页: ${val}`);
	},
	getData(str) {
	      	let reg=/[-T:\.]/;
	        let arr = str.split(reg)
	        str = arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4];
	        return str
        },
    },
    destroyed() {
      	this.$store.commit("secondrouterCtrl",true)
    },
}
</script>


<style scoped>
.mission{
     background-color: white;
     padding-top: 10px;
     margin-top: 5px;
}
.tea_t{
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
.tea_table{
   margin-top: 16px;
   font-size:12px;
   font-family:PingFangSC-Regular;
   color:rgba(104,113,120,1);
   margin-left: 25px;
   margin-right: 25px;
}
.tea_table thead{
    height: 48px;
}
.tea_table_top ul{
	display: flex;
	height:48px; 
	background:rgba(248,248,248,1);
	box-shadow: 0px -1px 0px 0px rgba(232,232,232,1);
	border-radius: 2px 2px 0px 0px ; 
	margin-bottom: 0px;
}
.title{
	height: 36px;
	line-height: 36px;
	background-color: rgb(230,247,255);
	margin: 25px;
	border:1px solid rgb(145,213,255);
	border-radius: 4px; 
}
.title>i{
	display: inline-block;
	margin: 0px 10px 0px 20px;
    color: #157cf0;
}
.title>span{
   font-size: 12px;
   font-family:PingFangSC-Regular;
   color: rgba(0,0,0,0.6);
}
ul{
	-webkit-padding-start: 0px;
}
.tea_table_top ul>li{
	text-align: center;
	height: 48px;
	line-height: 48px;
	width: 100%;
}
.tea_tables{
	height: 500px;
}
.tabod>tr>td{
	text-align: center;
    width: 1%;
}
.tabod>tr{
	height: 48px;
	line-height: 48px;
	cursor: pointer;
}
.tabod>tr:hover{
	cursor: pointer;
	background-color: rgba(21,124,240,0.4);
	color: white;
}
.bot{
	width: 100%;
	text-align: right;
}
.bot>span{
    margin-bottom: 20px;
    display: inline-block;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: #157cf0;
    line-height: 24px;
    text-align: center;
    line-height: 40px;
    margin-right: 30px;
    cursor: pointer;
    border: 1px solid #157CF0;
}
.bot>span:hover {
    background: rgba(24,144,255,1);
    border-radius: 4px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    color: rgba(255,255,255,1);
    line-height: 24px;
    text-align: center;
    line-height: 40px;
    margin-right: 30px;
    cursor: pointer;
}
table{ 
    border-collapse:collapse;
    width: 100%;    
}
.tea_table_top ul{
	display: flex;
	height:48px; 
	background:rgba(248,248,248,1);
	box-shadow: 0px -1px 0px 0px rgba(232,232,232,1);
	border-radius: 2px 2px 0px 0px ; 
	margin-bottom: 0px;
}
ul{
	-webkit-padding-start: 0px;
}
.tea_table_top ul>li{
	text-align: center;
	height: 48px;
	line-height: 48px;
	width: 100%;
}
.tea_table_top ul>li:nth-child(1){
	width: 86%;
}
.tea_table_top ul>li:nth-child(2){
	width: 86%;
}
.tea_table_top ul>li:nth-child(5){
	width: 80%;
}
.tabod>tr>td:nth-child(5){
	padding-left: 1%;
}
</style>