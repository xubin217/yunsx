<template>
  <div class="box">
    <div class="topBox">
      <p>实训监控</p>
      <h3>实训人数/次数</h3>
      <el-dropdown placement="bottom" trigger="click" class="ctrlChart" @command="chartChange">
        <span class="el-dropdown-link"><i class="el-icon-date" style="margin-right: 8px"></i>{{chartTime}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="最近七天">最近七天</el-dropdown-item>
          <el-dropdown-item command="最近一月">最近一月</el-dropdown-item>
          <el-dropdown-item command="自定义">
            <div class="custom">自定义时间</div>
            <div>   
              <el-date-picker
                v-model="time"
                size="mini"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="charstBox">
      <div id="myChart" :style="{width: '700px', height: '360px', margin: '0 auto'}"></div>
    </div>
    <div class="dataListBox">
      <h3>班级实训排名</h3>
      <el-dropdown placement="bottom" trigger="click" class="ctrlRank" @command="RankChange">
        <span class="el-dropdown-link"><i class="el-icon-date" style="margin-right: 8px"></i>{{rankType}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="综合排名">综合排名</el-dropdown-item>
          <el-dropdown-item command="实训人数">实训人数</el-dropdown-item>
          <el-dropdown-item command="实训次数">实训次数</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="flexBox flexTitle">
        <span>排名</span>
        <span>班级</span>
        <span>年级</span>
        <span>实训人数</span>
        <span>实训次数</span>
      </div>
      <div v-for="(item,index) in rankData" :key="index" class="flexBox">
        <span>{{item.rank}}</span>
        <span>{{item.class}}</span>
        <span>{{item.grade}}</span>
        <span>{{item.people}}</span>
        <span>{{item.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  data () {
    return {
      option : {
        color: ['#1890FF','#F5A623'],
        title: {
          text: '实训趋势',
          textStyle: {
            color: '#687178',
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['在线实训人数','在线实训人数A']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['11','12','13','14','15','16','17']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 人'
          }
        },
        series: [
          {
            name:'在线实训人数',
            type:'line',
            data:[210, 250, 300, 235, 255, 237, 275],
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'在线实训人数A',
            type:'line',
            data:[225, 250, 238, 315, 300, 265, 248],
            markLine: {
              data: [
                {type: 'average', name: '平均值'},
              ]
            }
          }
        ]
      },
      checTime: 0,
      rankData: [
        {
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },{
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },{
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },{
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },{
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },{
          rank: 1,
          class: "1220",
          grade: "2015级",
          people: 30,
          count: 253
        },
      ],
      time: '',
      chartTime: '最近七天',
      rankType: '综合排名'
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine(){
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      myChart.setOption(this.option)
    },
    chartChange(command) {
      this.chartTime = command;
    },
    RankChange(command) {
      this.rankType = command;
    }
  },
  watch: {
    checTime() {
      this.drawLine();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  background: white;
}
.topBox {
  padding: 15px 20px;
  position: relative;
  margin-top: 1px;
  border-bottom: 1px solid #DDDDDD;
}
.ctrlChart, .ctrlRank {
  position: absolute;
  right: 20px;
  top: 60px;
  cursor: pointer;
  font-size: 14px;
  color: #687178;
}
.topBox p {
  color: #687178;
  font-size: 12px;
  line-height: 23px;
}
.topBox h3 {
  color: #687178;
  font-size: 16px;
  margin-top: 8px;
  line-height: 30px;
}
.charstBox {
  padding: 20px 0;
  background: white;
}
.dataListBox {
  padding: 0 20px;
  position: relative;
}
.ctrlRank {
  top: 5px; 
}
.dataListBox h3 {
  color: #687178;
  font-size: 16px;
  margin-top: 8px;
  line-height: 30px;
  margin-bottom: 15px;
}
.flexBox {
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  max-height: 640px;
  overflow-y: auto;
  border-top: 1px solid #E8E8E8; 
}
.flexBox span {
  width: 0;
  line-height: 48px;
  flex-grow: 1;
  font-size: 12px;
  color: #687178;
  text-align: center;

}
.flexTitle {
  background: #F8F8F8;
  border: 0;
}
</style>
