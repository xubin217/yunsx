<template>
  <div class="" style="height: 100%">
    <div class="titleBox">
      <h3>{{tizu.tizuType}}{{tizu.tizuName}}</h3>
    </div>
    <div class="tizuContainer">
      <div class="tizuL" :class="menuCtrl?'issmall':''">
        <div class="tizuLMenuCtrl"  :class="menuCtrl?'':'active'" @click="menuCtrl=!menuCtrl">
          <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="cross">
            <span></span>
            <span></span>
          </div>
        </div>
        <div v-for="(value,key,index) in caseClassify" :key="index" class="teacTiZu">
          <p>{{key}}({{value.length}})</p>
          <el-radio-group v-model="activeId">
            <el-radio-button v-for="item in value" :key="item" :label="item">{{item}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="tizuR" :class="menuCtrl?'isleft':''">
        <div class="ctrlBox">
          <span @click="daanjiexi">答案解析</span>
          <span @click="jisaunqi">计算器</span>
          <span @click="prev" class="right">上一题</span>
          <span @click="next">下一题</span>
        </div>
        <exercises :ques = "{unid:unid,version:1}" style="padding:20px"></exercises>
      </div>
    </div>
  </div>
</template>

<script>
import exercises from './exercises'
export default {
  name: 'teacTiZu',
  data () {
    return {
      tizu: {
        tizuType: '基础会计',
        timu: []
      },
      activeId: -1,
      menuCtrl: false,
      datalist: [],
      unid: '',
    }
  },
  components: {
    exercises
  },
  mounted() {
    if(this.$route.query.hasOwnProperty("questionid")){
      this.tizu.tizuId = parseInt(this.$route.query.questionid)
      this.getData()
    }else {
      window.close()
    }
  },
  watch: {
    activeId() {
      for(let i=0; i<this.tizu.timu.length; i++) {
        if(this.activeId==this.tizu.timu[i].id) {
          this.unid = this.tizu.timu[i].uniqueId
        }
      }
    },
  },
  methods: {
    getData() {
      this.$http.post(`${this.$store.state.location}/services/app/QuestionGroup/Get`,
        {
          "id": this.tizu.tizuId,
        },{
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response=>{
          this.datalist = response.body.result;
          this.showData()
        },response=>{
          window.close()
          console.log('error')
        })
    },
    showData() {
      this.tizu.tizuName = this.datalist.title;
      this.tizu.remark = this.datalist.remark;
      this.tizu.timu = [];
      for(let i in this.datalist.questions) {
        this.tizu.timu.push({
          id: this.datalist.questions[i].id,
          caseType: this.datalist.questions[i].styleName,
          uniqueId: this.datalist.questions[i].questionUniqueId
        })
      }
      this.activeId = this.tizu.timu[0].id
    },
    daanjiexi() {

    },
    jisaunqi() {

    },
    next() {
      let index = 0;
      for(let i=0; i<this.tizu.timu.length; i++) {
        if(this.activeId==this.tizu.timu[i].id) {
          if(i==this.tizu.timu.length-1) {
            index = i 
          }else {
            index = i+1
          }
        }
      }
      this.activeId = this.tizu.timu[index].id
    },
    prev() {
      let index = 0
      for(let i=0; i<this.tizu.timu.length; i++) {
        if(this.activeId==this.tizu.timu[i].id) {
          if(i==0) {
            index = i
          }else {
            index = i-1
          }
        }
      }
      this.activeId = this.tizu.timu[index].id
    },
  },
  computed: {
    caseClassify() {
      let obj = {};
      let arr = this.tizu.timu;
      for(let i = 0; i<arr.length; i++) {
        obj.hasOwnProperty(arr[i].caseType)? obj[arr[i].caseType].push(arr[i].id) : obj[arr[i].caseType] = [arr[i].id]
      }
      return obj;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .titleBox {
    padding: 10px 25px;
    background-color: #002140;
    color: white;
  }
  .titleBox h3 {
    font-size: 16px;
    font-weight: 100;
  }
  .ctrlBox {
    background-color: white;
    position: relative;
    padding: 10px 20px 10px 75px;
  }
  .ctrlBox span {
    width: 80px;
    line-height: 30px;
    display: inline-block;
    text-align: center;
    border: 1px solid #EEEEEE;
    font-size: 12px;
    cursor: pointer;
    transition: all linear .3s;
    margin-right: 10px;
  }
  .ctrlBox span:hover {
    border-color: #C6E2FF;
    background-color: #ECF5FF;
    color: #409EFF;
  }
  .ctrlBox .right {
    margin-left: 150px;
  }
  .tizuContainer {
    position: relative;
    min-height: 100%;
  }
  .tizuL {
    background: white;
    padding: 20px;
    position: absolute;
    min-height: 100%;
    width: 230px;
    left: 0;
    top: 0;
    z-index: 2;
    box-shadow: 2px 0 2px #EEEEEE;
    -webkit-box-shadow: 2px 0 2px #EEEEEE;
    transition: all linear .5s;
    -webkit-transition: all linear .5s;
  }
  .issmall {
    left: -230px;
  }
  .tizuL .teacTiZu p {
    margin-top: 25px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #001529;
  }
  .tizuL .teacTiZu:first-child p {
    margin-top: 0;
  }
  .tizuL .teacTiZu .el-radio-button {
    margin: 0 8px 8px 0;
  }
  .tizuR {
    min-height: 100%;
    margin-left: 230px;
    transition: all linear .5s;
    -webkit-transition: all linear .5s;
  }
  .isleft {
    margin-left: 0;
  }
  .tizuLMenuCtrl {
    position: absolute;
    top: 15px;
    right: -28px;
    cursor: pointer;
    width: 28px;
    background: white;
    height: 28px;
    line-height: 28px;
    box-shadow: 2px 2px 2px #EEEEEE, 2px -2px 2px #EEEEEE;
  }
  .hamburger,.cross{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .hamburger span{
    display: block;
    width: 18px;
    height: 2px;
    margin-bottom: 3px;
    overflow: hidden;
    position: relative;
  }
  .hamburger span:last-child{
    margin: 0;
  }
  .hamburger span::before,.hamburger span::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(15,15,15);
    transform: translateX(-200%);
    transition: transform ease 300ms;
  }
  .hamburger span::after{
    transform: translateX(0);
  }
  .hamburger span:nth-child(2)::before,.hamburger span:nth-child(2)::after{
    transition-delay: 75ms;
  }
  .hamburger span:last-child::before,.hamburger span:last-child::after{
    transition-delay: 150ms;
  }
  .tizuLMenuCtrl:hover .hamburger span::before{
    transform: translateX(0);
  }
  .tizuLMenuCtrl:hover .hamburger span::after{
    transform: translateX(200%);
  }
  .tizuLMenuCtrl.active .hamburger span::before{
    transform: translateX(100%);
  }
  .tizuLMenuCtrl.active .hamburger span::after{
    transform: translateX(200%);
  }
  .cross span{
    display: block;
    width: 18px;
    height: 2px;
    background-color: rgb(15,15,15);
    transform: translateY(50%) rotate(45deg) scaleX(0);
    transition: transform ease 200ms;
  }
  .cross span:last-child{
    transform: translateY(-50%) rotate(-45deg) scaleX(0);
  }
  .tizuLMenuCtrl.active .cross span{
    transition-delay: 450ms;
    transform: translateY(50%) rotate(45deg) scaleX(1);
  }
  .tizuLMenuCtrl.active .cross span:last-child{
    transform: translateY(-50%) rotate(-45deg) scaleX(1);
  }
</style>
