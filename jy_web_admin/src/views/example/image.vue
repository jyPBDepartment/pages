<template>
  <div>
    <!-- <canvas ref="myCanvas" width="540" height="960"></canvas> -->
    <img
      v-if="img"
      ref="image"
      :src="img"
      style="width: 540px; height: 960px"
    >
    <input v-model="value">
    <button @click="draw2">生成图片</button>
    <button @click="saveImage">下载图片</button>
  </div>
</template>

<script>
import bg from '../../assets/bg.png'
export default {
  data() {
    return {
      value: '2020-11-13',
      imgUrl: bg,
      canvas: null,
      img: ''
    }
  },
  mounted() {
    this.draw2()
  },
  methods: {
    draw2() {
      const canvas = document.createElement('canvas') // 创建canvas
      canvas.width = 540
      canvas.height = 960
      const context = canvas.getContext('2d') // 创建画布
      const img = new Image() // 因为拿不到图片静态资源，所以创建图片标签
      img.setAttribute('crossOrigin', 'anonymous') // 解决图片跨域问题,也要放到赋值前，否贼大部分浏览器会报错
      img.src = this.imgUrl
      img.onload = () => {
        // 绘制图片
        context.drawImage(img, 0, 0, 540, 960)
        context.fillStyle = '#FFFFFF'
        context.font = 'small-caps bold 20px STXinwei'
        context.fillText(this.value, 235, 570)
        context.scale(1, 1)
        // 合成图片
        this.img = canvas.toDataURL('image/png')
      }
    },
    saveImage(imgUrl) {
      const aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = this.img
      aLink.download = '证书.png'
      // 触发点击-然后移除
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    }
  }
}
</script>

<style>
</style>
