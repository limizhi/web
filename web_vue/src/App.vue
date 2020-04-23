<template>
  <div id="app" :key="key">
    <TopNav></TopNav>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'
import TopNav from './components/TopNav.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default {
  name:'app',
  components:{
    TopNav,
    Header,
    Footer
  },
  data(){
    return{
      key:""//监听url的变化(解决路由不变，参数变化，但页面不刷新的问题)
    }
  },
  watch:{
    $route:function(newUrl,oldUrl){
      // 路由(包括参数)发生变化时,对Key进行赋值
      // 如果Key发生了变化,则页面执行刷新
      this.key=new Date().getTime();
    }
  }
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
