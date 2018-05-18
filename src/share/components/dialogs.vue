<template>
  <div class="content">
    <div class="dialog-wrap">
      <div class="dialog-cover" @click.stop.self="closeMy"></div>
      <transition name="drop">
        <div class="dialog-content" >
           <ul class="dialogcontent">
		      	<li class="dialogcontent_left">
		      		  <div class="dialog_yun">
		      		  	 <img :src="yunimgs"/>
		      		  	 <span>
		      		  	 	   开放、互动、共享生态的云平台
		      		  	 </span>
			  		  	          <div class="input_g">
			  		  	          	  <div class="g-form-line">
												        <div class="g-form-input">
												          <input type="text" class="chile" v-model="usernameModel" ref="inputL" placeholder="用户名    Admin">
												        </div>
												      </div>
												      <div class="g-form-line">
												        <div class="g-form-input">
												          <input type="password" v-model="passwordModel" placeholder="密码">
												        </div>
												      </div>
			  		  	          </div>
			  		  	          <div class="g_pwd">
			  		  	              <el-checkbox class="ckd" v-model="checked">记住密码</el-checkbox>
			  		  	              <a>忘记密码</a>
			  		  	          </div>
							        <div class="g-form-btn">
							          <a class="button"  @click.stop="onLogin" >登&nbsp;&nbsp;录</a>
							        </div>
							        <div class="bot">
							        	<img :src="bot" alt="" />
							            <p>
							            	  <pre>copyright&nbsp;©&nbsp;2018&nbsp;</pre>
							            	  <pre>中德安普大数据网络科技有限公司</pre>
							            </p>
							        </div>
		      		  </div>
		      	</li>
		        <li class="dialogcontent_right"><img :src="imgs"/></li>
		      </ul>
        </div>
      </transition>
    </div>
    <div v-if="loading"
    v-loading="loading"
    element-loading-text="登陆中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.45)"
    style="position: fixed;left:0;top:0;right:0;bottom:0;font-size:18px;"></div>
  </div>
</template>

<script>

export default {
  name: 'dialogs',                                
  data () {
    return {
      imgs:require('../img/img_minibanner_login@2x.png'),
      yunimgs:require('../img/img_logo_top@2x.png'),
      bot:require('../img/img_aplogo_login@2x.png'),
      usernameModel: '',
      passwordModel: '',
      checked:false,
      loadData: {},
      sessionData: {},
      loading: false,
      Ctrl: {},
    }
   },
   mounted() {
   	this.loadCtrl();
   	this.$refs.inputL.focus();
   },
   computed:{

	  },
	  methods: {
	    onLogin () {
	    	if(this.usernameModel=="") {
	    		this.$message.error({message:'请输入账号！',duration: 500});
	    		return false;
	    	}else if(this.passwordModel=="") {
	    		this.$message.error({message:'请输入密码！',duration: 500});
	    		return false;
	    	}
	    	this.loading = true;
    		this.$http.post(`${this.$store.state.location}TokenAuth/Authenticate`, 
	    	{
				  "userNameOrEmailAddress": this.usernameModel,
				  "password": this.passwordModel
				}, 
				{headers: {
					"Content-Type": "application/json",
				}}).then(response => {
					this.loadData = response.body.result;
					localStorage.setItem("token",`Bearer ${this.loadData.accessToken}`);
					localStorage.setItem("userId",this.loadData.userId);
					this.getsession();
				},response => {
			    this.loading = false;
			    this.$message.error({message:'账号或密码错误！',duration: 1000});
			  });
		  },
	    closeMy(){
	    	this.$emit("dialog");
	    },
	    getsession() {
	    	this.$http.post(`${this.$store.state.location}services/app/Session/GetCurrentLoginInformations`, 
        {}, 
        {headers: {
          "Content-Type": "application/json",
        }}).then(response => {
    			this.loading = false;
          this.sessionData = response.body.result;
          localStorage.setItem("name",response.body.result.user.name)
          if(this.sessionData.user.roles[0]=="Teacher") {
            window.location.href = '#/Teacher'
          }else if(this.sessionData.user.roles[0]=="Student") {
            window.location.href = '#/Student'
          }else if(this.sessionData.user.roles[0]=="Dean") {
            window.location.href = '#/Educat'
          }else {
            window.location.href = '#/Load'
          }     
          this.$message({message: '登录成功',type: 'success',duration: 1000});
          this.$emit("dialog");
        },response => {
        	this.loading = false;
          this.$message.error({message:'登录超时！',duration: 1000});
        });
	    },
	    loadCtrl() {
	    	let that = this;
	    	this.Ctrl = {
				begin: function(){
					document.onkeyup = function(event) {
						event.keyCode==13? that.onLogin(): ""
		    		}				
				},
	    		end: function(){
	    			document.onkeyup = ""
	    		}
	    	}
	    	this.Ctrl.begin()
	    }
   },
   destroyed() {
   	this.Ctrl.end();
   }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
}
.dialogcontent{
	width: 960px;
	height: 600px;
	margin: auto;
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	z-index: 10;
	position: fixed;
  box-sizing: border-box;
	padding: 0px;
	display:flex;
}
.dialogcontent_left{
	width:410px;
	height:600px; 
	background:rgba(255,255,255,1);
}
.dialogcontent_right{
	height:600px; 
	width: 548px;
}

