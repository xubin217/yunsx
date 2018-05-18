<template>
  <div class="" style="background: white;min-height:calc(100%)">
  	<div class="bg">
     <div class="wifi">
       <div class="wifiContent">
         <h2>云上实训—开放、互动、共享和生态的云平台</h2>
         <p>大数据，云计算。运用现代化信息技术，辅之于一联网尝试联合，把课里课外、学里学外、班里班外、校里校外融为一体，开放包容，实时互动，“全帮”共享。</p>
       </div>
     </div> 
    </div>
    <div class="container">
    	<el-tabs v-model="activeName" @tab-click="handleClick" class="tabNav">
  	    <el-tab-pane label="通知公告" name="first" class="content">
          <ul class="notice">
            <li v-for="(item,index) in noticeData" :key="index">
              <p>{{item.text}}</p>
              <div>
                <span class="source">{{item.source}}</span>
                <span class="line">|</span>
                <span class="time">{{item.time}}</span>
              </div>
            </li>
          </ul>
        </el-tab-pane>
  	    <el-tab-pane label="实训资讯" name="second" class="content">实训资讯000</el-tab-pane>
  	  </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Yuanxiao',
  data () {
    return {
      activeName: 'first',
      	shows: true,
      noticeData: [
        {
          text: '云上实训2.0正式上线，新功能激动人心！',
          source: '云训官方',
          time: '2018.02.23'
        },
        {
          text: '财会专业2018年度第一学期期中模拟考试将于3月15日正式举行',
          source: '云训官方',
          time: '2018.02.23'
        },
        {
          text: '发票备注栏不可忽略，来看看那些需要填写备！',
          source: '云训官方',
          time: '2018.02.23'
        },
        {
          text: '营改增差额征税什么意思？包括哪些项目？',
          source: '云训官方',
          time: '2018.02.23'
        },
        {
          text: '云上实训2.0正式上线，新功能激动人心！',
          source: '云训官方',
          time: '2018.02.23'
        },
      ]
    }
  },
  mounted() {
    this.$store.commit('propagandaCtrl',true)
  },
  methods: {
  	handleClick(tab,events){
  		
  	}
  },
  destroyed() {
    this.$store.commit('propagandaCtrl',false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg {
  height: 482px;
  position: relative;
  background: #6d4388;
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6d4388', endColorstr='#163289',GradientType=0 );
  background: -webkit-linear-gradient(#6D4388, #163289);
  background:    -moz-linear-gradient(#6D4388, #163289);
  background:      -o-linear-gradient(#6D4388, #163289);
  background:         linear-gradient(#6D4388, #163289);
}
.wifi {
  width: 1022px;
  margin: 0 auto;
  height: 527px;
  background: url('../img/image_banner.png') left 170px no-repeat;
}
.wifiContent {
  width: 50%;
  position: relative;
  left: 542px;
  top: 234px;
}
.wifiContent h2 {
  font-size: 24px;
  color: white;
  font-family: PingFangSC;
}
.wifiContent p {
  font-size: 12px;
  margin-top: 12px;
  color: white;
  font-family: PingFangSC;
}
.container {
  width: 960px;
  margin: 0 auto;
}
.notice {
  margin: 0 0 10px 0;
  -webkit-padding-start: 0;
}
.notice li {
  position: relative;
  font-size: 14px;
  padding: 0 30px;
  line-height: 45px;
  border-bottom: 1px dotted #979797;
}
.notice li:last-child {
  border-bottom: none;
}
.notice li p {
  width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #42424E;
}
.notice li div {
  position: absolute;
  top: 0;
  right: 30px;
}
.notice li div span {
  color: #C1C4D2;
}
.notice li div span.source {
  padding-left: 24px;
  background: url("../img/icon_combined_index.png") 2px 3px no-repeat;
}
.notice li div span.line {
  margin: 0 10px;
}
.notice li div span.time {
  padding-left: 24px;
  background: url("../img/icon_clock_index.png") 2px 3px no-repeat;
}
</style>
