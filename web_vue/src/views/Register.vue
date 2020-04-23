<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row class="my-12">
      <b-col cols="12">
        <h2>新用户注册</h2>

        <b-form @submit="register">
          <b-form-group
            id="input-group-1"
            label="用户名:"
            label-for="uname"
            description="请输入用户名"
          >
            <b-form-input
              id="uname"
              v-model="form.uname"
              type="text"
              required
              @blur="checkUname"
              placeholder="用户名"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="手机号:" label-for="phone">
            <b-form-input
              id="phone"
              v-model="form.phone" 
              type="text"
              required
              @blur="checkPhone"
              :state="validatePhone"
              placeholder="请输入手机号"
            ></b-form-input>
              <b-form-invalid-feedback :state="validatePhone">
              手机号非法
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validatePhone">
              手机号正确
            </b-form-valid-feedback>
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

          <b-form-group id="input-group-2" label="确认密码:" label-for="upwd2">
            <b-form-input
              id="upwd2"
              v-model="form.upwd2"
              type="password"
              required
              placeholder="确认密码"
            ></b-form-input>
          </b-form-group>


          <b-form-group id="input-group-4">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
              <b-form-checkbox value="me">我已阅读并同意用户注册协议</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button type="submit" variant="primary">注册</b-button>
          <b-button type="reset" variant="danger" class="ml-3">取消</b-button>
        </b-form>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import qs from "qs";

export default {
  name: "Register",
  data() {
    return {
      items: [
          {
            text: '首页',
            to: {name: 'Home'}
          },
          {
            text: '用户注册',
            active: true
          }
      ],
      form: {
        uname: "",
        upwd: "",
        upwd2: "",
        phone: "",
        checked:[]
      }
    }
  },
  methods: {
    // 注册表单提交方法
    register() {
      // 检测用户名
      // 检测手机号
      console.log(this.form);
      this.$axios.post("/user/register", qs.stringify(
        this.form
      )).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 将注册用户的uid和uname赋值到session中
          sessionStorage.uid = res.data.data.uid;
          sessionStorage.uname = res.data.data.uname;
          alert("恭喜你,注册成功");
          // 跳转到登录页面
          this.$router.push("/login")
          //location.reload();
         // history.back(); // historoy.go(-1)
        }
      }).catch(err => {
        console.error(err);
      });
    },
    // 检测用户名是否存在
    checkUname() {
      this.$axios.post("/user/check_uname", qs.stringify(
        {uname: this.form.uname}
      )).then(res => {
        console.log(res);
        if (res.data.code == 301) {
          alert("用户名已存在,请换一个");
        }
      }).catch(err => {
        console.error(err);
      });
    },
    // 检测手机号是否存在
    checkPhone() {
      this.$axios.post("/user/check_phone", qs.stringify(
        {phone: this.form.phone}
      )).then(res => {
        console.log(res);
        if (res.data.code == 301) {
          alert("手机号已存在,请换一个");
        }
      }).catch(err => {
        console.error(err);
      });
    },
  },
  computed: {
    // 状态校验会解析成 oninput事件
    validatePhone() {
      if (this.form.phone != "") {
        var pt = /^1[3-9]\d{9}$/;
        return pt.test(this.form.phone);
      }
    }
  }
}
</script>

<style>
  
</style>