<template>
  <div class="">
  	<el-container class="con">
      <el-header style="background: white; height: 80px;" class="ww">
        <div class="head">
          <div class="schoolBox">
            {{schoolName}}
          </div>
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">联系客服</span>
            <el-dropdown-menu slot="dropdown" class="dropdownList">
              <el-dropdown-item><span class="droplink">小云客服</span></el-dropdown-item>
              <el-dropdown-item><span class="droplink">0731-85219848-8009</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          |
          <el-dropdown placement="bottom">
            <span class="el-dropdown-link">王小二</span>
            <el-dropdown-menu slot="dropdown" class="dropdownList">
              <el-dropdown-item><router-link class="droplink" to="/Educat/Usermsg"  @click.native="active='/Educat/Usermsg'">基本信息</router-link></el-dropdown-item>
              <el-dropdown-item><router-link class="droplink" to="/Load" @click.native="back">退出</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container class="ww con">
        <el-aside style="background: #001529; min-height: 100%;" :width="menuToggle?'64px':'200px'">
          <span v-model="menuToggle" @click="menuToggle=!menuToggle" 
            class="el-icon-menu"
            :class="menuToggle?'menutog':''"></span>
          <el-menu :default-active="active" router class="el-menu-vertical-demo" @select="checkMenu" :collapse="menuToggle">
            <el-menu-item v-for="(item,index) in linkList" :key="index" :index="item.link">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="con" style="padding-bottom: 66px;">
        	<router-view />
          <footer>
            Copyright © 云上实训 技术支持
          </footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Educat',
  data () {
    return {
      schoolName: "湖南外贸职业学院",
      linkList: [
        // {
        //   link: '/Educat/Monitor',
        //   icon: 'el-icon-view',
        //   name: '实训监控',
        // },
        {
          link: '/Educat/Teaching',
          icon: 'el-icon-date',
          name: '任教管理',
        },
        // {
        //   link: '/Educat/Plan',
        //   icon: 'el-icon-edit-outline',
        //   name: '教学计划',
        // },
        {
          link: '/Educat/Account',
          icon: 'el-icon-tickets',
          name: '账号管理',
        },
        // {
        //   link: '/Educat/EAbility',
        //   icon: 'el-icon-message',
        //   name: '能力档案',
        // },
        {
          link: '/Educat/Manaportal',
          icon: 'el-icon-bell',
          name: '门户管理',
        },
        {
          link: '/Educat/Usermsg',
          icon: 'el-icon-setting',
          name: '个人信息',
        },
      ],
      active: "/Educat/"+window.location.href.split("/Educat/")[1].split("/")[0],
      menuToggle: false,
    }
  },
  mounted() {

  },
  methods: {
    checkMenu(indexPath) {
      this.active = indexPath;
    },
    back() {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("name")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.con {
  min-height: 100%;
  position: relative;
}
.el-header {
  box-shadow: 0px 1px 4px 0px rgba(0,21,41,0.12) 
}
.el-dropdown {
  margin: 0 5px;
}
.el-dropdown-link {
  cursor: pointer;
}
.dropdownList li {
  padding: 0;
}
.droplink {
  display: block;
  padding: 0 20px;
  font-size: 14px;
  color: #678178;
}
.head {
  text-align: right;
  position: relative;
  color: #678178;
}
.schoolBox {
  position: absolute;
  padding-left: 70px;
  color: #283A48;
  font-size: 20px;
  background-image: url('../../share/img/School.png');
  background-repeat: no-repeat;
  background-position: 0 center;
}
.menu-collapsed {
  width: 200px;
}
.menu-expanded {
  width: 50px;
}
/*.ww {
  min-width: 960px;
}*/
.el-aside {
  transition: all .3s linear;
  -moz-transition: all .3s linear;
  -webkit-transition: all .3s linear;
}
.el-aside .el-icon-menu {
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
  display: block;
  line-height: 35px;
  text-align: right;
}
.el-aside .menutog {
  text-align: center;
  margin-right: 0;
}
.el-menu {
  border: 1px solid rgb(0, 21, 41);
  background: rgb(0, 21, 41);
  max-width: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-item {
  color: #FFFFFF;
  font-size: 14px;
}
.el-menu-item:hover, .is-active {
  background: rgba(0,176,255,0.3);
}
footer {
  line-height: 66px;
  color: #A5B7C5;
  font-size: 12px;
  background: #F0F2F5;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
