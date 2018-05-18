<template>
    <div>  
    	<div class="tea_top"v-if="showst.firstrouter">
    	   <div class="tea_tit">
			    <div class="topBox">
			        <p>任教管理</p>
			    </div>
    	   </div>
    	   <div class="tea_cot">
    	   	<b>任课课程</b>
    	       <template>
				  <el-select v-model="values_select" @change="changeselect" clearable  placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.label"
				      size="mini">
				    </el-option>
				  </el-select>
			  </template>
			 <div class="el-table-fil">
				  <b>任教时间</b>
				  <template>
					  <el-select v-model="values_index" @change="changeClass" clearable placeholder="请选择">
					    <el-option
					      v-for="item in options_index"
					      :key="item.value"
					      :label="item.label"
					      :value="item.label"
					      size="mini">
					    </el-option>
					  </el-select>
				  </template>
			 </div>
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
			       	v-for="(itemg,index) in gridDataitemindex"
			       	:key="index"
			       	@click="go(index)"
			       	>
			       	<td>{{ currentPage4<2? `0${index+1}`: index+1+(10*(currentPage4-1))}}</td>
			        <td 
			        v-for="(item,index) in itemg">
			        {{item}}
			        </td>
			      </tr> 
			    </tbody>
			  </table>
			 </div>
    	   </div>
    	   <div class="bot">
    	       <span>下载表单</span>
    	   </div>
    	    <div class="block">
			    <el-pagination
			      @current-change="handleCurrentChange"
			      :current-page="currentPage4"
			      :page-size="page"
			      layout="total, prev, pager, next, jumper"
			      :total="tot">
			    </el-pagination>
			</div>
    	</div>
         <router-view></router-view>
         <!-- input框关闭没有事件 -->
         <!-- 计算属性问题 -->
        {{coursenumber}}
        {{coursetrem}}
	</div>
</template>

