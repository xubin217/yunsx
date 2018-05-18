 <template>
	 <div>
        <div class="tr_">
          <div class="tr_top">
              <span>实训总结</span>
          </div>
          <div class="cot_img">
              <img class="show_img" v-if="act_show" :src="imgs"/>
	          <div class="summ_default" v-if="act">
	              <ul >
	              	<li v-for="item in  summlist">
	              		<p>{{item.title}}</p>
	              		<div class="cont">
	              			<div class="cont_data">
	              				<span>截止日期</span>
	              			    <span>{{item.data}}</span>
	              			</div>
	              			<div class="cont_xx">
	              				<span>备注信息</span>
	              			    <span>{{item.description}}</span>
	              			</div>
	              		</div>
	              		<div class="cont_bo">
	              		     <span><i></i>{{item.sub}}</span>
	              		     <b>{{item.operation}}</b>
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
       act_show:false,
       act:true,
       imgs:require('../../../share/img/img_unress.png'),
       summlist:[
           {
           title:"这是标题",
           data:'2017-12-27',
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           sub:'进行中',
           operation:'编辑内容'
           },
           {
           title:"这是标题2",
           data:'2017-12-28',
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           sub:'进行中',
           operation:'马上修改'
           },
           {
           title:"这是标题3",
           data:'2017-12-29',
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           sub:'结束',
           operation:'查看'
           },
        ]
      }
    },
    mounted(){
    	if(this.summlist == ''){
    		this.act  = false,
    		this.act_show  = true
    	}else{
    		this.summlist = this.summlist
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
.summ_default>ul>li{
	width: 95%;
	background-color:white;
	border: 1px solid #EEEEEE;
	border-radius: 6px;
	margin: 10px auto;
	cursor: pointer;
}
.summ_default>ul>li:hover{
	background-color:rgb(255,245,245);
	border-color:rgb(255,211,211);
}
.summ_default>ul>li>p{
	text-align: left;
    display: block;
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    padding-left: 20px;
    padding-top: 20px;
    
}
.cont{
	width: 100%;
	font-size: 12px;
	color: #666;
}
.cont_data{
	text-align: left;
	margin: 15px 0px 15px 20px;
}
.cont_data>span:nth-child(2){
	margin-left: 20px;
}
.cont_xx>span:nth-child(2){
	margin-left: 20px;
	
}
.cont_xx{
    text-align: left;
    margin-left: 20px;
	margin: 15px 0px 15px 20px;
}
.cont_bo{
	text-align: left;
    padding-left: 20px;
    border-top:1px solid #EEEEEE ;
}
.cont_bo>span{
	display: inline-block;
	height: 60px;
	line-height: 60px;
	text-align: left;
	color: #666666;
	font-size: 14px;
	width: 80%;
}
.cont_bo>span>i{
	display: inline-block;
	height: 5px;
	width: 5px;
	background-color: #00B0FF;
	margin-right: 10px;
	margin-bottom: 2px;
}
.cont_bo>b{
	display: inline-block;
	width: 100px;
	height: 35px;
	line-height: 35px;
	text-align: center;
	border: 1px solid  white;
	background-color: #157CF0;
	font-size: 14px;
	font-weight: 400;
	color: white;
    border-radius: 6px;
    cursor: pointer;
}
.cont_bo>b:hover{
	background-color: rgb(255,128,128);
}
</style>