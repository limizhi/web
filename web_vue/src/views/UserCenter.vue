<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row>
      <b-col cols="3">
        <b-list-group>
          <b-list-group-item active>
          <router-link to="" class="text-light">用户中心</router-link>
          </b-list-group-item>
          <b-list-group-item>
          <router-link to="">我的课程</router-link>
          </b-list-group-item>
          <b-list-group-item>
          <router-link to="">我的收藏</router-link>
          </b-list-group-item>
          <b-list-group-item>
          <router-link to="">个人资料</router-link>
          </b-list-group-item>
          <b-list-group-item>
          <router-link to="">修改密码</router-link>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="9">
        <h3>{{uname}} 您好~欢迎来到会员中心！</h3>

        <h5 class="page-header py-3">我的课程</h5>
        <b-row>
          <b-col cols="4" v-for="(item,index) in orderList" :key="index">
            <router-link :to="{name:'course_detail',query:{cid:item.courseId}}">
              <img :src="require(`@/assets/images/${item.pic}`)" alt="" class="my-3 img-fluid">
            </router-link>
            <router-link :to="{name:'course_detail',query:{cid:item.courseId}}">{{item.title}}</router-link>
          </b-col>
        </b-row>
        <h5 class="page-header py-3">我的收藏</h5>
        <b-row>
          <b-col cols="4" v-for="(item,index) in favoriteList" :key="index">
            <router-link :to="{name:'course_detail',query:{cid:item.courseId}}">
              <img :src="require(`@/assets/images/${item.pic}`)" alt="" class="my-3 img-fluid">
            </router-link>
            <router-link :to="{name:'course_detail',query:{cid:item.courseId}}">{{item.title}}</router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "UserCenter",
  data() {
    return {
      items: [
          {
            text: '首页',
            to: {name: 'home'}
          },
          {
            text: '用户中心',
            active: true
          }
      ],
      uname: sessionStorage.getItem('uname'),
      orderList: [],
      favoriteList: []
    }
  },
  methods: {
    // 获取用户的订单列表
    getOrderList(){
      this.$axios.post("/order/list", this.$qs.stringify(
        {
          userId: sessionStorage.getItem('uid')
        }
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.orderList = res.data.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    // 获取用户的收藏列表
    getFavoriteList(){
      this.$axios.post("/favorite/list", this.$qs.stringify(
        {
          uid: sessionStorage.getItem('uid')
        }
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.favoriteList = res.data.data;
        }
      }).catch(err => {
        console.error(err);
      });
    }
  },
  mounted() {
    this.getOrderList();
    this.getFavoriteList();
  },
}
</script>

<style>
.page-header {
  border-bottom: 2px solid #DDD;
}
</style>