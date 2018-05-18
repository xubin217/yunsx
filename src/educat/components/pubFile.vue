<template>
  <div class="content">
    <p>
      <router-link to="/Educat/Plan">教学计划</router-link>&nbsp;&gt;&nbsp;上传文件
    </p>
    <div class="upFileBox">
      <h3>上传教学计划</h3>
      <div class="line"></div>
      <div class="fileMsgBox">
        <span class="upTitle">文件标题</span>
        <div class="fileMsg inputBox">
          <el-input v-model="input" placeholder="如：基础会计教学指导文件"></el-input>
        </div>
      </div>
      <div class="fileMsgBox">
        <span class="upTitle">选择文件</span>
        <div class="fileMsg">
          <el-upload
            class="upload"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持拓展名：.rar&nbsp;.zip&nbsp;.doc&nbsp;.docx&nbsp;.pdf</div>
          </el-upload>
        </div>
      </div>
      <div class="fileMsgBox">
        <span class="upTitle">备注</span>
        <div class="fileMsg inputBox">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            :autosize='{minRows: 4, maxRows: 6}'
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </div>
      </div>
      <div class="subBox">
        <el-button>取消</el-button><el-button type="primary">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pubFile',
  data () {
    return {
      input: '',
      textarea: '',
      fileList: [],
    }
  },
  mounted() {
    this.$store.commit("firstrouterCtrl",false)
  },
  methods: {
    handlePreview(flie) {
      console.log(`点击已上传的文件${file}`);
    },
    beforeRemove(file, fileList) {
      console.log(`将要删除的文件为${file}`);
    },
    handleRemove(file, fileList) {
      console.log(`删除的文件为${file}`);
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },
  destroyed() {
    this.$store.commit("firstrouterCtrl",true)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding: 20px;
    background-color: white;
  }
  .content>p {
    color: #687178;
    font-size: 12px;
  }
  .upFileBox {
    position: relative;
  }
  .upFileBox h3 {
    color: #687178;
    font-size: 16px;
    margin: 15px 0 25px 0;
  }
  .upFileBox .line {
    position: absolute;
    top: 10px;
    left: 130px;
    right: 0;
    height: 1px;
    background-color: #EDEDED;
  }
  .fileMsgBox {
    position: relative;
    min-height: 40px;
    margin: 25px 0;
  }
  .upTitle {
    position: absolute;
    left: 0;
    top: 0;
    line-height: 40px;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    width: 60px;
  }
  .fileMsg {
    margin-left: 80px;
  }
  .inputBox {
    width: 320px;
  }
  .subBox {
    margin: 25px 0;
    text-align: right;
  }
</style>
