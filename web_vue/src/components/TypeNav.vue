<template>
  <div class="p-4 bg-light mb-3">
    <span>课程等级：</span>
    <router-link :to="{name: 'course', query:{curPage:1, typeId: 0}}" :class="typeId == 0 ?  'btn btn-success mx-3' : 'btn mx-3'">不限</router-link>
    <router-link v-for="(item,index) in list" :key="index" :to="{name: 'course', query:{curPage:1,typeId: item.tpid}}" :class="typeId == item.tpid ? 'btn btn-success mx-3' : 'btn mx-3'">{{item.tpname}}</router-link>
  </div>
</template>

<script>
export default {
  name: "TypeNav",
  data() {
    return {
      list: [],
      typeId: 0
    }
  },
  methods: {
    getTypes() {
      this.$axios.get("/type").then(res => {
        // console.log(res);
        // 给变量list赋值
        if (res.data.code == 200) {
          this.list = res.data.data
        }
      }).catch(err => {
        console.error(err);
      });
    }
  },
  mounted() {
    // 将网址上的typeId赋值给vue变量typeId
    this.typeId = this.$route.query.typeId;
    this.getTypes();
  },
}
</script>

<style scoped>
  .btn-success{
      background: #57bc4c;
  }
</style>