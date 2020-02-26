const install = Vue => {
  Vue.directive('animate', {
    inserted(el, { arg }) {
      const wrap = document.createElement('span')
      wrap.classList.add('heart')
      // 聚焦元素
      el.addEventListener('click', e => {
        wrap.style.backgroundPosition = ''
        if (arg !== 'toggle') {
          wrap.classList.add('heartAnimation')
          wrap.addEventListener('webkitAnimationEnd', () => {
            wrap.classList.remove('heartAnimation')
            wrap.style.backgroundPositionX = '30px'
          }, false)
        } else {
          if (wrap.classList.contains('heartAnimation')) {
            wrap.classList.remove('heartAnimation')
          } else {
            wrap.classList.add('heartAnimation')
          }
        }
      })
      el.insertBefore(wrap, el.firstChild)
    }
  })
}

export default install
