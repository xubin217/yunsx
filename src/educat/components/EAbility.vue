<template>
  <div class="">
    <div v-if="eability.firstrouter">
      <div class="topBox">
        <p>能力档案</p>
        <div class="selectBox">
          <div class="inlineBox">
            <span class="lab" :class="light1?'light':''">学院</span>
            <el-select v-model="college"  @visible-change="visibleChange1" @change="change1" placeholder="请选择学院">
              <el-option
                v-for="item in colleges"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="inlineBox">
            <span class="lab" :class="light2?'light':''">年级</span>
            <el-select v-model="grade"  @visible-change="visibleChange2" @change="change2"  placeholder="请选择年级">
              <el-option
                v-for="item in grades"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="inlineBox">
            <span class="lab" :class="light3?'light':''">班级</span>
            <el-select v-model="Clas"  @visible-change="visibleChange3" @change="change3"  placeholder="请选择班级">
              <el-option
                v-for="item in Class"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="serchBox">
          <el-input v-model="input" placeholder="搜索学号或姓名"></el-input><el-button style="margin-left: 30px" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="abilityContainer">
        <router-link v-for="(item,index) in abilityData" tag="div" class="abilityBox" :key="index" :to="{path:item.url,query:item.name}">
          <div>
            <img :src="item.src" height="" width="">
            <h5>{{item.name}}</h5>
          </div>
          <p>学院：&nbsp;&nbsp;{{item.xueyuan}}</p>
          <p>年级：&nbsp;&nbsp;{{item.nianji}}</p>
          <p>班级：&nbsp;&nbsp;{{item.clas}}</p>
          <p>学号：&nbsp;&nbsp;{{item.num}}</p>       
        </router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'EAbility',
  data () {
    return {
      college: '全部',
      colleges: ["全部","会计学院","经管学院"],
      grade: '全部',
      grades: ["全部","2016级","2017级"],
      Clas: '全部',
      Class: ["全部","1601班","1602班"],
      light1: false,
      light2: false,
      light3: false,
      input: '',
      abilityData: [
        {
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },{
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },{
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },{
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },{
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },{
          name: '张三',
          src: require('../../share/img/close.png'),
          url: '/Educat/EAbility/eabilityData',
          xueyuan: '会计学院',
          nianji: '2018',
          clas: '18会计',
          num: '1841801064',
        },
      ],
    }
  },
  mounted() {

  },
  computed: {
    eability() {
      return this.$store.state
    }
  },
  methods: {
    visibleChange1(val) {
      // val? this.light=true: this.light=false
      this.light1 = val;
    },
    change1(val) {
      console.log(val)
    },
    visibleChange2(val) {
      // val? this.light=true: this.light=false
      this.light2 = val;
    },
    change2(val) {
      console.log(val)
    },
    visibleChange3(val) {
      // val? this.light=true: this.light=false
      this.light3 = val;
    },
    change3(val) {
      console.log(val)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .topBox {
    padding: 20px 20px 30px 20px;
    background-color: white;
  }
  .topBox p {
    color: #687178;
    font-size: 12px;
  }
  .selectBox {
    margin: 20px 0;
  }
  .inlineBox {
    display: inline-block;
    margin-right: 20px;
  }
  .lab {
    background-color: #F2F2F2;
    font-size: 14px;
    color: #000000;
    border: 1px solid #dcdfe6;
    border-right: 0;
    border-right: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 4px;
    display: block;
    width: 60px;
    line-height: 38px;
    text-align: center;
    float: left;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .el-select {
    width: 120px;
    height: 40px;
    float: left;
  }
  .light {
    border-color: #409EFF;
  }
  .serchBox {
    line-height: 40px;
  }
  .serchBox>div {
    width: 180px;
    display: inline-block;
  }
  .abilityContainer {
    padding-bottom: 20px;
  }
  .abilityBox {
    width: 190px;
    height: 250px;
    border: 1px solid #A5B7C5;
    color: #687178;
    font-size: 12px;
    display: inline-block;
    margin: 20px 0 0 20px;
    cursor: pointer;
  }
  .abilityBox:hover {
    box-shadow: 0 2px 8px 1px rgba(0, 0, 0, 0.09);   
  }
  .abilityBox>div {
    height: 85px;
    background-color: white;
    text-align: center;
    padding-top: 15px;
    margin-bottom: 10px;
  }
  .abilityBox>div h5 {
    margin-top: 5px;
  }
  .abilityBox>p {
    line-height: 35px;
    text-indent: 20px;
  }
</style>
