function throttle(fn, interval) {
  let time = 0
  return function() {
    const now = Date.now()
    if (now - time >= interval) {
      fn.apply(this, arguments)
      time = now
    }
  }
}

function showName() {
  console.log('showName....')
}

let handle = throttle(showName, 1000)
let oBtn = document.getElementsByClassName('btn')[0]
oBtn.onclick = handle
