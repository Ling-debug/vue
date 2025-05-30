<!--实现轮播图相关的操作 -->
<script setup>
import { getBannerAPI } from '@/apis/home.js'
import { onMounted, ref } from 'vue'

// 获取轮播图banner
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI()
  // console.log(res)
  bannerList.value = res.result
}

//
onMounted(() => {
  // 调用时，使用函数
  getBanner()
})
</script>

<template>
  <!-- 1.确定模板 
        2. 调用elemtplus相关的数据
        3.在apis 中调用接口获得数据
        4.将数据绑定上模板上
 -->
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
