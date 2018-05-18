<template>
  <div class="">
    <div class="">
      <p><router-link to="/Educat/EAbility">能力档案</router-link>{{personalData.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eabilityData',
  data () {
    return {
      personalData: {
        name: '000',
      }
    }
  },
  mounted() {
    this.$store.commit("firstrouterCtrl",false);    
  },
  destroyed() {
    this.$store.commit("firstrouterCtrl",true)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
