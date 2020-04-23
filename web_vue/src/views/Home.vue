<template>
  <b-container>
    <!-- 轮播图 -->
    <Carousel></Carousel>
    <!-- 最新课程 -->
    <home-course></home-course>
    <!-- 热门课程 -->
    <hot-course></hot-course>
    <!-- 讲师 -->
    <teacher-list></teacher-list>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Carousel from '@/components/Carousel'
import HomeCourse from "../components/HomeCourse"
import HotCourse from "../components/HotCourse"
import TeacherList from "../components/TeacherList"

export default {
  name: 'Home',
  components: {
    Carousel,
    HomeCourse,
    HotCourse,
    TeacherList
    
  }
}
</script>
