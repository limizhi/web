<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row class="my-5" v-for="(item,index) in list" :key="index">
      <b-col lg="2" md="3" sm="4">
        <img :src="require(`../assets/images/${item.tpic}`)" alt="" class="img-fluid"/>
      </b-col>
      <b-col lg="10" md="9" sm="8">
        <h3>{{item.tname}}<span>{{item.maincourse}}</span></h3>
        <dl>
            <dt>工作经历：</dt>
            <dd>{{item.experience}}</dd>
        </dl>
        <dl>
            <dt>授课风格：</dt>
            <dd>{{item.style}}</dd>
        </dl>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Teacher",
  data() {
    return {
      list: [],
      items: [
          {
            text: '首页',
            to: {name: 'home'}
          },
          {
            text: '名师堂',
            active: true
          }
      ]
    }
  },
  methods: {
    getTeachers() {
      // 通过axios调用node接口
      this.$axios.get("/teacher/list").then(res => {
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
    // 组件挂载时,调用getTeachers()方法
    this.getTeachers();
  }
}
</script>

<style scoped>
  h3{
    font-size: 16px;
    font-weight: lighter;
    color: #f60;
    line-height: 30px;
}
h3>span{
    margin-left: 20px;
}
dt{
  font-size: 13px;
  color:#555;
}
dd{
  font-size: 13px;
  color:#888;
}
</style>