<template>
  <div class="" style="background: white;height: 100%;min-height:calc(100% - 80px);">
    <div style="background: white;padding: 20px 0;">
      <div class="topBox">
        <div>
          <span>课程实训</span>
          <el-select v-model="course">
            <el-option
              v-for="(item,index) in courses"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>任教时间</span>
          <el-select v-model="teacTime">
            <el-option
              v-for="(item,index) in teacTimes"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>任务名称</span>
          <el-select v-model="taskName">
            <el-option
              v-for="(item,index) in taskNames"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="line"></div>
      <div class="claMsgBox">
        <div>
          <div>所属课程：<span>{{claMsgData.kechen}}</span></div>
          <div>参与班级：<span>{{claMsgData.banji}}</span></div>
        </div>
        <div>
          <div>开始时间：<span>{{claMsgData.beginT}}</span></div>
          <div>结束时间：<span>{{claMsgData.endT}}</span></div>
        </div>
        <div>
          <div>任务分值：<span>{{claMsgData.missCount}}</span></div>
          <div>任务状态：<span>{{claMsgData.state}}</span></div>
        </div>
      </div>
      <p style="width:960px;margin:0 auto;font-size:14px;color:rgba(0,0,0,.65)">
        备注信息：<span>{{claMsgData.text}}</span>
      </p>
      <div class="line"></div>
      <div style="position: relative">
        <div style="width:100%;height:9px;background:#F8F8F8;position:absolute;top: 40px"></div>
        <div class="sxtabBox">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
              <span slot="label"><i class="el-icon-menu" style="margin-right: 8px"></i>成绩列表</span>
              <div class="tabContentBox">
                <p>共有账号<span class="light">30</span>个</p>
                <ul class="chengjiList">
                  <li>
                    <span class="xm">姓名</span>
                    <span class="xh">学号</span>
                    <span class="bj">班级</span>
                    <span class="defen">得分</span>
                    <span class="rank">排名</span>
                    <span class="chaoz">操作</span>
                  </li>
                  <li v-for="(item,index) in chengjiData" :key="index">
                    <span class="xm">{{item.name}}</span>
                    <span class="xh">{{item.xuehao}}</span>
                    <span class="bj">{{item.banji}}</span>
                    <span class="defen">{{item.defen}}</span>
                    <span class="rank">{{item.rank}}</span>
                    <span class="chaoz light"><i class="el-icon-edit-outline"></i>评阅</span>
                  </li>
                </ul>
                <div class="pagein">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="second">
              <span slot="label"><i class="el-icon-tickets" style="margin-right: 8px"></i>任务分析</span>
              任务分析
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shuju',
  data () {
    return {
      courses: ['基础会计','财务会计'],
      course: '基础会计',
      teacTimes: ['2017-2018年上学期','2017-2018年下学期'],
      teacTime: '2017-2018年上学期',
      taskNames: ['基础会计第四周摸底测试','基础会计第一周摸底测试'],
      taskName: '基础会计第四周摸底测试',
      claMsgData: {
        kechen: '基础会计',
        banji: '18会计',
        beginT: ' 2017-12-27 10:00',
        endT: ' 2017-12-27 10:00',
        missCount: '100分',
        state: '已完成',
        text: '我们的开始是很长的电影放映了三年我票都还留着,冰上的世界脑海中还在旋转望着你, 慢慢忘记你,朦胧的时间我们溜了多远冰刀划的圈圈起了谁改变,如果再重来,会不会稍嫌狼狈,爱是不是不开口才珍贵,再给我两分钟～,爱是不是不开口才珍贵,让我把记忆结成冰别融…',
      },
      activeName: 'first',
      chengjiData: [
        {
          name: '张三',
          xuehao: '1341301046',
          banji: '13会计',
          defen: 100,
          rank: 1,
        },{
          name: '张三',
          xuehao: '1341',
          banji: '13会计',
          defen: 100,
          rank: 1,
        },{
          name: '张三',
          xuehao: '1341301046',
          banji: '13会计',
          defen: 100,
          rank: 1,
        },
      ]
    }
  },
  mounted() {
    
  },
  methods: {
    handleClick() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line {
    height: 1px;
    background-color: #EEEEEE;
    margin-top: 20px;
  }
  .topBox {
    width: 960px;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .topBox>div>span {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .claMsgBox {
    width: 960px;
    margin: 20px auto 10px auto;
  }
  .claMsgBox>div {
    display: inline-block;
    width: 200px;
    margin-right: 120px;
  }
  .claMsgBox>div:first-child, .claMsgBox>div:last-child {
    margin-right: 20px;
  }
  .claMsgBox>div div {
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, .45);
  }
  .claMsgBox>div div span {
    color: rgba(0, 0, 0, .65);
  }
  .sxtabBox {
    width: 960px;
    margin: 0 auto;
    background-color: white;
    font-size: 14px;
  }
  .el-tabs__item {
    color: rgba(0,0,0,.65)
  }
  .tabContentBox {
    padding: 20px 0;
  }
  .tabContentBox p {
    color: #687178;
    font-size: 12px;
  }
  .tabContentBox p .light {
    color: #1890FF;
    margin: 0 3px;
  }
  .chengjiList {
    font-size: 14px;
    color: #687178;
  }
  .chengjiList li {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    border-bottom: 1px solid #E8E8E8;
    line-height: 47px;
  }
  .chengjiList li:first-child {
    color: black;
    background-color: #F8F8F8;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
  }
  .chengjiList li span {
    width: 0;
    flex-grow: 1;
    text-indent: 60px;
  }
  .chengjiList li span i {
    text-indent: 0;
  }
  .chengjiList li .light {
    cursor: pointer;
    color: #1890FF;
  }
  .pagein {
    margin: 45px auto 0px auto;
    text-align: right;
  }
</style>
