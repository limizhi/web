<template>
  <b-container>
    <b-breadcrumb :items="items" class="bg-transparent"></b-breadcrumb>
    <h2 class="order_title">选择收货地址<a href="">管理收货地址</a></h2>
    <div class="user_address">
        <ul class="list-unstyled">
            <li class="active"><span></span>今麦郎	14765231859	北京 北京市 西城区 大方胡同2号 西单上国阙</li>
            <li><span></span>鄢倩文	17763258668	上海 上海市 浦东新区 陆家嘴大道 汤臣一品</li>
            <li><span></span>黄艳蓉	18865327963	深圳 深圳市 盐田区 盐梅路 天琴湾</li>
        </ul>
    </div>
    <h2 class="order_title">确认订单信息</h2>
    <div class="order_list">
        <h3 class="clearfloat">
          <span>商品信息</span>
          <span>单价</span>
          <span>数量</span>
          <span>小计</span>
        </h3>
        <ul class="list-unstyled">
            <li v-for="(item, index) in list" :key="index">
                <img :src="require(`@/assets/images/${item.pic}`)" alt=""/>
                <h4>{{item.title}}</h4>
                <span>¥{{item.price}}</span>
                <em>{{item.count}}</em>
                <strong>¥{{item.price * item.count}}</strong>
            </li>
        </ul>
    </div>
    <h2 class="order_title">备注信息： <input type="text"/></h2>
    <div class="order_sum">
        <ul class="list-unstyled">
            <li><span>商品总金额：</span><span id="priceSum">¥{{orderAmount}}</span></li>
            <li><span>应付金额：</span><strong id="paySum">¥{{orderAmount}}</strong></li>
            <li><button type="button" @click="orderCommit">提交订单</button></li>
        </ul>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "OrderConfirm",
  data(){
    return {
      items: [
          {
            text: '首页',
            to: {name: 'home'}
          },
          {
            text: '订单确认',
            active: true
          }
      ],
      list:[],
      orderAmount: sessionStorage.getItem('orderAmount')
    }
  },
  methods: {
    getSelected() {
      var selected = sessionStorage.getItem("selected");
      // 将json字符串,解析成JS中的变量(数组,对象,...)
      this.list = JSON.parse(selected);
    },
    // 提交订单接口的调用
    orderCommit() {
       this.$axios.post("/order/add", this.$qs.stringify({
        uid: sessionStorage.getItem('uid'),
        orderAmount: sessionStorage.getItem('orderAmount'),
        selected: sessionStorage.getItem('selected')  // 数组
      })).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          alert("添加成功");
        }
      }).catch(err => {
        console.error(err);
      }); 
    }
  },
  mounted() {
    console.log(sessionStorage);
    this.getSelected()
  },
}
</script>

<style>
.order_title {
    margin-top: 40px;
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
}
.order_title>a {
    float: right;
    font-weight: lighter;
    text-decoration: underline;
}
.order_title>input {
    width: 800px;
    height: 32px;
    border:1px solid #ccc;
}
.user_address {
    border:1px solid #eee;
    background: #fff;
    padding:20px 100px;
}
.user_address>ul>li {
    line-height: 34px;
    height: 34px;
    border:1px solid transparent;
    font-size: 14px;
    color: #999;
    cursor: pointer;
}
.user_address>ul>li:hover {
    background: #f5f5f5;
}
.user_address>ul>li>span {
    float: left;
    width: 35px;
    height: 34px;
    margin-right: 50px;
}
.user_address>ul>li.active {
    background: #fffce4;
    border:1px solid #ff6600;
}
.user_address>ul>li.active span {
    background: #ff6600 url(~@/assets/images/iconlist.png) no-repeat 7px -741px;

}
.order_list>h3 {
    line-height: 36px;
    border-top:2px solid #ddd;
    border-bottom: 1px solid #ddd;
    color: #999;
    font-weight: lighter;
    font-size: 14px;
}
.order_list>h3>span {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.order_list>h3>span:nth-child(1){
    width: 55%;
}
.order_list>h3>span:nth-child(2){
    width: 15%;
}
.order_list>h3>span:nth-child(3){
    width: 15%;
}
.order_list>h3>span:nth-child(4){
    width: 15%;
}
/*??????����*/
.order_list>ul>li {
    padding: 20px 0px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}
.order_list>ul>li>img,
.order_list>ul>li>h4,
.order_list>ul>li>span,
.order_list>ul>li>em,
.order_list>ul>li>strong {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
}
.order_list>ul>li>img {
    width: 20%;
    max-height: 100px;
}
.order_list>ul>li>h4 {
    padding-left: 20px;
    text-align: left;
    width: 35%;
    font-weight: lighter;
}
.order_list>ul>li>span {
    width: 15%;
}
.order_list>ul>li>em {
    width: 15%;
    font-style: normal;
}
.order_list>ul>li>strong {
    width: 15%;
    font-weight: bold;
    color:#f60;
}
.order_sum {
    margin-top: 40px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
}
.order_sum>ul>li {
    line-height: 30px;
    text-align: right;
    font-size: 14px;
}
.order_sum>ul>li>span,
.order_sum>ul>li>strong{
    display: inline-block;
    text-align: right;
    width: 120px;
    font-style: normal;
}
.order_sum>ul>li>strong {
    color: #f60;
}
.order_sum>ul>li>button {
    width: 120px;
    height: 36px;
    background: #f63;
    font-size: 18px;
    color: #fff;
    border: none;
    margin-top:10px;
}
.order_sum>ul>li>button:hover{
    background: #fc5a25;
}
</style>