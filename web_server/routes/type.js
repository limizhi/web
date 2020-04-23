//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool")
//创建路由对象
const router=express.Router();

//添加路由 课程分类 /type/
router.get("/", function(req,res){
    //执行sql语句
    var sql = "SELECT * FROM type";
    pool.query(sql, (err, result)=>{
      if (err) throw err;
      res.json({
        code:200,
        msg:"success",
        //将取到的数据返回给调用端 
        data: result
      });
    });
  });

//导出模块
module.exports=router;