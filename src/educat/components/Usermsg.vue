<template>
  <div class="">
    <div class="usermsg_conter">
        <p>个人信息</p>
        <div class="user_tit">
          <b>设置头像</b>
        </div>
        <div class="cots">
             <div class="imgs">
                 <div class="user_img">
                    <img src="../../share/img/corgi.jpg" alt="">
                 </div>
             </div>
             <div class="uplode">
                 <p @click="dialogVisible = true"><i class="el-icon-edit-outline"></i>更换头像</p>
                 <span>建议上传图片尺寸为60px*60px，若不设置则使用系统默认头像</span>
             </div>
        </div>
        <div class="user_tit">
          <b>个人信息</b>
        </div>
        <ul>
           <li><span>账号:</span><b>000000</b></li>
           <li><span>姓名:</span><b>李教授</b></li>
           <li><span>手机号:</span><b>158 **** 30</b><a @click="dialogFormVisible = true">更换手机号</a></li>
           <li><span>密码:</span><b></b><a @click="opens">更换密码</a></li>
        </ul>
        <el-dialog
          title="上传头像"
          :visible.sync="dialogVisible"
          width="30%"
          >
          <span class="contys">
            <i></i>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="sc">上传头像</i>
              <div slot="tip" class="el-upload__tip">支持格式：png、jpg</div>
            </el-upload>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 更换手机号码 -->
        <el-dialog title="更换手机号" :visible.sync="dialogFormVisible">
        <div class="borders">
          <el-form :model="form">
          <el-form-item label="原手机号" :label-width="formLabelWidth">
             <el-input v-model="form.date1" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新手机号" :label-width="formLabelWidth">
             <el-input v-model="form.date2" class="cc" auto-complete="off"></el-input>
             <el-button class="but_s" @click.prevent="removeDomain(domain)">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码" :label-width="formLabelWidth">
             <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="phone">取 消</el-button>
          <el-button type="primary" @click="phone">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 更换密码 -->
      <el-dialog title="更换密码" :visible.sync="dialogFormVisipaw">
          <div  class="borders">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
               <el-form-item label="原密码" prop="pass1">
                <el-input type="password" v-model="ruleForm2.pass1" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="colos">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
          </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Usermsg',
  data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
       dialogVisible: false,
       dialogFormVisible: false,
       dialogFormVisipaw: false,
       imageUrl: '',
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
         ruleForm2: {
          pass: '',
          pass1: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
    }

  },
   methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
           this.dialogFormVisipaw = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      colos(){
        this.resetForm('ruleForm2');
        this.dialogFormVisipaw = false;
      },
      opens(){
        this.dialogFormVisipaw = true
      },
      phone(){
        this.form.name ='';
        this.form.date1 ='';
        this.form.date2 ='';
        this.form.date3 = '';
        this.form.date4 = '';
        this.dialogFormVisible = false
      },
      // 头像上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type == 'image/jpeg';
        // const isPNG = file.type == 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>
<style>
.cc {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
}
.but_s{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 19%;
}
.el-dialog__body {
    padding: 10px 20px; */
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sc{
  display: inline-block;
  width:64px;
  height:24px; 
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(74,144,226,1);
  line-height:24px;
  font-style: normal;
  margin: 25px 0px;
}
.usermsg_conter{
  min-width:760px;
  height:700px; 
  padding-left: 24px;
  background:rgba(255,255,255,1);
}
.usermsg_conter>p{
  width:100%;
  height:20px; 
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
  padding-top: 16px;
  padding-bottom: 48px;
}
.user_tit{
  position: relative;
  margin-bottom: 26px;
}
.user_tit>b{
  display: inline-block;
  font-weight: 400;
  width:64px;
  height:20px; 
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
}
.user_tit>b::before{
  content: '';
  width: 90%;
  height: 1px;
  background-color: #ddd;
  position: absolute;
  top: 9px;
  left: 111px;
}
.cots{
  height: 126px;
  display: flex;
  margin-bottom: 26px;
  background-color: #fff;
}
.cots .imgs{
  display: inline-block;
  width:126px;
  height:126px; 
  background:rgba(165,183,197,0.1);
  border-radius: 2px ; 
  margin-left: 12px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user_img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.user_img img{
  display: inline-block;
  width: 60px;
  height: 60px;
  background-image: url('../../share/img/corgi.jpg');
  background-repeat: no-repeat;
}
.uplode{
  margin-left: 16px;
}
.uplode>span{
  display: inline-block;
  width:245px;
  height:40px; 
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
}
.uplode>p{
  cursor: pointer;
  width:100px;
  height:20px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(74,144,226,1);
  line-height:20px;
  margin-bottom: 25px;
}
.uplode>p>i{
  display: inline-block;
  margin-right:6px;
}
.usermsg_conter ul>li>span{
  display: inline-block;
  width:60px;
  height:20px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
}
.usermsg_conter ul>li>a{
  display: inline-block;
  color: #157cf0;
  width:70px;
  height:20px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(74,144,226,1);
  line-height:20px;
}
.usermsg_conter ul>li>b{
  display: inline-block;
  font-weight: 400;
  width:118px;
  height:20px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
  margin-left: 15px;
}
.usermsg_conter ul>li{
  margin-top: 36px;
}
.el-dialog__body{
  height: 200px;
}
.contys{
  border-top: 1px solid #ddd;
  display: inline-block;
  width:100%;
  min-height:200px; 
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(104,113,120,1);
  line-height:20px;
  text-align: center;
  padding-top: 50px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.contys>i{
  display: inline-block;
  width:116px;
  height:116px; 
  background:rgba(165,183,197,0.1);
  border-radius: 100px ; 
}
.contys>a{
  display:block;
  width: 100%;
  text-align: center;
  height:24px; 
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(74,144,226,1);
  line-height:24px;
  margin-top: 25px;
  margin-bottom: 10px;
}
.contys>b{
  display:inline-block;
  width:116px;
  height:24px; 
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(0,0,0,0.65);
  line-height:24px;
}
#slid{
  background-color:#fff;
  border: transparent;
  height:24px; 
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:rgba(74,144,226,1);
  line-height:24px;
  margin: 15px 0px;
}
.el-dialog>.el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .borders{
    border-top:1px solid #eee;
    padding-top: 40px;
    border-bottom:1px solid #eee;
    padding-bottom: 35px;
/*    margin-bottom: 20px ;*/
  }
</style>
