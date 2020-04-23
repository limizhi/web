<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row class="mb-5">
      <b-col md="6" sm="12">
        <img :src="detail.pic" alt="" class="w-100" style="max-width:400px;">
      </b-col>
      <b-col md="6" sm="12">
        <h2 class="desc">{{detail.title}}</h2>
        <ul class="list-unstyled">
            <li>讲师：{{detail.tname}}</li>
            <li>课时：{{detail.cLength}}</li>
            <li>开课时间：{{detail.startTime}}</li>
            <li>上课地点：{{detail.address}} <router-link class="ad" :to="{name:'address'}">查看各校区地址</router-link></li>
        </ul>
        <div class="mb-2">课程价格：<h2 class=" d-inline-block">¥ {{detail.price}}</h2></div>
        <div class="course_link">
            <span @click="addCart" class="btn btn-warning">
            <em class="icon-cart"></em>加入购物车</span>
            <span @click="addFavorite" class="btn btn-secondary ml-3">加入收藏</span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <h2 class="page-header"><span>课程详情</span></h2>
        <div class="my-3 xq" v-html="detail.details"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "CourseDetail",
  data(){
    return {
      items: [
          {
            text: '首页',
            to: {name: 'home'}
          },
          {
            text: '全部课程',
            active: true
          }
      ],
      detail: {}
    }
  },
  methods: {
    getCourseDetail(){
      this.$axios.get("/course/detail",{
        params: {
          cid: this.$route.query.cid
        }
      }).then(res => {
        console.log(res);
        this.detail = res.data.data;
        // 图片地址单独赋值,避免Cannot find module './undefined'"
        this.detail.pic = require("@/assets/images/"+this.detail.pic);
      }).catch(err => {
        console.error(err);
      });
    },
    // 添加购物车
    addCart(){
      if (this.$global.isLogin) {
        // 如果用户已登录,则执行添加购物车
        this.$axios.post("/cart/add",this.$qs.stringify({
          cid: this.$route.query.cid,
          uid: sessionStorage.getItem('uid')
        })).then(res => {
          console.log(res);
          alert("添加购物车成功");
        }).catch(err => {
          console.error(err);
        });
      } else {
        // 如果用户没有登录,则跳转到登录页面
        alert("请先登录");
        this.$router.push("/login");
      }
    },
    // 添加收藏
    addFavorite(){
      if (this.$global.isLogin) {
        // 如果用户已登录,则执行添加购物车
        this.$axios.post("/favorite/add",this.$qs.stringify({
          cid: this.$route.query.cid,
          uid: sessionStorage.getItem('uid')
        })).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            alert("添加收藏成功");
          } else if (res.data.code == 201) {
            alert("收藏记录已存在");
          }   
        }).catch(err => {
          console.error(err);
        });
      } else {
        // 如果用户没有登录,则跳转到登录页面
        alert("请先登录");
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    // 查询课程详情
    this.getCourseDetail();
  },
}
</script>

<style>
.icon-cart {
    display: inline-block;
    vertical-align: middle;
    width:19px;
    height: 14px;
    background: url(~@/assets/images/iconlist.png) no-repeat 0 -210px;
    margin-right: 9px;
    margin-top:-4px;
}
.desc{
  font-size:24px;
  color:#555;
  font-weight:lighter;
}
ul>li{
  font-size: 12px;
  color:#888;
}
.mb-2{
  font-size:12px;
  color:#888;
}
.ad{
  font-size: 12px;
  text-decoration: none;
}
.ad:hover{
  color:#f60;
}
div>h2{
  color:#f60;
  font-size:20px;
}
.page-header {
  height: 38px;
    border-bottom: 2px solid #ddd;
    font-weight: lighter;
    margin-top: 20px;
}
.page-header>span{
    float: left;
    min-width: 100px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    color:#555;
    border-bottom: 2px solid #57bc4c;
}
.xq{
  text-indent: 28px;
  font-size: 14px;
  color:#666;
}
</style>