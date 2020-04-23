//引入express模块
const express=require("express");

//引入body-parser中间件模块
const bodyParser=require("body-parser");

//创建web服务器
var app=express();
//设置监听端口
app.listen(5050)
console.log("listening 5050");

// 注册body-parser为中间件
// false 使用querystring来解析数据
// true  使用qs来解析数据(不推荐)
app.use(bodyParser.urlencoded({extended:false}));

// 声明跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
  });
  
//引入用户路由器
const teacherRouter=require("./routes/teacher.js");
const userRouter=require("./routes/user.js");
const typeRouter = require("./routes/type.js");
const courseRouter = require("./routes/course.js");
const cartRouter = require("./routes/cart.js");
const favoriteRouter = require("./routes/favorite.js");
const orderRouter = require("./routes/order.js");

//挂载路由器 并给url 添加前缀 
app.use("/teacher", teacherRouter);
app.use("/user",userRouter);
app.use("/type", typeRouter);
app.use("/course", courseRouter);
app.use("/cart", cartRouter);
app.use("/favorite", favoriteRouter);
app.use("/order", orderRouter);