.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .3s ease;
}
.drop-enter {
  transform: translateY(-500px);
}
.drop-leave-active {
  transform: translateY(-500px);
}

.dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .3;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #4fc08d;
}
.dialog_yun{
   width: 197px;
   height: 46px;
   margin-top: 86px;
   margin-left: 51px;
}
.dialog_yun>span{
	 display: inline-block;
	 width:196px;
	height:19px; 
	font-size:14px;
	font-family:MicrosoftYaHei;
	color:rgba(110,118,143,1);
	line-height:19px;
}
span.g-form-error{
	 display: inline-block;
	 width:196px;
	height:25px; 
	font-size:14px;
	font-family:MicrosoftYaHei;
	color:rgba(110,118,143,1);
	line-height:25px;
	margin-top: 20px;
}
.g-form-input{
	position: relative;
}
.g-form-input>input{
  width: 100%;
  height: 51px;
	background:rgba(255,255,255,1);
}
.input_g{	
	width: 307px;
  margin-top: 50px;
/*	box-shadow: 5px 7px 14px #EFEFE4;*/
}
input::-webkit-input-placeholder{ /*WebKit browsers*/
	font-family:PingFangSC-Regular;
	color:rgba(104,113,120,1);
	padding-left: 10px;
}
.g_pwd{
	width: 307px;
	margin-top: 30px;
}
.g_pwd>a{
	float: right;
	font-size:14px;
	font-family:PingFangSC-Regular;
	color:rgba(0,176,255,1);
	line-height:17px;
}
.ckd{
	width:48px;
	height:17px; 
	font-size:12px!important;
	font-family:PingFangSC-Regular;
	color:rgba(110,118,143,1);
	line-height:17px;
}
.g-form-btn{
	margin-top: 24px;
	 width:307px;
	height:34px; 
}
.button{
	display: inline-block;
	width:307px;
	height:34px; 
	background:rgba(0,176,255,1);
	border-radius: 3px ;
	text-align: center;
	font-size:12px;
	font-family:PingFangSC-Regular;
	color:rgba(255,255,255,1);
	line-height:34px;
}
.bot{
	display: flex;
	margin-top: 42px;
}
.bot>img{
	display: inline-block;
	width: 40px;
	height: 40px;
}
.bot>p{
	width:210px;
	height:40px; 
	font-size:14px;
	font-family:MicrosoftYaHei;
	color:rgba(165,183,197,1);
	margin-left: 6px;
}
.bot>p>pre{
	font-size:14px;
	font-family:MicrosoftYaHei;
	color:rgba(165,183,197,1);
	margin: 0;
}
input[type="text"],input[type="password"]{
  box-sizing: border-box;
  border:1px solid #EFEFF4;
  color:#6a6f77;
  -web-kit-appearance:none;
  -moz-appearance: none;
  display:block;
  outline:0;
  text-decoration:none;
  width:100%;
  box-shadow:0px 0px 15px #EFEFF4;
  padding-left: 15px;
}
input[type=text]:focus, input[type=password]:focus {
    border-left: 3px solid #157CF0;
    color: #157CF0;
      /*clip-path: inset(0% 100% 0% 0%);*/
}
input:focus::-webkit-input-placeholder {
    color: #157CF0;
    opacity: 0.6;
}
input[type=text]::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 4px;
  background-color: #157CF0;
  -webkit-transition: all .3s linear;
     -moz-transition: all .3s linear;
          transition: all .3s linear;
  -webkit-clip-path: inset(0% 0% 0% 0%);
          clip-path: inset(0% 0% 0% 0%);
}

</style>
