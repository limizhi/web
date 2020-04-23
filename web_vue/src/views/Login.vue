<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row>
      <b-col md="7" sm="12">
        <h2>用户登陆</h2>
        <b-form @submit="login">
          <b-form-group
            id="input-group-1"
            label="用户名:"
            label-for="uname"
            description=""
          >
            <b-form-input
              id="uname"
              v-model="form.uname"
              type="text"
              required
              placeholder="用户名或手机号"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="密码:" label-for="upwd">
            <b-form-input
              id="upwd"
              v-model="form.upwd"
              type="password"
              required
              placeholder="请输入密码"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">登陆</b-button>
          <b-button type="reset" variant="danger" class="ml-3">重置</b-button>
        </b-form>
      </b-col>
      <b-col md="5" sm="12">
        <router-link to="/register">
        <h2 class="text-right">新用户注册</h2>
        </router-link>
        <em class="linebetween"></em>
        <p class="qrcode">
            <i></i>
            <span>扫码登录</span>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import qs from "qs";
export default {
  name: "login",
  data(){
    return {
      items: [
          {
            text: '首页',
            to: {name: 'Home'}
          },
          {
            text: '用户登陆',
            active: true
          }
      ],
      form: {
        uname: "",
        upwd: ""
      }
    }
  },
  methods: {
    login(){
      this.$axios.post("/user/login", qs.stringify(
        this.form
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 将登陆用户的uid和uname赋值到session中
          sessionStorage.uid = res.data.data.uid;
          sessionStorage.uname = res.data.data.uname;
          alert("登陆成功");
          // 跳转到首页
          this.$router.push("/");
          location.reload();
          // location.href = https://www.baidu.com
        }
      }).catch(err => {
        console.error(err);
      });
    }
  },
}
</script>

<style>
.qrcode {
  margin: 50px auto;
  text-align: center;
}
.qrcode > i {
  display: block;
  width: 129px;
  height: 129px;
  background: url(~@/assets/images/qrcode.png) no-repeat 0 0;
  margin: 0 auto;
}
</style>