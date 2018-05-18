 <template>
	 <div>
        <div class="tr_">
          <div class="tr_top">
              <span>课程资料</span>
          </div>
          <div class="cot_img">
              <img class="show_img" v-if="act_show" :src="imgs"/>
	          <div class="mate_default" v-if="act">
	          	<div class="mate_rest"><a href="#">其他教师发布的资料>></a></div>
	              <ul >
	              	<li v-for="itemlist in matelist">
	              		 <img src="" alt="" />
	              		   <div class="cot_tit">
	              		       <p>{{itemlist.title}}</p>
	              		       <p>{{itemlist.description}}</p>
		              		   <div class="mate_default_x">
		              		   	   <div class="mate_default_l">
		              		   	       <span>{{itemlist.academy}}</span>
		              		   	       <span>{{itemlist.course}}</span>
		              		   	       <span>{{itemlist.name}}</span>
		              		   	       <span>{{itemlist.data}}</span>
		              		   	   </div>
		              		       <div class="mate_default_r">
		              		          <a v-on:click="counter += 1">下载<i>({{counter}})</i></a>
		              		          <a v-on:click="collect += 1">收藏<i>({{collect}})</i></a>
		              		       </div>
		              		   </div>
	              		   </div>

	              	</li>
	              </ul>
	          </div>
          </div>
         </div>
	 </div>
</template>
<script>
  export default {
    data(){
     return{
       counter:0,
       collect:0,
       act_show:false,
       act:true,
       imgs:require('../../../share/img/img_unress.png'),
       matelist:[
           {
           title:"这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           academy:'湖南工业大学',
           course:'会计',
           name:'李xx',
           data:'2017-12-27',
           },
           {
           title:"这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           academy:'湖南工业大学',
           course:'会计',
           name:'李xx',
           data:'2017-12-27',
           },
           {
           title:"这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           academy:'湖南工业大学',
           course:'会计',
           name:'李xx',
           data:'2017-12-27',
           },
        ]
      }
    },
    mounted(){
    	if(this.matelist == ''){
    		this.act  = false,
    		this.act_show  = true
    	}else{
    		this.matelist = this.matelist
    	}
    }
  }

</script>

<style scoped>
ul{
	-webkit-padding-start: 0px
}
.cot_img{
	text-align: center;
}
.tr_top{
	width: 95%;
	height: 60px;
    margin: 0 auto;
    border-bottom: 1px solid #EEEEEE;
}
.tr_top>span{
	display: inline-block;
	font-size: 18px;
	font-family: "arial, helvetica, sans-serif";
	width: 100px;
	height: 50px;
	line-height: 50px;
}
.show_img{
	margin: 5% 0%;
}
.mate_default>ul>li{
	width: 95%;
	background-color:white;
	border: 1px solid #EEEEEE;
	border-radius: 6px;
	margin: 10px auto;
}
.mate_rest{
	width: 95%;
	height: 40px;
	line-height: 40px;
	border: 1px solid #DDDDDD;
	text-align: right;
	margin: 0 auto;
	margin-top: 20px;
	background-color: rgb(251,251,251);
}
.mate_rest>a{
	font-size: 14px;
	margin-right: 20px;
	color: #157CF0;
} 
.mate_default>ul>li{
	position: relative;
	display: flex;
}
.mate_default>ul>li>img{
	display: inline-block;
    height: 48px;
    width: 100px;
    background-color: #ddd;
    margin-left: 20px;
    text-align: left;
    margin:20px ;
}
.mate_default>ul>li>.cot_tit{
	width: 100%;
}
.mate_default>ul>li>.cot_tit>p{
    font-size: 16px;
    text-align: left;
    margin-top: 20px;
}
.mate_default>ul>li>.cot_tit>p:nth-child(2){
    text-align: left;
    color: #666;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    font-family:PingFangSC-Regular;
    
}
.mate_default>ul>li>span{
	display: inline-block;
    font-size: 12px;
    margin: 20px 0px;
    text-align: left;
    color: #666;
    -webkit-font-smoothing: antialiased;
    font-family:PingFangSC-Regular;
}
.mate_default_x{
	text-align: left;
	display: flex;
}
.mate_default_l{
    height: 40px;
    line-height: 40px;
}
.mate_default_l>span{
	display: inline-block;
	color: #666666;
	font-size: 14px;
	margin: 0px 20px;
}
.mate_default_r{
	line-height: 40px;
	margin-left: 25%;
}
.mate_default_r>a{
	padding: 10px 5px;
	font-size: 14px;
	color: #157CF0;
}
.mate_default_r>a>i{
	font-size: 14px;
	margin-right: 20px;
	color: #ddd;
	font-style: normal;
	margin-left: 10px ;
}
</style>