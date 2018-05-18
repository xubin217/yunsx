<template>
  <div class="">
  	<router-link to="/tizu/teacMarking">教师阅卷</router-link>
    <router-link to="/tizu/teacPreview">教师预览题型</router-link>
    <router-link to="/tizu/teacTiZu">教师预览题组</router-link>
    <router-link to="/tizu/choice_question">预览题型</router-link>
    <router-link to="/tizu/correct">更正题型</router-link>
    <router-link to="/tizu/practice">自主练习题型</router-link>
    <router-link to="/tizu/achieve">已完成题型</router-link>
     <router-link to="/tizu/multiple_choice">多选题</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'tizu',
  data () {
    return {
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
