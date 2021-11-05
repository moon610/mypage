document.documentElement.scrollTop = JSON.parse(localStorage.getItem('saveInfo')).scroll

let saveInfo = {
  url: window.location.href,
  scroll: 0
}

//防抖函数
function debounce(handle, delay) {
  let clear = null
  return function (...args) {
    if (clear) {
      clearTimeout(clear)
    }
    clear = setTimeout(handle, delay, ...args)
  }
}
const save = debounce(() => {
  saveInfo.scroll = document.documentElement.scrollTop
  window.localStorage.setItem('saveInfo', JSON.stringify(saveInfo))
}, 1000)

document.addEventListener('scroll', () => {
  save(saveInfo)
})