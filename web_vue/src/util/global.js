//如果session中有uid 则认为登录
var isLogin=sessionStorage.getItem('uid')? true : false;
var uname=sessionStorage.getItem('uname');
const siteName='web';//站点名称

//模块导出
export default {
  isLogin,
  uname,
  siteName
}