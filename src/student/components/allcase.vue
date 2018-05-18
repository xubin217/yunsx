 <template>
	 <div>
	 	<div class="boxTitle">
	     	    <span>实训中心>基础会计>全真案例</span>
	     </div>
	     <div class="cases_cot">
	         <div class="cases_cot_left">
	              <div class="cases_cot_left_t">
	                    <div class="cases_cot_left_tit">
	                        <span>知识点</span>
							  <div id="input_s">   
							    <el-row class="demo-autocomplete">
							  <el-col>
							      <el-autocomplete
							      class="inline-input"
							      v-model="state"
							      :fetch-suggestions="querySearch"
							      placeholder="搜索"
							      @select="handleSelect"
							    ></el-autocomplete>
							  </el-col>
							</el-row>
							</div>
	                    </div>
						<div class="cases_cot_left_content">
						   <ul v-for="(item,index) in knowledge">
						    		<li @click="aa(index)"  v-if="myfilter(item.name)":class="{'classactive':ind === index}">
						    		 <i></i>
						    		 <span>
						    		 {{myfilter(item.name)}}
						    		 </span>
						    		 <b></b>
						    	</li>
						    </ul>
						</div>
	              </div>
	         </div>
	         <div class="cases_cot_rig">
	             <casesindex :msgtochild="knowledge[bb]"></casesindex>
	         </div>
	     </div>
	 </div>
</template>
<script>
import casesindex  from '@/student/components/courseTraining/casesindex'
  export default {
    data() {
      return {
         input21:'',
         parentMsg:'1',
         knowledge :[
             {
		        name: "这是1级菜单",
		        dynamicTags:['11'],
		        child: [
		          {
		            name: "这是1.1",
		            number:"1",
		            
		            child: [
			           {
			            name: "这是1.1.2",
			            number:"2",
			            child: [
					           {
					            name: "这是1.1.2.3",
					            number:"2",
					           },
					           {
					            name: "这是1.1.2.4",
					            number:"2",
					           },
					         ]
			            },
			            {
			            name: "这是1.1.3",
			            number:"3",
			           },
			             {
			            name: "这是1.1.4",
			            number:"4",
			           }
		            ]
		          },
		          {
		            name: "这是2.1",
		            number:"1",
		            child: [
			              {
			            name: "这是2.1.2",
			            number:"2",
			           }
		            ]
		          },
		        ]
		      },
              {
		        name: "这是第二个1级菜单",
		        dynamicTags:['ss'],
		        child: [
		          {
		            name: "这是2.1",
		            number:"1",
		            child: [
			              {
			            name: "这是2.1.2",
			            number:"2",
			           }
		            ]
		          },
		          {
		            name: "这是2.2",
		            number:"1",
		            child: [
			              {
			            name: "这是2.1.2",
			            number:"2",
			           }
		            ]
		          },
		        ]
		      },
         ],
        restaurants: [],
        state: '',
        bb:'0',
        ind:0,
        sidess: [
          { "value": "错账更正"},
          { "value": "会计账务处理程序"},
          { "value": "会计报表在财务中的应用"},
          { "value": "三年会计二年实战模拟"},
        ]
      };
    },
    
    methods: {
	myfilter(arr){
            if(arr.indexOf(this.state)>-1){
                return arr
            }else{
            	
            }
        },
     querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.sidess
      },
      handleSelect(item) {
        console.log(item);
      },
      list_s(id,name,imgs){
        this.$router.push({ name:'/casesindex',query: {id:id,name:name,imgs:imgs}});
    	 
      },
      aa(index) {
	     this.bb = index
	     this.ind = index
	  }
    },
    components:{
    	casesindex,
    },
    computed: {
	  showst() {
	      return this.$store.state
	  }
	},
    mounted() {
      this.restaurants = this.loadAll();
      this.$store.commit("studentshow",true);
    },
  };
</script>
<style scoped>
.boxTitle{
    width: 960px;
    margin: auto;
    padding-top:85px;
    padding-bottom: 20px;
}
.cases_cot{
	width: 960px;
	margin: 0 auto;
	min-height: 600px;
	display: flex;
	padding-bottom: 50px;
}
.cases_cot_left{
	width:240px;
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	background-color: #FFFFFF;
	border: 1px solid #ddd;
	border-radius: 6px ; 
	box-shadow: 0px 2px 9px 0px rgb(0,0,0,0.03);
}
.el-tabs--border-card>.el-tabs__content {
    padding: 15px;
    background-color: #FFF8F8F8;
}
.cases_cot_rig{
	width:700px;
	background:rgba(255,255,255,1);
	border-radius: 6px ; 
	margin-left: 20px;
	border: 1px solid #ddd;
	box-shadow: 0px 2px 9px 0px rgba(0,0,0,0.03);
}
.cases_cot_left_t{
	width: 80%;
	margin: auto;
    margin-top: 28px;
}
.cases_cot_left_t>input{
	width: 123px;
	height: 24px;
	line-height: 24px;
}
.cases_cot_left_tit>span{
	display: inline-block;
	width:42px;
	height:14px; 
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(36,56,71,1);
	line-height:14px;
}
.cases_cot_left_tit{
	position: relative;
	display: flex;
}
.cases_cot_left_tit::after{
	content: '';
	width:42px;    
	height: 6px;
	background-color: #157CF0;
	position: absolute;
	top:25px;
	left:0px;
	border-radius: 6px;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 24px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 123px;
    top: 4px;
    left: 13px;
    height: 24px;
}
.classactive{
	background-color: #157CF0;
}
.cases_cot_left_content>ul .classactive i{
	display: inline-block!important;
	height: 26px!important;
	width: 26px!important;
	background: url('../../share/img/icon_list_folder_hover@2x.png')no-repeat!important;
	}
.cases_cot_left_content>ul>.classactive>b{
		display: inline-block;
    width: 4px;
    height: 18px;
    background-image: url('../../share/img/img_class_list_point_hover.png')!important;
    background-repeat: no-repeat;
    margin-left: 23.5px;
}
ul{
 	-webkit-padding-start: 0px;
}
.cases_cot_left_content>ul>li>i{
	margin-left: 15px;
	display: inline-block;
	height: 26px;
	width: 26px;
	background:url(../../share/img/icon_list_folder_normal@2x.png)no-repeat;
}
.cases_cot_left_content>ul>li:hover{
	background-color: #157CF0;
}
.cases_cot_left_content>ul>li:hover i{
	display: inline-block;
	height: 26px;
	width: 26px;
	background: url('../../share/img/icon_list_folder_hover@2x.png')no-repeat;
}
.cases_cot_left_content>ul>li{
	width: 200px;
	height: 53px;
	line-height: 53px;
	display: flex;
	align-items: center;
	width:200px;
	border: 1px solid #E9EFF4;
	height:53px; 
	border-radius: 5px ; 
	cursor: pointer;
}
.cases_cot_left_content>ul>li>span{
	display: inline-block;
	width:101px;
	height:28px; 
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(36,56,71,1);
	line-height:14px;
	margin-left: 16px;
}
.cases_cot_left_content>ul>li>b{
	display: inline-block;
    width: 4px;
    height: 18px;
    background-image: url('../../share/img/img_class_list_point_normal@2x.png');
    background-repeat: no-repeat;
    margin-left: 23.5px;
}
.cases_cot_left_content>ul>li:hover b{
	display: inline-block;
    width: 4px;
    height: 18px;
    background-image: url('../../share/img/img_class_list_point_hover.png');
    background-repeat: no-repeat;
    margin-left: 23.5px;
}
</style>