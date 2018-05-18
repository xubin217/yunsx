 <template>
	 <div>
      <div class="content">
        <div class="task_content">
           <div style="width:960px;margin:0 auto;">
            <div class="nav">
    	   	   <el-breadcrumb separator="/">
    				  <el-breadcrumb-item :to=" { path:'/Student/myTask'}">我的任务</el-breadcrumb-item>
    				  <el-breadcrumb-item>基本会计</el-breadcrumb-item>
    				</el-breadcrumb>
	   	    </div>
          <div v-for="(item,index) in missionData" :key="index" class="missionBox">
            <img :src="item.src" width="130" height="78">
            <div class="missionMsb">
              <div class="missTextBox">
                <div class="missL">{{item.title}}</div>
                <div class="missR" style="color:rgba(0,0,0,0.45);">
                  <span class="one">发布者</span>
                  <span>开始时间</span>
                  <span>结束时间</span>
                  <span>总分</span>
                </div>
              </div>
              <div class="missTextBox">
                <div class="missL">{{item.text}}</div>
                <div class="missR">
                  <span class="one">{{item.clas}}</span>
                  <span>{{item.beginT}}</span>
                  <span>{{item.endT}}</span>
                  <span>{{item.Total}}分</span>
                </div>
              </div>
            </div>
            <!-- 分割线 -->
            <div class="vertical"></div>
            <div class="missionCtrl">
              <span>已结束</span>
              <el-progress :percentage="item.program" :status="item.program==100? 'success' : ''"></el-progress>
              <div class="missctrlR">
                <span v-if="item.program==100">   
                  <i class="el-icon-document" @click="chakan(item.title)"></i><span @click="chakan(item.title)">答题记录</span>
                </span>
              </div>
            </div>
          </div>
       </div>
     </div>
     <div class="task_but">
        <div class="tack_r_con">
             <div class="table_but">
                 <div class="casesindex_top">
                     <b>错误列表</b>            
                 </div>
                 <div class="table_s">
                    <el-table
                        :data="tableData4"
                        style="width: 100%"
                        >
                        <el-table-column
                          prop="date"
                          label="序号"
                          width="50">
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="案例名称"
                          width="400">
                        </el-table-column>
                        <el-table-column
                          prop="province"
                          label="题型"
                          width="90">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="90">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, tableData4)"
                              type="text"
                              size="small">
                              马上纠正
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                 </div>
                 <div class="page">
                    <div class="block">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[100, 200, 300, 400]"
                      :page-size="100"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="400">
                    </el-pagination>
                  </div>
                 </div>
             </div>
             <div class="table_but_r">
               <div class="casesindex_top">
                     <b>错误列表</b>
               </div>
                  <div class="user_title">
                        <div class="user_img">
                          <img :src="imgs">
                          <span>杨小梅</span>
                        </div>
                        <div class="user_x">
                            <ul>
                               <li>得分</li>
                               <li>总人数</li>
                               <li>排名</li>
                            </ul>
                            <ul>
                               <li>80</li>
                               <li>60</li>
                               <li>20</li>
                            </ul>
                         <div class="x"></div>
                         <div class="ox"></div>
                        </div>
                     </div>
                     <div class="ranking">
                        <div class="ranking_nav">
                            <span>排名</span>
                            <span>总人数</span>
                            <span>得分</span>            
                        </div>
                        <div class="ranking_bod">
                            <ul>
                               <li v-for="(item,index) in grade">
                                 <span>{{index+1}}</span>
                                 <span><img :src="item.img">{{item.name}}</span>
                                 <span>{{item.score}}</span>
                               </li>
                            </ul>
                        </div>
                     </div>
             </div>
        </div>
     </div>
    </div>
	 </div>
