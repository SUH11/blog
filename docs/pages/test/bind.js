// bind
Function.prototype._bind = function() {
  var _arguments = Array.prototype.slice.call(arguments)
  var _target = _arguments.shift()
  var _this = this

  var fn = function() {
    var _args = Array.prototype.slice.call(arguments)
    var _obj = this instanceof fn ? this : _target
    _this.apply(_obj, _arguments.concat(_args))
  }
  fn.prototype = Object.create(this.prototype)
  return fn
}

// 测试
function A(a,b){
  this.a = a
  this.b = b
}
var c = {x: 10}
var a = A._bind(c, 1)
var b = new a(2) // {a: 1, b: 2}

console.log(b)