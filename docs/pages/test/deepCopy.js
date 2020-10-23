function deepCopy(obj) {
  if (!obj) {
    return obj
  }
  let target = {}
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      target[key] = obj[key].map(item => item)
    } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      target[key] = deepCopy(obj[key])
    } else {
      target[key] = obj[key]
    }
  }
  return target
}

function deepCopy(obj) {
  if (!obj) {
    return obj
  }
  let isArr = Array.isArray(obj)
  let target = isArr ? [] : {}
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      target[key] = obj[key].map(item => item)
    } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      target[key] = deepCopy(obj[key])
    } else {
      target[key] = obj[key]
    }
  }
	return target
}

// let obj = {
//   name: 'name',
//   subs: [1, 2, {a: 10, b: 20}],
//   fn: function() {
//     return this.name
//   }
// }
let obj = [1, 2, 3, {a: 0}]
let copy = deepCopy(obj)
console.log(copy)
console.log(copy === obj)