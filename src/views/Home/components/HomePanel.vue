<script setup>
// 准备一个模板可以用来接收人气推荐和新鲜好物的相同部分

// 纯静态部分：使用props接过来
defineProps({
  // 主标题
  title: {
    type: String
  },
  // 副标题
  subTitle: {
    type: String
  }
})

</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <!-- <div> 主体内容 </div> -->
      <!-- 主体内容区域：使用插槽来代替 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>