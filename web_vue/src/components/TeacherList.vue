<template>
  <b-container>
    <h5 class="d-flex justify-content-between my-3 page-header">
      <span>名师堂</span>
      <router-link to="">更多</router-link>
    </h5>
    <b-row >
      <b-col   v-for="(item,index) of list" :key="index">
        <router-link to="">
          <img :src="require(`@/assets/images/${item.tpic}`)" alt="" class="my-3" />
        </router-link>
        <p class="th">讲师:{{item.tname}}</p>
        <router-link class="cou" to="">主讲:{{item.maincourse}}</router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "TeacherList",
  data() {
    return {
      // 返回教师的数量
      list: []
    }
  },
  methods: {
    getTeacherList() {
      this.$axios.get('/teacher/list').then(res => {
        console.log(res);
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
    // 组件挂载时,调用
    this.getTeacherList();
  },
}
</script>

<style scoped>
.container {
    padding-right: 0;
    padding-left: 0; 
}
.page-header {
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  font-weight: lighter;
}
span{
    min-width: 100px;
    text-align: center;
    font-size: 18px;
    border-bottom: 2px solid #57bc4c;
    margin-bottom:-2px;
}
 .col{
    padding-right:0;
    padding-left: 0;
}
.th{
  font-size: 14px;
  color:#555;
}
.cou{
  font-size: 12px;
  color:#999;
}
.cou:hover{
  text-decoration: none;
  color:#f60;
}
</style>