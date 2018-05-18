<template>
  <div class="">
    <div v-if="plan.firstrouter">
      <div class="topBox">
        <p>教学计划</p>
      </div>
      <div v-if="!fileData.length" class="fileBg">
        <p>还没有发布文件哟！<router-link class="light" to="/Educat/Plan/pubFile">发布文件</router-link></p>
      </div>
      <div v-if="fileData.length">
        <div class="fileTop">
          <p>已上传<span class="light">{{fileData.length}}</span>个文件</p>
          <router-link class="light" to="/Educat/Plan/pubFile">发布文件</router-link>
        </div>
        <div class="fileList">
          <div class="fileBox" v-for="(item,index) in fileData" :key="index">
            <div class="inlineBox">
              <img :src="item.img">
              <div class="fileContent">
                <div class="filetitle">
                  <h3>{{item.title}}</h3>
                  <span :class="item.state?'fabu':'jinyong'">{{item.state?'已发布':'被禁用'}}</span>
                </div>
                <div class="fileText">
                  <p>{{item.text}}</p>
                  <span>{{item.time}}</span>
                </div>
              </div>
            </div>
            <div class="absoBox">
              <span class="light" @click="disab">{{item.state?'禁用':'解禁'}}</span>&nbsp;|&nbsp;<span class="light" @click="delet(index)">删除</span>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Plan',
  data () {
    return {
      fileData: [
        {
          img: require('../../share/img/plan.png'),
          title: '2017-2018年第二学期教学指导文件',
          text: '这里是备注信息这里是备注信息这里是备注信',
          state: true,
          time: '2016-06-16 14:03'
        },
        {
          img: require('../../share/img/plan.png'),
          title: '2017-2018年第二学期教学指导文件',
          text: '这里是备注信息这里是备注信息这里是备注信',
          state: false,
          time: '2016-06-16 14:03'
        },
      ]
    }
  },
  mounted() {

  },
  methods: {
    disab() {

    },
    delet(val) {
      this.fileData.splice(val,1)
    }
  },
  computed: {
    plan() {
      return this.$store.state
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .light {
    color: #0094FF;
  }
  .topBox {
    margin-top: 1px;
    background: white;
    padding: 20px;
  }
  .topBox p {
    color: #687178;
    font-size: 12px;
    line-height: 23px;
  }
  .fileBg {
    padding-top: 310px;
    height: 500px;
    background-color: white;
    background-image: url('../../share/img/null.png');
    background-repeat: no-repeat;
    background-position: center 100px;
  }
  .fileBg p {
    font-size: 18px;
    text-align: center;
    color: #687178;
  }
  .fileTop {
    padding: 20px;
    background: white;
    font-size: 12px;
    color: #687178;
    position: relative;
  }
  .fileTop a {
    position: absolute;
    right: 40px;
    bottom: 20px;
    font-size: 14px;
  }
  .fileList {
    border-top: 10px solid #F8F8F8;
    padding: 20px;
    background: white;
  }
  .fileBox {
    position: relative;
    border-bottom: 1px solid #E9E9E9;
    padding: 20px;
  }
  .absoBox {
    position: absolute;
    right: 20px;
    top: 35px;
    font-size: 14px;
    color: rgba(216, 216, 216, 1);
  }
  .absoBox span {
    cursor: pointer;
  }
  .inlineBox {
    position: relative;
    margin-right: 150px;
  }
  .inlineBox img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .fileContent {
    margin-left: 70px;
  }
  .filetitle span, .fileText span {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .filetitle, .fileText {
    position: relative;
  }
  .filetitle h3, .fileText p {
    margin-right: 150px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 30px;
  }
  .fileText p {
    color: rgba(0, 0, 0, 0.45);
    line-height: 25px;
  }
  .fabu::after, .jinyong::after {
    content: '';
    position: absolute;
    left: -15px;
    top: 8px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgba(74, 144, 226, 1);
  }
  .jinyong::after {
    background-color: rgba(245, 166, 35, 1);
  }
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
</style>
