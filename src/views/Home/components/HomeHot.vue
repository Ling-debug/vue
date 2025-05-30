<script setup>
// 1.封装一个api用来获取数据 这里依然封装在home.js中
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/apis/home.js'
import { onMounted, ref } from 'vue'
// 2.将接口的数据接过来并保存到本地中
const hotList = ref([])
const getHot = async () => {
  const res = await getHotAPI()
  // console.log(res)
  hotList.value = res.result
}

onMounted(() => {
  getHot()
})
// 3.把数据使用在插槽中并使用
// 4.插槽在我们原先使用建立好的模板使用
</script>

<template>
  <HomePanel title="人气推荐" subTitle="人气出炉 品质靠谱">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <!-- 用自定义的懒加载来代替直接加载  :src="item.picture"-->
          <img  v-img-lazy="item.picture"  alt="" />
          <p class="title">{{ item.title }}</p>
          <p class="alt">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
