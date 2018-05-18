<template>
  <div >
    <div class="componentBox" v-if='showst.firstrouter'>
      <p class="boxTitle">最近使用</p>
      <div style="margin-bottom:20px;width: 960px;margin: auto;">
        <router-link class="recentlyList recentlyListTop" tag="div" v-for="(item,index) in recentlyData" 
        :key="index" to="/Student/trainingCenter/Basic_Accounting" @click.native="goto(item.name)">
          <img :src="item.src" width="100%">
          <div>
            <h4>{{item.name}}</h4>
            <p>{{item.text}}</p>
            <p><i class="el-icon-document"></i>{{item.number}}题<span>{{item.time}}日更新</span></p>
          </div>
        </router-link>
      </div>
    </div>
    <div style="background: white; padding-bottom: 20px;"v-if='showst.firstrouter'>
      <div style="width: 960px;margin: auto;">
      <div class="componentBox">
        <p class="boxTitle">课程实训</p>
        <div>
          <router-link class="recentlyList recentlyListBot" tag="div" v-for="(item,index) in classType" :key="index" :to="{ path:'/Student/trainingCenter/Basic_Accounting',query: { id:cousetData[index].id}}" @click.native="goto(item.name)">
            <img :src="item.src" width="100%">
            <div>
              <h4>{{item.name}}</h4>
              <p><i class="el-icon-document"></i>{{item.number}}题<span>{{item.time}}日更新</span></p>
            </div>
          </router-link>
        </div>
      </div>
      </div>
    </div>
    <div><router-view /></div>
  </div>
</template>

<script>
export default {
  name: 'trainingCenter',
  data () {
    return {
      recentlyData: [
        {
          name: '基础会计',
          number: '3281',
          time: '2017/8/22',
          src: require('../../share/img/class_big.png'),
          text: '一套专注于会计基础的课程。'
        },{
          name: '财务管理',
          number: '3281',
          time: '2017/8/22',
          src: require('../../share/img/class_big.png'),
          text: '一套专注于会计基础的课程。'
        },{
          name: '初级会计电算化',
          number: '3281',
          time: '2017/8/22',
          src: require('../../share/img/class_big.png'),
          text: '一套专注于会计基础的课程。'
        },
      ],
      classType: [] 
     }
  },
  mounted() {
      this.coursehttp();
  },
  computed: {
    showst() {
      return this.$store.state
    }
  },
  methods: {
    goto(name) {
      // localStorage.setItem("kcname",name);
      // this.$router.push({ path:'/Educat/Teaching/taskdetail',query: { id:this.gridData[index].id}});
    },
    coursehttp(){
      this.$http.post(`${this.$store.state.location}services/app/Course/GetCourseStudentAssociate`,{
                "studentId":9,
                "termId": 1,
                "maxResultCount": 10,
                "skipCount": 0,
            },{
                headers: {
                    "Content-Type": "application/json",
            }
            }).then(response=>{
               this.cousetData = response.body.result.items;
               this.courselist();
               console.log(this.cousetData)
            },response=>{
              console.log('error')
           })
    },
      courselist(){
        if(this.cousetData !== [] ){
            for (let i in this.cousetData) {
            this.classType.push({
               name: this.cousetData[i].title,
               number: '3281',
               time: '2017/8/22',
               // src: 'http://' + this.cousetData[i].pictureUrl,
               src:require('../../share/img/class_big.png')
            })
          }
        }else{
          console.log("没有请求到数据")
        }
      },  
    },
  components: {
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.componentBox .boxTitle {
  text-indent: 20px;
  color: #243847;
  font-size: 18px;
  margin-top: 25px;
  padding-top: 15px;
  width: 960px;
  margin: auto;
}
.recentlyListTop {
  width:306px;
  margin-bottom: 50px;
}
.recentlyListTop:nth-child(3n) {
  margin-right: 0;
}
.recentlyListBot {
  width: 224px;
}
.recentlyListBot:nth-child(4n) {
  margin-right: 0;
}
.recentlyList {
  display: inline-block;
  position: relative;
  border-radius: 2px 2px 0 0;
  cursor: pointer;
  background: #FFFFFF;
  border: 1px solid #E9E9E9;
  margin: 25px 20px 30px 0;
}
.recentlyList:hover {
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.09);
}
.recentlyList img {
  width:224px;
  height:134px; 
  display: block;
  border: 0;
  border: none;
  border-radius: 2px 2px 0 0;
}
.recentlyList div {
  padding: 10px 20px 15px 20px;
}
.recentlyList h4 {
  font-size: 16px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, .85);
}
.recentlyList p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, .45);
  font-size: 14px;
  margin-bottom: 10px;
  position: relative;
}
.recentlyList p:last-child {
  font-size: 12px;
  margin: 0;
}
.el-icon-document {
  margin-right: 5px;
}
.recentlyList p span {
  position: absolute;
  right: 0;
}
</style>