</template>
<script>
import cases  from '@/student/components/courseTraining/cases'
  export default {
    name:"examines",
    data() {
      return {
          state: '全部',
          allcourse: ['全部','基础会计','财务会计'],
          course: '全部',
          search: '',
          imgs:require('../../share/img/image_class_cover.png'),
          missionData: [
            {
              src: require('../../share/img/image_class_cover.png'),
              title: '第二学期摸底测试',
              text: '一些初级职高会计电算化案例合集。一些初级职高会计电算化案例合集。',
              clas: '张子文',
              beginT: '06-16 14:03',
              endT: '06-17 14:03',
              Total:80,
              program: 100,
            },
          ],
          tableData4: [{
          date: '1',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }, {
          date: '2',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }, {
          date: '3',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }, {
          date: '4',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '多选题',
          zip: 200333
        }, {
          date: '5',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }, {
          date: '6',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }, {
          date: '7',
          name: '提供的原始单据、记账凭证、账薄资料等,要求选用和方法···',
          province: '单选题',
          zip: 200333
        }],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        grade: [{
          date: '1',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '90',
        }, {
          date: '2',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '89',
        }, {
          date: '3',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '87',
        }, {
          date: '4',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '86',
        }, {
          date: '5',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '85',
        }, {
          date: '6',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '84',
        }, {
          date: '7',
          name: '王琳琳',
          img:require('../../share/img/image_class_cover.png'),
          score: '83',
        }],
      }
    },
    mounted () {
       this.$store.commit("firstrouterCtrl",false);
    },
    destroyed() {
      this.$store.commit("firstrouterCtrl",true)
    },
    components:{
      cases,
    },
     methods: {
      deleteRow(index, rows) {
        // rows.splice(index, 1);
         console.log("马上纠正")
         
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      chakan(){
        console.log("答题记录")
      }
    },
  };
</script>

<style scoped>
.task_content{
    border-bottom: 2px solid #FAFAFA;
    background: rgba(255,255,255,1);
}
.page{
  position: absolute;
  bottom: 42px;
  left: 92px;
}
.content{
    min-height: 700px;
    margin: 0 auto;
}
.missionBox {
  margin: 0 auto 20px auto;
  width: 960px;
  padding: 10px;
  border: 1px solid #E9E9E9;
  border-radius: 2px;
  position: relative;
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
  width: 330px;
  word-break:break-all;
  white-space: normal;
  text-overflow: ellipsis;
}
.table_s{
  padding: 0 20px;
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
  margin-left: 20px;
}
.missionCtrl .el-progress {
  width: 210px;
  display: inline-block;
  margin-left: 8px;
}
.missctrlR {
  position: absolute;
  right: 41px;
  top: 114px;
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
.missionCtrl>span{
  height:22px; 
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(0,0,0,0.45);
  line-height:22px;
}
.missionCtrl{
  border-top: 1px solid rgba(233,233,233,1);
  padding-top: 10px;
  margin-top: 8px;
}
.nav {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: rgba(0,0,0,0.45);
  line-height: 22px;
  margin: 30px 0px;
}
.vertical{
  background-color: #E9E9E9;
  width: 1px;
  height: 87px;
  position: absolute;
  top: 9px;
  left: 517px;
}
/*下面的内容*/
.task_but{
  width: 100%;
  height: 100%;
  background-color:rgb(248,248,248);
}
.tack_r_con{
  width: 960px;
  margin:  auto;
  display: flex;
  padding-top: 25px;
}
.table_but{
  width:700px;
  height:636px; 
  background:rgba(255,255,255,1);
  box-shadow: 0px 2px 9px 0px rgba(0,0,0,0.03);
  border-radius: 6px ; 
  position: relative;
}
.table_but_r{
  width:242px;
  height:636px; 
  background:rgba(255,255,255,1);
  box-shadow: 0px 2px 9px 0px rgba(0,0,0,0.03); 
  border-radius: 6px ; 
  margin-left: 20px;
}
.casesindex_top{
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding:0px 20px;
  margin-top: 24px;
  position: relative;
  margin-bottom: 25px
}
.casesindex_top>b{
  display: inline-block;
  height:20px; 
  text-align: left;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(36,56,71,1);
  line-height:20px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
} 
.casesindex_top>b::after{
     content: '';
    width: 56px;
    height: 5px;
    background: rgba(0,176,255,1);
    border-radius: 11px;
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: #157CF0;
} 
.user_title{
  padding: 0px 20px;
  display: flex;
}
.user_img{
    width:44px;
}
ul{
      display: block;
    list-style-type: disc;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
.user_x{
   margin-left: 15px;
   position: relative;
}
.user_x>ul>li{
  display: inline-block;
  width: 42px;
}
.user_x>ul:first-child{
  font-size:12px;
  font-family:PingFangSC-Regular;
  color:rgba(0,0,0,0.45);
  line-height:22px;
  padding-bottom: 15px;
}
.user_x>ul>li:last-child{
  text-align: right;
}
.user_x>ul:nth-child(2){
  height:22px; 
  font-size:20px;
  font-family:PingFangSC-Regular;
  color:rgba(0,0,0,0.65);
  line-height:22px;
}
.user_img>img{
  display: inline-block;
  width: 38px;
  height: 38px;
}
.user_img>span{
  display: inline-block;
  font-size:14px;
  font-family:PingFangSC-Regular;
  color:rgba(0,0,0,0.65);
  line-height:18px;
}
.ox{
    background-color: #E9EFF4;
    height: 80%;
    width: 1px;
    position: absolute;
    top: 3px;
    left: 34px;
}
.x{
    background-color: #E9EFF4;
    height: 80%;
    width: 1px;
    position: absolute;
    top: 3px;
    left: 97px;
}
.ranking{
    margin-top: 22px;
}
.ranking_nav{
     padding: 0px 20px;
}
.ranking_nav>span{
    display: inline-block;
    width:44px;
    height:22px; 
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(0,0,0,0.45);
    line-height:22px;
    text-align: center;
}
.ranking_nav>span:last-child{
    text-align: right;
    width:40px;
}
.ranking_nav>span:nth-child(2){
    text-align: center;
    width:102px;
}
.ranking_bod>ul{
    max-height: 430px;
    overflow-y: auto;
    padding: 0px 20px;
}
.ranking_bod>ul>li>span{
    display: inline-block;
    width: 44px;
    text-align: center;
    width:42px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(0,0,0,0.65);
    height: 29px;
    line-height: 29px;
 }
.ranking_bod>ul>li>span:nth-child(2){
    width:102px;
 }
.ranking_bod>ul>li>span:last-child{
    text-align: right;
    width:40px;
}
.ranking_bod>ul>li{
    margin: 15px 0px; 
}
.ranking_bod>ul>li>span>img{
  display: inline-block;
  width: 24px;
  height: 24px;
  vertical-align:middle;
  margin-right: 8px;
  border-radius: 50%;
}
</style>