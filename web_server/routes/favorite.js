//引入express模块
const express=require("express");
//引入连接池模块
const pool=require("../pool.js");
//创建路由器对象
const router=express.Router();

//声明路由接口 添加收藏 /favorite/add
// 添加收藏 /favorite/add
router.post("/add", function(req,res){
  var obj = req.body;
  if (!obj.uid) {
    res.json({code:301, msg: "uid is required"});
    return;
  }
  if (!obj.cid){
    res.json({code:302, msg: "cid is required"});
    return;
  }

  // 查询语句
  let sql = "SELECT count(*) as num FROM favorite WHERE userId=? AND courseId=?";
  pool.query(sql, [obj.uid, obj.cid], (err,result)=>{
    if (err) throw err;
    if (result[0].num > 0) {
      // 收藏记录存在
      res.json({code:201,msg:"exists"});
    } else {
      // 收藏记录不存在
      // 以秒为单位的时间戳
      var fTime = Math.ceil((new Date()).getTime()/1000);
      let sql = "INSERT INTO favorite (userId,courseId,fTime) VALUES (?,?,?)";
      pool.query(sql, [obj.uid, obj.cid, fTime], (err, result)=>{
        if (err) throw err;
        console.log(result);
        if (result.affectedRows > 0) {
          res.json({
            code:200, 
            msg: "success", 
            data:{
              fid:result.insertId
            }
          });
        } else {
          res.json({code:303, msg: "failed"});
        }
      });
    }
  });
});

// 我的收藏 /favorite/list
router.post("/list", (req,res)=>{
  var obj = req.body;
  if (!obj.uid) {
    res.json({code: 301, msg: "uid is required"});
    return;
  }

  let sql = "SELECT course.title,course.pic,course.price, favorite.courseId,favorite.fid,favorite.fTime FROM favorite,course WHERE favorite.courseId=course.cid AND userId=? ORDER BY favorite.fTime DESC";
  pool.query(sql, [obj.uid], (err, result)=>{
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      res.json({code:200,msg:"success", data: result});
    } else {
      res.json({code:201,msg:"no favorite"});
    }
  });
})

module.exports=router;