function debounce(fn, interval, immediate = true) {
  let timer = null
  let debounced = function(..._args) {
    timer && clearTimeout(timer)
    if (immediate) {
      let callNow = !timer
      if (callNow) {
        fn.apply(this, _args)
      }
      timer = setTimeout(() => {
        timer = null
      }, interval)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, _args)
      }, interval)
    }
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}


function showName() {
  console.log('showName....')
}

let handle = debounce(showName, 1000)
let oBtn = document.getElementsByClassName('btn')[0]
oBtn.onclick = handle
