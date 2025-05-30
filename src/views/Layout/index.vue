<script setup>

import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

//触发action函数 
import { useCounterStore } from '../../stores/category';
import { onMounted } from 'vue';

const categoryStore = useCounterStore()

//在父主见中直接发起请求数据得到数据，以免在子组件中多次发起
onMounted(()=>{
  categoryStore.getCategory()
})
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 路由出口占位符 -->
  <!-- 直接破坏组件的复用性，强制替换一个元素/  -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <LayoutFooter />
</template>