<template>
  <div class="feight" style="">
    <div class="contentBox">
      <div class="contentLeft">
        <p><span class="hasLine">知识点</span></p>
        <div class="scrollL">
          <div v-for="(item,index) in pointList" :key="index" class="chooseList" @click="hasact(index)" :class="{'act': isact === index}">
            <span class="el-icon-tickets"></span>{{item.name}}
          </div>
        </div>
      </div>
      <div class="contentRight">
        <div class="screenBox">
          <span>排序</span>
          <div class="chec">
            <el-select v-model="rank" size="medium">
              <el-option
                v-for="item in rankType"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="rightScreen">
            <el-radio-group v-model="radioGroup" size="medium">
              <el-radio-button label="全部">全部</el-radio-button>
              <el-radio-button label="我收藏的">我收藏的</el-radio-button>
              <el-radio-button label="我上传的">我上传的</el-radio-button>
            </el-radio-group>
            <div class="chec">
              <el-input placeholder="请输入文件名" suffix-icon="el-icon-search" clearable v-model="search"></el-input>
            </div>
          </div>
        </div>
        <div class="ziliaoupload">
          <el-button icon="el-icon-circle-plus" @click="upfileshow=true">上传文件</el-button>
        </div>
        <div v-if="this.dataList.length==0" class="noData"></div>
        <div v-for="(item,index) in dataList" :key="index" class="dataBox">
          <div class="dataBoxTop">
            <img :src="item.src" width="80" height="80">
            <div>
              <h4>{{item.name}}</h4>
              <p>{{item.text}}</p>
            </div>
          </div>
          <div class="dataBoxBot">
            <i class="el-icon-document"></i>
            <span>{{item.classType}}</span>
            <i class="el-icon-time"></i>
            <span>{{item.time}}</span>
            <i class="el-icon-location"></i>
            <span>{{item.xibie}}</span>
            <i class="el-icon-news"></i>
            <span>{{item.author}}</span>
            <div class="dataCtrlBox">
              <span v-if="item.isMy" class="hasline" @click="deleteHandel(item.name)">
                <i class="el-icon-delete"></i>删除
              </span>
              <span class="hasline" @click="collectHandel(item.name)">
                <i :class="item.iscollect?'el-icon-star-on':'el-icon-star-off'"></i>收藏({{item.collect}})
              </span>
              <span @click="downloadHandel(item.name)">
                <i class="el-icon-download"></i>下载({{item.download}})
              </span>
            </div>
          </div>
        </div>
        <div v-if="this.dataList.length" class="pagein">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="upfileshow" width="685px">
      <span class="setTitle">新建题组</span>
      <div class="upfileContainer">
        <div class="upfileL ziliaoupfile">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div class="upfileR">
          <div>
            <span>文件分类</span>
            <el-select v-model="filetype" placeholder="请选择分类">
              <el-option
                v-for="item in filetypes"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div>
            <span>文件标题</span>
            <el-input v-model="filename" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span>文件描述</span>
            <el-input
              type="textarea"
              resize="none"
              :autosize="{ minRows: 4, maxRows: 6}"
              v-model="filetetx">
            </el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upfileshow = false">取 消</el-button>
        <el-button type="primary" @click="upfileshow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Ziliao',
  data () {
    return {
      isact: 0,
      pointList: [
        {
          id: 0,
          name: '知识点A'
        },{
          id: 1,
          name: '知识点B'
        },{
          id: 2,
          name: '知识点C'
        },{
          id: 3,
          name: '知识点D'
        },{
          id: 4,
          name: '知识点E'
        },
      ],
      rank: '最新',
      rankType: ['最新','最热'],
      search: '',
      radioGroup: '全部',
      fileList: [],
      dataList: [
        {
          name: "第一课笔记",
          text: '第一课笔记的内容，包括:什么是会计？会计的岗位职责。',
          src: '#',
          classType: '基础会计',
          time: '2017-07-01',
          xibie: '金融系',
          author: '陈老师',
          collect: 102,
          download: 55,
          isMy: true,
          iscollect: true,
        },{
          name: "第二课笔记",
          text: '第一课笔记的内容，包括:什么是会计？会计的岗位职责。',
          src: '#',
          classType: '基础会计',
          time: '2017-07-01',
          xibie: '金融系',
          author: '陈老师',
          collect: 102,
          download: 55,
          isMy: false,
          iscollect: false,
        },{
          name: "第一课笔记",
          text: '第一课笔记的内容，包括:什么是会计？会计的岗位职责。',
          src: '#',
          classType: '基础会计',
          time: '2017-07-01',
          xibie: '金融系',
          author: '陈老师',
          collect: 102,
          download: 55,
          isMy: false,
          iscollect: false,
        },
      ],
      upfileshow: false,
      filetypes: ['基础会计','财务会计','纳税实务'],
      filetype: '',
      filename: '',
      filetetx: ''
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    hasact(val) {
      this.isact = val;
    },
    handlePreview(flie) {
      console.log(`点击已上传的文件${file}`);
    },
    beforeRemove(file, fileList) {
      console.log(`将要删除的文件为${file}`);
    },
    handleRemove(file, fileList) {
      console.log(`删除的文件为${file}`);
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    deleteHandel(name) {
      console.log(`删除文件为${name}`)
    },
    collectHandel(name) {
      console.log(`收藏文件为${name}`)
    },
    downloadHandel(name) {
      console.log(`下载文件为${name}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .contentBox {
    width: 960px;
    margin: 30px auto;
    position: relative;
  }
  .contentLeft {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    font-size: 14px;
  }
  .hasLine {
    color: #243847;
    position: relative;
    padding: 0 0 10px 0;
  }
  .hasLine::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #00B0FF;
    border-radius: 11px;
  }
  .scrollL {
    margin-top: 10px;
    height: 682px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .chooseList {
    padding: 15px;
    font-size: 12px;
    color: #243847;
    border: 1px solid #E9EFF4;
    border-radius: 5px;
    margin-top: 5px;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .chooseList:hover, .chooseList.act {
    background-color: #00B0FF;
    color: white;
  }
  .chooseList:hover span, .chooseList.act span {
    color: white;
  }
  .chooseList span {
    font-size: 18px;
    color: #4DA1FF;
    margin-right: 10px;
  }
  .contentRight {
    margin-left: 215px;
    padding: 20px;
    font-size: 14px;
    background-color: white;
    border-radius: 4px;
    height: 750px; 
  }
  .screenBox {
    position: relative;
  }
  .screenBox>span {
    font-size: 16px;
    margin-right: 15px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.85);
  }
  .chec {
    display: inline-block;
    width: 150px;
  }
  .rightScreen {
    position: absolute;
    right: 0;
    top: 0;
  }
  .ziliaoupload {
    margin-top: 35px;
  }
  .ziliaoupload .el-button {
    width: 100%;
  }
  .noData {
    height: 600px;
    background: url('../../share/img/img_unress.png') center no-repeat;
  }
  .dataBox {
    padding: 20px;
    border: 1px solid #E9E9E9;
    margin: 20px 0;
  }
  .dataBoxTop {
    position: relative;
  }
  .dataBoxTop img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .dataBoxTop div {
    margin-left: 100px;
    color: rgba(0, 0, 0, .65);
  }
  .dataBoxTop div h4 {
    font-size: 16px;
    line-height: 40px;
  }
  .dataBoxTop div p {
    font-size: 14px;
    margin: 8px 0 22px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dataBoxBot {
    position: relative;
    font-size: 12px;
    line-height: 35px;
    margin-bottom: -20px;
    vertical-align: bottom;
    border-top: 1px solid #E9E9E9;
    color: rgba(0, 0, 0, .45);
  }
  .dataBoxBot>span {
    margin: 0 20px 0 5px;
  }
  .dataCtrlBox {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    color: #00B0FF;
  }
  .dataCtrlBox>span {
    margin: 0 0 0 25px;
    cursor: pointer;
    position: relative;
  }
  .dataCtrlBox>span i {
    margin-right: 2px;
  }
  .dataCtrlBox .hasline::after {
    position: absolute;
    content: '|';
    right: -13px;
    top: -10px;
    font-size: 14px;
    color: rgba(0, 0, 0, .45);
  }
  .pagein {
    margin: 55px auto 20px auto;
    text-align: right;
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
  .upfileContainer {
    position: relative;
    margin-top: 10px;
  }
  .upfileL{
    position: absolute;
    left: 0;
    top: 0;
  }
  .upfileR {
    margin-left: 258px;
    padding: 5px 0 5px 32px;
    border-left: 1px solid #EEEEEE;
    font-size: 14px;
  }
  .upfileR>div {
    margin-bottom: 10px;
  }
  .upfileR>div>span {
    color: rgba(0, 0, 0, .45);
    margin-right: 5px;
  }
  .upfileR>div .el-select {
    width: 120px;
    line-height: 30px;
  }
  .upfileR>div .el-input {
    width: 240px;
  }
  .upfileR>div .el-textarea {
    margin-top: 5px;
    width: 310px;
  }
</style>
