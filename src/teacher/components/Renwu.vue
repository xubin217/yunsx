<template>
  <div class="" style="background: white;min-height:calc(100% - 80px)">
    <div style="background: white; padding: 20px 0;min-height:600px;">
      <div class="ctrlTop">
        <span>实训课程:</span>
        <el-select v-model="course" size="medium" @change="changeCourse">
          <el-option
            v-for="item in allcourse"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="ctrlR">
          <el-radio-group v-model="state" size="medium" @change="changeState">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">未开始</el-radio-button>
            <el-radio-button label="2">进行中</el-radio-button>
            <el-radio-button label="3">已结束</el-radio-button>
          </el-radio-group>
          <el-input placeholder="请输入任务名" suffix-icon="el-icon-search" clearable v-model="search" @keyup.enter.native="changeSearch"></el-input>
        </div>
      </div>
      <div v-for="(item,index) in missionData" :key="index" class="missionBox">
        <img :src="item.src" width="130" height="78">
        <div class="missionMsb">
          <div class="missTextBox">
            <div class="missL">{{item.title}}</div>
            <div class="missR">
              <span class="one">班级</span>
              <span>开始时间</span>
              <span>结束时间</span>
            </div>
          </div>
          <div class="missTextBox">
            <div class="missL">{{item.text}}</div>
            <div class="missR">
              <span class="one">{{item.clas}}</span>
              <span>{{item.beginT}}</span>
              <span>{{item.endT}}</span>
            </div>
          </div>
        </div>
        <div class="missionCtrl">
          <span v-if="item.program==0">未开始</span>
          <span v-else-if="item.program==100">已完成</span>
          <span v-else>进行中</span>
          <el-progress :percentage="item.program" :status="item.program==100? 'success' : ''"></el-progress>
          <div class="missctrlR">
            <span v-if="item.program==0">
              <i class="el-icon-delete" @click="feiqi(item.title)"></i><span @click="feiqi(item.title)">废弃</span>
              <i class="shu">|</i><i class="el-icon-edit-outline" @click="edit(item.title)"></i><span @click="edit(item.title)">编辑</span>
              <i class="shu">|</i><i class="el-icon-document" @click="yulan(item.title)"></i><span @click="yulan(item.title)">预览</span>
            </span>
            <span v-else-if="item.program==100">
              <i class="el-icon-document" @click="chakan(item.title)"></i><span @click="chakan(item.title)">查看</span>
            </span>
            <span v-else>
              <i class="el-icon-delete" @click="feiqi(item.title)"></i><span @click="feiqi(item.title)">废弃</span>
              <i class="shu">|</i><i class="el-icon-document" @click="chakan(item.title)"></i><span @click="chakan(item.title)">查看</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagein">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="allData"
        @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Renwu',
  data () {
    return {
      allcourse: [],
      course: 0,
      state: 0,
      search: '',
      missionData: [],
      getall: [],
      missionList: [],
      page: 1,
      pageSize: 2,
      allData: 0
    }
  },
  mounted() {
    this.getAll();
    this.getMissionList();
  },
  watch: {
    missionList() {
      this.missionData = [];
      this.allData = this.missionList.length;
      for(let i in this.missionList){
        let classs = "";
        for(let j in this.missionList[i].classes) {
          classs += this.missionList[i].classes[j].serialNumber + " "
        }
        this.missionData.push({
          src: '#',
          title: this.missionList[i].tittle,
          text: this.missionList[i].remark,
          clas: classs,
          beginT: this.getData(this.missionList[i].startTime),
          endT: this.getData(this.missionList[i].startTime),
          program: this.pregData(this.missionList[i].startTime,this.missionList[i].endTime)
        })
      }
    }
  },
  methods: {
    feiqi(name) {
      console.log(`废弃${name}`);
    },
    edit(name) {
      console.log(`编辑${name}`);
    },
    chakan(name) {
      console.log(`查看${name}`);
    },
    yulan(name) {
      console.log(`预览${name}`);
    },
    getAll() {
      let arr = [
        {
          label: '全部',
          value: 0,
        }
      ]
      this.$http.post(`${this.$store.state.location}/services/app/Course/GetAll`,
        {
          "published": true,
          "isActive": true,
          "filter": ''
        },{
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response=>{
          this.getall = response.body.result.items;
          for(let i in this.getall) {
            arr.push({
              label: this.getall[i].title,
              value: this.getall[i].id,
            })
          }
          this.allcourse = arr;
        },response=>{
          console.log('获取全部课程error')
        });
    },
    changeCourse() {
      this.page = 1;
      this.getMissionList();
    },
    changeState() {
      this.page = 1;
      this.getMissionList();
    },
    changeSearch() {
      this.page = 1;
      this.getMissionList();
    },
    changePage(val) {
      this.page = val;
      this.getMissionList();
    },
    getMissionList() {
      this.$http.post(`${this.$store.state.location}/services/app/Mission/GetMissionsByCourseId`,
      {
        "teacherId": 0,
        "courseId": this.course,
        "status": this.state,
        "name": this.search,
        "maxResultCount": this.pageSize,
        "skipCount": (this.page-1) * this.pageSize,
      },{
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response=>{
        this.missionList = response.body.result.items;
      },response=>{
        console.log("获取任务列表失败")
      })
    },
    getData(str) {
      let reg=/[-T:\.]/;
      let arr = str.split(reg)
      str = arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4];
      return str
    },
    pregData(strA,strB) {
      let starT = new Date(strA),
          endT  = new Date(strB),
          nowT  = new Date();
      if(nowT<=starT) {
        return 0
      }else if(nowT>=endT){
        return 100
      }else {
        return Number(((nowT - starT)/(endT - starT) * 100).toFixed(0))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ctrlTop {
    width: 960px;
    margin: 30px auto 20px auto;
    position: relative;
  }
  .ctrlTop>span {
    font-size: 16px;
    color: #000000;
    font-weight: bold
  }
  .ctrlTop>.el-select {
    width: 160px;
    margin-left: 5px;
  }
  .ctrlR {
    position: absolute;
    right: 0;
    top: -3px;
  }
  .ctrlR .el-input {
    display: inline-block;
    margin-left: 20px;
    width: 260px;
  }
  .missionBox {
    margin: 0 auto 20px auto;
    width: 960px;
    padding: 10px;
    border: 1px solid #E9E9E9;
    border-radius: 2px;
  }
  .missionMsb {
    display: inline-block;
    vertical-align: top;
    margin-left: 15px;
  }
  .missTextBox {
    width: 785px;
    position: relative;
    min-height: 38px;
    font-size: 14px;
    overflow: hidden;
    color:  rgba(0, 0, 0, 0.65);
  }
  .missTextBox:first-child .missL {
    font-weight: bold;
  }
  .missL {
    width: 325px;
  }
  .missR {
    position: absolute;
    right: 0;
    top: 0;
  }
  .missR>span {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    width: 85px;
    margin-left: 40px;
  }
  .missR>span:first-child {
    width: 150px;
  }
  .missionCtrl {
    height: 30px;
    line-height: 35px;
    border-top: 1px solid #E9E9E9;
    margin-top: 5px;
    padding-top: 5px;
    position: relative;
    font-size: 14px;
    color: rgba(0, 0, 0, .45)
  }
  .missionCtrl .el-progress {
    width: 210px;
    display: inline-block;
    margin-left: 8px;
  }
  .missctrlR {
    position: absolute;
    right: 0;
    top: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  .missctrlR>span i {
    color: #1890FF;
    cursor: pointer;
  }
  .missctrlR>span .shu {
    margin: 15px;
    color: #D8D8D8;
  }
  .missctrlR>span span {
    color: #1890FF;
    cursor: pointer;
    margin-left: 5px;
  }
  .pagein {
    width: 960px;
    margin: 25px auto 20px auto;
    text-align: right;
  }
  .pagein>.el-pagination {
    text-align: right;
  }
</style>
