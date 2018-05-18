    <template>
	 <div>
	     <div class="casesindex_top">
	         <b>{{titlename}}</b>
	     </div>
	     <div class="table_list">
			<div class="tea_table_top">
		   	    <ul>
		   	     	<li>序号</li>
		   	     	<li>案例名称</li>
		   	     	<li>
		   	     	   <template>
						  <el-select v-model="values" @clear = "cusclear" @change="changeClass1" clearable placeholder="题型">
						    <el-option
						      v-for="item in question_types"
						      :key="item.value"
						      :label="item.label"
						      :value="item.label"
						      size="mini">
						    </el-option>
						  </el-select>
					  </template>
					</li>		   	   
				</ul>
		   	</div>
			<table>
			    <tbody class="tabod">
			       <tr 
			       	v-for="(itemgridData,index) in tableData"
			       	:key="index"
			       	@click = "totop(contentData,index)">
			       	<td>{{ currentPage<2? `0${index+1}`: index+1+(10*(currentPage-1))}}</td>
			        <td  v-for="(item,index) in itemgridData">
			        	<i v-if="index == 'degree'" class="el-icon"></i>
			        	{{item}}
			        </td>
			      </tr>
			    </tbody>
			</table>
	     </div>
	     <div class="block">
		     <el-pagination
		      :current-page="currentPage"
		      :page-size="pageSize"
		      layout=" prev, pager, next,total, jumper"
		      :total="allData"
		      @current-change="changePage">
		    </el-pagination>
		 </div>
        <div class="at_present">
        	<i class="el-icon-info"></i>
        	<span>当前知识点包含:</span>
        	<span>单选题<b>231</b>道</span>
        	<span>多选题<b>231</b>道</span>
        	<span>问答题<b>231</b>道</span>
        	<span>综合题<b>231</b>道</span>
        </div>
	 </div>
</template>
<script>
  export default {
    props: {
    	id: {
            type: Number,  
        },  
        tren: {
             
        },
        titlename:{
        	type: String,  
        }
    },  
    data() {
      return {  
      	thisClass:'active',
        input21:'',
        inputVisible: false,
        inputValue: '',
        dynamicTags:[],
        currentPage: 1,
        pageSize:2,
        values:'',
        allData:0,
        tableData: [],
        contentData:[],
		question_types:[],
      }
    },
    computed: {
	    showst() {
	        return this.$store.state
		},
	 },
	  watch: {
	    contentData() {
	      this.tableData = [];
	      for(let i in this.contentData) {
	        this.tableData.push({
	          "name": this.contentData[i].title,
	          "type": this.contentData[i].styleName,
	        });
	      }
	    },
	    id(){
	    	 this.content();
	    }
	  },
    methods: {
    changeClass1(){
      	    console.log("change事件")
    },
    screen(){
           this.question_types = [];
			for(let i in this.contentData) {
				this.question_types.push({
				'label': this.contentData[i].styleName,
				'value': this.contentData[i].styleName 
				})
			}
			this.unique( this.question_types);
        },
    unique(arr) { 
		   for (var i = 0; i < arr.length - 1; i++) {
		    for (var j = 1; j < arr.length; j++) {
		        if (i != j) {
		            if (arr[i].x == arr[j].x && arr[i].y == arr[j].y) {
		                arr.splice(j, 1)
		            }
		        }

		    }
		}
	},
	totop(all,index){
		this.$router.push({path:'/tizu/practice',query: { knowledge:all[index].uniqueId,versionId:all[index].version,styleid:this.tren,topicid:this.id}});
		console.log(all)
	},
    content(){
	       this.$http.post(`${this.$store.state.location}/services/app/Question/GetQuestionsByKnowledge`,
	        {
	            "knowledgeId": this.id,
	            "maxResultCount": this.pageSize,
	            "skipCount":(this.currentPage-1) * this.pageSize,
	        },{
	          headers: {
	            "Content-Type": "application/json",
	          }
	        }).then(response=>{
		        this.contentData = response.body.result.items;
	            this.allData = response.body.result.totalCount;
		        this.screen();
	        },response=>{
	            console.log('知识点树获取error')
	        })
      },
      cusclear(){
            console.log("这是select删除按钮的事件")
      },
      changePage(val) {
      	 	this.currentPage = val;
      	 	this.content();
      },
      formatter(row, column) {
      	  	return row.address;
      },
      filterTag(value, row) {
        	return row.tag === value;
      }
    },
  }

