<template>
  <div class="background">
    <div class="stars"
         ref="stars"></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      let stars = 800 // 星星的密集程度，数字越大越多
      var starsEl = this.$refs.stars
      var r = 800 // 星星的看起来的距离,值越大越远,可自行调制到自己满意的样子
      const div = document.createElement('div')
      const starList = []
      while (stars-- >= 0) {
        const starItem = div.cloneNode()
        starItem.classList.add('star')
        var s = 0.2 + (Math.random() * 1)
        const curR = r + (Math.random() * 300)
        starItem.style.transformOrigin = `0 0 ${curR}px`
        starItem.style.transform = `translate3d(0,0,-${curR}px) rotateY(${Math.random() * 360}deg)  rotateX(${Math.random() * -50}deg) scale(${s},${s})`
        starList.push(starItem)
      }
      starsEl.append(...starList)
    }
  }
}
</script>

<style lang="scss">
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    200% 100% at bottom center,
    #f7f7b6,
    #e96f92,
    #75517d,
    #1b2947
  );
  background: radial-gradient(
    220% 105% at top center,
    #1b2947 10%,
    #75517d 40%,
    #e96f92 65%,
    #f7f7b6
  );
  background-attachment: fixed;
  overflow: hidden;

  @keyframes rotate {
    0% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }

    100% {
      transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
        rotateY(-360deg);
    }
  }

  .stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;

    .star {
      width: 2px;
      height: 2px;
      background: #f7f7b6;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 0 0 -300px;
      transform: translate3d(0, 0, -300px);
      backface-visibility: hidden;
    }
  }
}
</style>
