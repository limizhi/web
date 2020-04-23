//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool.js");
//创建路由器对象
const router=express.Router();

//添加路由 讲师列表 /teacher/list
router.get("/list",(req,res)=>{
    //执行sql语句 查询数据库中的讲师
    var sql="SELECT * FROM teacher";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        //将取到的数据返回给调用端
        res.json({
            code:200,         //状态码
            msg:"success",    //消息
            data:result       //数据
        });
    });
    //res.send("hello teacher")
});


//模块导出
module.exports=router;