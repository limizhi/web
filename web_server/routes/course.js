//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool");
//创建路由器对象
const router=express.Router();

// 课程列表路由 /course/list
// 支持分页查询,支持类型过滤
router.get("/list", function(req,res){
    // 接收get请求的参数 req.query
    var obj = req.query;
    console.log(obj);
    // 判断有没有curPage参数
    if (!obj.curPage) {
      obj.curPage = 1;
    }
    // 判断有没有pageSize参数
    if (!obj.pageSize) {
      obj.pageSize = 3;
    }
    // 判断有没有typeId参数
    if (!obj.typeId) {
      obj.typeId = 0;
    }
    // 查看总的记录数
    if (obj.typeId <= 0) {
      // 查询所有分类的课程总数
      var sql = "SELECT count(*) as num FROM course";
    } else {
      // 查询某个分类的课程总数
      var sql = "SELECT count(*) as num FROM course WHERE typeId="+obj.typeId;
    }
    pool.query(sql, (err, result)=>{
      if (err) throw err;
      let total = result[0].num; // 总的记录数
      // 总页数
      let pageTotal = Math.ceil(total/obj.pageSize);
      // 查询的起始位置
      let offset = (obj.curPage-1)*obj.pageSize;
  
      // 执行分页查询
      if (obj.typeId <= 0) {
        var sql = `SELECT * FROM course,teacher WHERE course.teacherId = teacher.tid ORDER BY course.cid DESC LIMIT ${offset},${parseInt(obj.pageSize)}`;
      } else {
        var sql = `SELECT * FROM course,teacher WHERE course.teacherId = teacher.tid AND typeId=${obj.typeId} ORDER BY course.cid DESC LIMIT ${offset},${parseInt(obj.pageSize)}`;
      }
      pool.query(sql, (err, result)=>{
        if (err) throw err;
        console.log(result);
        res.json({
          code:200, 
          msg:"success", 
          data: {
            list: result,
            total: total,
            pageTotal: pageTotal,
            pageSize: obj.pageSize,
            curPage: obj.curPage
          }
        });
      });
    });
    // console.log(req.query);
  });
  
  // 课程详情 /course/detail?cid=1
  router.get("/detail", function(req,res){
    var obj = req.query;
    if (!obj.cid) {
      res.json({code:300,msg:"cid is required"});
      return;
    }
    let sql = "SELECT * FROM course,teacher WHERE course.teacherId=teacher.tid AND course.cid="+obj.cid;
    pool.query(sql, (err,result) => {
      if (err) throw err;
      res.json({code:200,msg:"success",data:result[0]});
    });
  });
  
  // 最新课程  /course/newest
  router.get('/newest', (req,res)=>{
    var obj = req.query;
    if (!obj.countNum) {
      obj.countNum = 4;
    }
    // 查询最近课程就是按照课程id倒叙排列
    let sql = "SELECT course.cid,course.title,course.pic,course.price,teacher.tname FROM course, teacher WHERE course.teacherId=teacher.tid ORDER BY cid DESC LIMIT "+Number(obj.countNum);
    pool.query(sql, (err, result)=>{
      if (err) throw err;
      res.json({code: 200, msg: "success", data: result});
    });
  });
  

//创建热门课程路由接口 course/hot
router.get("/hot",(req,res)=>{
    //获取数据
    let obj=req.query;
    console.log(obj);
    if(!obj.countNum){
        obj.countNum=4;
    }
    //执行sql 语句
    var sql="SELECT course.cid, course.title,course.pic,course.price,teacher.tname FROM course,teacher WHERE course.teacherId=teacher.tid ORDER BY cid ASC LIMIT "+Number(obj.countNum);
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.json({
            code:200,msg:"success",data:result
        });
    });
});
//导出模块
module.exports=router;