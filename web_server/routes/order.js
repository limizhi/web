//引入express模块
const express = require("express");
//引入连接池模块
const pool = require("../pool");
//创建路由器对象
const router = express.Router();

// 添加订单  /order/add
router.post("/add", function(req,res){
  // 获取(表单)提交数据
  var obj = req.body;
  console.log(obj);

  // 检测用户id是否为空
  if (!obj.uid) {
    res.json({code:401,msg:"uid required"});
    return;
  }
  // 检测订单金额是否为空
  if (!obj.orderAmount) {
    res.json({code:402,msg:"orderAmount required"});
    return;
  }
  // 检测商品是否为空
  if (!obj.selected) {
    res.json({code:403,msg:"no course selected"});
    return;
  }
  // 以秒为单位的时间戳
  var created = parseInt(new Date().getTime()/1000);
  var order = {
    userId: obj.uid,
    amount: obj.orderAmount,
    created: created
  }
  console.log(order);
  // 添加订单(orders)
  var sql = "INSERT INTO orders SET ?";
  pool.query(sql,[order],(err, result)=>{
    if (err) throw err;
    console.log(result)
    if (result.affectedRows > 0) {
      // 添加订单表成功(oid)
      var orderId = result.insertId; // 新插入的id
      // 对选中的商品进行遍历

      // obj.selected是数组
      // details的最终效果
      // [
      //   [1, 1, 1],   // 第一个商品信息
      //   [1, 5, 2]    // 第二个商品信息
      // ]
      var details = [];
      var courses = JSON.parse(obj.selected);
      for (var i=0; i<courses.length; i++) {
        var tmp = []; // [orderId,courseId, count]
        tmp.push(orderId);
        tmp.push(courses[i].courseId);
        tmp.push(courses[i].count);
        details.push(tmp);
      }
      let sql = 'INSERT INTO orders_detail (orderId,courseId, count) VALUES ?';
      pool.query(sql, [details], (err, result)=>{
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.json({code:200, msg:"success", data: {orderId: orderId}});
        }
      });

    } else {
      res.json({code: 301, msg: "failed"});
    }
  });
});

// 订单列表  /order/list
router.post("/list", function(req,res){
  // 获取(表单)提交数据
  var obj = req.body;
  console.log(obj);

  // 检测用户id是否为空
  if (!obj.userId) {
    res.json({code:401,msg:"userId required"});
    return;
  }

  let sql = "SELECT * FROM orders,orders_detail,course WHERE orders.oid=orders_detail.orderId  AND orders_detail.courseId=course.cid AND orders.userId=? ";
  pool.query(sql, [obj.userId], (err, result)=>{
    if (err) throw err;
    res.json({code:200,msg:"success", data: result});
  });
});

module.exports=router;