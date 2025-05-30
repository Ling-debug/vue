<!-- 在这个插件中显示图片并实现放大镜效果 -->
<script setup>
import { ref, watch } from 'vue'
// 使用vueuse官方的插件来得到相对位置的坐标
import { useMouseInElement } from '@vueuse/core'

// 优化图片操作使的接收对应的图片
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})
// 图片列表
// const imageList = [
//   'https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png',
//   'https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg',
//   'https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg',
//   'https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg',
//   'https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg',
// ]

//1.给小图绑定一个事件用来确定id值
const activeIndex = ref(0)
const enterhandler = (i) => {
  activeIndex.value = i
}

const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
// 2.获取到鼠标相对与元素的位置 获取到DOM元素
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 3.监听elementX等元素的变化
watch([elementX, elementY], () => {
  // console.log([elementX,elementY ,isOutside]);
  // 4.添加遮罩的判断逻辑
  // 出界控制
  if (isOutside.value) return

  // 有效移动范围的计算逻辑
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  //边界距离控制
  if (elementX.value < 100 && elementX > 300) {
    left.value = 0
  }
  if (elementY.value < 100 && elementY > 300) {
    top.value = 0
  }

  // 控制大图的变化和显示


  positionX.value = - left.value * 2
  positionY.value = - top.value * 2

})
</script>

<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <!-- {{elementX}},{{elementY}},{{isOutside}} -->
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mousemove="enterhandler(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
