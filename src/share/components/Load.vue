<template>
  <div>
    <div class="" style="position: relative; padding-bottom: 65px; min-height:100%;background-color:white">
      <div class="loadBox" v-if="show"><dialogs @dialog="dialog"></dialogs></div>
      <el-header height="80" :class="propaganda.propaganda?'speac':''">
        <div class="head">
<!--           <router-link to="/Teacher">教师登录</router-link>
          <router-link to="/Student">学生登录</router-link>
          <router-link to="/Educat">教务登录</router-link> -->
          <router-link to="/tizu" target="_blank">题组</router-link>
          <el-button type="success" @click="loading">登录</el-button>
        </div>
      </el-header>
      <yuanxiao></yuanxiao>
      <footer>
        <div class="foot">
          <span>帮助</span>
          <span>隐私条款</span>
          <span>版权声明</span>
          <span>Copyright © 2018 中德安普大数据网络科技有限公司</span>
          <a href="http://www.miitbeian.gov.cn">湘ICP备15000989号-1</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import yuanxiao from './Yuanxiao'
import dialogs from './dialogs'
export default {
  name: 'Load',
  data () {
    return {
      show: false,
      sessionData: {}
    }
  },
  mounted() {
    this.$store.commit('propagandaCtrl',true)
  }, 
  methods: {
    loading() {
      this.show = true
    },
    dialog() {
      this.show = false;
    }
  },
  computed: {
    propaganda() {
      return this.$store.state
    },
  },
  components: {
  	yuanxiao,dialogs,
  },
  destroyed() {
    this.$store.commit('propagandaCtrl',false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head {
  width: 960px;
  margin: 0 auto;
  text-align: right;
  background: url('../../share/img/logo_Light.png') 0 20px no-repeat;
}
.head a {
  color: white;
}
.loadBox {
  position: relative;
  z-index: 1000;
}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background: #F8F8F8;
}
</style>
