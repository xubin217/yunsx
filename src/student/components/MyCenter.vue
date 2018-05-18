 <template>
	 <div style="height: 100%;">
      <div class="content">
          <div class="componentBox" style="background-color:#f8f8f8;padding-top:20px;">
            <div class="container">
              <div class="left">
                <span class="setTitle">个人中心</span>
                <div>基本信息</div>
              </div>
              <div class="right">
                <div class="title">设置头像</div>
                <div class="headPortrait">
                  <img :src="personalInfo.src" width="128" height="128">
                  <div class="imgText">
                    <p>头像图片格式须为PNG、JPG</p>
                    <p>尺寸为128px*128px</p>
                    <p>若不设置则使用系统默认头像</p>
                    <div>
                      <el-button>上传新文件</el-button>
                      <el-button type="primary">保存</el-button>
                    </div>
                  </div>
                </div>
                <div class="title">个人信息</div>
                <div class="msgBox">
                  <span class="leftMsg">账号：</span>{{personalInfo.id}}
                </div>
                <div class="msgBox">
                  <span class="leftMsg">姓名：</span>{{personalInfo.name}}
                </div>
                <div class="msgBox">
                  <span class="leftMsg">手机号：</span>{{personalInfo.phone}}&nbsp;&nbsp;<span class="light" @click="changePhone(personalInfo.id)">更换手机号</span>
                </div>
                <div class="msgBox">
                  <span class="leftMsg">密码：</span><span class="light" @click="changePass(personalInfo.id)">更换密码</span>
                </div>
              </div>
            </div>
          </div>
      </div>
	 </div>
</template>
<script>
  export default {
  name: 'MyCenter',
  data () {
    return {
      personalInfo: {
        name: '张三',
        id: 123456789,
        src: require('../../share/img/corgi.jpg'),
        phone: '18354869658',
        password: '25658889'
      }
    }
  },
  mounted() {

  },
  methods: {
    // handleClick(tab, event) {
      
    // },
    changePhone(name) {

    },
    changePass(name) {

    }
  },
  computed: {
    // activeName() {
    //  return this.$store.state
    // }
  }
  
  };
</script>

<style scoped>
.content{
    min-height: 700px;
    margin: 0 auto;
}
 .container {
    margin: 20px 0;
    padding: 20px;
    background-color: white;
    border-radius: 2px;
    position: relative;
    width: 960px;
    margin: 0 auto;
  }
  .left {
    position: absolute;
    left: 0;
    top: 0;
    padding-top: 80px;
    width: 220px;
  }
  .setTitle {
    position: absolute;
    top: 15px;
    left: 25px;
    font-size: 14px;
    color: #687178;
    line-height: 25px;
    border-bottom: 4px solid #00B0FF;
    font-size: 12px;
  }
  .left div {
    background-color: #E6F7FF;
    color: black;
    line-height: 45px;
    text-indent: 20px;
    font-size: 14px;
    position: relative;
    cursor: pointer;
  }
  .left div::after {
    position: absolute;
    content: '';
    right: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: #00B0FF;
  }
  .right {
    margin-left: 199px;
    height: 500px;
    padding: 20px 0 20px 20px;
    border-left: 1px solid #E8E8E8;
  }
  .title {
    font-size: 16px;
    color: #687178;
    line-height: 45px;
    position: relative;
  }
  .title::after {
    position: absolute;
    content: '';
    top: 50%;
    height: 1px;
    right: 0;
    left: 70px;
    background: #EDEDED;
  }
  .headPortrait {
    position: relative;
    margin: 20px 0;
    height: 128px;
  }
  .headPortrait>img {
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .imgText {
    margin-left: 145px;
    font-size: 12px;
  }
  .imgText p {
    color: rgba(0, 0, 0, .45);
  }
  .imgText div {
    margin-top: 20px;
  }
  .imgText div .el-button  {
    font-size: 12px;
    display: inline-block;
    width: 94px;
  }
  .msgBox {
    font-size: 14px;
    color: #687178;
    line-height: 35px;
  }
  .leftMsg {
    display: inline-block;
    width: 65px;
  }
  .light {
    color: #00B0FF;
    cursor: pointer;
  }

</style>