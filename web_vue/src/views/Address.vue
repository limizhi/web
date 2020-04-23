<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <b-row class="py-3">
      <b-col cols="3" class="pr-0">
        <div class="icon-location"></div>
      </b-col>
      <b-col cols="9">
        <h3>北京中关村中心</h3>
        <p>校区地址：北京市海淀区北三环西路甲18号（大钟寺附近）中鼎大厦B座7层</p>
        <p>咨询电话：010-62130963</p>
        <p>邮编：100098</p>
      </b-col>
    </b-row>
    <b-row class="py-3">
      <b-col cols="3">
        <div class="icon-location"></div>
      </b-col>
      <b-col cols="9">
        <h3>北京天坛中心</h3>
        <p>校区地址：北京市崇文区珠市口东大街6号珍贝大厦西侧3层达内科技</p>
        <p>咨询电话：010-67028668</p>
        <p>邮编：100050</p>
      </b-col>
    </b-row>
    <b-row class="py-3">
      <b-col cols="3">
        <div class="icon-location"></div>
      </b-col>
      <b-col cols="9">
        <h3>北京广渠门中心</h3>
        <p>校区地址：北京市东城区广渠门东广渠家园25号楼启达大厦一层</p>
        <p>咨询电话：15321130620</p>
        <p>邮编：100010</p>
      </b-col>
    </b-row>
    <b-row class="py-3">
      <b-col cols="3">
        <div class="icon-location"></div>
      </b-col>
      <b-col cols="9">
        <h3>北京北京清华园中心</h3>
        <p>校区地址：北京市海淀区花园路小关街120号万盛商务会馆A区三层</p>
        <p>咨询电话：010-82676916</p>
        <p>邮编：100088</p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Address",
  data() {
    return {
      items: [
          {
            text: '首页',
            to: {name: 'home'}
          },
          {
            text: '校区',
            active: true
          }
      ]
    }
  }
}
</script>

<style scoped>
.icon-location {
    width: 31px;
    height: 47px;
    background: url(~@/assets/images/iconlist.png) no-repeat 0 -530px;
    margin: 40px auto;
}
h3{
  font-size:18px;
  color:#555;
}
p{
  font-size:14px;
  color: #999;
  margin-bottom:0.4rem;
}
.py-3{
  border-bottom:1px dotted #ccc;
}
</style>