<script>
export default {
  name: 'Teaching',
  data () {
    return {
    	getall: {},
    	values_select: '',
    	couese: 0,
    	values_index: '',
    	time: 0,
    	g:'0',
		options: [],
		grade:{},
		gridData:{},
		tot:10,
		course:true,
        options_index: [],
        data:["序号","任教课程","任教教师","任教时间","任教院校","任教年级","任教班级","实训次数"],
        gridDataitemindex: [],
        gridDataitem: [],
        currentPage4: 1,
        page: 2,
     }
	},
	mounted() {
		this.classindex();
		this.selecttime();
		this.getUserInfo();
		this.$http.post(`${this.$store.state.location}/services/app/Course/GetAll`,
		{
			"published": true,
			"isActive": true,
			"filter": ""
		},{
			headers: {
				"Content-Type": "application/json"
			}
		}).then(response=>{
			this.getall = response.body.result;
		},response=>{
			console.log("error")
		})	
	},
	computed: {
	    showst() {
	    	return this.$store.state
	    },
	    coursenumber(){
            for(let i in this.gridData){
                for(let j in this.getall.items){
		            if(this.gridData[i].courseId == this.getall.items[j].id){
		             this.gridDataitemindex[i].name = this.getall.items[j].title
                }
            }
          }
	    },
	    coursetrem(){
            for(let i in this.gridData){
                for(let j in this.grade.items){
		            if(this.gridData[i].termName ==  this.grade.items[j].termName ){
		             this.gridDataitemindex[i].when = this.grade.items[j].termName
                }
            }
          }
	    },

    },
	methods: {
		pipeiData() {
			this.gridDataitemindex = [];
            for(let i in this.gridData){
	            this.gridDataitemindex.push({
	            	 'name':'', 
	            	 'teacher': this.gridData[i].teacherName,
	            	 'when':'', 
	            	 'college':this.gridData[i].departmentName,
	            	 'classs':this.gridData[i].gradeName,
	            	 'tea_class':this.gridData[i].classIds,
	            	 'degree':this.gridData[i].missionCount
	            })
          }
		},
		changeselect(){
			if(this.values_select=="") {
				this.couese = -1;
				return
			}
			for(let i in this.options) {
				if(this.options[i].label == this.values_select) {
					this.couese = this.options[i].value;
				}
			}
			this.getUserInfo()
		},
		// 时间
		changeClass() {
			if(this.values_index=="") {
				this.time = '';
				return
			}
			for(let i in this.options_index) {
				if(this.options_index[i].label == this.values_index) {
					this.time = this.options_index[i].value;
				}
			}
			this.getUserInfo()
		},
		// 任教课程
		initoptions() {
			this.options =[];
			for(let i in this.getall.items) {
				this.options.push({
					'label': this.getall.items[i].title,
					'value': this.getall.items[i].id
				})
			}
		},
		// 任教时间
		gradetime() {
			this.options_index = [];
			for(let i in this.grade.items) {
				this.options_index.push({
					'label': this.grade.items[i].termName,
					'value': this.grade.items[i].id 
				})
			}
		},
	    go(index){
	    	this.$router.push({ path:'/Educat/Teaching/taskdetail',query: { id:this.gridData[index].id}});
	    	// sessionStorage.setItem('setname',this.gridDataitemindex[index].name);
	    	// sessionStorage.setItem('teacher',this.gridDataitemindex[index].teacher);
	    	// sessionStorage.setItem('when',this.gridDataitemindex[index].when);
            // sessionStorage.setItem('college',this.gridDataitemindex[index].college);  
            // sessionStorage.setItem('classs',this.gridDataitemindex[index].classs);
            // sessionStorage.setItem('tea_class',this.gridDataitemindex[index].tea_class);
            // sessionStorage.setItem('degree',this.gridDataitemindex[index].degree);
	    },
	    handleCurrentChange(val) {
	    	this.currentPage4 = val;
	    	this.getUserInfo();
	    },
	    // 分页表格
		getUserInfo(){
			this.$http.post(`${this.$store.state.location}/services/app/Course/GetCourseTeacherAssociate`,
		       {
		       	"courseId": this.couese,
				"termId": this.time,
		       	"maxResultCount": this.page,
		  		"skipCount": (this.currentPage4-1)*this.page
		       },{
	        	headers: {
					"Content-Type": "application/json"
				}
		      }).then(response=>{
		      	this.gridDataitem = response.body.result;
				this.tot =  response.body.result.totalCount;
				this.gridData=this.gridDataitem.items;
				this.pipeiData()
			},response=>{
				 console.log('this.$http 的失败') 
		});
	  },
	  // 任教课程
	  classindex(){
		this.$http.post(`${this.$store.state.location}/services/app/Course/GetAll`,
			{
				"published": true,
				"isActive": true,
				"filter": ""
			},{
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response=>{
				this.getall = response.body.result;
				this.initoptions();
			},response=>{
				console.log("error")
		});
	  },
	   // 任教时间
      selecttime(){
	    this.$http.post(`${this.$store.state.location}/services/app/Term/GetAll`,
	        {
			 	"skipCount": 0,
			    "maxResultCount": 10
	        },{
	        	headers: {
					"Content-Type": "application/json"
				}
	        }).then(response=>{
				this.grade = response.body.result;
				this.gradetime();
			},response=>{
				console.log("error")
		});
      }
   }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topBox {
	margin-top: 1px;
	background: white;
}
.topBox p {
	color: #687178;
	font-size: 12px;
	line-height: 23px;
}
.tea_top{
	border: 1px solid #E8E8E8;
	min-height: 705px;
	background-color: rgb(255,255,255);
}
.tea_tit{
	margin-top: 16px;
	margin-left: 25px;
}
.tea_cot{
	height: 40px;
	margin-left: 25px;
	margin-top: 16px;
	display: flex;
}
.tea_cot b{
	display: inline-block;
	font-weight: 400;
	width:79px;
	height:40px; 
	background:rgba(242,242,242,1);
	border-radius: 4px 0px 0px 4px ; 
	line-height: 40px;
	text-align: center;
	position: absolute;
	z-index: 10;
}
.tea_cot .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 76%;
}
.el-table-fil{
	margin-left: 50px;
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
.tabod>tr>td{
	text-align: center;
    width: 12%;
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
.tea_tables{
	height: 500px;
	overflow: hidden;
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
tr{
	border-bottom:1px solid #EEEEEE;
    height:48px; 
	box-shadow: 0px -1px 0px 0px rgba(232,232,232,1);
	border-radius: 2px 2px 0px 0px ; 
	margin-bottom: 0px;
}
table>tr{
	border-bottom:1px solid #EEEEEE;
    height:48px; 
    background:rgba(248,248,248,1);
	box-shadow: 0px -1px 0px 0px rgba(232,232,232,1);
	border-radius: 2px 2px 0px 0px ; 
	margin-bottom: 0px;
}
.bot{
	display: flex;
	justify-content:flex-end;
	margin-top: 25px;
}
.bot>span{
	margin-bottom: 20px;
	display: inline-block;
	width:120px;
	height:40px; 
	border-radius: 4px ; 
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:#157cf0;
	line-height:24px;
	text-align: center;
	line-height: 40px;
	margin-right: 30px;
	cursor: pointer;
	border: 1px solid #157CF0;
}
.bot>span:hover{
	background:rgba(24,144,255,1);
	border-radius: 4px ; 
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,1);
	line-height:24px;
	text-align: center;
	line-height: 40px;
	margin-right: 30px;
	cursor: pointer;
}
.tabod>tr>td:nth-child(3){
	padding-left: 0.5%;
}
/*.tabod>tr>td:nth-child(5){
	padding-left: 0%;
}
.tabod>tr>td:nth-child(6){
	padding-left: 1.5%;
}
.tabod>tr>td:nth-child(7){
	padding-left: 2.5%;
}*/
.block{
	margin: 0px 25px;
	text-align: center;
	margin-bottom: 20px;
}
</style>
