<script setup>
// 调用接口导入数据
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Goodsitem from '../Home/components/Goodsitem.vue'

// 获取面包屑参数
const route = useRoute()
const categoryFilter = ref([])
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilter.value = res.result
}
onMounted(() => {
  getCategoryFilter()
})

// 获取分类基础列表
const goodsList = ref({})
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})
const getSubCategory = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res.result.items
}
onMounted(() => getSubCategory())

// 监听sortField的变化
const tabChange = () => {
  // console.log(`sortField 发生了变化`);
  reqData.value.page = 1
  getSubCategory()
}

// 在这里实现下拉加载的函数实现
/* 1. 在element中调用一个指令 v-infinite-scroll="load" 来监视到达底部触发函数
   2. 在load函数中实现页码加一实现获取新的数据
   3. 把新的数据加到数组中
   4. 判断是否加载完全部数据,是就停止触发load*/
const disabled = ref(false)
const load = async () => {
  // console.log(`页面滑倒了底部`);
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = [...goodsList.value, ...res.result.items]

  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilter.parentId}` }">{{ categoryFilter.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 实现商品列表的下拉加载
        1.在element中调用一个指令 v-infinite-scroll="load" 来监视到达底部触发函数
      -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <Goodsitem v-for="goods in goodsList" :key="goods.id" :good="goods" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
