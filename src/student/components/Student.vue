<template>
  <div>
    <el-container style="position:relative;min-height:100%;padding-bottom:65px;">
      <ul class="navigation">
				 <div class="heads">
	        <el-header class="mainMenu classactivses" :class="propaganda.propaganda?'speac':''">
	        	<div class="logo-left">
	        		  <router-link to='/Student/Yuanxiao'class="logo-left_img colo ">
			     		  </router-link>
			     	</div>
	        	<router-link class="link ls" data-content="实训中心" to="/Student/trainingCenter">实训中心</router-link>
	          <router-link class="link ls" data-content="我的任务" to="/Student/myTask">我的任务</router-link>
	          <router-link class="link ls" data-content="成绩管理" to="/Student/management">成绩管理</router-link>
	          <router-link class="link ls" data-content="能力档案" to="/Student/abilityfile">能力档案</router-link>
	          <router-link class="link ls" data-content="资料共享" to="/Student/datasharing">资料共享</router-link>
	          <el-dropdown>
						  <span class="el-dropdown-link ls" > <img class="logo-img" :src="studentimgs"/>学生</span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item><router-link class="droplink" to="/Student/MyCenter">个人中心</router-link></el-dropdown-item>
						    <el-dropdown-item><router-link class="droplink" to="/Load" @click.native="back">退出</router-link></el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
	        </el-header>
	     </div>
			</ul>
			<transition name="page">
          <div class="el-main—ss">
	            <router-view />
          </div>
      </transition>
       	<div class="footer">
       	     <ul>
       	     	<li><a href="#">帮助</a></li>
       	     	<li><a href="#" class="tk">隐私条款</a></li>
       	     	<li><a href="#">版权声明</a></li>
       	     </ul>
       	     <span>copyright&nbsp;©&nbsp;2018&nbsp;中德安普大数据网络科技有限公司</span>
       	     <b>湘ICP备15000989号-1</b>
       	</div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data () {
    return {
      showss: false,
    	shows: false,
      studentimgs:require('../../share/img/corgi.jpg'),
    }
  },
  computed: {
    propaganda() {
      return this.$store.state
    },
  },
    methods:{
    goDetail(){

      this.$router.push({ name:'/Yuanxiao'});
   },
  back() {
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("userId")
     sessionStorage.removeItem("name")
    },
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link:hover{
   color: #157cf0;
}
.shade{
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);  
}
.el-tabs--border-card {
     background: #ddd; 
}
.droplink{
		display: block;
	}
.el-dropdown-menu__item{
		padding: 10px 20px;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
ul{
		list-style: none;
}
body,html{
		margin: 0;
		padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* 页面路由过渡 */ 
.page-leave-to {
  opacity: 0; 
}
.page-leave-active {
  -webkit-transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
     -moz-transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
          transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
}
.page-enter {
  opacity: 0;
}
.el-tabs__content{
  background-color: red
}
.page-enter-active {
  -webkit-transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
     -moz-transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
          transition: all 200ms cubic-bezier(0.4, 0.1, 0.7, 0.95);
}
.el-tabs--border-card>.el-tabs__content{
  background-color: red;
}
.Basic_index_bot .el-tabs__content {
    padding: 15px;
    
}
/* 顶部菜单 */
.heads {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
}
.head a{
	 color: #FFFFFF;
}
.mainMenu {
  height: 80px!important;
  display: flex;
  justify-content: center;
}
.link {
  margin: 0 15px;
  padding: 0;
  -webkit-transition: all .3s linear;
          transition: all .3s linear;
  position: relative;
  text-decoration: none;
}
.router-link-active{
  color: #157cf0!important;
}
.fixed {
  position: fixed;
  top: -61px;
  z-index: 999;
  right: 0;
  width: 100%;
  background-color: white;
  transform: translateY(100%);
  -webkit-transition: all .3s linear;
     -moz-transition: all .3s linear;
          transition: all .3s linear;
}
.el-main {
  padding-bottom: 1.3rem
}
.el-dropdown-link{
	  height: 80px;
    line-height: 80px;
    padding: 0;
    font-size: 16px;
    -webkit-transition: all .3s linear;
    transition: all .3s linear;
    position: relative;
    text-decoration: none;
    margin: 0 1vw;
}
.navigation{
	  background-color:#FFFFFF;
	  margin: 0; 
    position: relative;
    z-index: 1;
}
.heads a{
	width:72px;
	height:80px; 
	font-size:18px;
	font-family:MicrosoftYaHei;
	color:rgba(104,113,120,1);
	line-height:80px;
}
.logo-img{
	  display: inline-block;
    width: 32px;
    height: 32px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0.458823529411765);
    border: none;
    border-radius: 50%;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 18px;
    vertical-align:middle;
    margin-right: 20px;
}
.el-dropdown {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
    margin-left: 51px;
}
.logo-left{
	 width: 200px;
	 height: 80px;
	 text-align: center;
	 margin-right: 105px;
	 display: flex;
   justify-content: flex-start;
   align-items: center;
}
.logo-left>.logo-left_img{
	display: inline-block;
  background-image: url(../../share/img/logo_Dark.png);
  background-repeat: no-repeat;
  cursor: pointer;
  width: 165px;
  height: 40px;
}
.speac .logo-left>.logo-left_img {
  background-image: url('../../share/img/logo_Light.png');
}
.speac .link,.speac .el-dropdown {
  color: white;
}
.footer{
	 width: 100%;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 height: 65px;
	 line-height: 65px;
   position: absolute;
  bottom: 0;
}
.footer>ul{
	display: flex;	
}
.footer>ul>Li{
	margin: 0px 17px;
}
.footer>ul>li>a{
	font-size:16px;
	font-family:MicrosoftYaHei;
	color:rgba(165,183,197,1);
	line-height:21px;	
}
.footer>span{
	margin-left: 52px;
	width:384px;
	height:21px; 
	font-size:16px;
	font-family:MicrosoftYaHei;
	color:rgba(165,183,197,1);
	line-height:21px;
}
.footer>b{
	margin-left: 106px;
	display:inline-block ;
	font-weight: 400;
	width:165px;
	height:21px; 
	font-size:16px;
	font-family:MicrosoftYaHei;
	color:rgba(165,183,197,1);
	line-height:21px;
}
.tk{
   color:#00B0FF!important;
}
.el-main—ss{
	width: 100%;
	/*background-color: white;*/
}
.el-dropdown-link{
  cursor: pointer;
}

</style>
