<template>
	 <div>
        <div class="content">
           <div class="Intermediate">
              <div class="tit"></div>
              <div class="man_nav">
                <el-tabs type="border-card">
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-menu"></i> 课程实训</span>
                    <div class="tables">
                      <el-table
                      :data="tableData"
                      style="width: 100%">
                       <el-table-column
                          prop="date"
                          label="序号"
                          width="80">
                        </el-table-column>
                      <el-table-column
                        prop="cos"
                        label="实训类型"
                        sortable
                        width="140"
                        :filters="[{text: '基础会计', value: '基础会计'}, {text: '中级会计', value: '中级会计'}]"
                        :filter-method="filterHandler"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="地址"
                         width="400">
                      </el-table-column>
                      <el-table-column
                        label="得分/总分">
                          <template slot-scope="scope">
                              <span style="margin-left: 10px">{{ scope.row.tag }}</span>
                              <i class="el_z">/100</i>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="排名"
                        width="80">
                      </el-table-column>
                      <el-table-column 
                          label="操作"
                          width="100">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(scope.$index, tableData)"
                              type="text"
                              size="small">
                              查看详情
                            </el-button>
                          </template>
                      </el-table-column>
                    </el-table>
                    </div> 
                      <div class="blocks">
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
                  </el-tab-pane>
                  <!-- 综合实训 -->
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-tickets"></i> 综合实训</span>
                    综合实训
                  </el-tab-pane>
                </el-tabs>
              </div>
           </div>
      </div>
   </div>
</template>

<script>
	export default{
		name:'management',
    data(){
      return{
         tableData: [{
          date: '1',
          name: '1',
          cos:'基础会计',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '80'
        },{
          date: '2',
          name: '1',
          cos:'中级会计',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '70'
        }, {
          date: '3',
          name: '1',
          cos:'基础会计',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '70'
        },{
          date: '4',
          name: '1',
          cos:'中级会计',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '70'
        },{
          date: '6',
          name: '1',
          cos:'中级会计',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '70'
        }],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      }
    },
     methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
       deleteRow(index, rows) {
         console.log("这是查看详情")
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
	}
</script>


<style scoped>
.content{
    height: 100%;
    margin: 0 auto;
}
.Intermediate{
  background-color: rgb(250,250,250);
  min-height: 718px;
}
.tit{
  width:100%;
  height:44px; 
  background:rgba(255,255,255,1);
  border:1px solid #FAFAFA;
  margin-bottom: 12px;
      margin-top: 20px;
}
.blocks{
  text-align: right;
  margin: 20px 35px;
}
.el_z{
  font-style: normal;
}
</style>