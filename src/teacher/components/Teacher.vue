<template>
  <div class="teac">
    <el-container style="height: 100%;">
      <!-- 内容 -->
      <el-main style="min-height: 100%;position:relative; padding-bottom: 70px;">
      <!-- 头部 -->
      <el-header height="80" :class="propaganda.propaganda?'speac':''">
        <div class="head">
          <router-link :to="{ name: 'Yuanxiao'}" class="logo"></router-link>
          <router-link 
            v-for="(item,index) in urlData" class="link" 
            :key="index" :to="{ name: item.url}"
            :data-content="item.name">
            {{item.name}}
          </router-link>
          <el-dropdown placement="bottom" @command="gerenlink" class="user">
            <span class="el-dropdown-link"><img :src="user.img" width="38">{{user.name}}<i class="el-icon-caret-bottom" style="margin-left: 8px"></i></span>
            <el-dropdown-menu slot="dropdown" class="dropdownList">
              <el-dropdown-item command="first"><router-link class="droplink" :to="{ name: 'Geren'}">基本信息</router-link></el-dropdown-item>
              <el-dropdown-item command=""><router-link class="droplink" :to="{ name: 'Load'}" @click.native="back">退出</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
        <transition name="" mode="out-in">
          <router-view />
        </transition>
      <!-- 尾部 -->
      <footer>
        <div class="foot">
          <span>帮助</span>
          <span>隐私条款</span>
          <span>版权声明</span>
          <span>Copyright © 2018 中德安普大数据网络科技有限公司</span>
          <a href="http://www.miitbeian.gov.cn">湘ICP备15000989号-1</a>
        </div>
      </footer>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Teacher',
  data () {
    return {
      user: {
        name: '张兮兮',
        img: require('../../share/img/corgi.jpg')
      },
      urlData:[
        {
          name: '实训中心',
          url: 'Shixun'
        },{
          name: '任务管理',
          url: 'Renwu'
        },{
          name: '数据分析',
          url: 'Shuju'
        },{
          name: '能力档案',
          url: 'Ability'
        },{
          name: '资料共享',
          url: 'Ziliao'
        }
      ]
    }
  },
  created() {

  },
  methods: {
    gerenlink(command) {
      if(command) {
        if(command){
          this.$store.commit("add",command)
        }
      }
    },
    back() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      localStorage.removeItem("name")
    }
  },
  computed: {
    propaganda() {
      return this.$store.state
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdownList li {
  padding: 0;
}
.droplink {
  display: block;
  padding: 0 20px;
}
header {
  position: relative;
  z-index: 2;
}
.speac {
  position: absolute;
}
.head {
  width: 960px;
  margin: 0 auto;
  text-align: left;
  position: relative;
}
.head .link {
  margin: 0 12px;
  font-size: 18px;
  color: #687178;
}
.head .logo {
  position: absolute;
  width: 165px;
  height: 40px;
  top: 20px;
  background: url('../../share/img/logo_Dark.png') no-repeat;
}
.speac .head .logo {
  background: url('../../share/img/logo_Light.png') no-repeat;
}
.speac .head .link,.speac .head .user {
  color: white;
}
.head .link:nth-child(2) {
  margin-left: 275px;
}
.head .link:hover,.head .router-link-active {
  color: #00B0FF;
}
.user {
  position: absolute;
  right: 0;
  top: -1px;
  cursor: pointer;
}
.user img {
  position: absolute;
  left: -50%;
  top: 50%;
  margin-top: -20px;
  margin-left: -10px;
  border-radius: 50%;
}
.user .el-dropdown-link {
  font-size: 16px;
}
footer {
  line-height: 65px;
  position: absolute;
  /*bottom: 0;*/
  width: 100%;
  background-color: #F8F8F8;
}
</style>