</script>
<style scoped>
.block{
	width: 83%;
	margin: auto;
	margin-top: 20px;
	position: relative;
	margin-bottom: 20px;
}
.casesindex_top{
	width: 100%;
	height: 20px;
	line-height: 20px;
	padding-left: 42px;
	margin-top: 24px;
	position: relative;
	margin-bottom: 25px
}
.casesindex_top>b{
	display: inline-block;
	height:20px; 
	text-align: left;
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(36,56,71,1);
	line-height:20px;
	font-weight: 400;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-bottom: 25px;
    border-bottom: 5px solid #157cf0;
}	
/*.casesindex_top>b::after{
	content:'' ;
	width:8%;
	height:5px; 
	background:rgba(0,176,255,1);
	border-radius: 11px ;  
    position: absolute;
    top:23px;
    left: 43px;
    background-color: #157CF0;
}	*/
.correct{
	width: 100%;
	margin-top: 28px;
	padding-left: 41px;
	position:relative;
	align-items: center;
	height: 50px;
	line-height: 50px;
}
.correct>b{
	width:73px;
	height:30px; 
	line-height: 30px;
	font-size:16px;
	font-family:PingFangSC-Regular;
	color:rgba(110,118,143,1);
	line-height:20px;
	font-weight: 400;
}
.news{
	position: absolute;
	top: -38px;
    right: 127px;
    display: flex;
    align-items: center;
}
.news>span{
	display: inline-block;
	width:80px;
	height:28px; 
	font-size:11px;
	font-family:PingFangSC-Regular;
	color:rgba(36,56,71,1);
	line-height:28px;
	padding-left: 20px;
	cursor: pointer;
}
.news:hover span{
	color:rgba(0,176,255,1);
}
.news>i{
	display: inline-block;
	width: 28px;
	height: 28px;
	background: url(../../../share/img/img_addbutton.png);
	background-repeat: no-repeat;
	cursor: pointer;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.casesindex_top_m>ul{
   	display: flex;
    padding-left: 44px;
    align-items: center;
    height: 40px;
    line-height: 40px;
}
.casesindex_top_m>ul>b{
  	font-weight: 400;
  	display: inline-block;
  	width:60px;
	height:16px; 
	font-size:16px;
	font-family:MicrosoftYaHei;
	color:rgba(0,176,255,1);
	line-height:16px;
}
.casesindex_top_m>ul li{
  	display: inline-block;
  	font-size:12px;
	font-family:MicrosoftYaHei;
	color:rgba(66,66,78,1);
	line-height:16px;
	padding: 5px 15px;
	cursor: pointer;
	border: 1px solid transparent;
	border-radius: 4px;
	
}
.casesindex_top_m>ul li:hover{
  	border: 1px solid white;
  	color: white;
  	background-color: rgb(202,228,255);
}
ul{
 	-webkit-padding-start: 0px;
}
.casesindex_top_Lis{
 	width: 85%;
}
.el-table .warning-row {
    background: oldlace;
}
.el-table .success-row {
    background: #f0f9eb;
}
.at_present{
	width: 90%;
	margin: auto;
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,0,0,0.65);
	text-align: center;
	border-top: 1px solid #eee;
	margin: auto;
    padding: 20px;
}
.at_present>span>b{
	color: #00B0FF;
	font-weight: 400;
}
.at_present>i{
	display: inline-block;
	width:14px;
	height:14px; 
	color: #00B0FF;
	margin-right: 5px;
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
	font-size: 14px;
	color: #909399;
	font-weight: 500;
}
.tea_table_top ul>li:first-child{
	text-align: center;
	height: 48px;
	line-height: 48px;
	width: 24%;
}
.tea_table_top ul>li:last-child{
	text-align: center;
	height: 48px;
	line-height: 48px;
	width: 25%;
}
table{
	border-collapse: collapse;
}
.tabod>tr>td{
    text-align: center;
    width: 11.3%;
    position: relative;
    font-size: 14px;
    color: #606266;
}
.tabod>tr>td:first-child{
    width: 3%;
    position: relative;
}
.tabod>tr>td:last-child{
    width: 5%;
    position: relative;
}
.tabod>tr{
	height: 48px;
	line-height: 48px;
	cursor: pointer;
}
.tabod>tr:hover{
	cursor: pointer;
	background-color: rgb(245,247,250);
}
</style>