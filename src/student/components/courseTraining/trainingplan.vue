 <template>
	 <div>
        <div class="tr_">
          <div class="tr_top">
              <span>实训计划</span>
          </div>
          <div class="cot_img">
              <img class="show_img" v-if="act_show" :src="imgs"/>
          <div class="ax_default" v-if="act">
              <ul>
              	<li v-for="item in plan ">
              		  <img :src="item.url"/>
              		   <div class="ax_default_tit">
              		   	 <p>{{item.title}}</p>
              		     <span>{{item.description}}</span>
              		   </div>
              		   <div class="ax_default_x">
              		       <a href="#">预览</a>
              		       <a href="#">下载</a>
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
        plan:[
           {title:"这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           url:require('../../../share/img/img_unress.png'),
           },
           {title:"这是标题这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           url:require('../../../share/img/img_unress.png'),
           },
           {title:"这是标题这是标题这是标题",
           description:'这是简介这是简介这是简介这是简介这是简介这是简介',
           url:require('../../../share/img/img_unress.png'),
           },
        ]
      }
    },
    mounted(){
    	if(this.plan == ''){
    		this.act  = false,
    		this.act_show  = true
    	}else{
    		this.plan = this.plan
    	}
    }
  }

</script>

<style scoped>
ul{
	-webkit-padding-start: 0px;
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
	text-align: left;
	line-height: 50px;
}
.ax_default>ul{
  width: 95%;
  margin:auto; 
}
.ax_default>ul>li{
	height: 80px;
	width: 100%;
	background-color: #eee;
	display: flex;
	vertical-align: middle;
	align-items: center;
	position: relative;
  margin: 20px 0px;
}
.ax_default>ul>li>img{
	display: inline-block;
	height: 48px;
	width: 40px;
	background-color: #ddd;
	margin-left: 20px;
}
.ax_default_tit{
	display: block;
	margin-left: 20px;
}
.ax_default_tit>p{
	text-align: left;
	display: block;
	font-weight: 600;
	font-size: 16px;
}
.ax_default_tit>span{
	display: block;
	font-size: 12px;
	color: #687178;
	margin-top: 10px;
}
.ax_default_x{
    position: absolute;
    top:32px;
    right: 50px;
    display: flex;	
}
.ax_default_x>a{
    display: inline-block;
    margin-left: 20%;
    width: 100px;
    color: #157CF0;
    font-size: 14px;
}
.show_img{
	margin: 5% 0%;
}
</style>