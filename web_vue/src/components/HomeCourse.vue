<template>
  <b-container>
    <h5 class="d-flex justify-content-between my-3 page-header">
      <span>最新课程</span>
     <router-link :to="{name:'course',query:{curPage:1,typeId:0}}">更多</router-link>
    </h5>
    <b-row>
      <b-col md="3" sm="6" v-for="(item,index) of list" :key="index">
        <router-link class="tp" :to="{name:'course_detail',query:{cid:item.cid}}">
          <img :src="require(`@/assets/images/${item.pic}`)" alt="" >
        </router-link>
        <router-link class="ti" :to="{name:'course_detail',query:{cid:item.cid}}">{{item.title}}</router-link>
        <div class="th">讲师:{{item.tname}}</div>
        <h5 class="pr">￥{{item.price}}</h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "HomeCourse",
  data() {
    return {
      countNum: 4, // 返回课程的数量
      list: []
    }
  },
  methods: {
    getNewestCourse() {
      this.$axios.get('/course/newest',{
        params: {
          countNum: this.countNum
        }
      }).then(res => {
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
    this.getNewestCourse();
  },
}
</script>

<style scoped>
#app {
    text-align: start;
}
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
.tp{
  width:220px;
  height:131px;
  display:block;
  overflow: hidden; 
}
.tp>img{
  display:block;
  transition:all 0.5s;
}
.tp>img:hover{
  transform:scale(1.1,1.1)
}
.ti{
  font-size: 14px;
  color: #555;
  text-decoration: none;
}
.ti:hover{
  color:#f60;
}
.th{
  font-size: 12px;
  color:#999
}
.pr{
  font-size: 16px;
  color:#f60;
  font-weight:bold;
}
</style>